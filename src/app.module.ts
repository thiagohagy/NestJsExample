import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

// CONFIG
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './common/loaders/database/database.module'
import { CarModule } from './modules/car/car.module'

import configs from './config'
import { RequestLoggerMiddleware } from './common/middleware/request.logger.middleware'
import { RouteGuard } from './common/middleware/route.guard.middleware'
import { CronSchedule } from './common/loaders/cron/cron.provider'
import { ScheduleModule } from '@nestjs/schedule'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo'
import { join } from 'path'

@Module({
  imports: [
    DatabaseModule, // load database connections
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true, // global config files
      load: configs,
    }),
    // Functional modules
    CarModule,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: RouteGuard,
    },
    {
      provide: 'APP_CRON_Schedule',
      useClass: CronSchedule,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*')
  }
}

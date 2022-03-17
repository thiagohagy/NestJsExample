import { Module } from '@nestjs/common'
import UploadProvider from './upload.provider'

@Module({
  imports: [UploadProvider],
  exports: [UploadProvider],
})
export class UploadModule {}

import { registerAs } from '@nestjs/config'

export default registerAs('messaging', () => ({
  server_uri: process.env.MESSAGING_SERVER_URI || 'queue://123',
}))

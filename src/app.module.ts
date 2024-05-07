import { Module } from '@nestjs/common'
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module'
import { UsersModule } from './users/infrastructure/users.module'
import { DatabaseModule } from './shared/infrastructure/database/database.module'
import { AuthModule } from './auth/infrastucture/auth.module'
import { StoresModule } from './store/infrastructure/store.module'

@Module({
  imports: [
    EnvConfigModule,
    UsersModule,
    DatabaseModule,
    AuthModule,
    StoresModule,
  ],
})
export class AppModule {}

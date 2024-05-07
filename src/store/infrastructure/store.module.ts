import { Module } from '@nestjs/common'
import { StoresController } from './store.controller'
import { BcryptjsHashProvider } from '@/users/infrastructure/providers/hash-provider/bcryptjs-hash.provider'
import { StoreRepository } from '../domain/repositories/store.repository'
import { HashProvider } from '@/shared/application/providers/hash-provider'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { StorePrismaRepository } from './database/prisma/repositories/user-prisma.repository'
import { AuthModule } from '@/auth/infrastucture/auth.module'
import { AddStoreUseCase } from '../aplication/usecases/add-store.usecase'
import { GetStoreUseCase } from '../aplication/usecases/get-store.usecase'
import { DeleteStoreUseCase } from '../aplication/usecases/delete-store.usecase'
import { ListStoresUseCase } from '../aplication/usecases/list-store.usecase'
import { UpdateStoreUseCase } from '../aplication/usecases/update-store.usecase'

@Module({
  imports: [AuthModule],
  controllers: [StoresController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'StoreRepository',
      useFactory: (prismaService: PrismaService) => {
        return new StorePrismaRepository(prismaService)
      },
      inject: ['PrismaService'],
    },
    {
      provide: 'HashProvider',
      useClass: BcryptjsHashProvider,
    },
    {
      provide: AddStoreUseCase.UseCase,
      useFactory: (
        storeRepository: StoreRepository.Repository,
        hashProvider: HashProvider,
      ) => {
        return new AddStoreUseCase.UseCase(storeRepository, hashProvider)
      },
      inject: ['StoreRepository', 'HashProvider'],
    },
    {
      provide: GetStoreUseCase.UseCase,
      useFactory: (storeRepository: StoreRepository.Repository) => {
        return new GetStoreUseCase.UseCase(storeRepository)
      },
      inject: ['StoreRepository'],
    },
    {
      provide: ListStoresUseCase.UseCase,
      useFactory: (storeRepository: StoreRepository.Repository) => {
        return new ListStoresUseCase.UseCase(storeRepository)
      },
      inject: ['StoreRepository'],
    },
    {
      provide: UpdateStoreUseCase.UseCase,
      useFactory: (storeRepository: StoreRepository.Repository) => {
        return new UpdateStoreUseCase.UseCase(storeRepository)
      },
      inject: ['StoreRepository'],
    },
    {
      provide: DeleteStoreUseCase.UseCase,
      useFactory: (storeRepository: StoreRepository.Repository) => {
        return new DeleteStoreUseCase.UseCase(storeRepository)
      },
      inject: ['StoreRepository'],
    },
  ],
})
export class StoresModule {}

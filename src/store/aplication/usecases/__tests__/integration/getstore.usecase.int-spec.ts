import { DatabaseModule } from '@/shared/infrastructure/database/database.module'
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaClient } from '@prisma/client'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { StorePrismaRepository } from '@/store/infrastructure/database/prisma/repositories/store-prisma.repository'
import { StoreEntity } from '@/store/domain/entities/store.entity'
import { StoreDataBuilder } from '@/store/domain/helpers/store-data-builder'
import { GetStoreUseCase } from '../../get-store.usecase'

describe('GetStoreUseCase integration tests', () => {
  const prismaService = new PrismaClient()
  let sut: GetStoreUseCase.UseCase
  let repository: StorePrismaRepository
  let module: TestingModule

  beforeAll(async () => {
    setupPrismaTests()
    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile()
    repository = new StorePrismaRepository(prismaService as any)
  })

  beforeEach(async () => {
    sut = new GetStoreUseCase.UseCase(repository)
    await prismaService.store.deleteMany()
  })

  afterAll(async () => {
    await module.close()
  })

  it('should throws error when entity not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('StoreModel not found using ID fakeId'),
    )
  })

  it('should returns a store', async () => {
    const entity = new StoreEntity(StoreDataBuilder({}))
    const model = await prismaService.store.create({
      data: entity.toJSON(),
    })

    const output = await sut.execute({ id: entity._id })

    expect(output).toMatchObject(model)
  })
})

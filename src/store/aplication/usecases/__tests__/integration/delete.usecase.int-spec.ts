import { DatabaseModule } from '@/shared/infrastructure/database/database.module'
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaClient } from '@prisma/client'
import { DeleteStoreUseCase } from '../../delete-store.usecase'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { StorePrismaRepository } from '@/store/infrastructure/database/prisma/repositories/store-prisma.repository'
import { StoreEntity } from '@/store/domain/entities/store.entity'
import { StoreDataBuilder } from '@/store/domain/helpers/store-data-builder'

describe('DeleteUseCase integration tests', () => {
  const prismaService = new PrismaClient()
  let sut: DeleteStoreUseCase.UseCase
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
    sut = new DeleteStoreUseCase.UseCase(repository)
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

  it('should delete a store', async () => {
    const entity = new StoreEntity(StoreDataBuilder({}))
    const newStore = await prismaService.store.create({
      data: entity.toJSON(),
    })
    await sut.execute({ id: entity._id })

    const output = await prismaService.store.findUnique({
      where: {
        id: entity._id,
      },
    })
    expect(output).toBeNull()
    const models = await prismaService.store.findMany()
    expect(models).toHaveLength(0)
  })
})

import { PrismaClient } from '@prisma/client'
import { StorePrismaRepository } from '../../../repositories/store-prisma.repository'
import { Test, TestingModule } from '@nestjs/testing'
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests'
import { DatabaseModule } from '@/shared/infrastructure/database/database.module'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { StoreEntity } from '@/store/domain/entities/store.entity'
import { StoreDataBuilder } from '@/store/domain/helpers/store-data-builder'
import { StoreRepository } from '@/store/domain/repositories/store.repository'
import { ConflictError } from '@/shared/domain/errors/conflict-error'

describe('StorePrismaRepository integration tests', () => {
  const prismaService = new PrismaClient()
  let sut: StorePrismaRepository
  let module: TestingModule

  beforeAll(async () => {
    setupPrismaTests()
    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile()
  })

  beforeEach(async () => {
    sut = new StorePrismaRepository(prismaService as any)
    await prismaService.store.deleteMany()
  })

  it('should throws error when entity not found', async () => {
    await expect(() => sut.findById('FakeId')).rejects.toThrow(
      new NotFoundError('StoreModel not found using ID FakeId'),
    )
  })

  it('should finds a entity by id', async () => {
    const entity = new StoreEntity(StoreDataBuilder({}))
    const newStore = await prismaService.store.create({
      data: entity.toJSON(),
    })

    const output = await sut.findById(newStore.id)
    expect(output.toJSON()).toStrictEqual(entity.toJSON())
  })

  it('should insert a new entity', async () => {
    const entity = new StoreEntity(StoreDataBuilder({}))
    await sut.insert(entity)

    const result = await prismaService.store.findUnique({
      where: {
        id: entity._id,
      },
    })

    expect(result).toStrictEqual(entity.toJSON())
  })

  it('should returns all stores', async () => {
    const entity = new StoreEntity(StoreDataBuilder({}))
    const newStore = await prismaService.store.create({
      data: entity.toJSON(),
    })

    const entities = await sut.findAll()
    expect(entities).toHaveLength(1)
    expect(JSON.stringify(entities)).toBe(JSON.stringify([entity]))
    entities.map(item => expect(item.toJSON()).toStrictEqual(entity.toJSON()))
  })

  it('should throws error on update when a entity not found', async () => {
    const entity = new StoreEntity(StoreDataBuilder({}))
    await expect(() => sut.update(entity)).rejects.toThrow(
      new NotFoundError(`StoreModel not found using ID ${entity._id}`),
    )
  })

  it('should update a entity', async () => {
    const entity = new StoreEntity(StoreDataBuilder({}))
    const newStore = await prismaService.store.create({
      data: entity.toJSON(),
    })
    entity.updateName('new name')
    await sut.update(entity)

    const output = await prismaService.store.findUnique({
      where: {
        id: entity._id,
      },
    })
    expect(output.name).toBe('new name')
  })

  it('should throws error on delete when a entity not found', async () => {
    const entity = new StoreEntity(StoreDataBuilder({}))
    await expect(() => sut.delete(entity._id)).rejects.toThrow(
      new NotFoundError(`StoreModel not found using ID ${entity._id}`),
    )
  })

  it('should delete a entity', async () => {
    const entity = new StoreEntity(StoreDataBuilder({}))
    const newStore = await prismaService.store.create({
      data: entity.toJSON(),
    })
    await sut.delete(entity._id)

    const output = await prismaService.store.findUnique({
      where: {
        id: entity._id,
      },
    })
    expect(output).toBeNull()
  })

  it('should throws error when a entity not found', async () => {
    await expect(() => sut.findByName('aa')).rejects.toThrow(
      new NotFoundError(`StoreModel not found using name aa`),
    )
  })

  it('should finds a entity by email', async () => {
    const entity = new StoreEntity(StoreDataBuilder({ name: 'aa' }))
    const newStore = await prismaService.store.create({
      data: entity.toJSON(),
    })
    const output = await sut.findByName('aa')

    expect(output.toJSON()).toStrictEqual(entity.toJSON())
  })

  it('should throws error when a entity found by email', async () => {
    const entity = new StoreEntity(StoreDataBuilder({ name: 'aa' }))
    const newStore = await prismaService.store.create({
      data: entity.toJSON(),
    })

    await expect(() => sut.urlExists('aa')).rejects.toThrow(
      new ConflictError(`Name already used`),
    )
  })

  it('should not finds a entity by email', async () => {
    expect.assertions(0)
    await sut.urlExists('aa.com')
  })

  describe('search method tests', () => {
    it('should apply only pagination when the other params are null', async () => {
      const createdAt = new Date()
      const entities: StoreEntity[] = []
      const arrange = Array(16).fill(StoreDataBuilder({}))
      arrange.forEach((element, index) => {
        entities.push(
          new StoreEntity({
            ...element,
            url: `test${index}.com`,
            createdAt: new Date(createdAt.getTime() + index),
          }),
        )
      })

      await prismaService.store.createMany({
        data: entities.map(item => item.toJSON()),
      })

      const searchOutput = await sut.search(new StoreRepository.SearchParams())
      const items = searchOutput.items

      expect(searchOutput).toBeInstanceOf(StoreRepository.SearchResult)
      expect(searchOutput.total).toBe(16)
      expect(searchOutput.items.length).toBe(16)
      searchOutput.items.forEach(item => {
        expect(item).toBeInstanceOf(StoreEntity)
      })
      items.reverse().forEach((item, index) => {
        expect(`test${index}.com`).toBe(item.url)
      })
    })

    it('should search using filter, sort and paginate', async () => {
      const createdAt = new Date()
      const entities: StoreEntity[] = []
      const arrange = ['test', 'a', 'TEST', 'b', 'TeSt']
      arrange.forEach((element, index) => {
        entities.push(
          new StoreEntity({
            ...StoreDataBuilder({ name: element }),
            createdAt: new Date(createdAt.getTime() + index),
          }),
        )
      })

      await prismaService.store.createMany({
        data: entities.map(item => item.toJSON()),
      })

      const searchOutputPage1 = await sut.search(
        new StoreRepository.SearchParams({
          page: 1,
          perPage: 2,
          sort: 'name',
          sortDir: 'asc',
          filter: 'TEST',
        }),
      )

      expect(searchOutputPage1.items[0].toJSON()).toMatchObject(
        entities[0].toJSON(),
      )
      expect(searchOutputPage1.items[1].toJSON()).toMatchObject(
        entities[4].toJSON(),
      )

      const searchOutputPage2 = await sut.search(
        new StoreRepository.SearchParams({
          page: 2,
          perPage: 2,
          sort: 'name',
          sortDir: 'asc',
          filter: 'TEST',
        }),
      )

      expect(searchOutputPage2.items[0].toJSON()).toMatchObject(
        entities[2].toJSON(),
      )
    })
  })
})

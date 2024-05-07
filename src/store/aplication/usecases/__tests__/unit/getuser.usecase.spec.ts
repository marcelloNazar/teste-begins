import { StoreInMemoryRepository } from '@/store/infrastructure/database/in-memory/user-in-memnory.repository'
import { GetStoreUseCase } from '../../get-store.usecase'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { StoreEntity } from '@/store/domain/entities/store.entity'
import { StoreDataBuilder } from '@/store/domain/helpers/store-data-builder'

describe('GetStoreUseCase unit tests', () => {
  let sut: GetStoreUseCase.UseCase
  let repository: StoreInMemoryRepository

  beforeEach(() => {
    repository = new StoreInMemoryRepository()
    sut = new GetStoreUseCase.UseCase(repository)
  })

  it('Should throws error when entity not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('Should be able to get user profile', async () => {
    const spyFindById = jest.spyOn(repository, 'findById')
    const items = [new StoreEntity(StoreDataBuilder({}))]
    repository.items = items

    const result = await sut.execute({ id: items[0]._id })
    expect(spyFindById).toHaveBeenCalledTimes(1)
    expect(result).toMatchObject({
      id: items[0].id,
      name: items[0].name,
      url: items[0].url,
      link: items[0].link,
      address: items[0].address,
      createdAt: items[0].createdAt,
    })
  })
})

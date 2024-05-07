import { StoreInMemoryRepository } from '@/store/infrastructure/database/in-memory/user-in-memnory.repository'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { StoreEntity } from '@/store/domain/entities/store.entity'
import { StoreDataBuilder } from '@/store/domain/helpers/store-data-builder'
import { DeleteStoreUseCase } from '../../delete-store.usecase'

describe('DeleteStoreUseCase unit tests', () => {
  let sut: DeleteStoreUseCase.UseCase
  let repository: StoreInMemoryRepository

  beforeEach(() => {
    repository = new StoreInMemoryRepository()
    sut = new DeleteStoreUseCase.UseCase(repository)
  })

  it('Should throws error when entity not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('Should delete a user', async () => {
    const spyDelete = jest.spyOn(repository, 'delete')
    const items = [new StoreEntity(StoreDataBuilder({}))]
    repository.items = items

    expect(repository.items).toHaveLength(1)
    await sut.execute({ id: items[0]._id })
    expect(spyDelete).toHaveBeenCalledTimes(1)
    expect(repository.items).toHaveLength(0)
  })
})

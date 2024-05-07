import { StoreInMemoryRepository } from '@/store/infrastructure/database/in-memory/user-in-memnory.repository'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { StoreEntity } from '@/store/domain/entities/store.entity'
import { StoreDataBuilder } from '@/store/domain/helpers/store-data-builder'
import { UpdateStoreUseCase } from '../../update-store.usecase'
import { BadRequestError } from '@/shared/application/errors/bad-request-error'

describe('UpdateStoreUseCase unit tests', () => {
  let sut: UpdateStoreUseCase.UseCase
  let repository: StoreInMemoryRepository

  beforeEach(() => {
    repository = new StoreInMemoryRepository()
    sut = new UpdateStoreUseCase.UseCase(repository)
  })

  it('Should throws error when entity not found', async () => {
    await expect(() =>
      sut.execute({
        id: 'fakeId',
        name: 'test name',
        url: 'fakeurl.com',
        link: 'fakelink.com',
        address: 'fake address',
      }),
    ).rejects.toThrow(new NotFoundError('Entity not found'))
  })

  it('Should update a user', async () => {
    const spyUpdate = jest.spyOn(repository, 'update')
    const items = [new StoreEntity(StoreDataBuilder({}))]
    repository.items = items

    const result = await sut.execute({
      id: items[0]._id,
      name: 'new name',
      url: 'fakeurl.com',
      link: 'fakelink.com',
      address: 'fake address',
    })
    expect(spyUpdate).toHaveBeenCalledTimes(1)
    expect(result).toMatchObject({
      id: items[0].id,
      name: 'new name',
      url: items[0].url,
      link: items[0].link,
      createdAt: items[0].createdAt,
    })
  })
})

import { StoreInMemoryRepository } from '@/store/infrastructure/database/in-memory/user-in-memnory.repository'
import { AddStoreUseCase } from '../../add-store.usecase'
import { HashProvider } from '@/shared/application/providers/hash-provider'
import { BcryptjsHashProvider } from '@/users/infrastructure/providers/hash-provider/bcryptjs-hash.provider'
import { StoreDataBuilder } from '@/store/domain/helpers/store-data-builder'
import { ConflictError } from '@/shared/domain/errors/conflict-error'
import { BadRequestError } from '@/shared/application/errors/bad-request-error'

describe('StoreInMemoryRepository unit tests', () => {
  let sut: AddStoreUseCase.UseCase
  let repository: StoreInMemoryRepository
  let hashProvider: HashProvider

  beforeEach(() => {
    repository = new StoreInMemoryRepository()
    hashProvider = new BcryptjsHashProvider()
    sut = new AddStoreUseCase.UseCase(repository, hashProvider)
  })

  it('Should create a user', async () => {
    const spyInsert = jest.spyOn(repository, 'insert')
    const props = StoreDataBuilder({})
    const result = await sut.execute({
      name: props.name,
      url: props.url,
      link: props.link,
      address: props.address,
    })
    expect(result.id).toBeDefined()
    expect(result.createdAt).toBeInstanceOf(Date)
    expect(spyInsert).toHaveBeenCalledTimes(1)
  })

  it('Should throws error when name not provided', async () => {
    const props = Object.assign(StoreDataBuilder({}), { name: null })
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })

  it('Should throws error when url not provided', async () => {
    const props = Object.assign(StoreDataBuilder({}), { url: null })
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })

  it('Should throws error when link not provided', async () => {
    const props = Object.assign(StoreDataBuilder({}), { link: null })
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })
  it('Should throws error when address not provided', async () => {
    const props = Object.assign(StoreDataBuilder({}), { address: null })
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })
})

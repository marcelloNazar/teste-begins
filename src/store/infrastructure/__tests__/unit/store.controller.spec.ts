import { StoresController } from '../../store.controller'
import { StoreOutput } from '@/store/aplication/dtos/store-output'
import { AddStoreUseCase } from '@/store/aplication/usecases/add-store.usecase'
import { AddStoreDto } from '../../dto/add-store.dto'
import { UpdateStoreUseCase } from '@/store/aplication/usecases/update-store.usecase'
import { UpdateStoreDto } from '../../dto/update-store.dto'
import { GetStoreUseCase } from '@/store/aplication/usecases/get-store.usecase'
import {
  StoreCollectionPresenter,
  StorePresenter,
} from '../../presenters/user.presenter'
import { ListStoresUseCase } from '@/store/aplication/usecases/list-store.usecase'

describe('StoresController unit tests', () => {
  let sut: StoresController
  let id: string
  let props: StoreOutput

  beforeEach(async () => {
    sut = new StoresController()
    id = 'df96ae94-6128-486e-840c-b6f78abb4801'
    props = {
      id,
      name: 'Jhon Doe',
      url: 'aa.com',
      link: 'aa.com',
      address: 'fake address',
      createdAt: new Date(),
    }
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should create a store', async () => {
    const output: AddStoreUseCase.Output = props
    const mockAddStoreUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['addStoreUseCase'] = mockAddStoreUseCase as any
    const input: AddStoreDto = {
      name: 'Jhon Doe',
      url: 'aa.com',
      link: 'aa.com',
      address: 'fake address',
    }
    const presenter = await sut.create(input)
    expect(presenter).toBeInstanceOf(StorePresenter)
    expect(presenter).toStrictEqual(new StorePresenter(output))
    expect(mockAddStoreUseCase.execute).toHaveBeenCalledWith(input)
  })

  it('should update a store', async () => {
    const output: UpdateStoreUseCase.Output = props
    const mockUpdateStoreUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['updateStoreUseCase'] = mockUpdateStoreUseCase as any
    const input: UpdateStoreDto = {
      name: 'new name',
      url: 'aa.com',
      link: 'aa.com',
      address: 'fake address',
    }
    const presenter = await sut.update(id, input)
    expect(presenter).toBeInstanceOf(StorePresenter)
    expect(presenter).toStrictEqual(new StorePresenter(output))
    expect(mockUpdateStoreUseCase.execute).toHaveBeenCalledWith({
      id,
      ...input,
    })
  })

  it('should delete a store', async () => {
    const output = undefined
    const mockDeleteStoreUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['deleteStoreUseCase'] = mockDeleteStoreUseCase as any
    const result = await sut.remove(id)
    expect(output).toStrictEqual(result)
    expect(mockDeleteStoreUseCase.execute).toHaveBeenCalledWith({
      id,
    })
  })

  it('should gets a store', async () => {
    const output: GetStoreUseCase.Output = props
    const mockGetStoreUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['getStoreUseCase'] = mockGetStoreUseCase as any
    const presenter = await sut.findOne(id)
    expect(presenter).toBeInstanceOf(StorePresenter)
    expect(presenter).toStrictEqual(new StorePresenter(output))
    expect(mockGetStoreUseCase.execute).toHaveBeenCalledWith({
      id,
    })
  })

  it('should list stores', async () => {
    const output: ListStoresUseCase.Output = {
      items: [props],
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
      total: 1,
    }
    const mockListStoresUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['listStoresUseCase'] = mockListStoresUseCase as any
    const searchParams = {
      page: 1,
      perPage: 1,
    }
    const presenter = await sut.search(searchParams)
    expect(presenter).toBeInstanceOf(StoreCollectionPresenter)
    expect(presenter).toEqual(new StoreCollectionPresenter(output))
    expect(mockListStoresUseCase.execute).toHaveBeenCalledWith(searchParams)
  })
})

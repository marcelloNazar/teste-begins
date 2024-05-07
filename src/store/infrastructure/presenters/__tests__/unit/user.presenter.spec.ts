import { instanceToPlain } from 'class-transformer'
import { StoreCollectionPresenter, StorePresenter } from '../../user.presenter'
import { PaginationPresenter } from '@/shared/infrastructure/presenters/pagination.presenter'

describe('StorePresenter unit tests', () => {
  const createdAt = new Date()
  const props = {
    id: 'e71c52a2-9710-4a96-a08e-144af4209b5d',
    name: 'test name',
    url: 'aa.com',
    link: 'aa.com',
    address: 'fake address',
    createdAt,
  }
  let sut: StorePresenter

  beforeEach(() => {
    sut = new StorePresenter(props)
  })

  describe('constructor', () => {
    it('should set values', () => {
      expect(sut.id).toEqual(props.id)
      expect(sut.name).toEqual(props.name)
      expect(sut.url).toEqual(props.url)
      expect(sut.createdAt).toEqual(props.createdAt)
    })
  })

  it('should presenter data', () => {
    const output = instanceToPlain(sut)
    expect(output).toStrictEqual({
      id: 'e71c52a2-9710-4a96-a08e-144af4209b5d',
      name: 'test name',
      url: 'aa.com',
      link: 'aa.com',
      address: 'fake address',
      createdAt: createdAt.toISOString(),
    })
  })
})

describe('StoreCollectionPresenter unit tests', () => {
  const createdAt = new Date()
  const props = {
    id: 'e71c52a2-9710-4a96-a08e-144af4209b5d',
    name: 'test name',
    url: 'aa.com',
    link: 'aa.com',
    address: 'fake address',
    createdAt,
  }

  describe('constructor', () => {
    it('should set values', () => {
      const sut = new StoreCollectionPresenter({
        items: [props],
        currentPage: 1,
        perPage: 2,
        lastPage: 1,
        total: 1,
      })
      expect(sut.meta).toBeInstanceOf(PaginationPresenter)
      expect(sut.meta).toStrictEqual(
        new PaginationPresenter({
          currentPage: 1,
          perPage: 2,
          lastPage: 1,
          total: 1,
        }),
      )
      expect(sut.data).toStrictEqual([new StorePresenter(props)])
    })
  })

  it('should presenter data', () => {
    let sut = new StoreCollectionPresenter({
      items: [props],
      currentPage: 1,
      perPage: 2,
      lastPage: 1,
      total: 1,
    })
    let output = instanceToPlain(sut)
    expect(output).toStrictEqual({
      data: [
        {
          id: 'e71c52a2-9710-4a96-a08e-144af4209b5d',
          name: 'test name',
          url: 'aa.com',
          link: 'aa.com',
          address: 'fake address',
          createdAt: createdAt.toISOString(),
        },
      ],
      meta: {
        currentPage: 1,
        perPage: 2,
        lastPage: 1,
        total: 1,
      },
    })

    sut = new StoreCollectionPresenter({
      items: [props],
      currentPage: '1' as any,
      perPage: '2' as any,
      lastPage: '1' as any,
      total: '1' as any,
    })
    output = instanceToPlain(sut)
    expect(output).toStrictEqual({
      data: [
        {
          id: 'e71c52a2-9710-4a96-a08e-144af4209b5d',
          name: 'test name',
          url: 'aa.com',
          link: 'aa.com',
          address: 'fake address',
          createdAt: createdAt.toISOString(),
        },
      ],
      meta: {
        currentPage: 1,
        perPage: 2,
        lastPage: 1,
        total: 1,
      },
    })
  })
})

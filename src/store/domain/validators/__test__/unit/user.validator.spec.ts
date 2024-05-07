import { StoreEntity, StoreProps } from '@/store/domain/entities/store.entity'
import { StoreDataBuilder } from '@/store/domain/helpers/store-data-builder'

describe('StoreEntity unit tests', () => {
  let props: StoreProps
  let sut: StoreEntity

  beforeEach(() => {
    StoreEntity.validate = jest.fn()
    props = StoreDataBuilder({})
    sut = new StoreEntity(props)
  })

  it('Constructor method', () => {
    expect(StoreEntity.validate).toHaveBeenCalled()
    expect(sut.props.name).toEqual(props.name)
    expect(sut.props.url).toEqual(props.url)
    expect(sut.props.link).toEqual(props.link)
    expect(sut.props.address).toEqual(props.address)
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  it('Getter of name field', () => {
    expect(sut.props.name).toBeDefined()
    expect(sut.props.name).toEqual(props.name)
    expect(typeof sut.props.name).toBe('string')
  })

  it('Setter of name field', () => {
    sut['name'] = 'other name'
    expect(sut.props.name).toEqual('other name')
    expect(typeof sut.props.name).toBe('string')
  })

  it('Getter of url field', () => {
    expect(sut.props.url).toBeDefined()
    expect(sut.props.url).toEqual(props.url)
    expect(typeof sut.props.url).toBe('string')
  })

  it('Setter of url field', () => {
    sut['url'] = 'other url'
    expect(sut.props.url).toEqual('other url')
    expect(typeof sut.props.url).toBe('string')
  })

  it('Getter of link field', () => {
    expect(sut.props.link).toBeDefined()
    expect(sut.props.link).toEqual(props.link)
    expect(typeof sut.props.link).toBe('string')
  })

  it('Setter of link field', () => {
    sut['link'] = 'other link'
    expect(sut.props.link).toEqual('other link')
    expect(typeof sut.props.link).toBe('string')
  })

  it('Getter of createdAt field', () => {
    expect(sut.props.createdAt).toBeDefined()
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  it('Should update the name field', () => {
    expect(StoreEntity.validate).toHaveBeenCalled()
    sut.updateName('other name')
    expect(sut.props.name).toEqual('other name')
  })

  it('Should update the link field', () => {
    expect(StoreEntity.validate).toHaveBeenCalled()
    sut.updateLink('other.com')
    expect(sut.props.link).toEqual('other.com')
  })

  it('Should update the address field', () => {
    expect(StoreEntity.validate).toHaveBeenCalled()
    sut.updateAddress('other address')
    expect(sut.props.address).toEqual('other address')
  })
})

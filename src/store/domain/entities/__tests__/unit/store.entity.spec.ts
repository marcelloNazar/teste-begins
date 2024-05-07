import { StoreEntity, StoreProps } from '../../store.entity'
import { StoreDataBuilder } from '../../../helpers/store-data-builder'

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
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  it('Getter of name field', () => {
    expect(sut.name).toBeDefined()
    expect(sut.name).toEqual(props.name)
    expect(typeof sut.name).toBe('string')
  })

  it('Setter of name field', () => {
    sut['name'] = 'other name'
    expect(sut.props.name).toEqual('other name')
    expect(typeof sut.props.name).toBe('string')
  })

  it('Getter of url field', () => {
    expect(sut.url).toBeDefined()
    expect(sut.url).toEqual(props.url)
    expect(typeof sut.url).toBe('string')
  })

  it('Getter of link field', () => {
    expect(sut.link).toBeDefined()
    expect(sut.link).toEqual(props.link)
    expect(typeof sut.link).toBe('string')
  })

  it('Setter of link field', () => {
    sut['link'] = 'other link'
    expect(sut.props.link).toEqual('other link')
    expect(typeof sut.props.link).toBe('string')
  })

  it('Getter of createdAt field', () => {
    expect(sut.createdAt).toBeDefined()
    expect(sut.createdAt).toBeInstanceOf(Date)
  })

  it('Should update a user', () => {
    expect(StoreEntity.validate).toHaveBeenCalled()
    sut.updateName('other name')
    expect(sut.props.name).toEqual('other name')
  })
})

import { StoreEntity } from '@/store/domain/entities/store.entity'
import { StoreDataBuilder } from '@/store/domain/helpers/store-data-builder'
import { StoreOutputMapper } from '../../store-output'

describe('StoreOutputMapper unit tests', () => {
  it('should convert a user in output', () => {
    const entity = new StoreEntity(StoreDataBuilder({}))
    const spyToJson = jest.spyOn(entity, 'toJSON')
    const sut = StoreOutputMapper.toOutput(entity)

    expect(spyToJson).toHaveBeenCalled()
    expect(sut).toStrictEqual(entity.toJSON())
  })
})

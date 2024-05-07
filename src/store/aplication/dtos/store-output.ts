import { StoreEntity } from '@/store/domain/entities/store.entity'

export type StoreOutput = {
  id: string
  name: string
  url: string
  link: string
  address: string
  createdAt: Date
}

export class StoreOutputMapper {
  static toOutput(entity: StoreEntity): StoreOutput {
    return entity.toJSON()
  }
}

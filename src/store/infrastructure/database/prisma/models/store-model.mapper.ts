import { ValidationError } from '@/shared/domain/errors/validation-error'
import { StoreEntity } from '@/store/domain/entities/store.entity'
import { Store } from '@prisma/client'

export class StoreModelMapper {
  static toEntity(model: Store) {
    const data = {
      name: model.name,
      url: model.url,
      link: model.link,
      address: model.address,
      createdAt: model.createdAt,
    }

    try {
      return new StoreEntity(data, model.id)
    } catch {
      throw new ValidationError('An entity not be loaded')
    }
  }
}

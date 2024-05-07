import { StoreRepository } from '@/store/domain/repositories/store.repository'
import { StoreOutput, StoreOutputMapper } from '../dtos/store-output'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { BadRequestError } from '@/shared/application/errors/bad-request-error'

export namespace UpdateStoreUseCase {
  export type Input = {
    id: string
    name: string
    url: string
    link: string
    address: string
  }

  export type Output = StoreOutput

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private storeRepository: StoreRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.name) {
        throw new BadRequestError('Name not provided')
      }
      const entity = await this.storeRepository.findById(input.id)
      entity.updateName(input.name)
      entity.updateUrl(input.url)
      entity.updateLink(input.link)
      entity.updateAddress(input.address)
      await this.storeRepository.update(entity)
      return StoreOutputMapper.toOutput(entity)
    }
  }
}

import { StoreRepository } from '@/store/domain/repositories/store.repository'
import { BadRequestError } from '../../../shared/application/errors/bad-request-error'
import { StoreEntity } from '@/store/domain/entities/store.entity'
import { HashProvider } from '@/shared/application/providers/hash-provider'
import { StoreOutput, StoreOutputMapper } from '../dtos/store-output'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'

export namespace AddStoreUseCase {
  export type Input = {
    name: string
    url: string
    link: string
    address: string
  }

  export type Output = StoreOutput

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private storeRepository: StoreRepository.Repository,
      private hashProvider: HashProvider,
    ) {}

    async execute(input: Input): Promise<Output> {
      const { name, url, link, address } = input

      if (!url || !name || !link || !address) {
        throw new BadRequestError('Input data not provided')
      }

      await this.storeRepository.urlExists(name)

      const entity = new StoreEntity(Object.assign(input))

      await this.storeRepository.insert(entity)
      return StoreOutputMapper.toOutput(entity)
    }
  }
}

import { StoreRepository } from '@/store/domain/repositories/store.repository'
import { StoreOutput, StoreOutputMapper } from '../dtos/store-output'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'

export namespace GetStoreUseCase {
  export type Input = {
    id: string
  }

  export type Output = StoreOutput

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private storeRepository: StoreRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.storeRepository.findById(input.id)
      return StoreOutputMapper.toOutput(entity)
    }
  }
}

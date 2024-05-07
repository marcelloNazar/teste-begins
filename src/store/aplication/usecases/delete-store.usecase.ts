import { StoreRepository } from '@/store/domain/repositories/store.repository'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'

export namespace DeleteStoreUseCase {
  export type Input = {
    id: string
  }

  export type Output = void

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private storeRepository: StoreRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      await this.storeRepository.delete(input.id)
    }
  }
}

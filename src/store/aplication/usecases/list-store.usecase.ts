import { StoreRepository } from '@/store/domain/repositories/store.repository'
import { StoreOutput, StoreOutputMapper } from '../dtos/store-output'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { SearchInput } from '@/shared/application/dtos/search-input'
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '@/shared/application/dtos/pagination-output'

export namespace ListStoresUseCase {
  export type Input = SearchInput

  export type Output = PaginationOutput<StoreOutput>

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: StoreRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new StoreRepository.SearchParams(input)
      const searchResult = await this.userRepository.search(params)
      return this.toOutput(searchResult)
    }

    private toOutput(searchResult: StoreRepository.SearchResult): Output {
      const items = searchResult.items.map(item => {
        return StoreOutputMapper.toOutput(item)
      })
      return PaginationOutputMapper.toOutput(items, searchResult)
    }
  }
}

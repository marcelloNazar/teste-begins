import { StoreEntity } from '../entities/store.entity'

import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  SearchableRepositoryInterface,
} from '@/shared/domain/repositories/searchable-repository-contracts'

export namespace StoreRepository {
  export type Filter = string

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<StoreEntity, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      StoreEntity,
      Filter,
      SearchParams,
      SearchResult
    > {
    findByName(name: string): Promise<StoreEntity>
    nameExists(name: string): Promise<void>
  }
}

import { StoreRepository } from '@/store/domain/repositories/store.repository'
import { StoreEntity } from '@/store/domain/entities/store.entity'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { ConflictError } from '@/shared/domain/errors/conflict-error'
import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable.repository'
import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts'

export class StoreInMemoryRepository
  extends InMemorySearchableRepository<StoreEntity>
  implements StoreRepository.Repository
{
  sortableFields: string[] = ['name', 'createdAt']

  async findByName(name: string): Promise<StoreEntity> {
    const entity = this.items.find(item => item.name === name)
    if (!entity) {
      throw new NotFoundError(`Entity not found using name ${name}`)
    }
    return entity
  }

  async urlExists(url: string): Promise<void> {
    const entity = this.items.find(item => item.url === url)
    if (entity) {
      throw new ConflictError('Url address already used')
    }
  }

  protected async applyFilter(
    items: StoreEntity[],
    filter: StoreRepository.Filter,
  ): Promise<StoreEntity[]> {
    if (!filter) {
      return items
    }
    return items.filter(item => {
      return item.props.name.toLowerCase().includes(filter.toLowerCase())
    })
  }

  protected async applySort(
    items: StoreEntity[],
    sort: string | null,
    sortDir: SortDirection | null,
  ): Promise<StoreEntity[]> {
    return !sort
      ? super.applySort(items, 'createdAt', 'desc')
      : super.applySort(items, sort, sortDir)
  }
}

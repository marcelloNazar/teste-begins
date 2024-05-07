import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { StoreEntity } from '@/store/domain/entities/store.entity'
import { StoreRepository } from '@/store/domain/repositories/store.repository'
import { StoreModelMapper } from '../models/store-model.mapper'
import { ConflictError } from '@/shared/domain/errors/conflict-error'

export class StorePrismaRepository implements StoreRepository.Repository {
  sortableFields: string[] = ['name', 'createdAt']

  constructor(private prismaService: PrismaService) {}

  async findByName(name: string): Promise<StoreEntity> {
    try {
      const store = await this.prismaService.store.findFirst({
        where: { name },
      })
      return StoreModelMapper.toEntity(store)
    } catch {
      throw new NotFoundError(`StoreModel not found using name ${name}`)
    }
  }

  async nameExists(name: string): Promise<void> {
    const store = await this.prismaService.store.findFirst({
      where: { name },
    })
    if (store) {
      throw new ConflictError(`Email address already used`)
    }
  }

  async search(
    props: StoreRepository.SearchParams,
  ): Promise<StoreRepository.SearchResult> {
    const sortable = this.sortableFields?.includes(props.sort) || false
    const orderByField = sortable ? props.sort : 'createdAt'
    const orderByDir = sortable ? props.sortDir : 'desc'

    const count = await this.prismaService.store.count({
      ...(props.filter && {
        where: {
          name: {
            contains: props.filter,
            mode: 'insensitive',
          },
        },
      }),
    })

    const models = await this.prismaService.store.findMany({
      ...(props.filter && {
        where: {
          name: {
            contains: props.filter,
            mode: 'insensitive',
          },
        },
      }),
      orderBy: {
        [orderByField]: orderByDir,
      },
      skip: props.page && props.page > 0 ? (props.page - 1) * props.perPage : 1,
      take: props.perPage && props.perPage > 0 ? props.perPage : 20,
    })

    return new StoreRepository.SearchResult({
      items: models.map(model => StoreModelMapper.toEntity(model)),
      total: count,
      currentPage: props.page,
      perPage: props.perPage,
      sort: orderByField,
      sortDir: orderByDir,
      filter: props.filter,
    })
  }

  async insert(entity: StoreEntity): Promise<void> {
    await this.prismaService.store.create({
      data: entity.toJSON(),
    })
  }

  findById(id: string): Promise<StoreEntity> {
    return this._get(id)
  }

  async findAll(): Promise<StoreEntity[]> {
    const models = await this.prismaService.store.findMany()
    return models.map(model => StoreModelMapper.toEntity(model))
  }

  async update(entity: StoreEntity): Promise<void> {
    await this._get(entity._id)
    await this.prismaService.store.update({
      data: entity.toJSON(),
      where: {
        id: entity._id,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await this._get(id)
    await this.prismaService.store.delete({
      where: { id },
    })
  }

  protected async _get(id: string): Promise<StoreEntity> {
    try {
      const store = await this.prismaService.store.findUnique({
        where: { id },
      })
      return StoreModelMapper.toEntity(store)
    } catch {
      throw new NotFoundError(`StoreModel not found using ID ${id}`)
    }
  }
}

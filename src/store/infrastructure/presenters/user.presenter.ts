import { StoreOutput } from '@/store/aplication/dtos/store-output'
import { Transform } from 'class-transformer'
import { CollectionPresenter } from '@/shared/infrastructure/presenters/collection.presenter'
import { ListStoresUseCase } from '@/store/aplication/usecases/list-store.usecase'
import { ApiProperty } from '@nestjs/swagger'

export class StorePresenter {
  @ApiProperty({ description: 'Store identification' })
  id: string

  @ApiProperty({ description: 'Store name' })
  name: string

  @ApiProperty({ description: 'Store url' })
  url: string

  @ApiProperty({ description: 'Store link' })
  link: string

  @ApiProperty({ description: 'Store address' })
  address: string

  @ApiProperty({ description: 'Store creation date' })
  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: Date

  constructor(output: StoreOutput) {
    this.id = output.id
    this.name = output.name
    this.url = output.url
    this.link = output.link
    this.address = output.address
    this.createdAt = output.createdAt
  }
}

export class StoreCollectionPresenter extends CollectionPresenter {
  data: StorePresenter[]

  constructor(output: ListStoresUseCase.Output) {
    const { items, ...paginationProps } = output
    super(paginationProps)
    this.data = items.map(item => new StorePresenter(item))
  }
}

import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts'
import { ListStoresUseCase } from '@/store/aplication/usecases/list-store.usecase'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class ListStoresDto implements ListStoresUseCase.Input {
  @ApiPropertyOptional({ description: 'Page that will be returned' })
  @IsOptional()
  page?: number

  @ApiPropertyOptional({ description: 'Number of records per page' })
  @IsOptional()
  perPage?: number

  @ApiPropertyOptional({
    description: 'Column defined to order the data: "name" or "createdAt"',
  })
  @IsOptional()
  sort?: string

  @ApiPropertyOptional({
    description: 'Data ordering: ascending or descending',
  })
  @IsOptional()
  sortDir?: SortDirection

  @ApiPropertyOptional({ description: 'Data entered to filter the result' })
  @IsOptional()
  filter?: string
}

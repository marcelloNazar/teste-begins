import { AddStoreUseCase } from '@/store/aplication/usecases/add-store.usecase'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class AddStoreDto implements AddStoreUseCase.Input {
  @ApiProperty({ description: 'Store name' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: 'Store url' })
  @IsString()
  @IsNotEmpty()
  url: string

  @ApiProperty({ description: 'Store link' })
  @IsString()
  @IsNotEmpty()
  link: string

  @ApiProperty({ description: 'Store address' })
  @IsString()
  @IsNotEmpty()
  address: string
}

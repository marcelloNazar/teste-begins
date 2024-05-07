import { UpdateStoreUseCase } from '@/store/aplication/usecases/update-store.usecase'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateStoreDto implements Omit<UpdateStoreUseCase.Input, 'id'> {
  @ApiProperty({ description: 'User Name' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: 'User Name' })
  @IsString()
  @IsNotEmpty()
  url: string

  @ApiProperty({ description: 'User Name' })
  @IsString()
  @IsNotEmpty()
  link: string

  @ApiProperty({ description: 'User Name' })
  @IsString()
  @IsNotEmpty()
  address: string
}

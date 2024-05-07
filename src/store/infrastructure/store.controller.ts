import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  HttpCode,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common'
import { AddStoreDto } from './dto/add-store.dto'
import { UpdateStoreDto } from './dto/update-store.dto'
import { AddStoreUseCase } from '../aplication/usecases/add-store.usecase'
import { UpdateStoreUseCase } from '../aplication/usecases/update-store.usecase'
import { DeleteStoreUseCase } from '../aplication/usecases/delete-store.usecase'
import { GetStoreUseCase } from '../aplication/usecases/get-store.usecase'
import { ListStoresUseCase } from '../aplication/usecases/list-store.usecase'
import { ListStoresDto } from './dto/list-stores.dto'
import { StoreOutput } from '../aplication/dtos/store-output'
import {
  StoreCollectionPresenter,
  StorePresenter,
} from './presenters/user.presenter'
import { AuthService } from '@/auth/infrastucture/auth.service'
import { AuthGuard } from '@/auth/infrastucture/auth.guard'
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger'

@ApiTags('stores')
@Controller('stores')
export class StoresController {
  @Inject(AddStoreUseCase.UseCase)
  private addStoreUseCase: AddStoreUseCase.UseCase

  @Inject(UpdateStoreUseCase.UseCase)
  private updateStoreUseCase: UpdateStoreUseCase.UseCase

  @Inject(DeleteStoreUseCase.UseCase)
  private deleteStoreUseCase: DeleteStoreUseCase.UseCase

  @Inject(GetStoreUseCase.UseCase)
  private getStoreUseCase: GetStoreUseCase.UseCase

  @Inject(ListStoresUseCase.UseCase)
  private listStoresUseCase: ListStoresUseCase.UseCase

  @Inject(AuthService)
  private authService: AuthService

  static storeToResponse(output: StoreOutput) {
    return new StorePresenter(output)
  }

  static listStoresToResponse(output: ListStoresUseCase.Output) {
    return new StoreCollectionPresenter(output)
  }

  @ApiResponse({
    status: 422,
    description: 'Corpo da requisição com dados inválidos',
  })
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() addStoreDto: AddStoreDto) {
    const output = await this.addStoreUseCase.execute(addStoreDto)
    return StoresController.storeToResponse(output)
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        meta: {
          type: 'object',
          properties: {
            total: {
              type: 'number',
            },
            currentPage: {
              type: 'number',
            },
            lastPage: {
              type: 'number',
            },
            perPage: {
              type: 'number',
            },
          },
        },
        data: {
          type: 'array',
          items: { $ref: getSchemaPath(StorePresenter) },
        },
      },
    },
  })
  @ApiResponse({
    status: 422,
    description: 'Parâmetros de consulta inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso não autorizado',
  })
  @UseGuards(AuthGuard)
  @Get()
  async search(@Query() searchParams: ListStoresDto) {
    const output = await this.listStoresUseCase.execute(searchParams)
    return StoresController.listStoresToResponse(output)
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 404,
    description: 'Id não encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso não autorizado',
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const output = await this.getStoreUseCase.execute({ id })
    return StoresController.storeToResponse(output)
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 422,
    description: 'Corpo da requisição com dados inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Id não encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso não autorizado',
  })
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStoreDto: UpdateStoreDto,
  ) {
    const output = await this.updateStoreUseCase.execute({
      id,
      ...updateStoreDto,
    })
    return StoresController.storeToResponse(output)
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 204,
    description: 'Resposta de confirmação da exclusão',
  })
  @ApiResponse({
    status: 404,
    description: 'Id não encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso não autorizado',
  })
  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteStoreUseCase.execute({ id })
  }
}

import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields'
import { StoreProps } from '../entities/store.entity'
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'

export class StoreRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  url: string

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  link: string

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  address: string

  @IsDate()
  @IsOptional()
  createdAt?: Date

  constructor({ url, name, link, address, createdAt }: StoreProps) {
    Object.assign(this, { url, name, link, address, createdAt })
  }
}

export class StoreValidator extends ClassValidatorFields<StoreRules> {
  validate(data: StoreRules): boolean {
    return super.validate(new StoreRules(data ?? ({} as StoreProps)))
  }
}

export class StoreValidatorFactory {
  static create(): StoreValidator {
    return new StoreValidator()
  }
}

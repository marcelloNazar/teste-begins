import { Entity } from '@/shared/domain/entities/entity'
import { StoreValidatorFactory } from '../validators/store.validator'
import { EntityValidationError } from '@/shared/domain/errors/validation-error'

export type StoreProps = {
  name: string
  url: string
  link: string
  address: string
  createdAt?: Date
}

export class StoreEntity extends Entity<StoreProps> {
  constructor(
    public readonly props: StoreProps,
    id?: string,
  ) {
    StoreEntity.validate(props)
    super(props, id)
    this.props.createdAt = this.props.createdAt ?? new Date()
  }

  updateName(value: string): void {
    StoreEntity.validate({
      ...this.props,
      name: value,
    })
    this.name = value
  }

  updateUrl(value: string): void {
    StoreEntity.validate({
      ...this.props,
      url: value,
    })
    this.url = value
  }

  updateLink(value: string): void {
    StoreEntity.validate({
      ...this.props,
      link: value,
    })
    this.link = value
  }

  updateAddress(value: string): void {
    StoreEntity.validate({
      ...this.props,
      address: value,
    })
    this.address = value
  }

  get name() {
    return this.props.name
  }

  private set name(value: string) {
    this.props.name = value
  }

  get url() {
    return this.props.url
  }

  private set url(value: string) {
    this.props.url = value
  }

  get link() {
    return this.props.link
  }

  private set link(value: string) {
    this.props.link = value
  }

  get address() {
    return this.props.address
  }

  private set address(value: string) {
    this.props.address = value
  }

  get createdAt() {
    return this.props.createdAt
  }

  static validate(props: StoreProps) {
    const validator = StoreValidatorFactory.create()
    const isValid = validator.validate(props)
    if (!isValid) {
      throw new EntityValidationError(validator.errors)
    }
  }
}

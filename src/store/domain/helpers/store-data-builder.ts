import { faker } from '@faker-js/faker'
import { StoreProps } from '../entities/store.entity'

type Props = {
  name?: string
  url?: string
  link?: string
  address?: string
  createdAt?: Date
}

export function StoreDataBuilder(props: Props): StoreProps {
  return {
    name: props.name ?? faker.person.fullName(),
    url: props.url ?? faker.internet.url(),
    link: props.link ?? faker.internet.url(),
    address: props.address ?? faker.string.alphanumeric(),
    createdAt: props.createdAt ?? new Date(),
  }
}

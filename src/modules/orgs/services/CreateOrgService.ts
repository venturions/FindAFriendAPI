import { OrgRepository } from '../repositories/OrgRepository'
import { OrganizationAlreadyExistsError } from '../errors/OrganizationAlreadyExistsError'
import bcrypt from 'bcryptjs'

interface CreateOrgRequest {
  name: string
  email: string
  password: string
  address: string
  whatsapp: string
  cep: string
}

export class CreateOrgService {
  constructor(private orgRepository: OrgRepository) {}

  async execute(data: CreateOrgRequest): Promise<void> {
    const orgExists = await this.orgRepository.findByEmail(data.email)

    if (orgExists) {
      throw new OrganizationAlreadyExistsError()
    }

    const passwordHash = await bcrypt.hash(data.password, 6)

    await this.orgRepository.create({
      name: data.name,
      email: data.email,
      address: data.address,
      whatsapp: data.whatsapp,
      cep: data.cep,
      password_hash: passwordHash,
    })
  }
}

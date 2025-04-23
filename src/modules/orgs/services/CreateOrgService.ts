import { Prisma } from 'generated/prisma'
import { OrgRepository } from '../repositories/OrgRepository'
import { OrganizationAlreadyExistsError } from '../errors/OrganizationAlreadyExistsError'

export class CreateOrgService {
  constructor(private orgRepository: OrgRepository) {}

  async execute(data: Prisma.OrgCreateInput): Promise<void> {
    const orgExists = await this.orgRepository.findByEmail(data.email)

    if (orgExists) {
      throw new OrganizationAlreadyExistsError()
    }

    await this.orgRepository.create(data)
  }
}

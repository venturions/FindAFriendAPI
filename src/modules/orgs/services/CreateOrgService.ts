import { Prisma } from 'generated/prisma'
import { OrgRepository } from '../repositories/OrgRepository'

export class CreateOrgService {
  constructor(private orgRepository: OrgRepository) {}

  async execute(data: Prisma.OrgCreateInput): Promise<void> {
    const orgExists = await this.orgRepository.findByEmail(data.email)

    if (orgExists) {
      throw new Error('Organization already exists')
    }

    await this.orgRepository.create(data)
  }
}

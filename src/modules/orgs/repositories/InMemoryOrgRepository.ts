import { Org, Prisma } from 'generated/prisma'
import { OrgRepository } from './OrgRepository'

export class InMemoryOrgRepository implements OrgRepository {
  private orgs: Org[] = []

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = {
      ...data,
      id: 'generated-id',
      createdAt: new Date(),
    }

    this.orgs.push(org)

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.orgs.find((org) => org.email === email) || null

    if (!org) {
      return null
    }

    return org
  }
}

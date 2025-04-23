import { Org, Prisma } from 'generated/prisma'
import { OrgRepository } from './OrgRepository'

export class InMemoryOrgRepository implements OrgRepository {
  private orgs: Org[] = []

  async create(data: Prisma.OrgCreateInput): Promise<void> {
    this.orgs.push({ ...data, id: 'generated-id', createdAt: new Date() })
  }

  async findByEmail(email: string): Promise<Org | null> {
    return this.orgs.find((org) => org.email === email) || null
  }
}

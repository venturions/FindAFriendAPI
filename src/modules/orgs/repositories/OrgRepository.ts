import { Org, Prisma } from 'generated/prisma'

export interface OrgRepository {
  create(data: Prisma.OrgCreateInput): Promise<void>
  findByEmail(email: string): Promise<Org | null>
}

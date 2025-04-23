import { prisma } from '@/lib/prisma'
import { Prisma, Org } from 'generated/prisma'

export interface OrgRepository {
  create(data: Prisma.OrgCreateInput): Promise<void>
  findByEmail(email: string): Promise<Org | null>
}

export class PrismaOrgRepository implements OrgRepository {
  async create(data: Prisma.OrgCreateInput): Promise<void> {
    await prisma.org.create({
      data,
    })
  }

  async findByEmail(email: string): Promise<Org | null> {
    return prisma.org.findUnique({
      where: { email },
    })
  }
}

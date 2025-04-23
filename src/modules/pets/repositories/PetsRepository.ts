import { Prisma, Pet } from 'generated/prisma'

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}

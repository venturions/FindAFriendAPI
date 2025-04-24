import { Prisma, Pet } from 'generated/prisma'

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findByCity(city: string): Promise<Pet[]>
}

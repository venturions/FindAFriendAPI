import { prisma } from '@/lib/prisma'
import { Prisma, Pet } from 'generated/prisma'
import { PetRepository } from '../PetsRepository'

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}

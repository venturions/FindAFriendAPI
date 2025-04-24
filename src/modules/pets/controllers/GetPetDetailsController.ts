import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetPetDetailsService } from '../factories/makeGetPetDetailsService'
import { PetNotFoundError } from '../errors/PetNotFoundError'

export async function getPetDetails(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getPetDetailsParamsSchema = z.object({
    id: z.string().uuid('Invalid pet ID format'),
  })

  try {
    const { id } = getPetDetailsParamsSchema.parse(request.params)

    const getPetDetailsService = makeGetPetDetailsService()

    const { pet } = await getPetDetailsService.execute({ id })

    return reply.status(200).send(pet)
  } catch (error) {
    if (error instanceof PetNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    return reply.status(500).send({ message: 'Internal server error' })
  }
}

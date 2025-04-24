import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeListPetsByCityService } from '../factories/makeListPetsByCityService'
import { CityNotProvidedError } from '../errors/CityNotProvidedErrors'

export async function listPetsByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const listPetsByCityQuerySchema = z.object({
    city: z.string().min(1, 'City is required'),
    age: z.string().optional(),
    energyLevel: z.string().optional(),
    size: z.string().optional(),
    independenceLevel: z.string().optional(),
  })

  try {
    const filters = listPetsByCityQuerySchema.parse(request.query)

    const listPetsByCityService = makeListPetsByCityService()

    const pets = await listPetsByCityService.execute(filters)

    return reply.status(200).send(pets)
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new CityNotProvidedError()
    }

    return reply.status(500).send({ message: 'Internal server error' })
  }
}

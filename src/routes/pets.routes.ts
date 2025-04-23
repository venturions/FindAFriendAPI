import verifyJWT from '@/middlewares/verifyJwt'
import { createPet } from '@/modules/pets/controllers/CreatePetController'
import { FastifyInstance } from 'fastify'

export async function petRoutes(app: FastifyInstance) {
  app.post('/pets', { preHandler: [verifyJWT] }, createPet)
}

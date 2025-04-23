import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CreateOrgService } from '../services/CreateOrgService'

export class CreateOrgController {
  constructor(private createOrgService: CreateOrgService) {}

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    // Definindo o esquema de validação com zod
    const createOrgSchema = z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Invalid email format'),
      password: z
        .string()
        .min(6, 'Password must be at least 6 characters long'),
      address: z.string().min(1, 'Address is required'),
      whatsapp: z.string().min(10, 'WhatsApp must have at least 10 characters'),
      cep: z.string().regex(/^\d{5}-\d{3}$/, 'Invalid CEP format'),
    })

    try {
      // Validando os dados do body
      const data = createOrgSchema.parse(request.body)

      // Executando o serviço
      await this.createOrgService.execute(data)

      reply.status(201).send()
    } catch (error) {
      // Retornando erro de validação
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          message: 'Validation error',
          issues: error.errors,
        })
      }

      // Outros erros
      throw error
    }
  }
}

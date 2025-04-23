import { OrgRepository } from '@/modules/orgs/repositories/OrgRepository'
import bcrypt from 'bcryptjs'
import { Org } from 'generated/prisma'

interface AuthenticateOrgRequest {
  email: string
  password: string
}

interface AuthenticateOrgResponse {
  org: Org
}

export class AuthenticateOrgService {
  constructor(private orgRepository: OrgRepository) {}

  async execute(
    data: AuthenticateOrgRequest,
  ): Promise<AuthenticateOrgResponse> {
    const org = await this.orgRepository.findByEmail(data.email)

    if (!org) {
      throw new Error('Invalid email or password')
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      org.password_hash,
    )

    if (!isPasswordValid) {
      throw new Error('Invalid email or password')
    }

    return { org }
  }
}

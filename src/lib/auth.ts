import { prisma } from '$lib/server/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { SvelteKitAuth } from '@auth/sveltekit'

export const { handle, signIn, signOut } = SvelteKitAuth({
  adapter: PrismaAdapter(prisma),
  providers: [],
})

import type { PageServerLoad } from './$types'
import { prisma } from '$lib/server/prisma'

export const load: PageServerLoad = async (event) => {
  const session = await event.locals.auth()

  if (!session) {
    return {
      status: 401,
      error: 'Unauthorized',
    }
  }

  const entries = await prisma.entry.findMany({
    where: {
      userId: session.user?.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return {
    entries,
  }
}

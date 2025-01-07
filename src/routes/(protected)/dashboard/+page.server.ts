import type { PageServerLoad } from './$types'
import { hasWrittenToday } from '$lib/server/entries'
import { prisma } from '$lib/server/prisma'
import { redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async (event) => {
  const session = await event.locals.auth()
  const params = event.url.searchParams

  const writtenTodayCheck = await hasWrittenToday(session?.user?.id)

  const lastEntries = await prisma.entry.findMany({
    where: { userId: session?.user?.id },
    orderBy: { createdAt: 'desc' },
    take: 2,
  })

  if (!writtenTodayCheck && params.get('later') !== 'true') {
    return redirect(307, '/new-entry')
  }

  return {
    lastEntries,
  }
}

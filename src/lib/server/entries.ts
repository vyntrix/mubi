import { prisma } from './prisma'

export async function hasWrittenToday(userId: string | undefined) {
  try {
    if (!userId) {
      return false
    }

    const todaysEntry = await prisma.entry.findFirst({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
        userId,
      },
      select: {
        id: true,
      },
    })

    if (todaysEntry) {
      return true
    }

    return false
  }
  catch (error) {
    console.error(error)
    return false
  }

  return true
}

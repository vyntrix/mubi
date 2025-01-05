import type { PageServerLoad } from './$types'
import { entrySchema } from '$lib/schemas/entry'
import { hasWrittenToday } from '$lib/server/entries'
import { prisma } from '$lib/server/prisma'
import { fail, redirect } from '@sveltejs/kit'
import { zod } from 'sveltekit-superforms/adapters'
import { message, superValidate } from 'sveltekit-superforms/server'

export const load: PageServerLoad = async (event) => {
  const session = await event.locals.auth()

  const writtenTodayCheck = await hasWrittenToday(session?.user?.id)

  if (writtenTodayCheck) {
    return redirect(307, '/dashboard')
  }

  const form = await superValidate(zod(entrySchema))

  return {
    form,
    session,
  }
}

export const actions = {
  default: async ({ request, locals }) => {
    const form = await superValidate(request, zod(entrySchema))

    if (!form.valid)
      return fail(400, { form })

    const session = await locals.auth()

    if (!session?.user?.id) {
      return fail(401, { form })
    }

    try {
      await prisma.entry.create({
        data: {
          body: form.data.body,
          mood: form.data.mood,
          userId: session.user.id,
        },
      })

      message(form, 'Entry created successfully')
    }
    catch (error) {
      console.error(error)
      return fail(500, { error, form })
    }

    return redirect(302, '/dashboard')
  },
}

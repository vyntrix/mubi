import { env } from '$env/dynamic/private'
import { prisma } from '$lib/server/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { SvelteKitAuth } from '@auth/sveltekit'
import Discord from '@auth/sveltekit/providers/discord'
import Google from '@auth/sveltekit/providers/google'
import Nodemailer from '@auth/sveltekit/providers/nodemailer'
import { createTransport } from 'nodemailer'

export const { handle, signIn, signOut } = SvelteKitAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
    newUser: '/register',
    signOut: '/settings',
    verifyRequest: '/verify',
  },
  providers: [
    Nodemailer({
      server: {
        host: env.SMTP_HOST,
        // TODO: fix this any type
        port: env.SMTP_PORT as any,
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASSWORD,
        },
      },
      from: env.EMAIL_FROM,
      async sendVerificationRequest(params) {
        const { identifier, url, provider, theme } = params
        const { host } = new URL(url)

        const transport = createTransport(provider.server)
        const result = await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: `Sign in to ${host}`,
          text: text({ url, host }),
        })
        const failed = result.rejected.concat(result.pending).filter(Boolean)
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`)
        }
      },
    }),
    Discord({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
})

function text({ url, host }: { url: string, host: string }) {
  return `Sign in to ${host}\n${url}\n\n`
}

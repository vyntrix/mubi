<script lang="ts">
  import { signIn } from "@auth/sveltekit/client";

  let email = $state('')
  let loading = $state(false)

  async function send_email(event: SubmitEvent) {
    event.preventDefault()
    loading = true
    await signIn('nodemailer', { email, redirect: true })
    loading = false
  }
</script>

<div class="max-w-xs mx-auto w-full vpack gap-4">
    <form class="w-full vbox gap-4" onsubmit={(e) => send_email(e)}>
        <input required bind:value={email} name="email" aria-label="Email input" type="email" placeholder="Email" class="input w-full" />
        <button aria-label="Send magic link" class="btn">
            {#if loading}
                <div class="i-mingcute-loading-fill animate-spin text-xl"></div>
            {:else}
                Send magic link
            {/if}
        </button>
    </form>
    <div class="hbox gap-2 text-center w-full">
        <div class="h-px w-full bg-dark-4/50 my-2"></div>
        <span class="text-sm opacity-50 font-bold">or</span>
        <div class="h-px w-full bg-dark-4/50 my-2"></div>
    </div>
    <div class="hbox gap-4 w-full">
        <button onclick={() => signIn('google')} aria-label="Log in with Google" class="btn-sec w-full"><div class="i-mingcute-google-fill"></div>Google</button>
        <button onclick={() => signIn('discord')} aria-label="Log in with Discord" class="btn-sec w-full"><div class="i-mingcute-discord-fill"></div>Discord</button>
    </div>
</div>

<script lang="ts">
  import { signIn } from "@auth/sveltekit/client";

  let email = $state('')
</script>

<div class="max-w-xs mx-auto w-full vpack gap-4">
    <div class="w-full vbox gap-4">
        <input bind:value={email} aria-label="Email input" type="email" placeholder="Email" class="input w-full" />
        <button onclick={() => signIn('email', { email })} aria-label="Send magic link" class="btn">Send magic link</button>
    </div>
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

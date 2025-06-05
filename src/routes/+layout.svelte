<script lang="ts">
    import '../main.css'
  import 'uno.css'
  import '@unocss/reset/tailwind.css'

  import Header from '$lib/components/header.svelte';
  import Footer from '$lib/components/footer.svelte';

  import * as config from '$lib/config'
  import { onMount } from 'svelte';

  async function detectSWUpdate() {
    const registration = await navigator.serviceWorker.ready

    registration.addEventListener('updatefound', () => {
        const newSW = registration.installing
        newSW?.addEventListener('statechange', () => {
            if (newSW.state === 'installed') {
                if (confirm('New update available! Reload to update?')) {
                    newSW.postMessage({ type: 'SKIP_WAITING' })
                    window.location.reload()
                }
            }
        })
    })
  }

  onMount(() => {
    detectSWUpdate()
  })

  let { children } = $props()
</script>

<svelte:head>
    <title>{config.APP_NAME}</title>
</svelte:head>

<div class="max-w-4xl mx-auto min-h-screen layout">
    <Header />
    <main class="px-8">
        {@render children()}
    </main>
    <Footer />
</div>

<style>
    .layout {
        display: grid;
        grid-template-rows: auto 1fr auto;
    }
</style>

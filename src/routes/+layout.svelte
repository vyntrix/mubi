<script lang="ts">
  import 'uno.css'
  import '@unocss/reset/tailwind.css'
  import Header from '$lib/components/header.svelte';
  import Footer from '$lib/components/footer.svelte';

  let { children } = $props()
</script>

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

<script lang="ts">
  import Entrycard from '$lib/components/entrycard.svelte';
  import { formatDate } from '$lib/utils.js';

  let { data } = $props()
</script>

{#if data.entries && data.entries.length > 0}
    <div class="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        {#each data.entries as entry}
            <Entrycard {entry} />
        {/each}
    </div>
{:else}
    <div class="pack w-full">
        <p class="text-center font-dark/50">No entries found</p>
    </div>
{/if}

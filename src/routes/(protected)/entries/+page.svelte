<script lang="ts">
  import { formatDate } from '$lib/utils.js';

  let { data } = $props()
</script>

{#if data.entries && data.entries.length > 0}
    <div class="mt-16 grid grid-cols-2 gap-4 pack w-full">
        {#each data.entries as entry}
            <div class="card justify-between items-start text-left">
                <h3 class="text-lg font-bold">{formatDate(entry.createdAt.toDateString())}</h3>
                <p>{entry.body}</p>
                <p class="font-bold font-dark/50">
                    You were feeling <span class="underline decoration-wavy underline-yellow">{entry.mood}</span>
                </p>
            </div>
        {/each}
    </div>
{:else}
    <div class="pack w-full">
        <p class="text-center font-dark/50">No entries found</p>
    </div>
{/if}

<script lang="ts">
  import Entrycard from "$lib/components/entrycard.svelte";
  import { formatDate } from "$lib/utils";
  import { signOut } from "@auth/sveltekit/client";

  let { data } = $props()
</script>

<section class="vbox w-full gap-4 mt-16">
    <div class="hbox justify-between w-full">
        <h2 class="text-2xl font-bold">Your last entries</h2>
    </div>
    <div class="h-px w-full bg-dark-4/50"></div>
    {#if data.lastEntries && data.lastEntries.length > 0}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
            <div class="absolute w-full h-full fadeout"></div>
            {#each data.lastEntries as entry}
                <Entrycard {entry} />
            {/each}
        </div>
        <div class="pack mt-8">
            <a href="/entries" class="text-dark/50 hover:underline">
                See all entries
            </a>
        </div>
    {:else}
        <div class="pack w-full mt-8">
            <p class="text-dark/50">
                You don't have any entries yet.
            </p>
        </div>
    {/if}
</section>

<style>
    .fadeout {
        background: linear-gradient(transparent 70%, white);
        pointer-events: none;
    }
</style>

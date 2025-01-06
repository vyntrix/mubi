<script lang="ts">
  import { formatDate } from "$lib/utils";
  import { signOut } from "@auth/sveltekit/client";

  let { data } = $props()
</script>

<section class="vbox w-full gap-4 mt-16">
    <div class="hbox justify-between w-full">
        <h2 class="text-2xl font-bold">Your last entries</h2>
    </div>
    <div class="h-px w-full bg-dark-4/50"></div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        <div class="absolute w-full h-full fadeout"></div>
        {#if data.lastEntries}
            {#each data.lastEntries as entry}
                <div class="card">
                    <h3 class="text-lg font-bold">{formatDate(entry.createdAt.toDateString())}</h3>
                    <p>{entry.body}</p>
                </div>
            {/each}
        {/if}
    </div>
    <div class="pack mt-8">
        <a href="/entries" class="text-dark/50 hover:underline">
            See all entries
        </a>
    </div>
</section>

<style>
    .fadeout {
        background: linear-gradient(transparent, white);
        pointer-events: none;
    }
</style>

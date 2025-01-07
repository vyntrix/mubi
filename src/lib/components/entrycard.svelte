<script lang="ts">
  import { formatDate } from "$lib/utils";
  import type { Entry } from "@prisma/client";

 let { entry } = $props<{ entry: Entry }>()
</script>

<div class="card justify-between items-start text-left">
    <h3 class="text-lg font-bold">{formatDate(entry.createdAt.toDateString())}</h3>
    <p class="h-full">{entry.body}</p>
    <p class="font-bold font-dark/50">
        You were feeling <span class="underline decoration-wavy underline-yellow">{entry.mood}</span>
    </p>
</div>

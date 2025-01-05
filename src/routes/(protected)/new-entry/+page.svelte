<script lang="ts">
  import { entrySchema, moodEntrySchema } from "$lib/schemas/entry";
  import { moods } from "$lib/types";
  import { zod } from "sveltekit-superforms/adapters";
  import { superForm } from "sveltekit-superforms";

  let { data } = $props()

  const steps = [zod(moodEntrySchema), zod(entrySchema)]
  let step = $state(1)
  let selected = $state('happy')

  $effect(() => {
    $form.mood = selected
    options.validators = steps[step -1]
  })

  const { form, errors, message, enhance, validateForm, options, constraints } = superForm(data.form, {
    dataType: 'json',
    async onSubmit({ cancel }) {
        if (step == steps.length) return;
        else cancel();

        const result = await validateForm({ update: true });
        if (result.valid) step = step + 1;
    },
    async onUpdated({ form }) {
        if (form.valid) step = 1
    }
  })
</script>

<form class="vpack max-w-sm w-full gap-8" use:enhance method="POST">
    {#if step == 1}
        <h1 class="self-start text-2xl font-bold">How are you feeling today?</h1>
        <div class="grid grid-cols-3 gap-4">
            {#each moods as mood}
                <button class="btn-sec ${selected == mood.value ? "outline outline-yellow" : ""}" aria-label="Mood" onclick={(e) => {
                    e.preventDefault()
                    selected = mood.value
                }}>
                    <span>{mood.name}</span>
                </button>
            {/each}
        </div>
    {:else}
        <h1 class="self-start text-2xl font-bold">What are you thinking about?</h1>
        <textarea name="body" id="body" class="input w-full resize-none" placeholder="Write something..." rows="5" bind:value={$form.body}>
        </textarea>
    {/if}
    <div class="w-full vpack gap-4">
        <button class="btn w-full">
            Next
        </button>
        <a href="/dashboard?later=true" class="text-sm opacity-50 hover:underline">
            I'll do it later
        </a>
    </div>
</form>

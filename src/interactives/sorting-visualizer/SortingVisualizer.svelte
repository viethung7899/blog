<script lang="ts">
  import Controller from "./components/Controller.svelte"
  import {
    algorithms,
    type Item,
    type SortGenerator,
    type SortingState,
    randomizeArray,
    type Algorithm,
  } from "./lib"
  import SortingItem from "./SortingItem.svelte"

  let count = 25
  let speed: number
  let items: Item[] = []

  $: {
    reset(count)
  }

  $: sleep = () => {
    return new Promise((resolve) => setTimeout(resolve, speed))
  }

  let playing = false
  let algorithm: Algorithm
  let state: SortingState | undefined
  let generator: SortGenerator | undefined

  const reset = (count: number) => {
    items = randomizeArray(count)
    generator = undefined
    state = undefined
  }

  const play = async () => {
    playing = true
    if (!generator) generator = algorithms[algorithm]([...items])
    while (playing) {
      state = generator.next()
      if (state.done) {
        playing = false
      } else {
        items = state.value
        await sleep()
      }
    }
  }

  $: isSorting = state && !state.done
  $: isSorted = state?.done
</script>

<Controller bind:count bind:speed bind:algorithm disabled={playing || isSorting} />
<div
  class={`flex h-60 rounded-md border-2 border-slate-500/25 ${
    items.length <= 50 ? "gap-1" : "gap-[1px]"
  } items-end p-2`}
>
  {#each items as item}
    <SortingItem {item} />
  {/each}
</div>
<div class="mt-4 flex w-full justify-end gap-2">
  <button class="btn btn-ghost" on:click={() => reset(count)} disabled={isSorting}>Randomize</button
  >
  {#if playing}
    <button class="btn btn-warning" on:click={() => (playing = false)}>Pause</button>
  {:else}
    <button class="btn btn-success" disabled={isSorted} on:click={play}
      >{isSorting ? "Resume" : "Sort"}</button
    >
  {/if}
</div>

<script lang="ts">
  import { algorithms, type Algorithm } from "../lib";
  export let count = 25;
  export let algorithm: Algorithm = "Quicksort";
  export let disabled = false;

  const speeds = [
    { name: "Slow", value: 250 },
    { name: "Fast", value: 100 },
    { name: "Very Fast", value: 40 },
  ]
  export let speed = speeds[0].value;

</script>

<div class="mb-4 grid sm:grid-cols-2 gap-4 items-center">
  <label for="count">
    Number of elements: <strong class="accent">{count}</strong>
  </label>
  <input
    id="count"
    type="range"
    min="10"
    max="100"
    step="1"
    bind:value={count}
    class="range"
    disabled={disabled}
  />
  <label for="algos" class="flex">Sorting algorithm</label>
  <select
    id="algos"
    disabled={disabled}
    bind:value={algorithm}
    class="select select-ghost select-bordered"
  >
    {#each Object.keys(algorithms) as name}
      <option value={name}>{name}</option>
    {/each}
  </select>
  <label for="speed" class="flex">Speed</label>
  <select id="speed" bind:value={speed} class="select select-ghost select-bordered">
    {#each speeds as speed}
      <option value={speed.value}>{speed.name}</option>
    {/each}
  </select>
</div>
<script lang="ts">
  const DISPLAY_MODES = ["Binary", "Grayscale", "Hallow", "Beautiful"]

  export let zoom: number
  export let iterations: number
  export let displayMode: number
</script>

<div class="grid w-full grid-cols-2 items-center gap-4">
  <label for="zoom">
    Zoom: <strong>{zoom}x</strong>
  </label>
  <input
    id="zoom"
    type="range"
    min="1"
    max="100"
    step="0.1"
    bind:value={zoom}
    class="range range-primary range-sm"
  />
  <label for="iterations">
    Iterations: <strong class="text-primary">{iterations}</strong>
  </label>
  <input
    id="iterations"
    type="range"
    min="1"
    max="384"
    step="1"
    bind:value={iterations}
    class="range range-primary range-sm"
  />
  <label for="display"> Display mode </label>
  <select class="select select-bordered select-ghost" bind:value={displayMode} id="display">
    {#each DISPLAY_MODES as mode, i}
      <option value={i}>{mode}</option>
    {/each}
  </select>
</div>

<script lang="ts">
  import Keypad from "./Keypad.svelte"
  import PiDisplay from "./PiDisplay.svelte"
  let value = ""
</script>

<PiDisplay query={value} />
<div class={`text-lg ${!value ? "text-base-content/60" : ""}`}>
  {value || "Use keypad to input number"}
</div>
<Keypad bind:value />

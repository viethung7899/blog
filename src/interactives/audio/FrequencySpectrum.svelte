<script>
  import AudioPrompt from "./components/AudioPrompt.svelte"
  import { analyser, playing } from "./audio"
  import FrequencySpectrum from "./components/FrequencySpectrum.svelte"
</script>

<div class="mt-4">
  {#if $analyser}
    <FrequencySpectrum analyser={$analyser} playing={$playing} />
  {:else}
    <AudioPrompt message="Upload an audio file to view audio data" />
  {/if}
</div>

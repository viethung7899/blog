<script>
  import { audioFile, progress } from "./audio"
  import AudioPrompt from "./components/AudioPrompt.svelte"
  import Waveform from "./components/Waveform.svelte"
</script>

<div class="mt-4">
  {#if $audioFile}
    <Waveform progress={$progress} audioFile={$audioFile} />
  {:else}
    <AudioPrompt message="Upload an audio file to view audio data" />
  {/if}
</div>

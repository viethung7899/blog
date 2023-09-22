<script>
  import UploadAudio from "./UploadAudio.svelte"

  export let message = ""
</script>

<div class="flex flex-col items-center gap-2 rounded-lg bg-base-300 p-4">
  <span>{message}</span>
  <div>
    <UploadAudio />
  </div>
</div>

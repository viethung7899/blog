<script>
  import UploadAudio from "./UploadAudio.svelte"

  export let message = ""
</script>

<div class="flex flex-col items-center p-4 gap-2 bg-base-300 rounded-lg">
  <span>{message}</span>
  <div>
    <UploadAudio />
  </div>
</div>

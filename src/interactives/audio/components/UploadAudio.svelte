<script>
  import { Upload } from "lucide-svelte"
  import { audioFile } from "../audio"

  export let id = "audio-file"
</script>

<label for={id} class="btn btn-outline btn-sm normal-case">
  <Upload class="h-4 w-4" />
  <span class="hidden sm:block">Upload audio</span>
</label>
<input
  class="hidden"
  {id}
  type="file"
  accept="audio/*"
  on:change={async (e) => {
    const files = e.currentTarget.files
    if (!files || files.length === 0) return
    $audioFile = files[0]
  }}
/>

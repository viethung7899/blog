<script lang="ts">
  import { onMount } from "svelte"
  import { audioFile, progress } from "./audio"
  import { primaryHSL, baseContentHSL } from "@/components/theme/themeStore"
  import UploadAudio from "./UploadAudio.svelte"

  const SAMPLES = 256

  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D | null
  let loading = false
  let mounted = false
  let waveformData: number[] = []

  function updateSize() {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
  }

  function samplingData(data: Float32Array) {
    const sampled: number[] = []
    const blockSize = Math.floor(data.length / SAMPLES)
    for (let i = 0; i < SAMPLES; i++) {
      let start = i * blockSize
      let sum = 0
      for (let j = 0; j < blockSize; j++) {
        sum += Math.abs(data[start + j])
      }
      sampled.push(sum / blockSize)
    }
    return sampled
  }

  onMount(() => {
    mounted = true
    ctx = canvas.getContext("2d")
    updateSize()
  })

  $: {
    if (!$audioFile || !mounted) break $
    const audioCtx = new AudioContext()
    loading = true
    console.log("Loading audio file...")
    $audioFile
      .arrayBuffer()
      .then((buffer) => audioCtx.decodeAudioData(buffer))
      .then((buffer) => {
        // Extracting data from the buffer
        const data = buffer.getChannelData(0)
        const sampled = samplingData(data)
        const max = Math.max(...sampled)
        waveformData = sampled.map((v) => v / max)
      })
      .finally(() => {
        console.log("Audio file loaded.")
        loading = false
      })
  }

  $: {
    if (!mounted || !ctx) break $
    updateSize()
    const { width, height } = canvas
    ctx.clearRect(0, 0, width, height)
    if (waveformData.length <= 0) break $
    console.log("Drawing waveform...")
    const length = waveformData.length
    const w = canvas.width / length
    for (let i = 0; i < length; i++) {
      const color = i / length >= $progress ? $baseContentHSL : $primaryHSL
      ctx.fillStyle = `hsl(${color})`
      const h = (waveformData[i] * height) / 2
      ctx.fillRect(i * w, height / 2 - h / 2, w, h)
    }
  }
</script>

<div
  class="w-full flex flex-col gap-2 justify-center items-center py-4 border rounded-lg bg-base-300"
  class:hidden={$audioFile}
>
  <span>Upload audio file to see waveform</span>
  <UploadAudio />
</div>
<canvas
  class="w-full aspect-[2/1] border rounded-lg bg-base-300"
  bind:this={canvas}
  class:hidden={!$audioFile}
>
</canvas>

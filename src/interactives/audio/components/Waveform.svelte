<script lang="ts">
  import { baseContentHSL, primaryHSL } from "@/components/theme/themeStore"
  import { onMount } from "svelte"

  export let audioFile: File
  export let progress = 0

  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D | null

  const SAMPLES = 256
  let waveform: number[] = []

  function updateSize() {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
  }

  onMount(() => {
    ctx = canvas.getContext("2d")
    updateSize()
  })

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

  $: {
    const audioCtx = new AudioContext()
    audioFile
      .arrayBuffer()
      .then((buffer) => audioCtx.decodeAudioData(buffer))
      .then((buffer) => {
        // Extracting data from the buffer
        const data = buffer.getChannelData(0)
        const sampled = samplingData(data)
        const max = Math.max(...sampled)
        waveform = sampled.map((v) => v / max)
      })
  }

  $: {
    if (!ctx) break $
    updateSize()
    const { width, height } = canvas
    ctx.clearRect(0, 0, width, height)
    if (waveform.length <= 0) break $
    const length = waveform.length
    const w = canvas.width / length
    for (let i = 0; i < length; i++) {
      const color = i / length >= progress ? $baseContentHSL : $primaryHSL
      ctx.fillStyle = `hsl(${color})`
      const h = (waveform[i] * height) / 2
      ctx.fillRect(i * w, height / 2 - h / 2, w, h)
    }
  }
</script>

<canvas class="w-full aspect-[5/2] border rounded-lg bg-base-300" bind:this={canvas} />

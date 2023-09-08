<script lang="ts">
  import { primaryHSL } from "@/components/theme/themeStore"
  import { onMount } from "svelte"
  import UploadAudio from "./UploadAudio.svelte"
  import { FFT_SIZE, analyser, playing } from "./audio"

  let mounted = false
  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D | null
  let animationFrame: number
  let data: Uint8Array = new Uint8Array(FFT_SIZE / 2)

  onMount(() => {
    mounted = true
    ctx = canvas.getContext("2d")
    updateSize()
  })

  function updateSize() {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
  }

  function draw() {
    if (!ctx || !canvas) return
    const { width, height } = canvas
    ctx.clearRect(0, 0, width, height)
    const length = data.length
    const w = canvas.width / length
    ctx.fillStyle = `hsl(${$primaryHSL})`
    for (let i = 0; i < length; i++) {
      const h = data[i]
      ctx.fillRect(i * w, height - h, w, h)
    }
  }

  function updateData() {
    if (!$analyser) return
    $analyser.getByteFrequencyData(data)
    draw()
    animationFrame = requestAnimationFrame(updateData)
  }

  function diminishData() {
    const updated = data
    for (let i = 0; i < data.length; i++) {
      updated[i] *= 0.99
    }
    data = updated
    draw()
    animationFrame = requestAnimationFrame(diminishData)
  }

  $: {
    if (!mounted) break $
    cancelAnimationFrame(animationFrame)
    requestAnimationFrame($playing ? updateData : diminishData)
  }
</script>

<div
  class="w-full flex flex-col gap-2 justify-center items-center py-4 border rounded-lg bg-base-300"
  class:hidden={$analyser}
>
  <span>Upload audio file to see waveform</span>
  <UploadAudio />
</div>
<canvas
  class="w-full aspect-[5/2] border rounded-lg bg-base-300"
  bind:this={canvas}
  class:hidden={!$analyser}
>
</canvas>

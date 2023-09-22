<script lang="ts">
  import { primaryHSL } from "@/components/theme/themeStore"
  import { onMount } from "svelte"
  import { FFT_SIZE } from "../audio"

  export let analyser: AnalyserNode
  export let playing: boolean

  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D | null
  let animationFrame: number
  let data: Uint8Array = new Uint8Array(FFT_SIZE / 2)
  let factor = 1
  let DECAY_FACTOR = 0.99

  onMount(() => {
    ctx = canvas.getContext("2d")
    updateSize()
  })

  function updateSize() {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
  }

  function draw(color: string) {
    if (!ctx) return
    updateSize()
    const { width, height } = canvas
    ctx.clearRect(0, 0, width, height)
    const length = data.length
    const w = canvas.width / length
    ctx.fillStyle = color
    for (let i = 0; i < length; i++) {
      const h = (data[i] / 256) * height * factor
      ctx.fillRect(i * w, height - h, w, h)
    }
  }

  function updateData() {
    factor = 1
    analyser.getByteFrequencyData(data)
  }

  function decayData() {
    factor *= DECAY_FACTOR
  }

  $: {
    if (!ctx) break $
    updateSize()
    cancelAnimationFrame(animationFrame)
    const update = () => {
      if (playing) updateData()
      else decayData()
      draw(`hsl(${$primaryHSL})`)
      animationFrame = requestAnimationFrame(update)
    }
    update()
  }
</script>

<canvas class="aspect-[5/2] w-full rounded-lg border bg-base-300" bind:this={canvas}> </canvas>

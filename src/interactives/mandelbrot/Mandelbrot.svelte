<script lang="ts">
  import P5, { type Sketch } from "p5-svelte"
  import type { Shader } from "p5"
  import common from "./shaders/common.glsl?raw"
  import vs from "./shaders/base.vert?raw"
  import mandelbrot from "./shaders/mandelbrot.frag?raw"
  import Control from "./Control.svelte"

  const fs = `
    ${common}
    ${mandelbrot}
    `

  let container: HTMLElement
  let aspectRatio = 4 / 3

  let offset = { x: 0.5, y: 0 }
  let zoom = 1

  const reset = () => {
    offset = { x: 0.5, y: 0 }
    zoom = 1
  }

  $: scale = zoom * 0.75

  let iterations = 64
  let displayMode = 3

  const sketch: Sketch = (p5) => {
    let myShader: Shader
    let pressed = { x: 0, y: 0 }
    let locked = { x: 0, y: 0 }

    const isInside = () => {
      const { mouseX, mouseY, width, height } = p5
      return mouseX >= 0 && mouseY >= 0 && mouseX <= width && mouseY <= height
    }

    const getX = () => {
      return ((p5.mouseX / p5.width - 0.5) * 2 * aspectRatio) / scale
    }

    const getY = () => {
      return ((p5.mouseY / p5.height - 0.5) * -2) / scale
    }

    p5.setup = () => {
      p5.createCanvas(container.clientWidth, container.clientHeight, p5.WEBGL)
      p5.frameRate(30)
      myShader = p5.createShader(vs, fs)
      p5.shader(myShader)
    }

    p5.draw = () => {
      myShader.setUniform("myColor", [0.0, 0.0, 1.0])
      myShader.setUniform("aspectRatio", aspectRatio)
      myShader.setUniform("offset", [offset.x, offset.y])
      myShader.setUniform("scale", scale)
      myShader.setUniform("iterations", iterations)
      myShader.setUniform("displayMode", displayMode)
      p5.quad(-1, -1, 1, -1, 1, 1, -1, 1)
    }

    p5.windowResized = () => {
      p5.resizeCanvas(container.clientWidth, container.clientHeight)
    }

    p5.mousePressed = () => {
      if (!isInside()) return
      pressed.x = getX()
      pressed.y = getY()
      locked = { ...offset }
    }

    p5.mouseDragged = () => {
      if (!isInside()) return
      offset = {
        x: locked.x + (getX() - pressed.x),
        y: locked.y + (getY() - pressed.y),
      }
    }
  }
</script>

<div
  class={`relative aspect-[4/3] border rounded-lg overflow-hidden cursor-grab mb-4`}
  bind:this={container}
>
  <P5 {sketch} />
  <button class="absolute bottom-4 right-4 btn btn-primary btn-sm" on:click|stopPropagation={reset}
    >Reset</button
  >
</div>
<Control bind:iterations bind:displayMode bind:zoom />

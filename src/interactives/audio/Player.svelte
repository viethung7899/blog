<script lang="ts">
  import { Pause, Play, RotateCcw } from "lucide-svelte"
  import { onMount } from "svelte"
  import UploadAudio from "./UploadAudio.svelte"
  import { audioFile, playing, progress } from "./audio"

  let mounted = false
  let timestamp = 0
  let duration = 0
  let animationFrame = 0
  let audio: HTMLAudioElement | undefined

  onMount(() => {
    mounted = true
  })

  $: {
    if (!mounted || !$audioFile) break $
    audio = new Audio(URL.createObjectURL($audioFile))
    audio.preload = "metadata"
    audio.addEventListener("loadedmetadata", () => {
      duration = audio?.duration || 0
    })
  }

  function displayTime(time: number) {
    const round = Math.round(time)
    const minutes = Math.floor(round / 60)
    const seconds = round % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  function updateTime() {
    if (!audio) return
    timestamp = audio.currentTime
    progress.set(duration === 0 ? 0 : timestamp / duration)
    animationFrame = requestAnimationFrame(updateTime)
  }

  function play() {
    if (!audio || $playing) return
    $playing = true
    audio.play()
    updateTime()
  }

  function pause() {
    if (!audio || !$playing) return
    $playing = false
    audio.pause()
    cancelAnimationFrame(animationFrame)
  }

  function reset() {
    pause()
    if (!audio) return
    audio.currentTime = 0
    timestamp = 0
    progress.set(0)
  }
</script>

<div class="bg-base-300 z-10 rounded-b-lg mt-4">
  <div class="h-1 bg-neutral">
    <div class="h-full bg-accent" style:width={`${$progress * 100}%`}></div>
  </div>
  <div class="p-4 flex items-center gap-2">
    <button
      class="btn btn-circle bg-transparent hover:opacity-100 text-accent"
      on:click={playing ? pause : play}
      disabled={!audio}
    >
      {#if $playing}
        <Pause />
      {:else}
        <Play />
      {/if}
    </button>
    <button
      class="btn btn-circle bg-transparent hover:opacity-100"
      on:click={reset}
      disabled={!audio}
    >
      <RotateCcw />
    </button>
    <div class="font-mono ml-2">{displayTime(timestamp)} / {displayTime(duration)}</div>
    <div class="ml-auto">
      <UploadAudio />
    </div>
  </div>
</div>

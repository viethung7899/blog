<script lang="ts">
  import { Pause, Play, RotateCcw } from "lucide-svelte"
  import { onMount } from "svelte"
  import UploadAudio from "./components/UploadAudio.svelte"
  import { audioFile, playing, progress, setupAnalyzer } from "./audio"

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
    timestamp = 0
    audio.addEventListener("loadedmetadata", () => {
      duration = audio?.duration || 0
    })
    audio.addEventListener("timeupdate", (e) => {
      timestamp = audio?.currentTime || 0
    })
    setupAnalyzer(audio)
  }

  $: progress.set(duration === 0 ? 0 : timestamp / duration)

  function displayTime(time: number) {
    const round = Math.round(time)
    const minutes = Math.floor(round / 60)
    const seconds = round % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  function play() {
    if (!audio) return
    playing.set(true)
    audio.play()
  }

  function pause() {
    if (!audio) return
    playing.set(false)
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

<div class="sticky bottom-4 z-10 mt-4 rounded-b-lg bg-base-300/50 backdrop-blur-xl">
  <div class="h-1 bg-neutral">
    <div class="h-full bg-accent" style:width={`${$progress * 100}%`}></div>
  </div>
  <div class="flex items-center gap-2 p-4">
    <button
      class="btn btn-circle bg-transparent text-accent hover:opacity-100"
      on:click={$playing ? pause : play}
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
    <div class="ml-2 font-mono">{displayTime(timestamp)} / {displayTime(duration)}</div>
    <div class="ml-auto">
      <UploadAudio />
    </div>
  </div>
</div>

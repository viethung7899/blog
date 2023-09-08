import { writable } from "svelte/store"

export const audioFile = writable<File>()
export const progress = writable(0)
export const playing = writable(false)
export const analyser = writable<AnalyserNode>()

export const FFT_SIZE = 256

export function setupAnalyzer(audio: HTMLAudioElement) {
  const context = new AudioContext()
  const source = context.createMediaElementSource(audio)
  const analyserNode = context.createAnalyser()
  analyserNode.fftSize = FFT_SIZE
  source.connect(analyserNode)
  analyserNode.connect(context.destination)
  analyser.set(analyserNode)
}

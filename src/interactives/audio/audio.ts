import { writable } from "svelte/store"

const FFT_SIZE = 256
const SAMPLES = 256

export const audioFile = writable<File>()
export const progress = writable(0)

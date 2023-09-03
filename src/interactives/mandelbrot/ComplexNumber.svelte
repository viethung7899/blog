<script>
  import katex from "katex"
  export let real = 0
  export let imaginary = 0

  $: displayComplex = (() => {
    if (real === 0) {
      if (imaginary === 0) return "0"
      if (imaginary === 1) return "i"
      if (imaginary === -1) return "-i"
      return `${imaginary}i`
    }
    let img = ""
    if (imaginary === 1) img = "i"
    if (imaginary === -1) img = "-i"
    if (imaginary > 0) img = `+${imaginary}i`
    if (imaginary < 0) img = `${imaginary}i`
    return `${real}${img}`
  })()
</script>

<span class="text-primary text-lg text-right">
  {@html katex.renderToString(displayComplex, { displayMode: false })}
</span>

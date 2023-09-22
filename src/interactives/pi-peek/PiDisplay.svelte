<script lang="ts">
  const pr = new Intl.PluralRules("en", { type: "ordinal" })
  const nf = new Intl.NumberFormat("en")

  const suffixes = new Map([
    ["one", "st"],
    ["two", "nd"],
    ["few", "rd"],
    ["other", "th"],
  ])

  const formatOrdinals = (n: number) => {
    const rule = pr.select(n)
    const suffix = suffixes.get(rule)
    return `${nf.format(n)}${suffix}`
  }

  let searching = false
  let timeout: number
  let error = false
  export let query = ""
  const DEFAULT = {
    before: "",
    between: "",
    after: `${Math.PI}...`,
  }

  type Data = {
    index?: number
    before: string
    between: string
    after: string
    length: number
  }

  let data: Data | undefined

  const getMessage = (data?: Data) => {
    if (!data) return undefined
    if (data.index === undefined)
      return {
        content: `Not found in the first ${nf.format(data.length)} digits`,
        error: true,
      }
    return {
      content: `Found ${data.between} starting at ${formatOrdinals(data.index + 1)} digit of π`,
      error: false,
    }
  }

  $: message = getMessage(data)
  $: display = data || DEFAULT

  $: {
    error = false
    searching = true
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(search(query), 300)
  }

  const search = (query: string) => async () => {
    if (query.length === 0) {
      data = undefined
      searching = false
      return
    }
    try {
      const res = await fetch(`https://pi-peek.vercel.app/find/${query}`)
      if (!res.ok) {
        data = undefined
        error = true
        return
      }
      data = (await res.json()) as Data
    } catch (e) {
      data = undefined
      error = true
    }
    searching = false
  }
</script>

<div class="join-item" class:text-error={error || message?.error}>
  {searching
    ? "Peeking..."
    : error
    ? "Something went wrong"
    : message
    ? message.content
    : "Waiting for input..."}
</div>
<div class="join-item text-xl text-base-content/60 sm:text-4xl lg:text-6xl">
  {display.before}<span class="text-accent">{display.between}</span>{display.after}
</div>

<script>
  /**
   * @type {import('astro:content').CollectionEntry<"posts">["data"]}
   */
  export let data
  const date = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(data.date)
  const tags = data.tags?.map((tag) => `#${tag}`) || []
</script>

<div tw="w-full h-full flex flex-col justify-between p-16 text-white bg-black">
  <div tw="text-4xl font-bold" style="color: #1fb2a6;">V_</div>
  <div tw="flex flex-col">
    <div tw="text-4xl font-semibold">{data.title}</div>
    <p tw="text-xl opacity-80">{[date, ...tags].join(' · ')}</p>
  </div>
</div>
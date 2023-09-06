import Card from "@/components/og/Card.svelte"
import { Resvg } from "@resvg/resvg-js"
import type { APIContext } from "astro"
import { getCollection, type CollectionEntry } from "astro:content"
import satori, { type Font } from "satori"
import { html } from "satori-html"

export async function getStaticPaths() {
  const posts = await getCollection("posts")
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: {
      data: post.data,
    },
  }))
}

async function getFonts() {
  const regular = await fetch("https://fonts.cdnfonts.com/s/19795/Inter-Regular.woff").then((res) =>
    res.arrayBuffer(),
  )
  const semibold = await fetch("https://fonts.cdnfonts.com/s/19795/Inter-SemiBold.woff").then(
    (res) => res.arrayBuffer(),
  )
  const bold = await fetch("https://fonts.cdnfonts.com/s/19795/Inter-Bold.woff").then((res) =>
    res.arrayBuffer(),
  )

  return [
    {
      name: "Inter",
      data: regular,
      weight: 400,
    },
    {
      name: "Inter",
      data: semibold,
      weight: 600,
    },
    {
      name: "Inter",
      data: bold,
      weight: 700,
    },
  ] satisfies Font[]
}

const DIMENSIONS = {
  width: 1200,
  height: 630,
}

interface Props {
  data: CollectionEntry<"posts">["data"]
}

export async function GET({ props }: APIContext) {
  const { data } = props as Props
  const date = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(data.date)
  const tags = data.tags?.map((tag) => `#${tag}`) || []

  // @ts-ignore
  const render = Card.render({ data })
  const markup = html(render.html)

  const fonts = await getFonts()

  // @ts-ignore
  const svg = await satori(markup, {
    ...DIMENSIONS,
    fonts,
  })

  const image = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: DIMENSIONS.width,
    },
  }).render()

  return new Response(image.asPng(), {
    headers: {
      "Content-Type": "image/png",
    },
  })
}
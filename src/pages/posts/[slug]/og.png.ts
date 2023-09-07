import { Resvg } from "@resvg/resvg-js"
import type { APIContext, InferGetStaticPropsType } from "astro"
import { getCollection } from "astro:content"
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

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export async function GET({ props, url }: APIContext) {
  const { data } = props as Props

  const date = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(data.date)
  const tags = data.tags?.map((tag) => `#${tag}`) || []

  const backgroundURL = new URL("og-background.png", url.origin)

  const markup = html`
  <div tw="w-full h-full flex flex-col justify-between p-16 text-white"
    style="background: url('${backgroundURL}')"
  >
    <div tw="text-4xl font-bold" style="color: #1fb2a6;">V_</div>
    <div tw="flex flex-col">
      <div tw="text-4xl font-semibold">${data.title}</div>
      <p tw="text-xl opacity-80">${[date, ...tags].join(' · ')}</p>
    </div>
  </div>
  `

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
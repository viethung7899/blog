import { Resvg } from "@resvg/resvg-js"
import type { APIContext, InferGetStaticPropsType } from "astro"
import { getCollection } from "astro:content"
import { readFileSync } from "fs"
import satori, { type Font } from "satori"
import { html } from "satori-html"

export async function getStaticPaths() {
  const posts = await getCollection("posts")

  const paths = posts.map(async (post) => {
    const { slug, render, data } = post
    const { remarkPluginFrontmatter } = await render()
    return {
      params: { slug },
      props: {
        data,
        readingTime: remarkPluginFrontmatter.minutesRead,
      },
    }
  })

  return await Promise.all(paths)
}

const imageBase64 = Buffer.from(readFileSync("src/assets/og-background.png")).toString("base64")
const regular = readFileSync("src/assets/fonts/Inter-Regular.woff")
const semibold = readFileSync("src/assets/fonts/Inter-SemiBold.woff")
const bold = readFileSync("src/assets/fonts/Inter-Bold.woff")
const fonts = [
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

const DIMENSIONS = {
  width: 1200,
  height: 630,
}

type Props = InferGetStaticPropsType<typeof getStaticPaths>

export async function GET({ props }: APIContext) {
  const { data, readingTime } = props as Props

  const date = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(data.date)
  const tags = data.tags?.map((tag) => `#${tag}`) || []

  const markup = html`
    <div
      tw="w-full h-full flex flex-col justify-between p-16 text-white"
      style="background: url('data:image/png;base64,${imageBase64}')"
    >
      <div tw="text-4xl font-bold" style="color: #1fb2a6;">V_</div>
      <div tw="flex flex-col">
        <div tw="text-4xl font-semibold">${data.title}</div>
        <p tw="text-xl opacity-80">${[date, readingTime, ...tags].join(" · ")}</p>
      </div>
    </div>
  `

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

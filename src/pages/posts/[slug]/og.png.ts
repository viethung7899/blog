import { OGImage } from "@/components/og-image"
import type { APIContext, InferGetStaticPropsType } from "astro"
import { getCollection } from "astro:content"
import { readFileSync } from "fs"
import satori, { type Font } from "satori"
import sharp from "sharp"

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

const imageBase64 = readFileSync("src/assets/og-background.png").toString("base64")
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

  const svg = await satori(
    OGImage(data.title, [date, readingTime, ...tags].join(" · "), imageBase64),
    {
      ...DIMENSIONS,
      fonts,
    },
  )

  const png = sharp(Buffer.from(svg)).png()

  return new Response(await png.toBuffer(), {
    headers: {
      "Content-Type": "image/png",
    },
  })
}

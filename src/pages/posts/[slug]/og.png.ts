import { OGImage } from "@/og/image"
import { dimension, fonts, imageBase64 } from "@/og/resource"
import type { APIContext, InferGetStaticPropsType } from "astro"
import { getCollection } from "astro:content"
import satori from "satori"
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
    OGImage({
      title: data.title,
      description: [date, readingTime, ...tags].join(" · "),
      imageBase64,
    }),
    {
      ...dimension,
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

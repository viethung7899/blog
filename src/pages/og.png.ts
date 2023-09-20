import { OGImage } from "@/og/image"
import { dimension, fonts } from "@/og/resource"
import satori from "satori"
import sharp from "sharp"

export async function GET() {
  const svg = await satori(
    OGImage({
      title: "Viet-Hung Nguyen's Blog",
      description: ["Coding journal", "Web experiments", "Programming topics"].join(" · "),
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

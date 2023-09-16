/**
 * @param {{
 *  title: string
 *  description: string
 *  imageBase64: string
 * }} props
 */
export function OGImage(props) {
  const { title, description, imageBase64 } = props
  return (
    <div
      tw="w-full h-full flex flex-col justify-between p-16 text-white"
      style={{
        backgroundImage: `url(data:image/png;base64,${imageBase64})`,
      }}
    >
      <div
        tw="text-4xl font-semibold text-cyan-500"
        style={{
          fontFamily: "JetBrains Mono",
        }}
      >
        [vhng]
      </div>
      <div tw="flex flex-col">
        <div tw="text-4xl font-semibold">{title}</div>
        <p tw="text-xl opacity-80">{description}</p>
      </div>
    </div>
  )
}

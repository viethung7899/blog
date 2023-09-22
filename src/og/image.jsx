import { background, profile } from "./resource"

/**
 * @param {{
 *  title: string
 *  description: string
 * }} props
 */
export function OGImage(props) {
  const { title, description } = props
  return (
    <div
      tw="flex h-full w-full flex-col justify-between p-16 text-white"
      style={{
        backgroundImage: `url(data:image/png;base64,${background})`,
      }}
    >
      <img
        src={`data:image/png;base64,${profile}`}
        tw="h-24 w-24 rounded-full border border-4 border-slate-500/50"
      />
      <div tw="flex flex-col">
        <div tw="text-4xl font-semibold">{title}</div>
        <p tw="text-xl opacity-80">{description}</p>
      </div>
    </div>
  )
}

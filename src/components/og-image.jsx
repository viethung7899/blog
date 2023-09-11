/**
 * @param {string} title
 * @param {string} description
 * @param {string} imageBase64
 */
export function OGImage(title, description, imageBase64) {
  return (
    <div
      tw="w-full h-full flex flex-col justify-between p-16 text-white"
      style={{
        backgroundImage: `url(data:image/png;base64,${imageBase64})`,
      }}
    >
      <div tw="text-4xl font-bold text-teal-500">V_</div>
      <div tw="flex flex-col">
        <div tw="text-4xl font-semibold">{title}</div>
        <p tw="text-xl opacity-80">{description}</p>
      </div>
    </div>
  )
}

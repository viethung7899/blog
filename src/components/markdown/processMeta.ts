export const processMeta = (meta: string) => {
  // Get the title inside the quotation mark it from the meta
  const title = meta.match(/title="(.+)"/)?.[1]
  const showLineNumbers = meta.includes("showLineNumbers")
  return {
    title,
    showLineNumbers,
  }
}

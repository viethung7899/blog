import type { ComponentProps } from "react"

const Link = (props: ComponentProps<"svg">) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" {...props}>
      <line x1="4" x2="20" y1="9" y2="9" />
      <line x1="4" x2="20" y1="15" y2="15" />
      <line x1="10" x2="8" y1="3" y2="21" />
      <line x1="16" x2="14" y1="3" y2="21" />
    </svg>
  )
}

export const h2 = ({ children, ...props }: ComponentProps<"h2">) => {
  return (
    <h2 {...props} className="group flex items-center scroll-m-16 border-t mt-2 pt-4 pb-2 text-2xl font-semibold tracking-tight transition-colors">
      {children}
      <a className="hidden group-hover:block hover:text-accent" href={`#${props.id}`}>
        <Link className="h-5 w-5 ml-1" />
      </a>
    </h2>
  )
}

export const h3 = ({ children, ...props }: ComponentProps<"h3">) => {
  return (
    <h3 {...props} className="group flex items-center scroll-m-16 border-t mt-2 pt-4 pb-2 text-xl font-semibold tracking-tight transition-colors">
      {children}
      <a className="hidden group-hover:block hover:text-accent" href={`#${props.id}`}>
        <Link className="h-4 w-4 ml-1" />
      </a>
    </h3>
  )
}

export const p = ({ children, ...props }: ComponentProps<"p">) => {
  return (
    <p {...props} className="text-base-content/80 leading-7 [&:not(:first-child)]:mt-6">
      {children}
    </p>
  )
}

export const ul = ({ children, ...props }: ComponentProps<"ul">) => {
  return (
    <ul {...props} className="my-6 ml-6 list-disc [&>li]:mt-2 text-base-content/80">
      {children}
    </ul>
  )
}

export const ol = ({ children, ...props }: ComponentProps<"ol">) => {
  return (
    <ol {...props} className="my-6 ml-6 list-decimal [&>li]:mt-2 text-base-content/80">
      {children}
    </ol>
  )
}

export const code = (props: ComponentProps<"code">) => {
  return <code {...props} className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" />
}
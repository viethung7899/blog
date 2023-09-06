import type { ComponentProps } from "react"

export const h2 = ({ children, ...props }: ComponentProps<"h2">) => {
  return (
    <h2 {...props} className="group relative scroll-m-16 border-b mt-2 pt-4 pb-2 text-2xl font-semibold tracking-tight">
      <a className="before:content-['#'] before:absolute before:right-full before:pr-2 before:hidden md:group-hover:before:block before:opacity-50" href={`#${props.id}`}>
        {children}
      </a>
    </h2>
  )
}

export const h3 = ({ children, ...props }: ComponentProps<"h3">) => {
  return (
    <h3 {...props} className="group relative scroll-m-16 border-b mt-2 pt-4 pb-2 text-xl font-semibold tracking-tight">
      <a className="before:content-['#'] before:absolute before:right-full before:pr-2 before:hidden md:group-hover:before:block before:opacity-50" href={`#${props.id}`}>
        {children}
      </a>
    </h3>
  )
}

export const a = ({ children, ...props }: ComponentProps<"a">) => {
  return (
    <a {...props} className="font-semibold text-base-content link link-hover hover:link-accent">
      {children}
    </a>
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
  return <code {...props} className="relative rounded bg-base-300 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" />
}
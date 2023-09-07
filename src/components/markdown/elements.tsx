import type { ComponentProps } from "react"

export const h2 = ({ children, ...props }: ComponentProps<"h2">) => {
  return (
    <h2
      {...props}
      className="group relative mt-2 scroll-m-16 border-b pb-2 pt-4 text-2xl font-semibold tracking-tight"
    >
      <a
        className="before:absolute before:right-full before:hidden before:pr-2 before:opacity-50 before:content-['#'] md:group-hover:before:block"
        href={`#${props.id}`}
      >
        {children}
      </a>
    </h2>
  )
}

export const h3 = ({ children, ...props }: ComponentProps<"h3">) => {
  return (
    <h3
      {...props}
      className="group relative mt-2 scroll-m-16 border-b pb-2 pt-4 text-xl font-semibold tracking-tight"
    >
      <a
        className="before:absolute before:right-full before:hidden before:pr-2 before:opacity-50 before:content-['#'] md:group-hover:before:block"
        href={`#${props.id}`}
      >
        {children}
      </a>
    </h3>
  )
}

export const a = ({ children, ...props }: ComponentProps<"a">) => {
  return (
    <a {...props} className="link-hover link font-semibold text-base-content hover:link-accent">
      {children}
    </a>
  )
}

export const p = ({ children, ...props }: ComponentProps<"p">) => {
  return (
    <p {...props} className="leading-7 text-base-content/80 [&:not(:first-child)]:mt-6">
      {children}
    </p>
  )
}

export const ul = ({ children, ...props }: ComponentProps<"ul">) => {
  return (
    <ul {...props} className="my-6 ml-6 list-disc text-base-content/80 [&>li]:mt-2">
      {children}
    </ul>
  )
}

export const ol = ({ children, ...props }: ComponentProps<"ol">) => {
  return (
    <ol {...props} className="my-6 ml-6 list-decimal text-base-content/80 [&>li]:mt-2">
      {children}
    </ol>
  )
}

export const code = (props: ComponentProps<"code">) => {
  return (
    <code
      {...props}
      className="relative rounded bg-base-300 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
    />
  )
}

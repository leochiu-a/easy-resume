import type { PropsWithChildren } from "react"

const Main = ({ children }: PropsWithChildren) => {
  return (
    <main className="px-10">
      <div className="mx-auto w-full max-w-[1200px]">{children}</div>
    </main>
  )
}

export default Main

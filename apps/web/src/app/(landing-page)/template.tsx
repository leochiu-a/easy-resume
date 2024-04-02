import Header from "@/layouts/Header"
import Main from "@/layouts/Main"

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  )
}

import Header from "@/layouts/Header"

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="mx-auto flex max-w-[700px] justify-center pt-10">
        {children}
      </div>
    </>
  )
}

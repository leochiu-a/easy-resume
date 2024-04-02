import Header from "@/layouts/Header"

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex h-[calc(100vh-80px)] flex-col items-center justify-center gap-8">
        {children}
      </div>
    </>
  )
}

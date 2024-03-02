import HeaderLayout from "@/layouts/HeaderLayout"

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <HeaderLayout>
      <div className="flex h-[calc(100vh-80px)] flex-col items-center justify-center gap-8">
        {children}
      </div>
    </HeaderLayout>
  )
}
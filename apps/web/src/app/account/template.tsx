import HeaderLayout from "@/layouts/HeaderLayout"

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <HeaderLayout>
      <div className="mx-auto flex max-w-[700px] justify-center pt-10">{children}</div>
    </HeaderLayout>
  )
}

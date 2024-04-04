import { cookies } from "next/headers"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import { UserDropdown } from "@/components/UserDropdown"
import { UserAPI } from "@/lib/api/user"

const Header = async () => {
  const accessToken = cookies().get("accessToken")

  let me
  if (accessToken) {
    me = await UserAPI.me()
  }

  return (
    <header className="h-20">
      <nav className="fixed top-0 z-10 flex h-20 w-full bg-white px-10 py-2">
        <div className="mx-auto flex w-full max-w-[1200px]">
          <div className="flex items-center">
            <Link href="/">
              <Typography variant="h3">Easy Resume</Typography>
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/templates">履歷模板</Link>
            </Button>
            {/* TODO: 有時間再來做 */}
            {/* <Button variant="ghost" asChild>
              <Link href="/examples">履歷範本</Link>
            </Button> */}
            <Button variant="ghost" asChild>
              <Link href="/pricing">價格方案</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href={accessToken ? "/resumes" : "/login"}>我的履歷</Link>
            </Button>

            {accessToken && me ? (
              <UserDropdown me={me} />
            ) : (
              <Button variant="ghost" asChild>
                <Link href="/login">登入</Link>
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Typography } from "@/components/ui/typography"

/**
 * 登入頁面
 */
export default function Login() {
  return (
    <>
      <Typography variant="h2">登入你的帳號</Typography>
      <Card className="w-full max-w-[480px] pt-6">
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button
              variant="outline"
              className="bg-[#1371f0] text-white hover:bg-[#1163d3] hover:text-white"
            >
              <FontAwesomeIcon icon={faFacebook} width={16} className="mr-2" />
              Facebook
            </Button>
            <Button
              variant="outline"
              className="bg-[#db4437] text-white hover:bg-[#c53d32] hover:text-white"
            >
              <FontAwesomeIcon icon={faGoogle} width={16} className="mr-2" />
              Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background text-muted-foreground px-2">
                或使用電子郵件登入
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">信箱</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">密碼</Label>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex-1">
            <Button className="block w-full">登入</Button>

            <div className="mt-4 flex items-center justify-center">
              還沒註冊？
              <Button variant="link" asChild>
                <Link href="/register">快速註冊</Link>
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

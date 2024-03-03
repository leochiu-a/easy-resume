import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Typography } from "@/components/ui/typography"

/**
 * 註冊頁面
 */
export default function Register() {
  return (
    <>
      <Typography variant="h2">註冊帳號</Typography>
      <Card className="w-full max-w-[480px] pt-6">
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">信箱</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">密碼</Label>
            <Input id="password" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">確認密碼</Label>
            <Input id="confirm-password" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex-1">
            <Button className="block w-full">登入</Button>

            <div className="mt-4 flex items-center justify-center">
              已經有帳號？
              <Button variant="link" asChild>
                <Link href="/login">登入</Link>
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

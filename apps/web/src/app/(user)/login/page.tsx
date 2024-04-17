"use client"

import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Cookies from "js-cookie"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Typography } from "@/components/ui/typography"
import { useToast } from "@/components/ui/use-toast"
import AuthAPi from "@/lib/api/auth"

interface LoginForm {
  email: string
  password: string
}

/**
 * 登入頁面
 */
export default function Login() {
  const [loading, setLoading] = useState(false)

  const form = useForm<LoginForm>()
  const router = useRouter()
  const { toast } = useToast()

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`
  }

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    setLoading(true)
    AuthAPi.login(data.email, data.password)
      .then((res) => {
        Cookies.set("accessToken", res.data.access_token)
        router.push("/resumes")
      })
      .catch(() => {
        toast({
          title: "登入失敗",
          description: "帳號或密碼錯誤",
        })
        setLoading(false)
      })
  }

  return (
    <>
      <Typography variant="h2">登入你的帳號</Typography>

      <Card className="w-full max-w-[480px] pt-6">
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 gap-6">
            {/* TODO: 等待支援 facebook 登入 */}
            {/* <Button
                  variant="outline"
                  className="bg-[#1371f0] text-white hover:bg-[#1163d3] hover:text-white"
                >
                  <FontAwesomeIcon
                    icon={faFacebook}
                    width={16}
                    className="mr-2"
                  />
                  Facebook
                </Button> */}
            <Button
              variant="outline"
              className="bg-[#db4437] text-white hover:bg-[#c53d32] hover:text-white"
              onClick={handleGoogleLogin}
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
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4"
              id="login"
            >
              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: "請輸入信箱",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "信箱格式錯誤",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>信箱</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                rules={{ required: "請輸入密碼" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>密碼</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </FormProvider>
        </CardContent>
        <CardFooter>
          <div className="flex-1">
            <Button
              className="block w-full"
              type="submit"
              loading={loading}
              form="login"
            >
              登入
            </Button>

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

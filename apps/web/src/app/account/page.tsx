import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Typography } from "@/components/ui/typography"

/**
 * 個人設定首頁
 */
export default function AccountPage() {
  return (
    <div className="w-full">
      <Typography variant="h2" className="mb-5">
        帳號設定
      </Typography>

      <Typography className="mb-2 text-slate-500" variant="p">
        你的訂閱
      </Typography>
      <Card>
        <CardContent className="flex items-center justify-between pt-4">
          <div>
            <Typography variant="p">免費方案</Typography>
            <Typography className="text-slate-500" affects="small">
              你現在的方案是免費方案，可以建立及儲存履歷。
            </Typography>
            <Typography className="text-slate-500" affects="small">
              升級方案後可以下載 PDF 以及體驗更多功能。
            </Typography>
          </div>
          <Button variant="outline">升級</Button>
        </CardContent>
      </Card>

      <Typography className="mb-2 mt-7 text-slate-500" variant="p">
        帳號
      </Typography>
      <Card>
        <CardContent className="flex items-center justify-between pt-4">
          <form className="w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <label htmlFor="username" className="shrink-0">
                  名稱
                </label>
                <Input id="username" />
              </div>
              <Button variant="outline">儲存</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Typography className="mb-2 mt-7 text-slate-500" variant="p">
        危險的操作
      </Typography>
      <Card>
        <CardContent className="flex items-center justify-between pt-4">
          <Typography className="text-slate-500" affects="small">
            一旦你刪除帳號，所有資料將無法復原。
          </Typography>
          <Button variant="outline" className="text-red-500">
            刪除
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

import { faCircleCheck, faCrown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Typography } from "@/components/ui/typography"

const pricingData = [
  {
    function: "創建履歷數量",
    free: "1 份",
    premium: "15 份",
  },
  {
    function: "模板數量",
    free: "3 種",
    premium: "所有模板",
  },
  {
    function: "下載 PDF 履歷",
    free: "無",
    premium: "無限份",
  },
  {
    function: "線上分享履歷",
    free: <FontAwesomeIcon icon={faCircleCheck} className="size-4" />,
    premium: <FontAwesomeIcon icon={faCircleCheck} className="size-4" />,
  },
]

const PricingPage = () => {
  return (
    <div className="my-10">
      <div className="mx-auto max-w-[800px] text-center">
        <Typography variant="h1">升級為高級會員解鎖所有功能</Typography>
        <Typography variant="p">
          秉承簡單的傳統，定價機制透明且價格低廉。所有服務都是單次付費，不會自動續費。
        </Typography>
      </div>
      {/* 購買方案 */}
      <div className="mt-12 flex gap-5">
        <Card className="flex-1">
          <CardTitle>月方案</CardTitle>
          <CardContent>
            <Typography variant="p" className="mt-4">
              只需 100 元,比便當還要便宜。
            </Typography>
            <div className="mt-4 flex gap-1">
              <span>NT$</span>
              <Typography variant="h2">100</Typography>
              <div className="self-end">/一個月</div>
            </div>
            <Button variant="outline" className="mt-4 w-full">
              <FontAwesomeIcon icon={faCrown} className="mr-2 size-4" />
              購買
            </Button>
          </CardContent>
        </Card>
        <Card className="relative flex-1 border-sky-600">
          <Typography
            affects="small"
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-sky-600 p-1 text-white"
          >
            最划算的方案
          </Typography>
          <CardTitle>季方案</CardTitle>
          <CardContent>
            <Typography variant="p" className="mt-4">
              每月低至 80 元, 完美適配招募週期。
            </Typography>
            <div className="mt-4 flex gap-1">
              <span>NT$</span>
              <Typography variant="h2">240</Typography>
              <div className="self-end">/三個月</div>
            </div>
            <Button variant="outline" className="mt-4 w-full">
              <FontAwesomeIcon icon={faCrown} className="mr-2 size-4" />
              購買
            </Button>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardTitle>年方案</CardTitle>
          <CardContent>
            <Typography variant="p" className="mt-4">
              每月低至 60 元, 最便宜的價格選項。
            </Typography>
            <div className="mt-4 flex gap-1">
              <span>NT$</span>
              <Typography variant="h2">720</Typography>
              <div className="self-end">/一年</div>
            </div>
            <Button variant="outline" className="mt-4 w-full">
              <FontAwesomeIcon icon={faCrown} className="mr-2 size-4" />
              購買
            </Button>
          </CardContent>
        </Card>
      </div>
      {/* 方案比較 */}
      <div className="mt-12">
        <div className="mx-auto max-w-[800px] text-center">
          <Typography variant="h1">功能比較</Typography>
          <Typography variant="p">高級會員與免費會員的功能比較。</Typography>

          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>功能</TableHead>
                <TableHead>免費仔</TableHead>
                <TableHead>高級會員</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricingData.map((data, index) => (
                <TableRow key={index}>
                  <TableHead>{data.function}</TableHead>
                  <TableHead>{data.free}</TableHead>
                  <TableHead>{data.premium}</TableHead>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default PricingPage

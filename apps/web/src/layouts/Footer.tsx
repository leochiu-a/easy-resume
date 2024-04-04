import Link from "next/link"

import { Typography } from "@/components/ui/typography"

const Footer = () => {
  return (
    <div className="bg-slate-100 p-6">
      <div className="mx-auto flex max-w-[1200px] justify-between">
        <Typography variant="h3">Easy Resume</Typography>

        <div className="flex w-[800px] justify-between">
          <div className="ml-20 flex flex-col">
            <Typography
              variant="p"
              affects="removePMargin"
              className="mb-2 text-slate-500"
            >
              關於
            </Typography>
            <Typography variant="p" affects="removePMargin">
              <Link href="/about">關於我們</Link>
            </Typography>
            <Typography variant="p" affects="removePMargin">
              <Link href="/pricing">價格方案</Link>
            </Typography>
            <Typography variant="p" affects="removePMargin">
              <Link href="/releases">版本更新</Link>
            </Typography>
          </div>

          <div className="ml-20 flex flex-col">
            <Typography
              variant="p"
              affects="removePMargin"
              className="mb-2 text-slate-500"
            >
              支援及幫助
            </Typography>
            <Typography variant="p" affects="removePMargin">
              <Link href="/releases">聯絡我們</Link>
            </Typography>
            <Typography variant="p" affects="removePMargin">
              <Link href="/about">隱私權政策</Link>
            </Typography>
            <Typography variant="p" affects="removePMargin">
              <Link href="/releases">使用者條款</Link>
            </Typography>
          </div>

          <div className="ml-20 flex flex-col">
            <Typography
              variant="p"
              affects="removePMargin"
              className="mb-2 text-slate-500"
            >
              求職者的資源
            </Typography>
            <Typography variant="p" affects="removePMargin">
              <Link href="/templates">履歷模板</Link>
            </Typography>
            <Typography variant="p" affects="removePMargin">
              <Link href="/examples">履歷範本</Link>
            </Typography>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-slate-500">
        © 2024 Easy Resume. All rights reserved.
      </div>
    </div>
  )
}

export { Footer }

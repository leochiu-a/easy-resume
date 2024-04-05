import { faPalette, faStarOfDavid } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"

import { TypeAnimation } from "./_components/TypeAnimation"

/**
 * landing page 首頁
 */
export default function Home() {
  return (
    <div className="mx-auto my-10">
      <div className="mx-auto text-center">
        <Typography
          variant="h1"
          className="flex items-center justify-center gap-2"
        >
          <span>線上快速建立</span>
          <TypeAnimation
            sequence={[
              "前端工程師",
              "IOS 工程師",
              "後端工程師",
              "Android 工程師",
            ]}
          />
          <span>的專業履歷</span>
        </Typography>
        <Typography variant="p">
          使用簡單的方式來寫履歷，只需<b>專注內容本身，無需關注排版</b>
        </Typography>
        <Button className="mt-10">創建我的履歷</Button>

        <div className="mx-auto mt-10 w-[400px]">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/resume-82399.appspot.com/o/templates%2Fclassic.png?alt=media&token=67cf5790-b142-4587-91b1-b165305718be"
            alt="classic-resume"
          />
        </div>
      </div>
      <div className="mx-auto mt-20 flex max-w-[800px] items-center justify-between">
        <div className="w-[300px]">
          <Typography variant="h2" className="flex items-center">
            <FontAwesomeIcon icon={faPalette} className="mr-2 size-8" />
            多種履歷模板
          </Typography>
          <Typography variant="p">
            使用我們多種優雅且專業設計的簡歷模板，贏得雇主和 HR 的青睞。
          </Typography>
        </div>
        <div className="w-[300px]">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/resume-82399.appspot.com/o/templates%2Fclassic.png?alt=media&token=67cf5790-b142-4587-91b1-b165305718be"
            alt="classic-resume"
          />
        </div>
      </div>

      <div className="mx-auto mt-20 flex max-w-[800px] items-center justify-between">
        <div className="w-[300px]">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/resume-82399.appspot.com/o/templates%2Fclassic.png?alt=media&token=67cf5790-b142-4587-91b1-b165305718be"
            alt="classic-resume"
          />
        </div>
        <div className="w-[350px]">
          <Typography variant="h2" className="flex items-center">
            <FontAwesomeIcon icon={faStarOfDavid} className="mr-2 size-8" />
            線上履歷與下載 PDF
          </Typography>
          <Typography variant="p">
            使用我們多種優雅且專業設計的簡歷模板，贏得雇主和 HR 的青睞。
          </Typography>
        </div>
      </div>
    </div>
  )
}

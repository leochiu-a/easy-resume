import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Typography } from "@/components/ui/typography"

/**
 * 模板頁面
 */
export default function TemplatesPage() {
  return (
    <div className="my-10">
      <div className="mx-auto max-w-[800px] text-center">
        <Typography variant="h1">贏得工作的履歷模板</Typography>
        <Typography variant="p">打造你的履歷，開啟職場新旅程 </Typography>
      </div>

      <div className="mx-auto mt-12 grid max-w-[1000px] grid-cols-3 gap-x-6 gap-y-10">
        {Array.from({ length: 10 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="px-0">
              <div>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/resume-82399.appspot.com/o/templates%2Fclassic.png?alt=media&token=67cf5790-b142-4587-91b1-b165305718be"
                  alt="classic-resume"
                />
              </div>
              <div className="px-6">
                <Typography variant="p" className="font-semibold">
                  經典
                </Typography>
                <Typography
                  variant="p"
                  className="text-gray-500"
                  affects="removePMargin"
                >
                  經典履歷模板，助你展現專業風采，開啟職場新旅程
                </Typography>
              </div>
            </CardContent>

            <CardFooter className="justify-between">
              <Button variant="secondary">選擇履歷模板</Button>
              <Button variant="link">
                查看在線履歷
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

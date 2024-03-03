import {
  faChevronLeft,
  faCrown,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="flex bg-slate-600 px-10 py-2">
        <Button variant="link" className="text-white" asChild>
          <Link href="/resumes">
            <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
            回到我的履歷
          </Link>
        </Button>

        <div className="ml-auto flex gap-4">
          <Button variant="secondary">
            <FontAwesomeIcon icon={faCrown} className="mr-2" />
            升級使用更多模板
          </Button>
          <Button variant="secondary">
            <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
            下載 PDF
          </Button>
        </div>
      </nav>
      {/* Layout UI */}
      <main>{children}</main>
    </>
  )
}

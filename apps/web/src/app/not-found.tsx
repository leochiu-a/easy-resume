import Link from "next/link"

export default async function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <p>
        View <Link href="/">回到首頁</Link>
      </p>
    </div>
  )
}

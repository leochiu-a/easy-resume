interface PreviewResumeProps {
  params: {
    id: string
  }
}

/**
 * 瀏覽履歷
 */
export default function PreviewResume({ params: { id } }: PreviewResumeProps) {
  return <div>瀏覽履歷: {id}</div>
}

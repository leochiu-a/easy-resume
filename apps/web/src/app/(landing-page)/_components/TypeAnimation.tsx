"use client"

import { useEffect, useState } from "react"

interface TypeAnimationProps {
  sequence: string[]
}

const TypeAnimation = ({ sequence }: TypeAnimationProps) => {
  const [sequenceNumber, setSequenceNumber] = useState(0)
  const [textIndex, setTextIndex] = useState(0)
  const [reverse, setReverse] = useState(false)
  const displayText = sequence[sequenceNumber].substring(0, textIndex)

  const currentText = sequence[sequenceNumber]

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (!reverse) {
      timeout = setTimeout(() => {
        if (textIndex < currentText.length) {
          setTextIndex((prevIndex) => prevIndex + 1)
        } else {
          setTimeout(() => {
            setReverse(true)
          }, 300)
        }
      }, 200)
    } else {
      timeout = setTimeout(() => {
        if (textIndex > 0) {
          setTextIndex((prevIndex) => prevIndex - 1)
        } else {
          setReverse(false)
          setSequenceNumber((prevNumber) => (prevNumber + 1) % sequence.length)
        }
      }, 100)
    }

    return () => clearTimeout(timeout)
  }, [currentText.length, reverse, sequence.length, textIndex])

  return (
    <>
      <span>{displayText}</span>
      <span className="animate animate-blink-caret h-10 border-2 border-slate-500 align-middle" />
    </>
  )
}

export { TypeAnimation }

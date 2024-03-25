import { FC, Fragment } from "react"
import { faCircle } from "@fortawesome/free-regular-svg-icons"
import {
  faLocationDot,
  faMobileScreen,
  faUser,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import dayjs from "dayjs"

import { Field, GroupLayout, Resume } from "@/types/api/resumes"

import { Avatar, AvatarImage } from "../ui/avatar"
import { Typography } from "../ui/typography"

const { Simple } = GroupLayout

interface SectionProps {
  title: string
  fields?: Field[]
  text?: string
  layout?: GroupLayout
}

const DateRange = ({
  from,
  to,
}: {
  from: string | null
  to: string | null
}) => {
  if (!from && !to) return null

  return (
    <div className="flex gap-1 text-gray-500">
      <span>{from ? dayjs(from).format("YYYY-MM-DD") : ""}</span>
      <span>-</span>
      <span>{to ? dayjs(to).format("YYYY-MM-DD") : "至今"}</span>
    </div>
  )
}

const Section: FC<SectionProps> = ({ title, fields, text, layout }) => {
  const timelineElement = (
    <div className="relative top-1.5">
      <div className="flex h-full flex-col items-center">
        <FontAwesomeIcon icon={faCircle} className="size-1.5" />
        <div className="h-full w-px bg-black"></div>
      </div>
    </div>
  )

  return (
    <div className="grid grid-cols-[max-content_1fr] gap-x-4">
      <FontAwesomeIcon icon={faUser} className="self-center" />
      <Typography variant="h4">{title}</Typography>

      {text ? (
        <>
          {timelineElement}
          <div>{text}</div>
        </>
      ) : (
        fields?.map((field, index) => (
          <Fragment key={index}>
            {timelineElement}
            <div>
              {layout === Simple ? (
                <div>
                  <div className="font-semibold">{field.field1}</div>
                  <DateRange
                    from={field.timeline?.from}
                    to={field.timeline?.to}
                  />
                  <div
                    dangerouslySetInnerHTML={{ __html: field.description }}
                    className={index !== fields.length - 1 ? "pb-4" : ""}
                  ></div>
                </div>
              ) : (
                <div>
                  <div className="font-semibold">
                    {field.field1} - {field.field2}
                  </div>
                  <div className="flex gap-1 text-gray-500">
                    <span>{field.field3}</span>
                    <span>-</span>
                    <DateRange
                      from={field.timeline?.from}
                      to={field.timeline?.to}
                    />
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: field.description }}
                    className={index !== fields.length - 1 ? "pb-4" : ""}
                  ></div>
                </div>
              )}
            </div>
          </Fragment>
        ))
      )}
    </div>
  )
}

type BasicTemplateProps = Pick<
  Resume,
  | "wantedJob"
  | "username"
  | "avatarUrl"
  | "city"
  | "phone"
  | "email"
  | "socialLinks"
  | "groups"
  | "intro"
>

const BasicTemplate: FC<BasicTemplateProps> = ({
  wantedJob,
  username,
  avatarUrl,
  city,
  phone,
  email,
  socialLinks,
  groups,
  intro,
}) => {
  return (
    <div className="bg-white px-14 py-10">
      <div className="flex flex-col items-center gap-2">
        <Avatar>
          <AvatarImage src={avatarUrl} />
        </Avatar>
        <Typography variant="h2">{username}</Typography>

        <div className="flex gap-4">
          <span>{wantedJob}</span>
          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faLocationDot} className="size-5" />
            {city}
          </span>
          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faMobileScreen} className="size-5" />
            {phone}
          </span>
        </div>
      </div>

      <div className="mt-8 flex gap-10">
        <div className="flex-1">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faCircle} className="size-1.5" />
              <span className="font-semibold">詳細資訊</span>
              <FontAwesomeIcon icon={faCircle} className="size-1.5" />
            </div>
            <div>
              <div>{city}</div>
              <div>{phone}</div>
              <div className="underline">{email}</div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faCircle} className="size-1.5" />
            <span className="font-semibold">社群連結</span>
            <FontAwesomeIcon icon={faCircle} className="size-1.5" />
          </div>
          <div>
            {socialLinks.map((link, index) => (
              <div key={index}>
                <div>{link.name}</div>
                <div>{link.url}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-[3] space-y-6">
          <Section title="自我介紹" text={intro} />

          {groups.map((section, index) => (
            <Section {...section} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BasicTemplate

import { FC, forwardRef, Fragment } from "react"
import { faCircle } from "@fortawesome/free-regular-svg-icons"
import {
  faEnvelope,
  faLocationDot,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import dayjs from "dayjs"

import socialMediaIcon from "@/lib/utils/socialMediaIcon"
import { cn } from "@/lib/utils/tailwindUtils"
import { Field, GroupLayout, Resume } from "@/types/api/resumes"

import { Avatar, AvatarImage } from "../ui/avatar"
import { Typography } from "../ui/typography"

import "./BasicTemplate.css"

const { Simple } = GroupLayout

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

interface SectionProps {
  title: string
  fields?: Field[]
  text?: string
  layout?: GroupLayout
  hide: boolean
}

const Section: FC<SectionProps> = ({ title, fields, text, layout, hide }) => {
  const timelineElement = (
    <div className="relative top-1.5">
      <div className="flex h-full flex-col items-center">
        <FontAwesomeIcon icon={faCircle} className="size-1.5" />
        <div className="h-full w-px bg-black"></div>
      </div>
    </div>
  )

  return (
    <div
      className={cn(
        "grid grid-cols-[max-content_1fr] gap-x-4",
        hide && "hidden",
      )}
    >
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

const BasicTemplate = forwardRef<HTMLDivElement, BasicTemplateProps>(
  (
    {
      wantedJob,
      username,
      avatarUrl,
      city,
      phone,
      email,
      socialLinks,
      groups,
      intro,
    },
    ref,
  ) => {
    return (
      <div className="bg-white p-10">
        <div ref={ref}>
          <div className="flex flex-col items-center gap-2">
            <Avatar>
              <AvatarImage src={avatarUrl} />
            </Avatar>
            <div className="flex items-baseline gap-4">
              <Typography variant="h2" affects="removePMargin">
                {username}
              </Typography>
              <span className="font-semibold">{wantedJob}</span>
            </div>
          </div>

          <div className="mt-8 flex gap-10 text-sm">
            <div className="flex-1">
              <div className="space-y-2">
                <span className="font-semibold">個人資訊</span>
                <div className="space-y-1">
                  <div>
                    <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                    {city}
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faPhone} className="mr-2" />
                    {phone}
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                    {email}
                  </div>
                </div>
              </div>

              {socialLinks.length > 0 && (
                <>
                  <div className="mt-4 space-y-2">
                    <span className="font-semibold">社群連結</span>

                    <div className="space-y-1">
                      {socialLinks.map((link, index) => (
                        <div key={index}>
                          <FontAwesomeIcon
                            icon={socialMediaIcon(link.name)}
                            className="mr-2"
                          />
                          {link.url}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex-[3] space-y-6">
              <Section
                title="自我介紹"
                text={intro}
                hide={intro.length === 0}
              />

              {groups.map((section, index) => (
                <Section
                  {...section}
                  key={index}
                  hide={section.fields.length === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  },
)

BasicTemplate.displayName = "BasicTemplate"

export default BasicTemplate

import {
  faFacebook,
  faGithub,
  faLinkedin,
  faMedium,
  faTwitter,
  IconDefinition,
} from "@fortawesome/free-brands-svg-icons"
import { faBlog } from "@fortawesome/free-solid-svg-icons"

const iconMap: Record<string, IconDefinition> = {
  medium: faMedium,
  linkedin: faLinkedin,
  facebook: faFacebook,
  twitter: faTwitter,
  github: faGithub,
}

const socialMediaIcon = (key: string) => {
  const inCaseSensitive = key.toLowerCase()

  if (inCaseSensitive in iconMap) {
    return iconMap[inCaseSensitive]
  }

  return faBlog
}

export default socialMediaIcon

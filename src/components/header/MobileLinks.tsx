import { ABOUT_ME_LINK, GITHUB_LINK, LINKEDIN_LINK } from "@/constants"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import Icons from "../icons"

const LINKS = [
  { label: "About me", href: ABOUT_ME_LINK },
  { label: "GitHub", href: GITHUB_LINK },
  { label: "Linkedin", href: LINKEDIN_LINK },
]

export default function MobileLinks() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="btn btn-ghost btn-sm normal-case">
          Links
          <Icons.chevron className="h-4 w-4" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content asChild align="end">
        <ul className="menu rounded-box mt-2 w-32 bg-base-300">
          {LINKS.map((link, i) => (
            <li key={i}>
              <DropdownMenu.Item>
                <a href={link.href} target="_blank">
                  {link.label}
                </a>
              </DropdownMenu.Item>
            </li>
          ))}
        </ul>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

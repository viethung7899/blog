import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { useEffect } from "react"
import { updateThemeStore } from "./themeStore"

export default function ThemePicker() {
  useEffect(() => {
    updateThemeStore()
  }, [])

  const THEMES = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "night" },
    { label: "System", value: "system" },
  ] as const

  const setTheme = (theme: (typeof THEMES)[number]) => {
    if (theme.value === "system") {
      localStorage.removeItem("theme")
      document.documentElement.setAttribute(
        "data-theme",
        window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "light",
      )
    } else {
      document.documentElement.setAttribute("data-theme", theme.value)
      localStorage.setItem("theme", theme.value)
    }
    updateThemeStore()
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="btn btn-square btn-ghost btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 dark:hidden"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hidden h-4 w-4 dark:block"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content asChild align="end">
        <ul className="menu rounded-box z-50 mt-2 w-32 bg-base-300">
          {THEMES.map((theme) => (
            <li key={theme.value}>
              <DropdownMenu.Item asChild onClick={() => setTheme(theme)}>
                <a>{theme.label}</a>
              </DropdownMenu.Item>
            </li>
          ))}
        </ul>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "K1T Open Dashboard",
  description: "K1T Open Dashboard",
  yearLists: ["2023", "2024"],
  navItems: [
    {
      label: "ホーム",
      href: "/",
    },
    {
      label: "教職員",
      href: "/faculties",
    },
    {
      label: "学生",
      href: "/college-students",
    },
    {
      label: "入試",
      href: "/admission",
    },
  ],
  navMenuItems: [
    {
      label: "ホーム",
      href: "/",
    },
    {
      label: "教職員",
      href: "/faculties",
    },
    {
      label: "学生",
      href: "/college-students",
    },
    {
      label: "入試",
      href: "/admission",
    },
  ],
  links: {
    github: "https://github.com/k1tnet",
  },
};

import { Group, Code, ScrollArea, rem } from "@mantine/core";
import {
  IconAlignJustified,
  IconFlower,
  IconHome,
  IconLock,
  IconPassword,
  IconStethoscope,
} from "@tabler/icons-react";
import classes from "./NavBarNested.module.css";
import { ActionToggle } from "../ActionToggle/ActionToggle";
import { LinksGroup } from "../NavBarLinksGroup/NavBarLinksGroup";

const data = [
  { label: "Home", icon: IconHome, link: "/" },
  {
    label: "Password Generator",
    icon: IconPassword,
    initiallyOpened: true,
    links: [
      { label: "Password", link: "/password-generator", icon: IconLock },
      {
        label: "Passphrase",
        link: "/passphrase-generator",
        icon: IconAlignJustified,
      },
      { label: "Haiku", link: "/haiku-generator", icon: IconFlower },
      {
        label: "Password strength",
        link: "/password-strength",
        icon: IconStethoscope,
      },
    ],
  },
];

export function NavbarNested() {
  const links = data.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          Tech-Tools
          <Code fw={700}>v0.0.1</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <ActionToggle />
      </div>
    </nav>
  );
}

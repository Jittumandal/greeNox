import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import {
  Burger,
  Center,
  Container,
  Drawer,
  Group,
  Menu,
  Stack,
  Collapse,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import classes from "./HeaderMenu.module.css";
import greeNoxlogo from "../assets/logo.svg";

const links = [
  { link: "/", label: "Home" },
  // {
  //   link: "#1",
  //   label: "Learn",
  //   links: [
  //     { link: "/docs", label: "Documentation" },
  //     { link: "/resources", label: "Resources" },
  //     { link: "/community", label: "Community" },
  //     { link: "/blog", label: "Blog" },
  //   ],
  // },
  { link: "/menu", label: "Menu" },
  { link: "/subscriptionPlan", label: "Subscription Plan" },
  { link: "/about", label: "About" },
  { link: "/blog", label: "Blog" },

  {
    link: "/contact",
    label: "contact",
    links: [
      { link: "/faq", label: "FAQ" },
      { link: "/demo", label: "Book a demo" },
      { link: "/forums", label: "Forums" },
    ],
  },
];

export default function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState(null);

  const handleMobileToggle = (label) => {
    setActiveMobileMenu((prev) => (prev === label ? null : label));
  };

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={14} stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  const mobileItems = links.map((link) => {
    const hasSubmenu = link.links?.length;

    return (
      <div key={link.label}>
        <Button
          variant="subtle"
          fullWidth
          onClick={() => (hasSubmenu ? handleMobileToggle(link.label) : null)}
          component="a"
          href={hasSubmenu ? undefined : link.link}
          rightSection={
            hasSubmenu &&
            (activeMobileMenu === link.label ? (
              <IconChevronUp size={16} />
            ) : (
              <IconChevronDown size={16} />
            ))
          }
        >
          {link.label}
        </Button>

        {hasSubmenu && (
          <Collapse in={activeMobileMenu === link.label}>
            <Stack spacing={4} pl="md">
              {link.links.map((item) => (
                <Button
                  key={item.link}
                  variant="light"
                  component="a"
                  href={item.link}
                  fullWidth
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          </Collapse>
        )}
      </div>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="xl">
        <div className={classes.inner}>
          <a href="/">
            <img src={greeNoxlogo} className={classes.logo} alt="Logo" />
          </a>
          <Group gap={5} visibleFrom="sm">
            {items}
            <Group visibleFrom="sm">
              <Button variant="default">Log in</Button>
              <Button style={{ backgroundColor: "#22683d" }}>Register</Button>
            </Group>
          </Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        padding="md"
        size="100%"
        hiddenFrom="sm"
        title="Menu"
      >
        <Stack>{mobileItems}</Stack>
      </Drawer>
    </header>
  );
}

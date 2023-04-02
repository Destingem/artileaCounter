import { Navbar, Group, Code, ScrollArea, createStyles, rem } from '@mantine/core';
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
} from '@tabler/icons-react';
import  UserButton  from './UserButton';
import  LinksGroup  from './NavbarLinksGroup';
import logo from "../../img/web_artilea.png";
import style from "./style.module.scss";
const mockdata = [
  { label: 'Přehled', icon: IconGauge, link: '/app/' },
  {
    label: 'Závody',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Přehled závodů', link: '/app/competition' },
      { label: 'Vytvořit nový závod', link: '/' },
      { label: 'Outlook', link: '/' },
      { label: 'Real time', link: '/' },
    ],
  },
  {
    label: 'Lidé',
    icon: IconCalendarStats,
    links: [
      { label: 'Přehled lidí', link: '/' },
      { label: 'Střelci', link: '/' },
      { label: 'Rozhodčí', link: '/' },
    ],
  },
  {
    label: 'Propojení',
    icon: IconLock,
    links: [
      { label: 'Promítání výsledků', link: '/' },
      { label: 'Online registrace', link: '/' },
      { label: 'Připojení elektronických terčů', link: '/' },
    ],
    },
  { label: 'Analytika', icon: IconPresentationAnalytics },
  { label: 'Disciplíny', icon: IconFileAnalytics },
  { label: 'Střelnice', icon: IconFileAnalytics },
  { label: 'Kluby', icon: IconFileAnalytics },
  { label: 'Nastavení', icon: IconAdjustments, link: "/app/settings" },
  
 
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export default function Linky() {
  const { classes } = useStyles();
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <Navbar height={"100vh"}  p="md" className={classes.navbar} >
      <Navbar.Section className={classes.header}>
        <Group position="apart">
          <img src={logo} alt="logo" width="150" height="50" />
          <Code sx={{ fontWeight: 700 }}>v1.0.0</Code>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UserButton
          image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
          name="Ondřej Zaplatílek"
          email="ondrej.zaplatilek@gmail.com"
        />
      </Navbar.Section>
    </Navbar>
  );
}
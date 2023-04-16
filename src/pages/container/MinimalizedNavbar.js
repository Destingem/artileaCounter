import { useState } from 'react';
import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Stack, rem, Group, Code } from '@mantine/core';
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import { BiArrowFromLeft } from 'react-icons/bi';
import logo2 from "../../img/artilea_full_transparent.png";
import { NavLink } from 'react-router-dom';
const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));



function NavbarLink({ icon: Icon, label, active, onClick, link }) {
  const { classes, cx } = useStyles();
  if(link){
    return (
        <NavLink to={link}>
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
          <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
            <Icon size="1.2rem" stroke={1.5} />
          </UnstyledButton>
        </Tooltip>
        </NavLink>
      );
  } else{
    return (
        
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
          <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
            <Icon size="1.2rem" stroke={1.5} />
          </UnstyledButton>
        </Tooltip>
        
      );
  }
}



export function NavbarMinimal({data, setOpen, active, setActive}) {
  

  const links = data.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <Navbar height={"100%"} width={{ base: 80 }} p="md">
      <div style={{display: "flex", flexDirection: "column", justifyContent: "center", gap: "1vh"}}>
      <img src={logo2} alt="logo" width="45" height="45" />
     <Group> <Code sx={{ fontWeight: 700 }}>v1.0.0</Code></Group> 
      </div>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={30}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink onClick={()=> {setOpen((prev)=> {return !prev})}} icon={BiArrowFromLeft} label="Maximalizovat menu" />
          <NavbarLink icon={IconLogout} label="Logout" />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
import { Navbar, Group, Code, ScrollArea, createStyles, rem, ActionIcon, Flex, Text, Menu, Button } from '@mantine/core';
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  IconSettings,
  IconTrash,
} from '@tabler/icons-react';
import  UserButton  from './UserButton';
import  LinksGroup  from './NavbarLinksGroup';
import logo from "../../img/web_artilea.png";

import style from "./style.module.scss";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import { useState } from 'react';
import { BiArrowFromRight } from 'react-icons/bi';
import { IconMessageCircle } from '@tabler/icons-react';
import { IconPhoto } from '@tabler/icons-react';
import { IconSearch } from '@tabler/icons-react';
import { IconArrowsLeftRight } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser, selectUser } from '../../reducers/appSlice';
import { NavLink } from 'react-router-dom';
const { openExternal } = window.electron;

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
    marginTop: 'auto',
    marginBottom: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export default function Linky({data, setOpen}) {
  
  const { classes } = useStyles();
  const links = data.map((item, index) => <LinksGroup index={index} {...item} key={item.label} />);
  const dispatch = useDispatch();
  const openGoogle = () => {
    openExternal('https://www.artilea.eu');
  };
  const user = useSelector(selectUser);
  return (
    <Navbar height={"100vh"}  p="md" className={classes.navbar} >
      <Navbar.Section className={classes.header}>
        
          <Group position="apart"><img src={logo} alt="logo" width="150" height="50" />
          <Code sx={{ fontWeight: 700 }}>v1.0.0</Code></Group> 
       
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Flex direction="column">
        <ActionIcon style={{display: "flex", justifyContent: "space-evenly"}} color="blue" size="100%" h="5vh" radius="xs" onClick={()=> {setOpen((prev)=> {return !prev})}} >
        <Text>Minimalizovat menu</Text>
        <BiArrowFromRight />
        </ActionIcon>
        <Menu  position="left-end" withArrow arrowPosition="center">  
        <Menu.Target>
        <UserButton
          image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
          name={user?.name}
          email={user?.email}
         
          
        />
        </Menu.Target>
       <Menu.Dropdown sx={{position: "absolute", bottom: "15px", top: "inherit !important", left: "275px !important"}}>
       <Menu.Label>Správa účtu</Menu.Label>
        <NavLink to={"/app/settings"}><Menu.Item icon={<IconSettings size={14} />}  rightSection={<Text size="xs" color="dimmed" sx={{marginLeft: "1vw"}}> ALT + 9</Text>}>Nastavení</Menu.Item></NavLink>
        <Menu.Item onClick={openGoogle}  icon={<IconMessageCircle size={14} />}>Váš účet Artilea</Menu.Item>
       
       

        <Menu.Divider />

        <Menu.Label>Aplikace</Menu.Label>
       
        <Menu.Item onClick={()=> {dispatch(resetUser())}} color="red" icon={<IconArrowsLeftRight size={14} />}>Odhlásit se</Menu.Item>
     
       </Menu.Dropdown>
        </Menu>
        
        </Flex>
      </Navbar.Section>
    </Navbar>
  );
}
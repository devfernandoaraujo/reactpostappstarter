import { Menu, Group, Center, Container, Button, ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { useDisclosure, useHotkeys } from '@mantine/hooks';
import { IconChevronDown, IconSun, IconMoon } from '@tabler/icons-react';
import cx from 'clsx';
import { NavLink, Link } from "react-router-dom";
import useBoundStore from "../../store/Store";
import classes from '../../css/HeaderMenu.module.css'


const Navbar = () => {
  const { logoutService, user } = useBoundStore((state) => state);
  const onLogout = () => {
    logoutService();
  };

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const toggleColorScheme = (value) => {
    setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
  };

  const links = [
    { key: crypto.randomUUID() ,link: '/', label: 'Home', isVisible: true },
    { key: crypto.randomUUID() ,link: '/posts', label: 'Posts', isVisible: user !== null },
    { key: crypto.randomUUID() ,link: '/', label: 'Logout', isVisible: user !== null, isButton: true, onClick: onLogout  },
    { key: crypto.randomUUID() ,link: 'login', label: 'Login', isVisible: user === null, isButton: true }
    
  ];

  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => {
     
    const isButton = link.isButton;
    const isVisible = link.isVisible;

    if(!isVisible){
      return null;
    }

    if(isButton){
      return(
        <Button 
          key={link.key}
          variant="filled"
          href={link.link}
          onClick={(event) => {event.preventDefault(); link.onClick?.() }}
        >
          <Link to={link.link}>{link.label}</Link>
        </Button>
      )
    }

    return (
        <NavLink key={link.key} to={link.link} className={classes.link}>
          {link.label}
        </NavLink>
    );
  });

  return (

    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <NavLink to="/">
            <h3 style={{ color: "black" }}>LOGO</h3>
          </NavLink>
          <Group gap={30}>
            {items}
            <ActionIcon
              onClick={() => toggleColorScheme()}
                variant="default"
                size="xl"
                aria-label="Toggle color scheme"
              >
              <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
              <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
            </ActionIcon>
          </Group>
        </div>
      </Container>
    </header>


  );
  
};

export default Navbar;

import {
    UnstyledButton,
    UnstyledButtonProps,
    Group,
    Avatar,
    Text,
    createStyles,
  } from '@mantine/core';
  import { IconChevronRight } from '@tabler/icons-react';


  const useStyles = createStyles((theme) => ({
    user: {
      display: 'block',
      width: '100%',
      padding: theme.spacing.md,
      backgroundColor: "#e6e6e6",
      transition: 'background-color 150ms ease',
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
  
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? "#cccccc" : "#cccccc" ,
      },
    },
  }));
  
 
  
  export default function UserButton({image, name, email, icon, ...others }) {
    
    const { classes } = useStyles();
  others = {...others,id: "",["aria-controls"]: "",className: classes.user,}
 
    return (
      <UnstyledButton className={classes.user} {...others} >
        <Group noWrap>
         
  
          <div style={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {name}
            </Text>
  
            <Text color="dimmed" size="xs">
              {email}
            </Text>
          </div>
  
          {icon || <IconChevronRight size="0.9rem" stroke={1.5} />}
        </Group>
      </UnstyledButton>
    );
  }
import { Center, Group, Text, UnstyledButton, createStyles, rem } from "@mantine/core";
import { IconChevronDown, IconChevronUp, IconSelector } from "@tabler/icons-react";

export default function Th({ children, reversed, sorted, onSort }) {
    const useStyles = createStyles((theme) => ({
        th: {
          padding: "0 !important",
        },
        control: {
          width: "100%",
          padding: `${theme.spacing.xs} ${theme.spacing.md}`,
          "&:hover": {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
          },
        },
        icon: {
          width: rem(21),
          height: rem(21),
          borderRadius: rem(21),
        },
      }));
    const { classes } = useStyles();
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  
    return (
      <th className={classes.th}>
        <UnstyledButton onClick={onSort} className={classes.control}>
          <Group position="apart">
            <Text fw={500} fz="sm">
              {children}
            </Text>
            <Center className={classes.icon}>
              <Icon size="0.9rem" stroke={1.5} />
            </Center>
          </Group>
        </UnstyledButton>
      </th>
    );
  }
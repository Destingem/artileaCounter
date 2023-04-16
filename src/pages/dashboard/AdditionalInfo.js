import { Icon } from "@iconify/react";
import { Card, Grid, SimpleGrid, Space } from "@mantine/core";
import { NavLink } from "react-router-dom";

export default function AdditionalInfo(props) {
  let data = [
    {
      name: "Propojení",
      href: "/app/connections",
      icon: "bi:link-45deg",
      color: "var(--purple-cl)",
    },
    {
      name: "Analytika",
      href: "/app/analytics",
      icon: "bi:bar-chart-fill",
      color: "var(--yellow-cl)",
    },
    {
      name: "Disciplíny",
      href: "/app/discipline",
      icon: "bi:bar-chart-fill",
      color: "var(--yellow-cl)",
    },
    {
      name: "Nastavení",
      href: "/app/settings",
      icon: "bi:gear-fill",
      color: "var(--orange-cl)",
    },
    {
        name: "Střelnice",
        href: "/app/shootingrange",
        icon: "bi:gear-fill",
        color: "var(--orange-cl)",
      },
  ];
  return(
    <SimpleGrid cols={5} mt={"1vh"}>
        {data.map((el, index) => (
            
            <NavLink to={el.href} data-style="card" key={index}>
            <Card display={"flex"} sx={{alignItems: "center", gap: "0.5vw"}}>
            <h3 style={{ color: el.color }}>{el.name}</h3>
            <Space h="xs" />
            <div style={{marginBottom: "-0.5vh"}}>
                <Icon color={el.color} icon={el.icon} />
            </div>
            <i style={{ backgroundColor: el.color }} />
            </Card>
            </NavLink>
          
        ))}
    </SimpleGrid>
  )
}

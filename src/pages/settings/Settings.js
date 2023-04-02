
import { Badge, Button, Card, Container, Grid, Group, Image, Paper, Text } from "@mantine/core";
import { FiSettings } from "react-icons/fi";
import Services from "./Service";
import Billing from "./Billing";
import MyProfile from "./MyProfile";
import MyAccount from "./MyAccount";

export default function Setting(){

    return(
      <div style={{overflow: "auto"}}>
          <Container size="xl" sx={{maxHeight: "100%"}} >
            <Grid>
                <Grid.Col span={12}>
                <Paper bg={"#fff"}  w="100%" sx={{padding: "1vh 2vw", marginTop: "1vh", borderRadius: "3px", minHeight: "5vh", height: "fitContent"}}>
        <Group>
        <FiSettings size="2rem"/>
            <Text component="h1" size="2rem">Nastavení</Text>
        </Group>

            
        </Paper>
        </Grid.Col>
       <Grid.Col span={12}>
        <Services />
       </Grid.Col>
       
       <Grid.Col span={12}>
        <MyProfile />
       </Grid.Col>
       <Grid.Col span={12}>
        <Billing />
       </Grid.Col>
       <Grid.Col span={12}>
        <MyAccount />
       </Grid.Col>
       
               
            </Grid>
        </Container>
      </div>
    )
}
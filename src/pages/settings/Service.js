import { Badge, Button, Card, Divider, Flex, Grid, Group, Indicator, Space, Text, ThemeIcon } from "@mantine/core";
import SettingsCard from "./SettingsCard";
import { BiCheckCircle } from "react-icons/bi";
let predplatna = [{nazev: "Free", cena: "0 Kč", nadpis: "Základní předplatné",text: "", button: "Přejít na základní plán"}, {nazev: "Premium", cena: "199 Kč", nadpis: "Základní předplatné",text: "", button: "Upgradovat na Premium"}, {nazev: "Pro", cena: "299 Kč", nadpis: "Základní předplatné",text: "", button: "Upgradovat na Pro"}]
let selected = "Free"
export default function Services(){
    return(
        <SettingsCard label="Moje předplatné">
       
            
            <Grid>
                {predplatna.map((item)=> {
                    return(
                        <Grid.Col span={4}>
                            <Indicator size={0}  label={selected == item.nazev && <ThemeIcon radius="xl" color="green"><BiCheckCircle size="4rem" /></ThemeIcon>}>
                            <Card withBorder shadow="sm" radius="md" bg={"#f0f1f1"}>
                            
                            <Text component="h3" size="3rem" align="center" >{item.nazev}</Text>
                            
                            <Text align="center" component="p" size="1.2rem">{item.nadpis}</Text>
                            <Space h="2vh" />
                            <Flex justify="center" gap="1vw"><Text align="right" component="h3" size="1.5rem">{item.cena}</Text> <Text mt="auto" >za měsíc</Text> </Flex>
                            <Space h="2vh" />
                           {selected !== item.nazev && <Button color="green" component="button" sx={{width: "100%"}} ><Text align="center">{item.button}</Text></Button>}
                            </Card>
                            </Indicator>
                        </Grid.Col>
                    )
                })}
            </Grid>
        </SettingsCard>
    )
}
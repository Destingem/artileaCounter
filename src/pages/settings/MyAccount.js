import { Button, Card, Flex, Group, Select, Space, Stack, Text } from "@mantine/core";
import SettingsCard from "./SettingsCard";
import StackCard from "./StackCard";

let languages = ["Čeština", "English", "Deutsch", "Spain", "Français", "Italiano", "Polski", "Português", "Русский", "Türkçe", "Українська"]

export default function MyAccount(){
    return(
        <SettingsCard label="Nastavení programu">
       
      
        <Flex direction="column" gap="1vh">
        <StackCard heading="Jazyk" desc="Zde můžete změnit lokalizaci programu" right={<Select data={languages} dropdownPosition="bottom" />} />
      
        </Flex>
        
        </SettingsCard>
    )
}
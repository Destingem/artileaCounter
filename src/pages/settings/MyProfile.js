import { Divider, Grid, Text } from "@mantine/core"
import SettingsCard from "./SettingsCard"

let info = {fName: "Ondřej", lName: "Zaplatílek", email: "ondrej.zaplatilek@gmail.com", tel: "+420 608 270 754 ", birthDate: "1/9/2004"}
export default function MyProfile(){
return(
    <SettingsCard label="Můj profil">
       

        
        <Grid>
            <Grid.Col span={6}>
                <Text component="h3" size="1.2rem">Jméno</Text>
                <Text component="p" size="1.2rem">{info.fName}</Text>

        </Grid.Col>
        <Grid.Col span={6}>
                <Text component="h3" size="1.2rem">Příjmení</Text>
                <Text component="p" size="1.2rem">{info.lName}</Text>

        </Grid.Col>
        <Grid.Col span={6}>
                <Text component="h3" size="1.2rem">Email</Text>
                <Text component="p" size="1.2rem">{info.email}</Text>
        
        </Grid.Col>
        <Grid.Col span={6}>
                <Text component="h3" size="1.2rem">Telefon</Text>
                <Text component="p" size="1.2rem">{info.tel}</Text>

        </Grid.Col>
        <Grid.Col span={6}>
                <Text component="h3" size="1.2rem">Datum narození</Text>
                <Text component="p" size="1.2rem">{info.birthDate}</Text>

        </Grid.Col>
        <Grid.Col span={6}>
            <Text size="1.2rem" weight={700} color="blue" mt="auto" >Změny můžete provést na Artilea Cloud</Text>
        </Grid.Col>
        </Grid>

    </SettingsCard>
)
}
import { Divider, Paper, Space, Text } from "@mantine/core";

export default function SettingsCard(props){
    return(
        <Paper bg={"#fff"}  w="100%" sx={{padding: "1vh 2vw", marginTop: "0", borderRadius: "3px", minHeight: "5vh", height: "fitContent"}}>
          <Space h="1vh" />
            <Text component="h2" size="1.5rem" mb="md">{props.label}</Text>
            <Divider />
            <Space h="3vh" />
        {props.children}
        </Paper>
    )
}
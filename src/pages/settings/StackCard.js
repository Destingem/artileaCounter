import { Button, Card, Flex, Text } from "@mantine/core";

export default function StackCard({heading, desc, right, children}){
    return(
        <Card withBorder
        shadow="xl"
        style={{
        
          backgroundColor: "#f0f1f1",
          borderRadius: "3px",
          height: "100%",
          display: "flex",
         alignItems: "center",
          justifyContent: "space-between",
          padding: "2vh 2vw",
          overflow: "visible",
        }}
      >{children}
      <Flex direction="column">
      <Text component="h2">{heading}</Text>
      <Text>{desc}</Text>
      </Flex>
      {right}
      </Card>
    )
}
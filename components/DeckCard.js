import React from 'react'
import { Container, Header, Content, Card, CardItem, Text, Icon, Center } from "native-base"


const DeckCard = ({title}) => {
  return (
    <Card>
      <CardItem>
        <Text>{title}</Text>
       </CardItem>
    </Card>
  )
}

export default DeckCard
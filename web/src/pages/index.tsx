import {
  Avatar,
  Container,
  Flex,
  Heading,
  Spacer,
  Text,
} from '@chakra-ui/react';

import {BsTwitter } from 'react-icons'

const Index = () => {
  return (
    <>
      <Flex m={50} alignItems='center' justifyContent='space-between'>
        <Heading>Password Generator</Heading>
        <Text ml={8} fontSize='xl'>
          Dashboard
        </Text>
        <Spacer />
        <Avatar />
      </Flex>
      <Text as='h2' ml={110} fontSize='2xl'>
        <b>Hello,</b> Example
      </Text>
      <Container mt={16}>
        <Flex alignItems='center' justifyContent='space-around'>
          <Text fontSize='xl'>Service</Text>
          <Text fontSize='xl'>Password</Text>
        </Flex>

        <Flex alignItems='center' justifyContent='space-around'>
          <
        </Flex>
      </Container>
    </>
  );
};

export default Index;

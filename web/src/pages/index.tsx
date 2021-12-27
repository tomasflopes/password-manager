import { useState } from 'react';

import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  Text,
  useClipboard,
} from '@chakra-ui/react';

import { BsTwitter, BsClipboard } from 'react-icons/bs';
import { AiFillEyeInvisible } from 'react-icons/ai';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [clipboard, setClipboard] = useState('password');

  const { hasCopied, onCopy } = useClipboard(clipboard);

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

      <Container mt={16} maxW='container.md'>
        <Flex alignItems='center' justifyContent='space-between'>
          <Text fontSize='xl'>Service</Text>
          <Text fontSize='xl'>Password</Text>
        </Flex>

        <Flex alignItems='center' justifyContent='space-between  ' mt={4}>
          <BsTwitter size={30} />
          <Flex alignItems='center' justifyContent='center'>
            <Box
              mr={4}
              cursor='pointer'
              onClick={() => setIsVisible(state => !state)}
            >
              {isVisible ? (
                <Text>Password</Text>
              ) : (
                <AiFillEyeInvisible size={30} />
              )}
            </Box>
            <Button onClick={onCopy} ml={2}>
              <BsClipboard cursor='copy' size={22} />
              <Text>{hasCopied ? 'Copied' : 'Copy'}</Text>
            </Button>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default Index;

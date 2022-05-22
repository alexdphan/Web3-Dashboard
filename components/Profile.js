import CustomContainer from './CustomContainer';
import { FormLabel, Text, FormControl, Input, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useMoralis } from 'react-moralis';

export default function Profile({ user }) {
  const [input, setInput] = useState('');
  const { setUserData, isUserUpdating } = useMoralis();
  return (
    <CustomContainer>
      <Text color="white" mb="3">
        <b>🔥&nbsp; Username:</b> {user.getUsername()}
      </Text>
      <Text color="white">
        <b>💵&nbsp; Wallet Address:</b> {user.get('ethAddress')}
      </Text>{' '}
      <form
        color="white"
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim() != '') {
            setUserData({
              username: input,
            }).then(() => setInput(''));
          }
        }}
      >
        <FormControl mt="6" mb="6">
          <FormLabel htmlFor="username" color="white" mb="3">
            Set a new username
          </FormLabel>
          <Input
            color="white"
            id="username"
            type="text"
            placeholder="ex. yo mama"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="orange" disabled={isUserUpdating}>
          ✅&nbsp; Change Username
        </Button>
      </form>
    </CustomContainer>
  );
}

import CustomContainer from './CustomContainer';
import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  NumberInput,
  Text,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useWeb3Transfer } from 'react-moralis';
import Moralis from 'moralis';

export default function Send() {
  const [amount, setAmount] = useState(0);
  const [receiver, setReceiver] = useState('');

  const handleChange = (value) => setAmount(value);

  const toast = useToast();

  const { fetch, isFetching } = useWeb3Transfer({
    amount: Moralis.Units.ETH(amount),
    receiver: receiver,
    type: 'native'
  });

  return (
    <CustomContainer>
      <Text fontSize="xl" fontWeight="bold" color="white">
        Send ETH
      </Text>
      <form
        onSubmit={async e => {
          e.preventDefault()
          await Moralis.enableWeb3()
          fetch({
            onSuccess: () => {
              toast({
                title: 'ETH successfully sent',
                description: 'ETH will be showing up in your wallet g',
                status: 'success',
                duration: 9000,
                isClosable: true
              })
              setReceiver('')
            },
            onError: (error) => {
              toast({
                title: 'Error bruh',
                description: error,
                status: 'error',
                duration: 9000,
                isClosable: true,
              });
            },
          });
        }}
      >
        <FormControl mt="4" color="white">
          <FormLabel htmlFor="amount">Amount of ETH</FormLabel>
          <NumberInput step={0.1} onChange={handleChange}>
            <NumberInputField id="amount" value={amount} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormLabel htmlFor="receiver" mt="4">
            Send to
          </FormLabel>
          <Input
            id="receiver"
            type="text"
            placeholder="Receiver Address"
            value={receiver}
            onChange={e => setReceiver(e.target.value)}
          />
        </FormControl>
        <Button mt="6" type="submit" colorScheme="orange" disabled={isFetching}>
          💸&nbsp;Send
        </Button>
      </form>
    </CustomContainer>
  );
}

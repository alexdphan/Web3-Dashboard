import { Button, Center, Flex, Text } from '@chakra-ui/react';
export default function Header({ user, logout, isLoggingOut }) {
  return (
    <header>
      <Flex
        px="10"
        py="6"
        justifyContent="space-between"
        bg="blackAlpha.900"
        color="white"
      >
        <Center>
          <Text fontSize="xl" fontWeight="bold">
            Web3 Dashboard
          </Text>
        </Center>
        <Center>
          <Text>{user.getUsername()}</Text>
          <Button
            ml="4"
            colorScheme="orange"
            onClick={logout}
            disabled={isLoggingOut}
          >
            Logout
          </Button>
        </Center>
      </Flex>
    </header>
  );
}

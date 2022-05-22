import {
  Flex,
  Text,
  Button,
  Box,
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useMoralis } from 'react-moralis';
import Header from '../components/Header';
import Profile from '../components/Profile';
import Balance from '../components/Balance';
import Transactions from '../components/Transactions';
import Nft from '../components/Nft';
import Send from '../components/Send';

export default function Home() {
  const { isAuthenticated, authenticate, user, logout, isLoggingOut } =
    useMoralis();
  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Login | Web3 Dashboard</title>
        </Head>
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          width="100vw"
          height="100vh"
          bgGradient="linear(to-t, blackAlpha.900, blackAlpha.900)"
        >
          <Text fontSize="5xl" fontWeight="bold" color="white">
            Web3 Dashboard
          </Text>
          <Button
            colorScheme="orange"
            size="lg"
            mt="6"
            onClick={() =>
              authenticate({
                signingMessage: 'Sign into Web3 Dashboard. Do it ヽ( ᐖゞ)',
              })
            }
          >
            Login with Metamask
          </Button>
        </Flex>
      </>
    );
  }
  return (
    <div>
      <>
        <Head>
          <title>Dashboard3</title>
        </Head>
        <Flex direction="column" width="100vw" height="100vh">
          <Header user={user} logout={logout} isLoggingOut={isLoggingOut} />
          <Box
            flex="1"
            bgGradient="linear(to-t, blackAlpha.800, blackAlpha.900)"
            px="44"
            py="20"
          >
            <Tabs size="lg" colorScheme="white" isFitted variant="enclosed">
              <TabList>
                <Tab
                  color="white"
                  _selected={{ color: 'orange', bg: 'whiteAlpha.100' }}
                  _hover={{ bg: 'whiteAlpha.500' }}
                  fontWeight="bold"
                  bg="whiteAlpha.300"
                >
                  Profile
                </Tab>
                <Tab
                  color="white"
                  _selected={{ color: 'orange', bg: 'whiteAlpha.100' }}
                  _hover={{ bg: 'whiteAlpha.500' }}
                  fontWeight="bold"
                  bg="whiteAlpha.300"
                >
                  Balance
                </Tab>
                <Tab
                  color="white"
                  _selected={{ color: 'orange', bg: 'whiteAlpha.100' }}
                  _hover={{ bg: 'whiteAlpha.500' }}
                  fontWeight="bold"
                  bg="whiteAlpha.300"
                >
                  Transactions
                </Tab>
                <Tab
                  color="white"
                  _selected={{ color: 'orange', bg: 'whiteAlpha.100' }}
                  _hover={{ bg: 'whiteAlpha.500' }}
                  fontWeight="bold"
                  bg="whiteAlpha.300"
                >
                  NFTs
                </Tab>
                <Tab
                  color="white"
                  _selected={{ color: 'orange', bg: 'whiteAlpha.100' }}
                  _hover={{ bg: 'whiteAlpha.500' }}
                  fontWeight="bold"
                  bg="whiteAlpha.300"
                >
                  Send ETH
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Profile user={user}/>
                </TabPanel>
                <TabPanel><Balance user={user}/></TabPanel>
                <TabPanel><Transactions user={user}/></TabPanel>
                <TabPanel><Nft user={user}/></TabPanel>
                <TabPanel><Send /></TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Flex>
      </>
    </div>
  );
}

import CustomContainer from './CustomContainer';
import { Divider, Text } from '@chakra-ui/react';
import { useERC20Balances, useMoralisWeb3Api } from 'react-moralis';
import { useEffect, useState } from 'react';
import Moralis from 'moralis';

export default function Balance({ user }) {
  const Web3Api = useMoralisWeb3Api();
  const { fetchERC20Balances, data } = useERC20Balances();

  const [ethBalance, setEthBalance] = useState();

  const fetchNativeBalance = async () => {
    const result = await Web3Api.account
      .getNativeBalance({
        chain: 'rinkeby',
        address: user.get('ethAddress'),
      })
      .catch((e) => console.log(e));
    if (result.balance) {
      setEthBalance(Moralis.Units.FromWei(result.balance));
    }
  };

  useEffect(() => {
    fetchNativeBalance();
    fetchERC20Balances({
      params: {
        chain: 'rinkeby',
        address: user.get('ethAddress'),
      },
    });
  }, []);

  return (
    <CustomContainer>
      <Text mb="6" fontSize="xl" fontWeight="bold" color="white">
        My ERC 20 Tokens
      </Text>
      {ethBalance && (
        <Text color="white">
          💰&nbsp;{ethBalance} <b>ETH</b>
        </Text>
      )}
      <Divider mb="3" />
      {data &&
        data.map((token) => (
          <div key={token.symbol}>
            <Text color="white">
              💰&nbsp;{Moralis.Units.FromWei(token.balance)}
              <b> {token.symbol}</b>
            </Text>
            <Divider mb="3" />
          </div>
        ))}
    </CustomContainer>
  );
}

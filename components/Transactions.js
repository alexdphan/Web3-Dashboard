import CustomContainer from './CustomContainer';
import { useMoralisWeb3Api } from 'react-moralis';
import { useEffect, useState } from 'react';
import { Divider, Text, Link } from '@chakra-ui/react';

export default function Transactions({ user }) {
  
  const Web3Api = useMoralisWeb3Api()
  const BASE_URL = "https://rinkeby.etherscan.io/tx/"

  const [transactions, setTransactions] = useState([])

  const fetchTransactions = async () => {
    const data = await Web3Api.account.getTransactions({
      chain: "rinkeby",
      address: user.get('ethAddress'),
      limit: 10
    })
    if (data) {
      setTransactions(data.result)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <CustomContainer>
      <Text fontSize="xl" mb="6" fontWeight="bold" color="white">
        Last 10 Transations
      </Text>
      {transactions &&
        transactions.map((transaction) => (
          <div key={transaction.hash}>
            <Link
              color="white"
              href={`${BASE_URL}${transaction.hash}`}
              isExternal
            >
              →&nbsp; {transaction.hash}
            </Link>
            <Divider mb="3" />
          </div>
        ))}
    </CustomContainer>
  );
}

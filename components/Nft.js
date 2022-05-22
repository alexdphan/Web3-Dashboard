import { useNFTBalances } from "react-moralis"; 
import { useEffect } from "react";
import CustomContainer from "./CustomContainer";
import { Text, Box, Image, SimpleGrid } from "@chakra-ui/react";

export default function Nft({user}) {
  const {getNFTBalances, data} = useNFTBalances()
  
  useEffect(() => {
    getNFTBalances({
      params: {
        chain: "rinkeby",
        address: user.get('ethAddress'),
      }
    })
  }, [])

  console.log(data)

  return (
    <CustomContainer>
      <Text color="white" fontSize="xl" fontWeight="bold">
        My Nfts
      </Text>
      {data &&
        data.result.map((nft) => (
            <Box
              mt="4" px="2" py="2" borderWidth="1px"
              borderRadius="md" key={nft.token_uri}>
              {nft.image && <Image src={nft.image} />}
              <p>{nft.token_uri}</p>
            </Box>
        ))}
    </CustomContainer>
  );
}
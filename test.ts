import { NFT_CONTRACT, NFT_CONTRACT_ADDRESS } from "./src/constants";
// 0x01E6c37a730be3557CFF6079f59c6Fcf9274b3ba  - Don't have NFT

// 0xE9C8e3bAd1CBa8853BDa717eD8998bBeB0CEbf77 - Have NFT

async function main() {
  const walletAddress = "0xE9C8e3bAd1CBa8853BDa717eD8998bBeB0CEbf77"; // Replace with the wallet address you want to check

  const nftBalance = BigInt(await NFT_CONTRACT.balanceOf(walletAddress));

  console.log(`NFT balance for wallet ${walletAddress}:`);
  console.log(`- As BigNumber: ${nftBalance}`);
  console.log(`- As string: ${nftBalance.toString()}`);

  if (Number(nftBalance.toString()) > 0) {
    console.log(
      `The wallet owns ${nftBalance.toString()} NFT(s) from the contract ${NFT_CONTRACT_ADDRESS}`
    );
  } else {
    console.log(
      `The wallet does not own any NFTs from the contract ${NFT_CONTRACT_ADDRESS}`
    );
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
});

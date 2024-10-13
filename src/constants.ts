import { ethers } from "ethers";

export const NFT_CONTRACT_ADDRESS =
  "0x2B09d47D550061f995A3b5C6F0Fd58005215D7c8";

export const ERC721_ABI = [
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

const provider = new ethers.JsonRpcProvider(
  "https://bsc-dataseed.binance.org/"
);

export const NFT_CONTRACT = new ethers.Contract(
  NFT_CONTRACT_ADDRESS,
  ERC721_ABI,
  provider
);

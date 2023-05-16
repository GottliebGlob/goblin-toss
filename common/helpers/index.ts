import { EventData } from "web3-eth-contract/types/index";
import { ethers } from "ethers";

export const toEther = (bigNum: ethers.BigNumber | undefined) => {
  return ethers.utils.formatEther(bigNum ?? 0).slice(0, 6);
};

export const walletCutter = (wallet: string) => {
  return `${wallet.slice(0, 5)}...${wallet.slice(-5)}`;
};

export const sortByTime = (arr: EventData[] | undefined) => {
  return arr?.sort(
    (a, b) =>
      new Date(b.returnValues.timestamp * 1000).getTime() -
      new Date(a.returnValues.timestamp * 1000).getTime()
  );
};

export const timeSince = (date: Date): string => {
  const seconds: number = Math.floor(
    (new Date().getTime() - date.getTime()) / 1000
  );

  let interval: number = seconds / 31536000;
  if (interval > 1) {
    return `${Math.floor(interval)} years ago`;
  }

  interval = seconds / 2592000;
  if (interval > 1) {
    return `${Math.floor(interval)} months ago`;
  }

  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)} days ago`;
  }

  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)} hours ago`;
  }

  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} minutes ago`;
  }

  return `${Math.floor(seconds)} seconds ago`;
};

import { ethers } from "ethers"

export const toEther = (bigNum: ethers.BigNumber | undefined) => {
  return ethers.utils.formatEther(bigNum ?? 0).slice(0, 6)
}
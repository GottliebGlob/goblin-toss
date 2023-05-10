import Web3 from "web3"
import { AbiItem } from "web3-utils"
import coinFlipContract from "@/common/abi/CoinToss.json"
import { CoinFlip } from "@/common/constants/filpContract"
import { useQuery } from "@tanstack/react-query"
import { BigNumber } from "ethers"
import { toEther } from "../helpers"
import { EventData } from "web3-eth-contract/types/index"

const getCoinFlipContract = () => {
  const rpcURL = `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`
  const web3 = new Web3(rpcURL)

  const coinFlip = new web3.eth.Contract(
    coinFlipContract.abi as AbiItem[],
    CoinFlip.address,
  )

  return coinFlip
}

export const useMaxPayout = () => {
  return useQuery({
    queryKey: ["max"],
    queryFn: async () => {
      const coinFlip = getCoinFlipContract()
      let data: string = "0"
      await coinFlip.methods
        .maxPayout()
        .call((err: unknown, res: BigNumber) => {
          if (!err) {
            data = toEther(res)
          }
        })
      return data
    },
  })
}

export const usePastEvents = () => {
  return useQuery({
    queryKey: ["pastevents"],
    queryFn: async () => {
      const coinFlip = getCoinFlipContract()
      let data = <EventData[]>[]
      await coinFlip.getPastEvents(
        "CoinFlipped",
        {
          fromBlock: 0,
          toBlock: "latest",
        },
        (error, events) => {
          if (!error) {
            data = events
          }
        },
      )
      return data
    },
  })
}

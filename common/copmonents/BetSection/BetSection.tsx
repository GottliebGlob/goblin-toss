import React, { useEffect, useState } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useAccount,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";
import { ethers } from "ethers";
import {BiLoaderAlt} from 'react-icons/bi'
import {CgSpinner} from 'react-icons/cg'

import coinFlipContract from "@/common/abi/CoinToss.json";
import useDebounce from "@/common/hooks/useDebounce";
import { CoinFlip } from "@/common/constants/filpContract";
import { useBalance } from "wagmi";
import { toEther } from "@/common/helpers";
import { useMaxPayout } from "@/common/utils/queries";
import { get } from "http";
import clsx from "clsx";

interface BettingSectionProps {
  choice: boolean;
}

const BetSection = ({ choice }: BettingSectionProps) => {
  const { data: maxPayout } = useMaxPayout();

  const [amount, setAmount] = useState("0");

  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { chains, switchNetwork } = useSwitchNetwork();

  const { data: balance, refetch: refetchUser } = useBalance({
    address: address,
    chainId: Number(CoinFlip.chainId),
  });

  const { data: contractBalance, refetch: refetchContract } = useBalance({
    address: CoinFlip.address,
    chainId: Number(CoinFlip.chainId),
  });

  const debouncedChoice = useDebounce(choice, 500);
  const debouncedAmount = useDebounce(amount, 500);

  const { config } = usePrepareContractWrite({
    address: CoinFlip.address,
    abi: coinFlipContract.abi,
    functionName: "flip",
    args: [Number(debouncedChoice)],
    overrides: {
      value: ethers.utils.parseEther(debouncedAmount),
    },
    enabled: Number(debouncedAmount) > 0,
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    refetchContract()
    refetchUser()
  }, [isSuccess])

  const handleFlip = () => {
    if (chain?.id !== CoinFlip.chainId) {
      switchNetwork?.(CoinFlip.chainId);
    } else {
      if (Number(amount) > 0) {
         write?.();
      }
    }
  };

  const getFlipText = () => {
    return chain?.id !== CoinFlip.chainId
      ? "Change Network"
      : Number(amount) <= 0
      ? "Select amount to flip"
      : isLoading
      ? "Flipping..."
      : "Flip Heads";
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setAmount(e.target.value.replace(/[^0-9.]/g, ""));
    } else {
      setAmount("0");
    }
  };

  return (
    <div className="w-[300px] md:w-[400px] lg:w-[450px]">
      <div className="flex justify-between bg-[#FBC13C] rounded-xl w-full h-[56px] mt-4">
        <div className="items-center justify-center text-sm font-bold text-[#2D1527] flex border-r border-r-[#CD8F20] min-w-[74px]">
          <p>BET</p>
        </div>
        <div className="flex items-center justify-between w-full px-3">
          <input
            type="text"
            value={amount}
            onChange={(event) => handleInput(event)}
            className=" text-font-500 bg-transparent font-bold text-xl w-full mr-3 outline-none border-none"
          />
        </div>
        <div
          onClick={() => setAmount(toEther(balance?.value))}
          className="cursor-pointer hover:bg-[#8EC964] hover:rounded-r-xl items-center justify-center text-sm font-bold text-[#2D1527] flex border-l border-l-[#CD8F20] min-w-[74px]"
        >
          <p>MAX</p>
        </div>
      </div>

      <div className="flex flex-col w-full text-white text-[12px] gap-y-2 mt-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-x-4">
            <p>50% win chance </p>
            <p>6% house edge</p>
          </div>

          <p>
            Target payout: ~{(Number(amount) * 1.94).toString().substring(0, 6)}{" "}
            ETH
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p>Bank: {toEther(contractBalance?.value)} ETH</p>

          <p>Max payout: {maxPayout} ETH </p>
        </div>
      </div>

      {isConnected ? (
        <button
          disabled={isLoading || Number(amount) <= 0}
          className={clsx("flex p-3 rounded-xl justify-center items-center bg-accent-200 w-full mt-8 hover:enabled:drop-shadow-gold transition ease-in-out delay-150 text-white hover:text-red-400 hover:enabled:text-[#FBC13C]", isLoading && "animate-bounce")}
          onClick={handleFlip}
        >
         
 {isLoading && <CgSpinner className="animate-spin h-6 w-6 mr-2"/>}
          <p className="font-bold ">{getFlipText()}</p>
        </button>
      ) : (
        <div className="flex p-3 rounded-xl justify-center items-center border border-accent-200 w-full mt-8">
          <p className="text-accent-200">Connect Wallet</p>
        </div>
      )}
    </div>
  );
};

export default BetSection;

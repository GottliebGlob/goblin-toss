import clsx from "clsx";
import React from "react";

interface BetEventProps {
  isWon: boolean;
  player: string;
  time: string;
  payout: string;
  tx: string;
}

const BetEvent = ({ isWon, player, time, payout, tx }: BetEventProps) => {
  return (
    <div className="flex w-full px-2 py-5 justify-between border-b border-b-accent-100 text-white text-sm ">
      <div className="flex w-full">
        <div className="min-w-[90px] max-w-[210px] w-full flex items-center">
          <div
            className={clsx(
              "w-[12px] h-[12px] rounded-full mr-2",
              isWon ? "bg-green-500" : "bg-red-500"
            )}
          />
          {isWon ? "Won bet" : "Busted"}
        </div>
        <div className="min-w-[110px] max-w-[210px] w-full">{player}</div>
        <div className="min-w-[90px] max-w-[210px] w-full">1.94x</div>
        <div className="min-w-[60px] max-w-[210px] w-full">{payout}</div>
        <div className="min-w-[60px] max-w-[210px] w-full cursor-pointer underline" onClick={()=> window.open(`https://sepolia.etherscan.io/tx/${tx}`, "_blank")}>Explore</div>
      </div>

      <div className="text-white min-w-[110px] text-right">{time}</div>
    </div>
  );
};

export default BetEvent;

import React, { useState } from "react";
import { usePastEvents } from "../../../utils/queries";
import BetEvent from "../Event/Event";
import { sortByTime, timeSince, toEther, walletCutter } from "../../../helpers";
import clsx from "clsx";
import { useContractEvent } from "wagmi";
import { CoinFlip } from "@/common/constants/filpContract";
import coinFlipContract from "@/common/abi/CoinToss.json";


const EventsList = () => {
  const [isMyEvents, setIsMyEvents] = useState(false);
  const { data: pastEvents, refetch } = usePastEvents();

  console.log(JSON.stringify(pastEvents))

  useContractEvent({
    address: CoinFlip.address,
    abi: coinFlipContract.abi,
    eventName: 'CoinFlipped',
    listener() {
      refetch()
    },
  })

  return (
    <div className="flex flex-col mx-2 w-full mt-[90px] mb-5">
      <div className="flex w-full px-2 py-5 justify-between border-b border-b-accent-100 text-white text-sm ">
        <div className="flex w-full font-bold">
          <div className="min-w-[90px] max-w-[210px] w-full flex">
            <p
              onClick={() => setIsMyEvents(false)}
              className={clsx(
                "mr-2",
                isMyEvents
                  ? "text-white cursor-pointer"
                  : "text-accent-200 underline cursor-default"
              )}
            >
              All
            </p>
            <p
              onClick={() => setIsMyEvents(true)}
              className={clsx(
                !isMyEvents
                  ? "text-white cursor-pointer"
                  : "text-accent-200 underline cursor-default"
              )}
            >
              My bets
            </p>
          </div>
          <div className="min-w-[110px] max-w-[210px] w-full">Player</div>
          <div className="min-w-[90px] max-w-[210px] w-full">Target</div>
          <div className="min-w-[60px] max-w-[210px] w-full">Payout</div>
          <div className="min-w-[60px] max-w-[210px] w-full cursor-pointer">Scan</div>
        </div>

        <div className="text-white min-w-[110px] text-right">Time</div>
      </div>

      {sortByTime(pastEvents)?.map((e) => (
        <BetEvent
          key={e.transactionHash}
          isWon={e.returnValues.isWon}
          player={walletCutter(e.returnValues.player)}
          time={timeSince(new Date(e.returnValues.timestamp * 1000))}
          payout={toEther(e.returnValues.amountWon)}
          tx={e.transactionHash}
        />
      ))}
    </div>
  );
};

export default EventsList;

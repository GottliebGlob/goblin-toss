import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <div className="absolute top-0 h-[50px] w-full flex justify-between items-center m-2 p-2">
      <div className="flex flex-row items-center">
        <Image
          src="/logo.png"
          alt="/logo"
          width={50}
          height={50}
          className="mr-[5px]"
        />
        <p className="text-white font-bold text-xl">GoblinToss</p>
      </div>

      <ConnectButton
        accountStatus="address"
        showBalance={false}
        chainStatus="icon"
      />
    </div>
  );
};

export default Header;

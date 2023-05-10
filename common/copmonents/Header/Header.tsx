import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';

const Header = () => {
    return (
        <div className="absolute top-0 h-[50px] w-full bg-back-100 flex justify-between items-center">
            <ConnectButton
          accountStatus="address"
          showBalance={false}
          chainStatus="icon"
        />
        </div>
    );
};

export default Header;
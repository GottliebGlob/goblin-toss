import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const { chains, provider } = configureChains(
  [sepolia],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Goblin Toss",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={darkTheme({
            accentColor: "#5d65ed",
            accentColorForeground: "white",
          })}
        >
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}

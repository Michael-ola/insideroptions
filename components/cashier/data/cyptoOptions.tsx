import { StaticImageData } from "next/image";
import usdt from "@/lib/assets/usdt.png"
import btc from "@/lib/assets/btc.png"
import trc20 from "@/lib/assets/trc20.png"
import eth from "@/lib/assets/eth.png"

export type CryptoOption = {
  label: string;
  icon: StaticImageData;
  speed?: 'FASTEST' | 'FAST';
};

export const cryptoOptions = [
  {
    label: 'USDT (ERC20)',
    icon: usdt,
    speed: 'FASTEST',
  },
  {
    label: 'BITCOIN (BTC)',
    icon: btc,
  },
  {
    label: 'USDT (TRC20)',
    icon: trc20,
    speed: 'FAST',
  },
  {
    label: 'ETHEREUM (ETH)',
    icon: eth,
  },
];

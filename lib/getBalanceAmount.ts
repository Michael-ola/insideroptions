import { TraderDataType } from "@/types/TraderDataType";

export default function getBalanceAmount(
  accounts: TraderDataType["accounts"],
  selectedAccount: string
) {
  const account = accounts.filter(
    (account) => account.accountType === selectedAccount
  )[0];

  const emptyBalanceObject = {
    accountBalance: 0,
    profitBalance: 0,
    ttBalance: 0,
    referralBalance: 0,
  };

  const balance = account
    ? {
        accountBalance: account.accountBalance,
        profitBalance: account.profitBalance,
        ttBalance: account.ttbalance,
        referralBalance: account.referralBalance,
      }
    : emptyBalanceObject;
  return balance;
}

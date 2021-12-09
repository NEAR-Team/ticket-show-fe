import { createContext, useContext, useEffect, useState } from "react";
import { connect, Contract, keyStores, WalletConnection } from "near-api-js";

import getConfig from "../config/near.config";

const nearConfig = getConfig(process.env.NODE_ENV || "development");

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [walletConnection, setWalletConnection] = useState(null);

  const initNear = async () => {
    const near = await connect(
      Object.assign(
        { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
        nearConfig
      )
    );
    const walletConnection = new WalletConnection(near);
    const account = walletConnection.account();
    const contract = await new Contract(account, nearConfig.contractName, {
      viewMethods: ["nft_token"],
      changeMethods: ["nft_transfer", "mint", "nft_mint"],
    });

    return {
      walletConnection,
      accountId: walletConnection.getAccountId(),
      contract,
      account,
    };
  };

  const login = () => {
    walletConnection.requestSignIn(nearConfig.contractName);
  };

  const logout = () => {
    walletConnection.signOut();
    window.location.replace("/");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      initNear().then(({ walletConnection, accountId, contract, account }) => {
        setWalletConnection(walletConnection);
        if (walletConnection.isSignedIn()) {
          setIsAuth(true);
          setAccountId(accountId);
          setAccount(account);
          setContract(contract);
        }
      });
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        networkId: nearConfig.networkId,
        isAuth,
        login,
        logout,
        accountId,
        contract,
        account,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

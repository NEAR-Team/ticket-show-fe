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
  const [mainContract, setMainContract] = useState(null);
  const [walletConnection, setWalletConnection] = useState(null);
  const [ticketContract, setTicketContract] = useState(null);

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
      viewMethods: ["get_contracts_by_owner"],
      changeMethods: ["create_new_ticket_contract"],
    });

    return {
      walletConnection,
      accountId: walletConnection.getAccountId(),
      contract,
      account,
    };
  };

  const getContractTicket = async () => {
    if (mainContract && accountId) {
      const company = await mainContract.get_contracts_by_owner({
        owner_id: accountId,
      });
      if (company.length > 0) {
        const _contract = await connectContract(company[0]);
        return _contract;
      }
    }
  };

  const connectContract = async (contractName) => {
    console.log(contractName);
    const near = await connect(
      Object.assign(
        { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
        nearConfig
      )
    );
    const walletConnection = new WalletConnection(near);
    const account = walletConnection.account();

    const contract = await new Contract(account, contractName, {
      viewMethods: [
        "show_metadata",
        "get_active_shows",
        "get_all_shows",
        "ticket_metadata",
        "get_tickets_by_owner",
        "ticket_contract_metadata",
      ],
      changeMethods: ["create_new_show", "buy_ticket", "check_ticket"],
    });

    // setTicketContract(contract);
    return contract;
  };

  const login = () => {
    // walletConnection.requestSignIn(nearConfig.contractName);
    walletConnection.requestSignIn({
      contractId: nearConfig.contractName,
      successUrl: `${process.env.domain}/user-dashboard`,
      failureUrl: process.env.domain,
    });
  };

  const logout = () => {
    walletConnection.signOut();
    window.location.replace("/");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      initNear().then(({ walletConnection, accountId, contract, account }) => {
        setWalletConnection(walletConnection);
        setMainContract(contract);
        if (walletConnection.isSignedIn()) {
          setIsAuth(true);
          setAccountId(accountId);
          setAccount(account);
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
        mainContract,
        account,
        connectContract,
        walletConnection,
        ticketContract,
        getContractTicket,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

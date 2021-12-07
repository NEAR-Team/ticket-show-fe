import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../context/app.context";
import { utils } from "near-api-js";

export default function Home() {
  const { login, isAuth, logout, accountId, account, contract } =
    useAppContext();
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState("");

  const getMessage = useCallback(async () => {
    if (contract) {
      const _mess = await contract.getGreeting({ accountId });
      setMessage(_mess);
    }
  }, [accountId, contract]);

  useEffect(() => {
    if (account) {
      account.getAccountBalance().then((res) => {
        setBalance(res);
      });
      getMessage();
      console.log("useEffect");
    }
  }, [account, getMessage]);

  const sendMoney = () => {
    account.sendMoney(
      "characterbin.testnet",
      utils.format.parseNearAmount("149")
    );
  };

  const setGreeting = async () => {
    if (contract) {
      const _mess = await contract.setGreeting({ message });
      console.log(_mess);
    }
  };
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className={styles.container}>
      {!isAuth ? (
        <button onClick={login}>LOGIN</button>
      ) : (
        <>
          <div>
            Account balance: {utils.format.formatNearAmount(balance.available)}
          </div>
          <input type="text" value={message} onChange={handleChange} />
          <button onClick={setGreeting}>Set Greeting</button>
          <button onClick={logout}>LOGOUT {accountId}</button>
          <button onClick={sendMoney}>send money</button>
        </>
      )}
    </div>
  );
}

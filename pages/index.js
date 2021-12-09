import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../context/app.context";
import { utils } from "near-api-js";
import SvgWave from "../components/SvgWave";

import {
  FcCurrencyExchange,
  FcTwoSmartphones,
  FcCustomerSupport,
} from "react-icons/fc";

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
    <>
      <div className="pt-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <p className="uppercase tracking-loose w-full text-white">
              What event you have?
            </p>
            <h1 className="my-4 text-5xl font-bold leading-tight text-gray-800">
              Your ticket, Our tool
            </h1>
            <p className="leading-normal text-2xl mb-8 text-white">
              The ultimate solution for reliable and secure your event ticket
              delivery.
            </p>
            <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              Get in Touch
            </button>
          </div>

          <div className="w-full md:w-3/5 py-6 text-center">
            <Image
              layout="responsive"
              src="/assets/hero.png"
              width={613}
              height={529}
              className="w-full md:w-4/5"
              alt="Hero"
            />
          </div>
        </div>
      </div>
      <div className="relative -mt-12 lg:-mt-24">
        <SvgWave />
      </div>
      <section className="text-gray-600 body-font bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4 uppercase">
              Features
            </h1>

            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
            </div>
          </div>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                <FcCurrencyExchange size={60} />
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-800 text-2xl title-font font-medium mb-3 uppercase">
                  Payment
                </h2>
                <p className="leading-relaxed text-base">
                  Contactless event payments using the wallet app and crypto
                  currency
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                <FcTwoSmartphones size={60} />
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-2xl title-font font-medium mb-3 uppercase">
                  ACCESS
                </h2>
                <p className="leading-relaxed text-base">
                  Blockchain ticketing (NFT) and access control with age check
                  and visitor registration.
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                <FcCustomerSupport size={60} />
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-2xl title-font font-medium mb-3 uppercase">
                  Support
                </h2>
                <p className="leading-relaxed text-base">
                  24/7 support for your event ticketing needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

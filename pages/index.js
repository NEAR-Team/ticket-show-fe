import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../context/app.context";
import { utils } from "near-api-js";
import SvgWave from "../components/SvgWave";

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
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-28 h-28 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                <svg
                  className="icon w-20 h-20 ml-2"
                  viewBox="0 0 140 140"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0x1)">
                    <g filter="url(#filter0_dx1)">
                      <path
                        d="M72.6086 84.9079C69.6564 84.9068 66.7709 84.0302 64.317 82.3889C61.8631 80.7476 59.951 78.4154 58.8228 75.6873C57.6945 72.9592 57.4007 69.9578 57.9785 67.0627C58.5563 64.1676 59.9798 61.5089 62.0688 59.4229C64.1579 57.3369 66.8187 55.9174 69.7146 55.3438C72.6105 54.7702 75.6115 55.0684 78.338 56.2007C81.0644 57.333 83.3938 59.2484 85.0315 61.7047C86.6691 64.161 87.5415 67.0479 87.5383 70C87.5296 73.955 85.9532 77.7451 83.1546 80.5396C80.356 83.3341 76.5635 84.905 72.6086 84.9079ZM72.6086 57.2469C70.0905 57.248 67.6291 57.9955 65.5357 59.395C63.4422 60.7944 61.8106 62.783 60.8469 65.1095C59.8833 67.436 59.6308 69.9959 60.1216 72.4658C60.6123 74.9356 61.8242 77.2046 63.604 78.986C65.3839 80.7674 67.6518 81.9812 70.1212 82.474C72.5907 82.9669 75.1508 82.7167 77.4781 81.755C79.8054 80.7934 81.7954 79.1634 83.1967 77.0711C84.5979 74.9789 85.3476 72.5182 85.3508 70C85.3508 66.6196 84.0087 63.3775 81.6194 60.9861C79.2301 58.5947 75.9891 57.2498 72.6086 57.2469Z"
                        fill="white"
                      ></path>
                    </g>
                    <g filter="url(#filter1_dx1)">
                      <path
                        d="M116.288 111.803C112.538 111.803 108.872 110.691 105.754 108.608C102.636 106.524 100.206 103.563 98.7706 100.099C97.3356 96.6342 96.9601 92.822 97.6917 89.144C98.4232 85.4661 100.229 82.0878 102.881 79.4361C105.532 76.7845 108.911 74.9787 112.589 74.2471C116.266 73.5156 120.079 73.891 123.543 75.3261C127.008 76.7611 129.969 79.1913 132.052 82.3093C134.136 85.4273 135.248 89.093 135.248 92.843C135.242 97.8698 133.242 102.689 129.688 106.243C126.133 109.798 121.314 111.797 116.288 111.803ZM116.288 76.0758C112.97 76.0758 109.727 77.0595 106.969 78.9025C104.211 80.7455 102.061 83.365 100.792 86.4298C99.5221 89.4946 99.1899 92.8671 99.8371 96.1206C100.484 99.3742 102.082 102.363 104.427 104.709C106.773 107.054 109.762 108.652 113.015 109.299C116.269 109.946 119.641 109.614 122.706 108.344C125.771 107.075 128.39 104.925 130.233 102.167C132.076 99.4086 133.06 96.1658 133.06 92.8485C133.056 88.4014 131.287 84.1377 128.143 80.9932C124.998 77.8486 120.735 76.0801 116.288 76.0758Z"
                        fill="white"
                      ></path>
                    </g>
                    <g filter="url(#filter2_dx1)">
                      <path
                        d="M111.71 45.1008V36.6406H102.107V28.1969H4.75781V77.9625H14.3609V86.4063H23.9641V94.861H97.4531C97.3807 94.1908 97.3442 93.5171 97.3438 92.843V92.6735H37.6852C37.4906 89.8928 36.3848 87.2537 34.5391 85.1648C32.6934 83.0759 30.2106 81.6536 27.475 81.118C27.0378 81.0308 26.5959 80.9687 26.1516 80.9321V58.811C29.1196 58.5509 31.9012 57.2532 34.0074 55.1459C36.1137 53.0386 37.4101 50.2565 37.6688 47.2883H107.609C107.618 47.4568 107.637 47.6247 107.663 47.7914C107.766 48.6007 107.949 49.3976 108.21 50.1703C108.53 51.131 108.965 52.0493 109.506 52.9047C110.542 54.5635 111.948 55.9594 113.614 56.9824C115.281 58.0054 117.162 58.6276 119.109 58.8V74.1125C119.847 74.2203 120.578 74.3737 121.297 74.5719V45.1008H111.71ZM99.8922 30.3844V36.6406H93.5703C91.8947 34.9508 90.8453 32.7401 90.5953 30.3735L99.8922 30.3844ZM6.92344 30.3844H16.2695C16.0096 32.7654 14.943 34.9859 13.2468 36.6771C11.5507 38.3682 9.3271 39.4283 6.94531 39.6813L6.92344 30.3844ZM14.3391 75.5399H6.94531V66.243C8.41488 66.3973 9.83524 66.8605 11.1132 67.6022C12.3912 68.3439 13.498 69.3474 14.3609 70.5469L14.3391 75.5399ZM14.3391 67.2657C12.2904 65.3996 9.68438 64.2599 6.92344 64.0227V41.9016C9.68438 41.6643 12.2904 40.5247 14.3391 38.6586V67.2657ZM18.4406 30.3844H88.4024C88.595 32.6421 89.3985 34.8048 90.7266 36.6406H16.1438C17.468 34.8032 18.2693 32.6411 18.4625 30.3844H18.4406ZM23.9422 75.7203C22.2294 74.1631 20.1222 73.1057 17.85 72.6633C17.4128 72.5761 16.9709 72.5141 16.5266 72.4774V50.3563C19.2875 50.119 21.8935 48.9794 23.9422 47.1133V75.7203ZM16.5484 48.1578V38.8281H25.8453C25.5945 41.2113 24.5353 43.4367 22.8438 45.1341C21.1524 46.8316 18.9307 47.8986 16.5484 48.1578ZM23.9641 83.9946H16.5484V74.6703C19.0589 74.9408 21.3883 76.1055 23.1109 77.9516C23.4187 78.278 23.7038 78.6252 23.9641 78.9907V83.9946ZM28.0109 83.4914C29.9958 84.0804 31.7628 85.2419 33.0907 86.8305C34.4185 88.419 35.2482 90.364 35.4758 92.4219H26.1516V83.125C26.7812 83.1906 27.4035 83.3133 28.0109 83.4914ZM26.1516 56.6125V47.3156H35.4758C35.2168 49.6971 34.1505 51.9181 32.4542 53.6094C30.7579 55.3008 28.5337 56.3605 26.1516 56.6125ZM25.7469 45.1281C27.0817 43.2799 27.8837 41.1008 28.0656 38.8281H98.0055C98.0154 38.9948 98.0336 39.1609 98.0602 39.3258C98.1606 40.1354 98.3438 40.9325 98.6071 41.7047C98.9263 42.6655 99.3616 43.5837 99.9031 44.4391C100.034 44.6578 100.182 44.8766 100.335 45.0844L25.7469 45.1281ZM103.168 45.1281C102.769 44.7268 102.403 44.2933 102.074 43.8321C101.66 43.2527 101.308 42.6313 101.024 41.9782C100.583 40.9788 100.304 39.9154 100.198 38.8281H109.495V45.1008L103.168 45.1281ZM111.683 52.2867C110.642 50.8176 109.994 49.1061 109.802 47.3156H119.098V56.6125C117.625 56.4538 116.201 55.9836 114.923 55.2331C113.644 54.4826 112.54 53.469 111.683 52.2594V52.2867Z"
                        fill="white"
                      ></path>
                    </g>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M113.685 94.013H109.625V91.5143H113.503L109.225 85H112.238C112.448 85 112.598 85.03 112.688 85.09C112.786 85.1424 112.872 85.2324 112.947 85.3598L116.646 91.3306C116.684 91.2331 116.725 91.1394 116.77 91.0495C116.815 90.952 116.867 90.8546 116.927 90.7571L120.312 85.416C120.477 85.1387 120.69 85 120.953 85H123.854L118.614 92.7699L124 101.259H120.975C120.773 101.259 120.608 101.207 120.481 101.102C120.361 100.997 120.259 100.877 120.177 100.742L116.41 94.5127C116.38 94.6027 116.346 94.6889 116.309 94.7714C116.271 94.8463 116.234 94.9175 116.196 94.985L112.587 100.742C112.504 100.87 112.403 100.99 112.283 101.102C112.163 101.207 112.013 101.259 111.834 101.259H109L113.685 94.013Z"
                      fill="white"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M70.7497 70.214H67.5004V68.214H70.604L67.18 63H69.592C69.76 63 69.88 63.024 69.952 63.072C70.03 63.114 70.099 63.186 70.159 63.288L73.12 68.067C73.15 67.989 73.183 67.914 73.219 67.842C73.255 67.764 73.297 67.686 73.345 67.608L76.054 63.333C76.186 63.111 76.357 63 76.567 63H78.889L74.695 69.219L79.006 76.014H76.585C76.423 76.014 76.291 75.972 76.189 75.888C76.093 75.804 76.012 75.708 75.946 75.6L72.931 70.614C72.907 70.686 72.88 70.755 72.85 70.821C72.82 70.881 72.79 70.938 72.76 70.992L69.871 75.6C69.805 75.702 69.724 75.798 69.628 75.888C69.532 75.972 69.412 76.014 69.268 76.014H67L70.7497 70.214Z"
                      fill="white"
                    ></path>
                  </g>
                  <g clipPath="url(#clip1x1)">
                    <g filter="url(#filter3_dx1)">
                      <path
                        d="M72.6086 84.9079C69.6564 84.9068 66.7709 84.0302 64.317 82.3889C61.8631 80.7476 59.951 78.4154 58.8228 75.6873C57.6945 72.9592 57.4007 69.9578 57.9785 67.0627C58.5563 64.1676 59.9798 61.5089 62.0688 59.4229C64.1579 57.3369 66.8187 55.9174 69.7146 55.3438C72.6105 54.7702 75.6115 55.0684 78.338 56.2007C81.0644 57.333 83.3938 59.2484 85.0315 61.7047C86.6691 64.161 87.5415 67.0479 87.5383 70C87.5296 73.955 85.9532 77.7451 83.1546 80.5396C80.356 83.3341 76.5635 84.905 72.6086 84.9079ZM72.6086 57.2469C70.0905 57.248 67.6291 57.9955 65.5357 59.395C63.4422 60.7944 61.8106 62.783 60.8469 65.1095C59.8833 67.436 59.6308 69.9959 60.1216 72.4658C60.6123 74.9356 61.8242 77.2046 63.604 78.986C65.3839 80.7674 67.6518 81.9812 70.1212 82.474C72.5907 82.9669 75.1508 82.7167 77.4781 81.755C79.8054 80.7934 81.7954 79.1634 83.1967 77.0711C84.5979 74.9789 85.3476 72.5182 85.3508 70C85.3508 66.6196 84.0087 63.3775 81.6194 60.9861C79.2301 58.5947 75.9891 57.2498 72.6086 57.2469Z"
                        fill="white"
                      ></path>
                    </g>
                    <g filter="url(#filter4_dx1)">
                      <path
                        d="M116.288 111.803C112.538 111.803 108.872 110.691 105.754 108.608C102.636 106.524 100.206 103.563 98.7706 100.099C97.3356 96.6342 96.9601 92.822 97.6917 89.144C98.4232 85.4661 100.229 82.0878 102.881 79.4361C105.532 76.7845 108.911 74.9787 112.589 74.2471C116.266 73.5156 120.079 73.891 123.543 75.3261C127.008 76.7611 129.969 79.1913 132.052 82.3093C134.136 85.4273 135.248 89.093 135.248 92.843C135.242 97.8698 133.242 102.689 129.688 106.243C126.133 109.798 121.314 111.797 116.288 111.803ZM116.288 76.0758C112.97 76.0758 109.727 77.0595 106.969 78.9025C104.211 80.7455 102.061 83.365 100.792 86.4298C99.5221 89.4946 99.1899 92.8671 99.8371 96.1206C100.484 99.3742 102.082 102.363 104.427 104.709C106.773 107.054 109.762 108.652 113.015 109.299C116.269 109.946 119.641 109.614 122.706 108.344C125.771 107.075 128.39 104.925 130.233 102.167C132.076 99.4086 133.06 96.1658 133.06 92.8485C133.056 88.4014 131.287 84.1377 128.143 80.9932C124.998 77.8486 120.735 76.0801 116.288 76.0758Z"
                        fill="white"
                      ></path>
                    </g>
                    <g filter="url(#filter5_dx1)">
                      <path
                        d="M111.71 45.1008V36.6406H102.107V28.1969H4.75781V77.9625H14.3609V86.4063H23.9641V94.861H97.4531C97.3807 94.1908 97.3442 93.5171 97.3438 92.843V92.6735H37.6852C37.4906 89.8928 36.3848 87.2537 34.5391 85.1648C32.6934 83.0759 30.2106 81.6536 27.475 81.118C27.0378 81.0308 26.5959 80.9687 26.1516 80.9321V58.811C29.1196 58.5509 31.9012 57.2532 34.0074 55.1459C36.1137 53.0386 37.4101 50.2565 37.6688 47.2883H107.609C107.618 47.4568 107.637 47.6247 107.663 47.7914C107.766 48.6007 107.949 49.3976 108.21 50.1703C108.53 51.131 108.965 52.0493 109.506 52.9047C110.542 54.5635 111.948 55.9594 113.614 56.9824C115.281 58.0054 117.162 58.6276 119.109 58.8V74.1125C119.847 74.2203 120.578 74.3737 121.297 74.5719V45.1008H111.71ZM99.8922 30.3844V36.6406H93.5703C91.8947 34.9508 90.8453 32.7401 90.5953 30.3735L99.8922 30.3844ZM6.92344 30.3844H16.2695C16.0096 32.7654 14.943 34.9859 13.2468 36.6771C11.5507 38.3682 9.3271 39.4283 6.94531 39.6813L6.92344 30.3844ZM14.3391 75.5399H6.94531V66.243C8.41488 66.3973 9.83524 66.8605 11.1132 67.6022C12.3912 68.3439 13.498 69.3474 14.3609 70.5469L14.3391 75.5399ZM14.3391 67.2657C12.2904 65.3996 9.68438 64.2599 6.92344 64.0227V41.9016C9.68438 41.6643 12.2904 40.5247 14.3391 38.6586V67.2657ZM18.4406 30.3844H88.4024C88.595 32.6421 89.3985 34.8048 90.7266 36.6406H16.1438C17.468 34.8032 18.2693 32.6411 18.4625 30.3844H18.4406ZM23.9422 75.7203C22.2294 74.1631 20.1222 73.1057 17.85 72.6633C17.4128 72.5761 16.9709 72.5141 16.5266 72.4774V50.3563C19.2875 50.119 21.8935 48.9794 23.9422 47.1133V75.7203ZM16.5484 48.1578V38.8281H25.8453C25.5945 41.2113 24.5353 43.4367 22.8438 45.1341C21.1524 46.8316 18.9307 47.8986 16.5484 48.1578ZM23.9641 83.9946H16.5484V74.6703C19.0589 74.9408 21.3883 76.1055 23.1109 77.9516C23.4187 78.278 23.7038 78.6252 23.9641 78.9907V83.9946ZM28.0109 83.4914C29.9958 84.0804 31.7628 85.2419 33.0907 86.8305C34.4185 88.419 35.2482 90.364 35.4758 92.4219H26.1516V83.125C26.7812 83.1906 27.4035 83.3133 28.0109 83.4914ZM26.1516 56.6125V47.3156H35.4758C35.2168 49.6971 34.1505 51.9181 32.4542 53.6094C30.7579 55.3008 28.5337 56.3605 26.1516 56.6125ZM25.7469 45.1281C27.0817 43.2799 27.8837 41.1008 28.0656 38.8281H98.0055C98.0154 38.9948 98.0336 39.1609 98.0602 39.3258C98.1606 40.1354 98.3438 40.9325 98.6071 41.7047C98.9263 42.6655 99.3616 43.5837 99.9031 44.4391C100.034 44.6578 100.182 44.8766 100.335 45.0844L25.7469 45.1281ZM103.168 45.1281C102.769 44.7268 102.403 44.2933 102.074 43.8321C101.66 43.2527 101.308 42.6313 101.024 41.9782C100.583 40.9788 100.304 39.9154 100.198 38.8281H109.495V45.1008L103.168 45.1281ZM111.683 52.2867C110.642 50.8176 109.994 49.1061 109.802 47.3156H119.098V56.6125C117.625 56.4538 116.201 55.9836 114.923 55.2331C113.644 54.4826 112.54 53.469 111.683 52.2594V52.2867Z"
                        fill="white"
                      ></path>
                    </g>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M113.685 94.013H109.625V91.5143H113.503L109.225 85H112.238C112.448 85 112.598 85.03 112.688 85.09C112.786 85.1424 112.872 85.2324 112.947 85.3598L116.646 91.3306C116.684 91.2331 116.725 91.1394 116.77 91.0495C116.815 90.952 116.867 90.8546 116.927 90.7571L120.312 85.416C120.477 85.1387 120.69 85 120.953 85H123.854L118.614 92.7699L124 101.259H120.975C120.773 101.259 120.608 101.207 120.481 101.102C120.361 100.997 120.259 100.877 120.177 100.742L116.41 94.5127C116.38 94.6027 116.346 94.6889 116.309 94.7714C116.271 94.8463 116.234 94.9175 116.196 94.985L112.587 100.742C112.504 100.87 112.403 100.99 112.283 101.102C112.163 101.207 112.013 101.259 111.834 101.259H109L113.685 94.013Z"
                      fill="white"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M70.7497 70.214H67.5004V68.214H70.604L67.18 63H69.592C69.76 63 69.88 63.024 69.952 63.072C70.03 63.114 70.099 63.186 70.159 63.288L73.12 68.067C73.15 67.989 73.183 67.914 73.219 67.842C73.255 67.764 73.297 67.686 73.345 67.608L76.054 63.333C76.186 63.111 76.357 63 76.567 63H78.889L74.695 69.219L79.006 76.014H76.585C76.423 76.014 76.291 75.972 76.189 75.888C76.093 75.804 76.012 75.708 75.946 75.6L72.931 70.614C72.907 70.686 72.88 70.755 72.85 70.821C72.82 70.881 72.79 70.938 72.76 70.992L69.871 75.6C69.805 75.702 69.724 75.798 69.628 75.888C69.532 75.972 69.412 76.014 69.268 76.014H67L70.7497 70.214Z"
                      fill="white"
                    ></path>
                  </g>
                  <defs>
                    <filter
                      id="filter0_dx1"
                      x="45.6899"
                      y="43.0594"
                      width="53.8484"
                      height="53.8484"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood
                        floodOpacity="0"
                        result="BackgroundImageFix"
                      ></feFlood>
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      ></feColorMatrix>
                      <feOffset></feOffset>
                      <feGaussianBlur stdDeviation="6"></feGaussianBlur>
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0.631373 0 0 0 0 0.898039 0 0 0 1 0"
                      ></feColorMatrix>
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow"
                      ></feBlend>
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow"
                        result="shape"
                      ></feBlend>
                    </filter>
                    <filter
                      id="filter1_dx1"
                      x="85.3273"
                      y="61.8828"
                      width="61.9203"
                      height="61.9203"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood
                        floodOpacity="0"
                        result="BackgroundImageFix"
                      ></feFlood>
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      ></feColorMatrix>
                      <feOffset></feOffset>
                      <feGaussianBlur stdDeviation="6"></feGaussianBlur>
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0.631373 0 0 0 0 0.898039 0 0 0 1 0"
                      ></feColorMatrix>
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow"
                      ></feBlend>
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow"
                        result="shape"
                      ></feBlend>
                    </filter>
                    <filter
                      id="filter2_dx1"
                      x="-7.24219"
                      y="16.1969"
                      width="140.539"
                      height="90.6641"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood
                        floodOpacity="0"
                        result="BackgroundImageFix"
                      ></feFlood>
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      ></feColorMatrix>
                      <feOffset></feOffset>
                      <feGaussianBlur stdDeviation="6"></feGaussianBlur>
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0.631373 0 0 0 0 0.898039 0 0 0 1 0"
                      ></feColorMatrix>
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow"
                      ></feBlend>
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow"
                        result="shape"
                      ></feBlend>
                    </filter>
                    <filter
                      id="filter3_dx1"
                      x="45.6899"
                      y="43.0594"
                      width="53.8484"
                      height="53.8484"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood
                        floodOpacity="0"
                        result="BackgroundImageFix"
                      ></feFlood>
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      ></feColorMatrix>
                      <feOffset></feOffset>
                      <feGaussianBlur stdDeviation="6"></feGaussianBlur>
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.917647 0 0 0 0 0.321569 0 0 0 0 0.517647 0 0 0 1 0"
                      ></feColorMatrix>
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow"
                      ></feBlend>
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow"
                        result="shape"
                      ></feBlend>
                    </filter>
                    <filter
                      id="filter4_dx1"
                      x="85.3273"
                      y="61.8828"
                      width="61.9203"
                      height="61.9203"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood
                        floodOpacity="0"
                        result="BackgroundImageFix"
                      ></feFlood>
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      ></feColorMatrix>
                      <feOffset></feOffset>
                      <feGaussianBlur stdDeviation="6"></feGaussianBlur>
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.917647 0 0 0 0 0.321569 0 0 0 0 0.517647 0 0 0 1 0"
                      ></feColorMatrix>
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow"
                      ></feBlend>
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow"
                        result="shape"
                      ></feBlend>
                    </filter>
                    <filter
                      id="filter5_dx1"
                      x="-7.24219"
                      y="16.1969"
                      width="140.539"
                      height="90.6641"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood
                        floodOpacity="0"
                        result="BackgroundImageFix"
                      ></feFlood>
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      ></feColorMatrix>
                      <feOffset></feOffset>
                      <feGaussianBlur stdDeviation="6"></feGaussianBlur>
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.917647 0 0 0 0 0.321569 0 0 0 0 0.517647 0 0 0 1 0"
                      ></feColorMatrix>
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow"
                      ></feBlend>
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow"
                        result="shape"
                      ></feBlend>
                    </filter>
                    <clipPath id="clip0x1">
                      <rect width="140" height="140" fill="white"></rect>
                    </clipPath>
                    <clipPath id="clip1x1">
                      <rect width="140" height="140" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  Shooting Stars
                </h2>
                <p className="leading-relaxed text-base">
                  Blue bottle crucifix vinyl post-ironic four dollar toast vegan
                  taxidermy. Gastropub indxgo juice poutine, ramps microdosing
                  banh mi pug VHS try-hard.
                </p>
                <a className="mt-3 text-indigo-500 inline-flex items-center">
                  Learn More
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-10 h-10"
                  viewBox="0 0 24 24"
                >
                  <circle cx="6" cy="6" r="3"></circle>
                  <circle cx="6" cy="18" r="3"></circle>
                  <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                </svg>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  The Catalyzer
                </h2>
                <p className="leading-relaxed text-base">
                  Blue bottle crucifix vinyl post-ironic four dollar toast vegan
                  taxidermy. Gastropub indxgo juice poutine, ramps microdosing
                  banh mi pug VHS try-hard.
                </p>
                <a className="mt-3 text-indigo-500 inline-flex items-center">
                  Learn More
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-10 h-10"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  Neptune
                </h2>
                <p className="leading-relaxed text-base">
                  Blue bottle crucifix vinyl post-ironic four dollar toast vegan
                  taxidermy. Gastropub indxgo juice poutine, ramps microdosing
                  banh mi pug VHS try-hard.
                </p>
                <a className="mt-3 text-indigo-500 inline-flex items-center">
                  Learn More
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Button
          </button>
        </div>
      </section>
    </>
  );
}

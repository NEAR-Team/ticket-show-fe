import Image from "next/image";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import dayjs from "dayjs";
import SvgWave from "../components/SvgWave";

import {
  FcCurrencyExchange,
  FcTwoSmartphones,
  FcCustomerSupport,
} from "react-icons/fc";
import { useAppContext } from "../context/app.context";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { callPublicRpc } from "../utils";
import { toast } from "react-toastify";

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
};

export default function Home() {
  const { mainContract, accountId, isAuth, login } = useAppContext();

  const router = useRouter();

  const getCompany = useCallback(async () => {
    const company = await callPublicRpc(
      process.env.CONTRACT_NAME,
      "get_contracts_by_owner",
      { owner_id: accountId }
    );

    if (company && company.length > 0) {
      return true;
    }
    return false;
  }, [accountId]);

  const handleStartSelling = async () => {
    if (!isAuth) {
      toast("Please login first");
      return;
    }
    const hasCompany = await getCompany();
    if (!hasCompany) {
      mainContract.create_new_ticket_contract(
        {
          prefix: `ticket_${dayjs().unix()}`,
          metadata: {
            spec: "v0.1",
            name: `Ticket contract for ${accountId}`,
            symbol: "TIKTOK",
          },
        },
        process.env.TICKET_PREPARE_GAS,
        process.env.CONTRACT_CREATE_FEE
      );
    } else {
      router.push("/user-dashboard");
    }
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
            <Link href="/user-dashboard" passHref={true}>
              <button className="mx-auto lg:mx-0  bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                Get in Touch
              </button>
            </Link>
          </div>

          <div className="w-full md:w-3/5 py-6 text-center">
            <Image
              layout="responsive"
              src="/assets/hero.svg"
              width={613}
              height={529}
              className="w-full md:w-4/5"
              alt="Hero"
              priority={true}
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
      <section className="text-gray-600 body-font bg-white">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <Slider {...settings}>
              <div>
                <Image
                  src="/assets/usecase-audio-obscura.24950ea-1600.jpg"
                  width={1600}
                  height={1066}
                  alt="usecase-audio-obscura"
                  layout="responsive"
                />
              </div>
              <div>
                <Image
                  src="/assets/usecase-guus-meeuwis-groots.eb3a4f6-1600.jpg"
                  width={1600}
                  height={1066}
                  alt="usecase-guus-meeuwis-groots"
                  layout="responsive"
                />
              </div>
              <div>
                <Image
                  src="/assets/usecase-jochem-myjer-in-carre.b2c66f2-1600.jpg"
                  width={1600}
                  height={1066}
                  alt="usecase-jochem-myjer-in-carre"
                  layout="responsive"
                />
              </div>
              <div>
                <Image
                  src="/assets/usecase-livestreams.f11b078-1600.jpg"
                  width={1600}
                  height={1066}
                  alt="usecase-livestreams"
                  layout="responsive"
                />
              </div>
            </Slider>
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Ready for your next event?
            </h1>
            <p className="mb-8 leading-relaxed">
              We are confident that we are the future of ticketing and we plan
              on taking over the world.
            </p>
            <div className="flex justify-center">
              <button
                className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                onClick={handleStartSelling}
              >
                Start selling ticket
              </button>
              <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                Support
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

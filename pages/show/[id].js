import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../context/app.context";
import Ticket from "../../components/Ticket";
import { Contract, providers } from "near-api-js";
import { NextSeo } from "next-seo";
import FourNotFour from "../../components/404";

export default function ShowPage() {
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(true);
  const { id, company } = router.query;
  const { isAuth, getContractTicket, connect } = useAppContext();
  const [showData, setShowData] = useState(null);

  // const getShowMetadata = useCallback(async () => {
  //   if (isAuth) {
  //     const ticketContract = await getContractTicket();
  //     if (ticketContract && id) {
  //       const meatadata = await ticketContract.show_metadata({ show_id: id });
  //       console.log(meatadata);
  //       setShowData(meatadata);
  //     }
  //   }
  // }, [getContractTicket, id, isAuth]);

  // useEffect(() => {
  //   getShowMetadata();
  // }, [getShowMetadata]);

  const getShowMetadata = useCallback(async () => {
    if (!id || !company) {
      console.warn(`No show_id or company provided! Skip fetching show metadata.`);
      return;
    }
    setIsFetching(true);
    const provider = new providers.JsonRpcProvider(process.env.jsonRpcProvider);
    const args = Buffer.from(JSON.stringify({ show_id: id })).toString("base64");

    try {
      const rawResult = await provider.query({
        request_type: "call_function",
        account_id: `${company}.${process.env.CONTRACT_NAME}`,
        method_name: "show_metadata",
        args_base64: args,
        finality: "optimistic",
      });
      const result = JSON.parse(Buffer.from(rawResult.result).toString());
      setShowData(result);
    } catch (e) {
      console.log(e);
    } finally {
      setIsFetching(false);
    }
    // format result
  }, [id, company]);

  useEffect(() => {
    getShowMetadata();
  }, [getShowMetadata]);

  return (
    <div className="w-full bg-white">
      <NextSeo title={`Show ${showData?.show_title || ""}`} />
      <section className="text-gray-600 body-font">
        <div>
          <Image
            priority={true}
            layout="responsive"
            src="https://picsum.photos/1280/450"
            width={1280}
            height={450}
            alt="show"
          />
          {!isFetching && !showData && <FourNotFour />}
          {showData && (
            <div className="flex-col w-full py-10 text-center">
              <h1 className="mb-4 text-3xl font-medium text-gray-900 uppercase title-font sm:text-4xl">
                {showData.show_title}
              </h1>
              <p className="mb-8 leading-relaxed">{showData.show_description}</p>
              <div className="grid max-w-screen-lg gap-6 mx-auto lg:grid-cols-2">
                {Object.keys(showData.ticket_infos).map((ticket, index) => (
                  <Ticket
                    company={company}
                    show={showData}
                    ticket={showData.ticket_infos[ticket]}
                    key={`ticket_${index}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

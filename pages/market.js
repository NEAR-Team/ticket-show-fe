import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import LoadingSection from "../components/LoadingSection";
import { useAppContext } from "../context/app.context";
import { callPublicRpc } from "../utils";

export default function MarketPage() {
  const { isAuth, mainContract, connectContract, accountId } = useAppContext();
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllShows = useCallback(async () => {
    const contractAddresses = await callPublicRpc(
      process.env.CONTRACT_NAME,
      "get_ticket_contracts",
      {}
    );
    const showPromises = await Promise.all(
      contractAddresses.map(async (contractAddress) => {
        // const contract = await connectContract(contractAddress);
        const shows = await callPublicRpc(contractAddress, "get_all_shows", {});
        return shows.map((show) => ({ ...show, contractId: contractAddress }));
      })
    );
    const shows = await Promise.all(showPromises);
    setShows(shows.flat());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getAllShows();
  }, [getAllShows]);

  return (
    <div className="bg-white">
      <div className="max-w-screen-xl mx-auto ">
        <div className="grid grid-cols-1 gap-4 py-20 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {isLoading ? (
            <LoadingSection />
          ) : (
            shows &&
            shows.length > 0 &&
            shows.map((show, index) => {
              const contractId = show.contractId.split(".")[0] || "unknown";
              return (
                <div key={show.show_id} className="w-full p-4 rounded-lg shadow-lg">
                  <Link href={`/show/${show.show_id}?company=${contractId}`}>
                    <a className="relative block h-40 overflow-hidden rounded">
                      <Image
                        alt="ecommerce"
                        className="block object-cover object-center w-full h-full"
                        src={show.show_banner || "https://dummyimage.com/420x260"}
                        width={420}
                        height={260}
                      />
                    </a>
                  </Link>
                  <div className="space-y-2">
                    <h2 className="pt-4 text-xl font-semibold text-gray-900 uppercase title-font">
                      {show.show_title}
                    </h2>
                    <p>{show.show_description}</p>
                    <p className="mt-1 text-sm italic text-right">
                      End at:{" "}
                      {dayjs(show.selling_end_time / 1_000_000)
                        .format("DD/MM/YYYY")
                        .toString()}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

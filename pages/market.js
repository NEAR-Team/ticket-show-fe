import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import LoadingSection from "../components/LoadingSection";
import Shows from "../components/Shows";
import { callPublicRpc } from "../utils";

export default function MarketPage() {
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

  const isNotSoldYet = (show) => dayjs(show.selling_start_time / 1_000_000).isAfter(dayjs());
  const isSoldOutTime = (show) => dayjs(show.selling_end_time / 1_000_000).isBefore(dayjs());
  const showsToShow = useMemo(() => {
    const result = {
      selling: [],
      ended: [],
      preparing: [],
    };
    shows.forEach((show) => {
      if (isNotSoldYet(show)) {
        result.selling.push(show);
      } else if (isSoldOutTime(show)) {
        result.ended.push(show);
      } else {
        result.preparing.push(show);
      }
    });
    return result;
  }, [shows]);

  return (
    <div className="bg-white">
      <div className="max-w-screen-xl mx-auto ">
        {isLoading ? (
          <LoadingSection />
        ) : (
          <div className="py-20">
            {showsToShow.selling.length > 0 && (
              <h3 className="px-4 text-3xl font-bold text-gray-600 md:px-0 ">Selling</h3>
            )}
            <Shows shows={showsToShow.selling} />
            {showsToShow.preparing.length > 0 && (
              <h3 className="text-3xl font-bold text-gray-600">Preparing</h3>
            )}
            <Shows shows={showsToShow.preparing} />
            {showsToShow.ended.length > 0 && (
              <h3 className="text-3xl font-bold text-gray-600">Ended</h3>
            )}
            <Shows shows={showsToShow.ended} />
          </div>
        )}
      </div>
    </div>
  );
}

import { useCallback, useEffect, useMemo, useState } from "react";
import LoadingSection from "../components/LoadingSection";
import Tickets from "../components/Ticket";
import { useAppContext } from "../context/app.context";

export default function MyTicket() {
  const { isAuth, mainContract, connectContract, accountId, triedEager, login } = useAppContext();
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyTickets = useCallback(async () => {
    if (!isAuth || !accountId) {
      return;
    }
    const contracts = await mainContract.get_ticket_contracts();

    const promises = contracts.map(async (contractAddress) => {
      const contract = await connectContract(contractAddress);
      return contract.get_tickets_by_owner({ owner: accountId });
    });
    const tickets = await Promise.all(promises);
    setTickets(tickets.flat());
    setIsLoading(false);
  }, [mainContract, connectContract, isAuth, accountId]);

  useEffect(() => {
    getMyTickets();
  }, [getMyTickets]);

  useEffect(() => {
    if (triedEager && !isAuth && !accountId) {
      // login();
      console.log("triedEager", triedEager, "isAuth", isAuth, "accountId", accountId);
    }
  }, [triedEager, isAuth, login, accountId]);

  console.log("tickets", tickets);

  const isUsed = (ticket) => ticket.is_used;

  const ticketsToShow = useMemo(() => {
    const result = {
      used: [],
      notUsed: [],
    };
    tickets.forEach((ticket) => {
      if (isUsed(ticket)) {
        result.used.unshift(ticket);
      } else {
        result.notUsed.unshift(ticket);
      }
    });
    return result;
  }, [tickets]);

  return (
    <div className="bg-white">
      <div className="max-w-screen-xl mx-auto ">
        {isLoading ? (
          <LoadingSection />
        ) : (
          <div className="py-20">
            {ticketsToShow.notUsed.length > 0 && (
              <div className="flex items-end justify-between px-4 lg:px-0">
                <h3 className="text-3xl font-bold text-gray-600 md:px-0 ">NOT USED</h3>
              </div>
            )}
            <Tickets tickets={ticketsToShow.notUsed} />
            <div className="py-20">
              {ticketsToShow.used.length > 0 && (
                <div className="flex items-end justify-between px-4 lg:px-0">
                  <h3 className="text-3xl font-bold text-gray-600 md:px-0 ">USED</h3>
                </div>
              )}
              <Tickets tickets={ticketsToShow.used} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

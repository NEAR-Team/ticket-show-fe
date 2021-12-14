import { useCallback, useEffect, useState } from "react";
import { useRef } from "react/cjs/react.production.min";
import LoadingSection from "../components/LoadingSection";
import Ticket from "../components/Ticket";
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
      const contractTickets = await contract.get_tickets_by_owner({ owner: accountId });
      const ticketPromises = contractTickets.map(async (contractTicket) => {
        const showMetadata = await contract.show_metadata({ show_id: contractTicket.show_id });
        return {
          ...contractTicket,
          ...showMetadata,
        };
      });
      return Promise.all(ticketPromises);
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

  return (
    <div className="max-w-screen-xl mx-auto">
      {isLoading ? (
        <LoadingSection />
      ) : (
        <div className="grid grid-cols-1 gap-4 py-20 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {tickets.map((ticket) => (
            <Ticket key={ticket.ticket_id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
}

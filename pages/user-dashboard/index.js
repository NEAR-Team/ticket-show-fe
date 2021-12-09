import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/app.context";
import { utils, providers } from "near-api-js";
import { useRouter } from "next/router";
import getConfig from "../../config/near.config";
export default function UserDashboard() {
  const { query, replace, pathname } = useRouter();
  const { isAuth, login, mainContract, connectContract, accountId } =
    useAppContext();

  useEffect(() => {
    if (mainContract && !isAuth) {
      login();
    }
  }, [mainContract, isAuth, login]);

  useEffect(() => {
    const { errorCode, errorMessage, transactionHashes } = query;
    if (errorCode) {
      toast.error(`Transaction failed: ${decodeURIComponent(errorMessage)}`);
      replace(pathname, undefined, { shallow: true });
    }
    if (transactionHashes) {
      toast.success("Contract created");
      const _provider = new providers.JsonRpcProvider(
        "https://rpc.testnet.near.org"
      );
      _provider.txStatus(transactionHashes, accountId).then(console.log);
      replace(pathname, undefined, { shallow: true });
    }
  }, [accountId, pathname, query, replace]);

  const handleCreateContract = async () => {
    await mainContract.create_new_ticket_contract(
      {
        prefix: "show1",
        metadata: {
          spec: "nft-1.0.0",
          name: "Mosaics",
          symbol: "MOSIAC",
        },
      },
      100000000000000,
      utils.format.parseNearAmount("11.5")
    );
  };

  const handleCreateTicket = async (prefix) => {
    const contractName = `${prefix}.${process.env.CONTRACT_NAME}`;
    const { walletConnection, accountId, contract, account } =
      await connectContract(contractName);

    console.log({ walletConnection, accountId, contract, account });

    // if (walletConnection.isSignedIn()) {
    //   walletConnection.requestSignIn({
    //     contractId: contractName,
    //     successUrl: `${process.env.domain}/user-dashboard`,
    //     failureUrl: process.env.domain,
    //   });
    // }

    await contract.create_new_show({
      show_id: "son_tung_mtp",
      show_title: "son tung mtp",
      ticket_types: ["vip", "normal"],
      tickets_supply: [10, 100],
      ticket_prices: [
        utils.format.parseNearAmount("0.003"),
        utils.format.parseNearAmount("0.001"),
      ],
      selling_start_time: new Date().getTime() + 1000 * 60 * 60 * 24,
      selling_end_time: new Date().getTime() + 1000 * 60 * 60 * 24 * 7,
    });
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto py-10">
        <h1>User Dashboard</h1>
        <div className="space-x-1">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleCreateContract}
          >
            Tao contract show
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => handleCreateTicket("show1")}
          >
            Tao ticket
          </button>
        </div>
      </div>
    </div>
  );
}

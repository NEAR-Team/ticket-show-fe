import { useEffect } from "react";
import { useAppContext } from "../context/app.context";
import { utils } from "near-api-js";

export default function TestContract() {
  const { login, isAuth, logout, accountId, account, contract } =
    useAppContext();

  const handleMint = async () => {
    console.log("minting");

    await contract.create_new_ticket_contract(
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

  useEffect(() => {
    // if (contract) contract.nft_token({ token_id: "leo001" }).then(console.log);
  }, [contract]);

  return (
    <div className="pt-24">
      <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        {isAuth ? (
          <>
            <h2>TestContract</h2>
            <button onClick={handleMint}>Mint</button>
          </>
        ) : (
          <button onClick={login}>Login</button>
        )}
      </div>
    </div>
  );
}

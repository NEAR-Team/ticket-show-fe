import { useEffect } from "react";
import { useAppContext } from "../context/app.context";

export default function TestContract() {
  const { login, isAuth, logout, accountId, account, contract } =
    useAppContext();

  const handleMint = async () => {
    console.log("minting");
    await contract.nft_mint({
      token_id: "leo001",
      receiver_id: "ainetwork.testnet",
      token_metadata: {
        title: "meta title mint by leo",
        description: "meta description mint by leo",
        image: "https://via.placeholder.com/150",
      },
    });
  };

  useEffect(() => {
    if (contract) contract.nft_token({ token_id: "1" }).then(console.log);
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

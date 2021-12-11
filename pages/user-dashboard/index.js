import { useAppContext } from "../../context/app.context";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
export default function UserDashboard() {
  const { isAuth, mainContract, accountId, connectContract } = useAppContext();
  const [company, setCompany] = useState(null);
  const router = useRouter();

  const getCompany = useCallback(async () => {
    if (mainContract && accountId) {
      const company = await mainContract.get_contracts_by_owner({
        owner_id: accountId,
      });
      if (company.length > 0) {
        setCompany(company[0]);
        await connectContract(company[0]);
        router.push("/user-dashboard/my-show");
      }
    }
  }, [accountId, connectContract, mainContract, router]);

  useEffect(() => {
    getCompany();
  }, [getCompany]);

  return (
    <div className="bg-white py-5">
      <div className="container mx-auto space-y-5 p-5">
        <h1 className="uppercase text-gray-800 font-medium">User Dashboard</h1>
        <div className="h-screen">
          {!company && <button>tao company</button>}
        </div>
      </div>
    </div>
  );
}

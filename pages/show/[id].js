import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../context/app.context";
import Label from "@material-tailwind/react/Label";

export default function ShowPage() {
  const router = useRouter();
  const { id } = router.query;
  const { isAuth, getContractTicket } = useAppContext();
  const [showData, setShowData] = useState(null);

  const getShowMetadata = useCallback(async () => {
    if (isAuth) {
      const ticketContract = await getContractTicket();
      if (ticketContract && id) {
        const meatadata = await ticketContract.show_metadata({ show_id: id });
        setShowData(meatadata);
      }
    }
  }, [getContractTicket, id, isAuth]);

  useEffect(() => {
    getShowMetadata();
  }, [getShowMetadata]);

  return (
    <div className="bg-white w-full">
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
          {showData && (
            <div className="text-center flex-col w-full py-10">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 uppercase">
                {showData && showData.show_title}
              </h1>
              <p className="mb-8 leading-relaxed">
                {showData && showData.show_description}
              </p>
              <div className="flex justify-center">
                <Label color="lightBlue">Label</Label>
                <h1 className="pl-10  sm:pt-5 text-white sm:pl-80 pt-5 ">
                  Tailwind CSS
                  <span className=" text-xs text-red-500">70%</span>
                </h1>
                <div className="mt-2 ml-10 sm:ml-80 h-4 relative w-60 rounded-full overflow-hidden">
                  <div className=" w-full h-full bg-gray-200 absolute"></div>
                  <div
                    className=" h-full bg-red-500 sm:bg-yellow-400 absolute"
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

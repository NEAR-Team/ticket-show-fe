import UserLayout from "../../components/UserLayout";
import Image from "next/image";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import { MdModeEditOutline } from "react-icons/md";
import Modal from "react-modal";
import Button from "@material-tailwind/react/Button";
Modal.setAppElement("#__next");

export default function MyShow() {
  const [shows, setShows] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const getMyShow = () => {
    setShows([
      {
        show_id: "son_tung_mtp_2",
        show_title: "son tung mtp",
        ticket_types: ["vip", "normal"],
        tickets_supply: [10, 100],
        ticket_prices: [3, 1],
        selling_start_time: Number(dayjs().unix() + "000000000"), // 1641653975225000000
        selling_end_time: Number(dayjs().add(30, "day").unix() + "000000000"),
      },
      {
        show_id: "son_tung_mtp_3",
        show_title: "son tung mtp",
        ticket_types: ["vip", "normal"],
        tickets_supply: [10, 100],
        ticket_prices: [3, 1],
        selling_start_time: Number(dayjs().unix() + "000000000"), // 1641653975225000000
        selling_end_time: Number(dayjs().add(30, "day").unix() + "000000000"),
      },
      {
        show_id: "son_tung_mtp_4",
        show_title: "son tung mtp",
        ticket_types: ["vip", "normal"],
        tickets_supply: [10, 100],
        ticket_prices: [3, 1],
        selling_start_time: Number(dayjs().unix() + "000000000"), // 1641653975225000000
        selling_end_time: Number(dayjs().add(30, "day").unix() + "000000000"),
      },
      {
        show_id: "son_tung_mtp_5",
        show_title: "son tung mtp",
        ticket_types: ["vip", "normal"],
        tickets_supply: [10, 100],
        ticket_prices: [3, 1],
        selling_start_time: Number(dayjs().unix() + "000000000"), // 1641653975225000000
        selling_end_time: Number(dayjs().add(30, "day").unix() + "000000000"),
      },
    ]);
  };

  useEffect(() => {
    getMyShow();
  }, []);

  const handleNewShow = () => {
    console.log("edit show");
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <UserLayout activeIndex={1}>
      <div className="space-y-3 border p-5 shadow">
        <div className="flex flex-row justify-between items-center">
          <h1 className="uppercase text-indigo-700 font-medium text-xl">
            My Show
          </h1>
          <div>
            <Button
              className=" text-blue-500 border px-3 py-2 rounded hover:bg-indigo-500 hover:text-white"
              onClick={handleNewShow}
            >
              Create new show
            </Button>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex w-full">
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-10 mx-auto">
                <div className="flex flex-wrap -m-4">
                  {shows &&
                    shows.length > 0 &&
                    shows.map((show, index) => (
                      <div
                        key={show.show_id}
                        className="lg:w-1/4 md:w-1/2 p-4 w-full"
                      >
                        <Link href="/">
                          <a className="block relative h-40 rounded overflow-hidden">
                            <Image
                              alt="ecommerce"
                              className="object-cover object-center w-full h-full block"
                              src="https://dummyimage.com/420x260"
                              width={420}
                              height={260}
                            />
                          </a>
                        </Link>
                        <div>
                          <h2 className="text-gray-900 title-font text-lg font-medium uppercase">
                            {show.show_title}
                          </h2>
                          <p className="mt-1 text-right text-sm italic">
                            End at:{" "}
                            {dayjs(show.selling_end_time / 1_000_000)
                              .format("DD/MM/YYYY")
                              .toString()}
                          </p>
                        </div>
                        <div>
                          <button className="border p-1 rounded-full hover:text-white hover:bg-indigo-500">
                            <MdModeEditOutline />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Modal isOpen={modalIsOpen} contentLabel="Example Modal">
        <h2>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </UserLayout>
  );
}

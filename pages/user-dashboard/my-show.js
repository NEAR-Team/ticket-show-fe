import UserLayout from "../../components/UserLayout";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import { MdModeEditOutline } from "react-icons/md";

import Button from "@material-tailwind/react/Button";
import { useAppContext } from "../../context/app.context";

import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";

import CssLoading from "../../components/Loading";
import usePost from "../../hooks/usePost";

export default function MyShow() {
  const {
    accountId,
    isAuth,

    mainContract,
    connectContract,
    getContractTicket,
  } = useAppContext();
  const [shows, setShows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [ticketContract, setTicketContract] = useState(null);
  const { mutate, loading } = usePost("/shows");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "ticket",
  });

  const getMyShow = useCallback(async () => {
    if (accountId) {
      // const result = await fetch(`/api/shows?owner_id=${accountId}`).then(
      //   (res) => res.json()
      // );
      if (!ticketContract) {
        const _ticketContract = await getContractTicket();
        const result = await _ticketContract.get_all_shows();
        setShows(result);
      }

      // setShows(result);
    }
  }, [accountId, getContractTicket, ticketContract]);

  const getCompany = useCallback(async () => {
    if (mainContract && accountId) {
      const company = await mainContract.get_contracts_by_owner({
        owner_id: accountId,
      });
      if (company.length > 0) {
        await connectContract(company[0]);
      }
    }
  }, [accountId, connectContract, mainContract]);

  useEffect(() => {
    getMyShow();
  }, [getCompany, getMyShow]);

  const handleNewShow = async () => {
    if (!ticketContract) {
      const _ticketContract = await getContractTicket();
      setTicketContract(_ticketContract);
    }
    setShowModal(true);
  };

  const onSubmit = async (data) => {
    if (!isAuth) {
      toast.warning("You need to login to create a show");
      return;
    }

    const submitData = {
      show_id: dayjs().unix().toString(),
      show_title: data.show_title,
      show_description: data.show_description,
      ticket_types: data.ticket.map((t) => t.ticket_type),
      tickets_supply: data.ticket.map((t) => Number(t.ticket_quantity)),
      ticket_prices: data.ticket.map((t) => Number(t.ticket_price)),
      selling_end_time: Number(dayjs(data.selling_end_time).unix() + "000000000"),
      selling_start_time: Number(dayjs(data.selling_start_time).unix() + "000000000"),
    };
    console.log(submitData);
    try {
      await mutate({ ...submitData, owner_id: accountId, contract: ticketContract.contractId });
      await ticketContract.create_new_show(submitData);
      toast.success("Show created successfully");
      setShowModal(false);
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <UserLayout activeIndex={1}>
      <div className="p-5 space-y-3 border shadow">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-xl font-medium text-indigo-700 uppercase">My Show</h1>
          <div>
            <Button onClick={handleNewShow}>Create new show</Button>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex w-full">
            <section className="text-gray-600 body-font">
              <div className="container py-5 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {shows &&
                    shows.length > 0 &&
                    shows.map((show, index) => (
                      <div key={show.show_id} className="w-full p-4">
                        <Link href={`/show/${show.show_id}`}>
                          <a className="relative block h-40 overflow-hidden rounded">
                            <Image
                              alt="ecommerce"
                              className="block object-cover object-center w-full h-full"
                              src="https://dummyimage.com/420x260"
                              width={420}
                              height={260}
                            />
                          </a>
                        </Link>
                        <div>
                          <h2 className="pt-4 text-lg font-medium text-gray-900 uppercase title-font">
                            {show.show_title}
                          </h2>
                          <p className="mt-1 text-sm italic text-right">
                            End at:{" "}
                            {dayjs(show.selling_end_time / 1_000_000)
                              .format("DD/MM/YYYY")
                              .toString()}
                          </p>
                        </div>
                        <div>
                          <button className="p-1 border rounded-full outline-none hover:text-white hover:bg-indigo-500 hover:outline-none focus:outline-none">
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
      <Modal size="lg" active={showModal} toggler={() => setShowModal(false)}>
        <ModalHeader toggler={() => setShowModal(false)}>Create new show</ModalHeader>
        <ModalBody>
          <form id="hook-form" className="w-96" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label
                htmlFor="show_title"
                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
              >
                Title
              </label>
              <input
                type="text"
                placeholder="MTP Entertaiment"
                required
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                {...register("show_title")}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="show_description"
                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
              >
                Desciption
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                {...register("show_description")}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="selling_start_time"
                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
              >
                Selling start time
              </label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                {...register("selling_start_time")}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="selling_end_time"
                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
              >
                Selling end time
              </label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                {...register("selling_end_time")}
              />
            </div>

            {fields.map((field, index) => (
              <div className="mb-6" key={index}>
                <div className="flex flex-row items-center space-x-1">
                  <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                      Type
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                      {...register(`ticket.${index}.ticket_type`)}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                      Quantity
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                      {...register(`ticket.${index}.ticket_quantity`)}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                      Price
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                      {...register(`ticket.${index}.ticket_price`)}
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button type="button" onClick={() => append({})}>
              Add ticket
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="red" buttonType="link" onClick={(e) => setShowModal(false)} ripple="dark">
            Close
          </Button>

          <Button color="green" type="submit" form="hook-form" ripple="light">
            {loading && <CssLoading className="font-sm" />} Save
          </Button>
        </ModalFooter>
      </Modal>
    </UserLayout>
  );
}

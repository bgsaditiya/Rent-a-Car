import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { usePage, useForm } from "@inertiajs/react";

export default function Sewa({ car, success }) {
    const [message, setMessage] = useState(success);

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage(null); // Menghapus pesan setelah beberapa detik
            }, 5000); // Pesan akan hilang setelah 5 detik
        }
    }, [message]);

    const { data, setData, post, errors, processing } = useForm({
        start_date: "",
        end_date: "",
        car_id: car.id,
    });

    // console.log(car);

    const { props } = usePage();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (props.flash?.error) {
            setErrorMessage(props.flash.error); // Set error message dari props
        } else {
            setErrorMessage(""); // Kosongkan error message jika tidak ada error
        }
    }, [props.flash]);

    function onClose() {
        setErrorMessage("");
    }

    function handleSubmit(e) {
        e.preventDefault();
        post("/sewa");
        setData("start_date", "");
        setData("end_date", "");
    }
    return (
        <>
            <Navbar />
            <div className="container mx-auto max-w-[1080px] mb-4 px-2 min-h-screen">
                <div className="mt-[75px] md:mt-[80px]">
                    <a
                        href="/"
                        className="px-4 py-2 rounded-md bg-red-500 text-white mb-2 block max-w-fit"
                    >
                        Kembali
                    </a>
                    <div className="flex flex-col w-full p-4 rounded-lg bg-white shadow">
                        <form onSubmit={handleSubmit}>
                            <label className="mb-2 font-semibold text-slate-900 block">
                                Tanggal mulai sewa
                            </label>
                            <input
                                value={data.start_date}
                                onChange={(e) =>
                                    setData("start_date", e.target.value)
                                }
                                className="border w-full p-2 rounded-md"
                                placeholder="Pilih Tanggal Akhir"
                                type="date"
                            />
                            {errors.start_date && (
                                <p className="text-red-500 my-2">
                                    {errors.start_date}
                                </p>
                            )}
                            <label className="block mb-2 mt-4 font-semibold text-slate-900">
                                Tanggal selesai sewa
                            </label>
                            <input
                                value={data.end_date}
                                onChange={(e) =>
                                    setData("end_date", e.target.value)
                                }
                                className="border w-full p-2 rounded-md"
                                placeholder="Pilih Tanggal Akhir"
                                type="date"
                            />
                            {errors.end_date && (
                                <p className="text-red-500 my-2">
                                    {errors.end_date}
                                </p>
                            )}
                            <label className="block mb-2 mt-4 font-semibold text-slate-900">
                                Mobil yang disewa
                            </label>
                            <input
                                className="border w-full p-2 rounded-md text-slate-500"
                                value={car.merk + " " + car.model}
                                readOnly
                                disabled
                            />
                            {errors.car_id && (
                                <p className="text-red-500 my-2">
                                    {errors.car_id}
                                </p>
                            )}
                            <button
                                type="submit"
                                className="mt-4 rounded-md bg-red-500 w-full py-2 text-center text-white font-semibold"
                            >
                                Sewa
                            </button>
                        </form>
                    </div>
                    {errorMessage && (
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                            <div className="relative bg-white rounded-lg shadow p-6">
                                <div className="flex justify-between items-center border-b border-gray-300 pb-3">
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        Pemberitahuan
                                    </h3>
                                </div>
                                <div className="space-y-4 mt-4">
                                    <p className="text-base leading-relaxed text-gray-500">
                                        {errorMessage}
                                    </p>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button
                                        onClick={onClose}
                                        className="py-2.5 px-5 text-sm font-medium text-white bg-red-500 border border-gray-200 rounded-lg hover:bg-red-400"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

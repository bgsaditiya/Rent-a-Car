import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { usePage, useForm } from "@inertiajs/react";

export default function Kembalikan({ rental }) {
    const { data, setData, post, errors, processing } = useForm({
        no_plat: "",
        car_id: rental.car.id,
        rental_id: rental.id,
    });

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
        post("/kembalikan");
        setData("no_plat", "");
    }
    return (
        <>
            <Navbar />
            <div className="container mx-auto max-w-[1080px] mb-4 px-2 min-h-screen">
                <div className="mt-[75px] md:mt-[80px]">
                    <a
                        href="/list-sewa"
                        className="px-4 py-2 rounded-md bg-red-500 text-white mb-2 block max-w-fit"
                    >
                        Kembali
                    </a>
                    <div className="flex flex-col w-full p-4 rounded-lg bg-white shadow">
                        <form onSubmit={handleSubmit}>
                            <label className="mb-2 font-semibold text-slate-900 block">
                                Mobil yang dikembalikan
                            </label>
                            <input
                                value={rental.car.merk + " " + rental.car.model}
                                className="border w-full p-2 rounded-md"
                                placeholder="Pilih Tanggal Akhir"
                                type="text"
                                disabled
                                readOnly
                            />
                            <div className="flex justify-between mb-2 mt-4 items-center">
                                <label className="font-semibold text-slate-900">
                                    Masukkan Nomor Plat
                                </label>
                                <p className="text-xs text-red-500 text-right text-balance">
                                    *Konfirmasi pengembalian dengan memasukkan
                                    nomor plat mobil
                                </p>
                            </div>

                            <input
                                value={data.no_plat}
                                onChange={(e) =>
                                    setData("no_plat", e.target.value)
                                }
                                className="border w-full p-2 rounded-md"
                                type="text"
                            />
                            {errors.no_plat && (
                                <p className="text-red-500 my-2">
                                    {errors.no_plat}
                                </p>
                            )}
                            {errors.car_id && (
                                <p className="text-red-500 my-2">
                                    {errors.car_id}
                                </p>
                            )}
                            <button
                                type="submit"
                                className="mt-4 rounded-md bg-red-500 w-full py-2 text-center text-white font-semibold"
                            >
                                Kembalikan Mobil
                            </button>
                        </form>

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
            </div>
            <Footer />
        </>
    );
}

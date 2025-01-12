import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { usePage, useForm } from "@inertiajs/react";

export default function Home({ cars }) {
    const [searchMerk, setSearchMerk] = useState("");
    const [searchModel, setSearchModel] = useState("");
    const [searchTersedia, setSearchTersedia] = useState("");
    // console.log(search);

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

    const FormatNumber = ({ number }) => {
        const formattedNumber = new Intl.NumberFormat("id-ID").format(number);

        return (
            <div className="font-medium text-slate-900 text-sm">
                Rp{formattedNumber}/hari
            </div>
        );
    };
    return (
        <>
            <Navbar />
            <div className="container mx-auto max-w-[1080px] mb-4 px-2">
                <div className="mt-[75px] md:mt-[80px]">
                    <img
                        className="mx-auto rounded-lg"
                        src="images/poster.png"
                        alt="Image Poster"
                    />
                </div>
                <div className="flex flex-col mt-4 md:mt-4 items-center">
                    {/* <p className="text-red-500 text-lg font-medium">
                        Cari Mobil
                    </p> */}
                    <div className="flex gap-2">
                        <input
                            onChange={(e) =>
                                setSearchMerk(e.target.value.toLowerCase())
                            }
                            type="text"
                            placeholder="Cari merk apa?"
                            className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        />
                        <input
                            onChange={(e) =>
                                setSearchModel(e.target.value.toLowerCase())
                            }
                            type="text"
                            placeholder="Cari model apa?"
                            className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        />
                        {/* <label
                            for="countries"
                            className="block text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Select an option
                        </label> */}
                        <select
                            onChange={(e) => setSearchTersedia(e.target.value)}
                            id="countries"
                            className="bg-white border border-slate-300 text-slate-400 text-sm rounded-md shadow-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 block w-full px-3 py-2"
                        >
                            <option value="">-Pilih ketersediaan-</option>
                            <option value="0">Tersedia</option>
                            <option value="1">Tidak Tersedia</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
                    {cars
                        .filter((car) => {
                            const filterMerk =
                                searchMerk === "" ||
                                car.merk
                                    .toLocaleLowerCase()
                                    .includes(searchMerk);

                            const filterModel =
                                searchModel === "" ||
                                car.model
                                    .toLocaleLowerCase()
                                    .includes(searchModel);

                            const filterTersedia =
                                searchTersedia === "" ||
                                (searchTersedia === "1" && !car.tersedia) ||
                                (searchTersedia === "0" && car.tersedia);

                            return filterMerk && filterModel && filterTersedia;
                        })
                        .map((car) => (
                            <div
                                key={car.id}
                                className="rounded-md overflow-hidden shadow bg-white"
                            >
                                <div className="w-full aspect-square">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={"/images/" + car.foto}
                                        alt="Brio"
                                    />
                                </div>
                                <div className="px-4 pt-2 pb-4 w-full">
                                    <h1 className="font-medium text-lg mb-6">
                                        {car.merk} {car.model}
                                    </h1>

                                    <div className="flex justify-between mb-2">
                                        <div className="item-center">
                                            {car.tersedia ? (
                                                <p className="text-xs font-medium text-white px-2 py-[2px] rounded-full bg-green-500">
                                                    Tersedia
                                                </p>
                                            ) : (
                                                <p className="text-xs font-medium text-white px-2 py-[2px] rounded-full bg-slate-500">
                                                    Tidak Tersedia
                                                </p>
                                            )}
                                        </div>
                                        <FormatNumber number={car.harga} />
                                    </div>

                                    {car.tersedia ? (
                                        <a
                                            href={`/sewa/${car.id}`}
                                            className="py-2 text-center rounded-md bg-red-500 text-white font-semibold w-full block"
                                            // onClick={() => handleDelete(car.id)}
                                        >
                                            Sewa
                                        </a>
                                    ) : (
                                        <button
                                            disabled
                                            className="py-2 text-center rounded-md bg-slate-500 text-white font-semibold w-full"
                                            // onClick={() => handleDelete(car.id)}
                                        >
                                            Mobil tidak tersedia
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
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
            <Footer />
        </>
    );
}

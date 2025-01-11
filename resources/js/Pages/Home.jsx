import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Home({ cars }) {
    const [searchMerk, setSearchMerk] = useState("");
    const [searchModel, setSearchModel] = useState("");
    const [searchTersedia, setSearchTersedia] = useState("");
    // console.log(search);

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
                <div className="flex justify-between mt-4 md:mt-4 items-center">
                    <p className="text-red-500 text-lg font-medium">
                        Cari Mobil
                    </p>
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
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 block w-full px-3 py-2"
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
                                className="rounded-md overflow-hidden shadow"
                            >
                                <div className="w-full aspect-square">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={"/images/" + car.foto}
                                        alt="Brio"
                                    />
                                </div>
                                <div className="px-4 pt-2 pb-4">
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
                                    <button
                                        // onClick={() => handleDelete(car.id)}
                                        className="py-2 px-4 rounded-md bg-red-500 text-white font-semibold w-full"
                                    >
                                        Sewa
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

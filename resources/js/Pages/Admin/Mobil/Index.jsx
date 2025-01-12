import React from "react";
import { useState, useEffect } from "react";
import { usePage, useForm } from "@inertiajs/react";
import axios from "axios";

export default function Index({ cars }) {
    const { delete: destroy } = useForm();

    const [searchMerk, setSearchMerk] = useState("");
    const [searchModel, setSearchModel] = useState("");
    const [searchTersedia, setSearchTersedia] = useState("");

    const handleDelete = (carId) => {
        if (window.confirm("Are you sure you want to delete this car?")) {
            // destroy`/cars/${carId}`;
            destroy(`/admin/dashboard/mobil/hapus/${carId}`);
            fetchCars();
        }
    };

    const FormatNumber = ({ number }) => {
        const formattedNumber = new Intl.NumberFormat("id-ID").format(number);

        return (
            <div className="font-medium text-slate-900 text-sm">
                Rp{formattedNumber}/hari
            </div>
        );
    };

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

    const [mobil, setMobil] = useState([]);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await axios.get("/api/cars");
            const dt = response.data;
            setMobil(dt.data); // Asumsikan `setMobil` adalah state updater untuk daftar mobil
        } catch (error) {
            console.error("Gagal memuat data mobil:", error);
        }
    };

    const handleToggleTersedia = async (carId, currentStatus) => {
        try {
            // Kirim request ke backend untuk memperbarui status tersedia
            await axios.put(`/api/cars/${carId}/toggle`, {
                tersedia: !currentStatus,
            });
            // Refresh data mobil setelah update berhasil
            fetchCars();
        } catch (error) {
            console.error("Gagal memperbarui status mobil:", error);
        }
    };

    return (
        <>
            <div className="container max-w-[1080px] mx-auto mt-12">
                <h1 className="font-extrabold tracking-wide italic text-red-500 text-4xl text-center my-4">
                    RENTCAR
                </h1>

                <div className="flex justify-between w-full mx-auto">
                    <a
                        href="/admin/dashboard"
                        className="py-2 px-4 bg-red-500 hover:bg-red-400 rounded-md font-semibold text-white"
                    >
                        Kembali
                    </a>
                    <a
                        href="/admin/dashboard/mobil/tambah"
                        className="py-2 px-4 bg-red-500 hover:bg-red-400 rounded-md font-semibold text-white"
                    >
                        Tambah
                    </a>
                </div>
                <div className="bg-white rounded-lg p-4 w-full mx-auto shadow my-4">
                    <h1 className="font-semibold text-slate-900 text-xl text-center">
                        Daftar Mobil
                    </h1>
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
                    {mobil
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
                                className="bg-white rounded-md overflow-hidden shadow w-full mx-auto mb-2"
                            >
                                <img
                                    className="w-full h-auto"
                                    src={"/images/" + car.foto}
                                    alt="Brio"
                                />
                                <div className="px-4 pt-2 pb-4">
                                    <h1 className="font-medium text-lg">
                                        {car.merk} {car.model}
                                    </h1>
                                    <h1 className="font-medium mb-4">
                                        {car.no_plat}
                                    </h1>

                                    <div className="flex justify-between mb-4">
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
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            // onClick={() => handleDelete(car.id)}
                                            onClick={() =>
                                                handleToggleTersedia(
                                                    car.id,
                                                    car.tersedia
                                                )
                                            }
                                            className="py-2 px-4 rounded-md bg-gray-500 hover:bg-gray-400 text-white font-semibold w-full lg:text-sm md:px-2"
                                        >
                                            Ubah Status
                                        </button>
                                        <button
                                            onClick={() => handleDelete(car.id)}
                                            className="py-2 px-4 rounded-md bg-red-500 hover:bg-red-400 text-white font-semibold w-full lg:text-sm md:px-2"
                                        >
                                            Hapus
                                        </button>
                                    </div>
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
        </>
    );
}

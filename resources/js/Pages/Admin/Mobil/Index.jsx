import React from "react";
import { useState } from "react";
import { usePage, useForm } from "@inertiajs/react";

export default function Index({ cars }) {
    const { delete: destroy } = useForm();

    const handleDelete = (carId) => {
        if (window.confirm("Are you sure you want to delete this car?")) {
            // destroy`/cars/${carId}`;
            destroy(`/admin/dashboard/mobil/hapus/${carId}`);
        }
    };

    const FormatNumber = ({ number }) => {
        const formattedNumber = new Intl.NumberFormat("id-ID").format(number);

        return (
            <div className="font-medium text-slate-900">
                Rp{formattedNumber}/hari
            </div>
        );
    };

    return (
        <>
            <div className="container max-w-[1080px] mx-auto mt-12">
                <h1 className="font-extrabold tracking-wide italic text-red-500 text-4xl text-center my-4">
                    RENTCAR
                </h1>

                <div className="flex justify-between w-full max-w-96 mx-auto">
                    <a
                        href="/admin/dashboard"
                        className="py-2 px-4 bg-red-500 rounded-md font-semibold text-white"
                    >
                        Kembali
                    </a>
                    <a
                        href="/admin/dashboard/mobil/tambah"
                        className="py-2 px-4 bg-red-500 rounded-md font-semibold text-white"
                    >
                        Tambah
                    </a>
                </div>
                <div className="bg-white rounded-lg p-4 w-full max-w-96 mx-auto shadow my-4">
                    <h1 className="font-semibold text-slate-900 text-xl text-center">
                        Daftar Mobil
                    </h1>
                </div>

                {cars.map((car) => (
                    <div
                        key={car.id}
                        className="bg-white rounded-md overflow-hidden shadow w-full max-w-96 mx-auto mb-2"
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
                            <h1 className="font-medium mb-4">{car.no_plat}</h1>

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
                            <button
                                onClick={() => handleDelete(car.id)}
                                className="py-2 px-4 rounded-md bg-red-500 text-white font-semibold w-full"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

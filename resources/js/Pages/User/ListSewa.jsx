import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { usePage, useForm } from "@inertiajs/react";

export default function ListSewa({ listSewa }) {
    console.log(listSewa.merk);
    return (
        <>
            <Navbar />
            <div className="container mx-auto max-w-[1080px] mb-4 px-2 min-h-screen">
                <div className="mt-[75px] md:mt-[80px]">
                    <div className="overflow-x-auto shadow sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Merk
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Model
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tanggal Sewa
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Total Harga
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Aksi
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {listSewa.map((list) => (
                                    <tr
                                        key={list.id}
                                        className="odd:bg-white even:bg-gray-50 border-b"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                        >
                                            {list.car.merk}
                                        </th>
                                        <td className="px-6 py-4">
                                            {list.car.model}
                                        </td>
                                        <td className="px-6 py-4">
                                            {list.start_date} - {list.end_date}
                                        </td>
                                        <td className="px-6 py-4">
                                            {list.total_harga}
                                        </td>
                                        <td className="px-6 py-4">
                                            <a
                                                href="#"
                                                className="font-medium text-blue-600 hover:underline"
                                            >
                                                Kembalikan
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            Belum dikembalikan
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

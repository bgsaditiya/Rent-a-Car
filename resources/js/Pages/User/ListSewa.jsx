import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { usePage, useForm } from "@inertiajs/react";

export default function ListSewa({ listSewa, listReturn }) {
    // console.log(listSewa.merk);

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

    return (
        <>
            <Navbar />
            <div className="container mx-auto max-w-[1080px] mb-4 px-2 min-h-screen">
                <div className="mt-[75px] md:mt-[80px]">
                    <div className="overflow-x-auto shadow rounded md:rounded-lg bg-gray-500 mt-4">
                        <h1 className="text-sm font-semibold p-3 text-white">
                            Daftar Mobil yang disewa
                        </h1>
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
                                </tr>
                            </thead>
                            <tbody>
                                {listSewa && listSewa.length > 0 ? (
                                    listSewa.map((list) => (
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
                                                {list.start_date} -{" "}
                                                {list.end_date}
                                            </td>
                                            <td className="px-6 py-4">
                                                {list.total_harga}
                                            </td>
                                            <td className="px-6 py-4">
                                                {list.total_harga ? (
                                                    <p>Sudah dikembalikan</p>
                                                ) : (
                                                    <a
                                                        href={`/kembalikan/${list.id}`}
                                                        className="font-medium text-blue-600 hover:underline"
                                                    >
                                                        Kembalikan
                                                    </a>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="odd:bg-white even:bg-gray-50 border-b">
                                        <td
                                            scope="row"
                                            colSpan={5}
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                                        >
                                            Belum ada mobil yang dipinjam.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="overflow-x-auto shadow rounded md:rounded-lg bg-gray-500 mt-4">
                        <h1 className="p-3 rounded max-w-fit font-semibold text-white text-sm">
                            Daftar Mobil yang sudah dikembalikan
                        </h1>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Mobil
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Lama Sewa
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Total Harga
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tanggal Pengembalian
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {listReturn && listReturn.length > 0 ? (
                                    listReturn.map((list) => (
                                        <tr
                                            key={list.id}
                                            className="odd:bg-white even:bg-gray-50 border-b"
                                        >
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                            >
                                                {list.car.merk} {list.car.model}
                                            </th>
                                            <td className="px-6 py-4">
                                                {list.rental.total_hari}
                                            </td>
                                            <td className="px-6 py-4">
                                                {list.total_harga}
                                            </td>
                                            <td className="px-6 py-4">
                                                {list.return_date}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="odd:bg-white even:bg-gray-50 border-b">
                                        <td
                                            scope="row"
                                            colSpan={4}
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                                        >
                                            Belum ada mobil yang dikembalikan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
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

import React, { useEffect, useState } from "react";
import { usePage, useForm } from "@inertiajs/react";

export default function Tambah() {
    const { data, setData, post, errors, processing } = useForm({
        merk: "",
        model: "",
        foto: null,
        no_plat: "",
        harga: "",
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
        post("/admin/dashboard/mobil/tambah");
    }

    return (
        <>
            <div className="container max-w-[1080px] mx-auto mt-12">
                <h1 className="font-extrabold tracking-wide italic text-red-500 text-4xl text-center my-4">
                    RENTCAR
                </h1>

                <div className="flex justify-between w-full max-w-96 mx-auto mb-2">
                    <a
                        href="/admin/dashboard/mobil"
                        className="py-2 px-4 bg-red-500 rounded-md font-semibold text-white"
                    >
                        Kembali
                    </a>
                </div>
                <div className="bg-white rounded-lg p-4 w-full max-w-96 mx-auto shadow">
                    <h1 className="font-semibold text-slate-900 text-xl mb-4 text-center">
                        Tambah Data Mobil
                    </h1>
                    <hr />
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col mt-4"
                    >
                        <label className="font-semibold text-slate-900">
                            Merk
                        </label>
                        <input
                            value={data.merk}
                            className="mt-2 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            type="text"
                            onChange={(e) => setData("merk", e.target.value)}
                            required
                        />
                        {errors.merk && (
                            <p className="text-red-500 my-2">{errors.merk}</p>
                        )}
                        <label className="font-semibold text-slate-900 mt-4">
                            Model
                        </label>
                        <input
                            value={data.model}
                            className="mt-2 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            type="text"
                            onChange={(e) => setData("model", e.target.value)}
                            required
                        />
                        {errors.model && (
                            <p className="text-red-500 my-2">{errors.model}</p>
                        )}
                        <label className="font-semibold text-slate-900 mt-4">
                            Foto
                        </label>
                        <input
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-500 hover:file:bg-red-100 mt-2 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-slate-500"
                            type="file"
                            onChange={(e) => setData("foto", e.target.files[0])}
                        />
                        {errors.foto && (
                            <p className="text-red-500 my-2">{errors.foto}</p>
                        )}
                        <label className="font-semibold text-slate-900 mt-4">
                            Nomor Plat
                        </label>
                        <input
                            value={data.no_plat}
                            className="mt-2 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            type="text"
                            onChange={(e) => setData("no_plat", e.target.value)}
                            required
                        />
                        {errors.no_plat && (
                            <p className="text-red-500 my-2">
                                {errors.no_plat}
                            </p>
                        )}
                        <label className="font-semibold text-slate-900 mt-4">
                            Harga/hari
                        </label>
                        <input
                            value={data.harga}
                            className="mt-2 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            type="number"
                            onChange={(e) => setData("harga", e.target.value)}
                            required
                        />
                        {errors.harga && (
                            <p className="text-red-500 my-2">{errors.harga}</p>
                        )}
                        <button
                            type="submit"
                            className="w-full py-2 px-4 rounded-lg bg-red-500 mt-4 text-white font-semibold"
                        >
                            Tambah
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
        </>
    );
}

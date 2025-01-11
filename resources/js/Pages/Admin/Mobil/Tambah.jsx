import React from "react";
import { useState } from "react";
import { usePage, useForm } from "@inertiajs/react";

export default function Tambah() {
    const { data, setData, post, errors, processing } = useForm({
        merk: "",
        model: "",
        foto: null,
        no_plat: "",
        harga: "",
    });

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
                        />
                        <label className="font-semibold text-slate-900 mt-4">
                            Model
                        </label>
                        <input
                            value={data.model}
                            className="mt-2 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            type="text"
                            onChange={(e) => setData("model", e.target.value)}
                        />
                        <label className="font-semibold text-slate-900 mt-4">
                            Foto
                        </label>
                        <input
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-500 hover:file:bg-red-100 mt-2 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-slate-500"
                            type="file"
                            onChange={(e) => setData("foto", e.target.files[0])}
                        />
                        <label className="font-semibold text-slate-900 mt-4">
                            Nomor Plat
                        </label>
                        <input
                            value={data.no_plat}
                            className="mt-2 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            type="text"
                            onChange={(e) => setData("no_plat", e.target.value)}
                        />
                        <label className="font-semibold text-slate-900 mt-4">
                            Harga/hari
                        </label>
                        <input
                            value={data.harga}
                            className="mt-2 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            type="number"
                            onChange={(e) => setData("harga", e.target.value)}
                        />

                        <button
                            type="submit"
                            className="w-full py-2 px-4 rounded-lg bg-red-500 mt-4 text-white font-semibold"
                        >
                            Tambah
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

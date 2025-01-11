import React from "react";
import { usePage, useForm } from "@inertiajs/react";

export default function Daftar() {
    const { data, setData, post, errors, processing } = useForm({
        nama: "",
        alamat: "",
        no_telp: "",
        no_sim: "",
        password: "",
        password_confirmation: "",
    });

    function handleSubmit(e) {
        // console.log(data.nama);
        e.preventDefault();
        post("/daftar");
    }
    return (
        <>
            <div className="container flex flex-col mx-auto mt-12">
                <h1 className="font-extrabold tracking-wide italic text-red-500 text-4xl text-center my-4">
                    RENTCAR
                </h1>
                <div className="bg-white rounded-lg p-4 w-full max-w-96 mx-auto shadow">
                    <h1 className="font-semibold text-slate-900 text-xl mb-4 text-center">
                        Buat Akun
                    </h1>
                    <hr />
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col mt-4"
                    >
                        <label className="mb-3 font-semibold text-slate-900">
                            Nama Lengkap
                        </label>
                        <input
                            className="mb-6 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            type="text"
                            value={data.nama}
                            onChange={(e) => setData("nama", e.target.value)}
                        />
                        <label className="font-semibold text-slate-900">
                            Alamat
                        </label>
                        <textarea
                            className="mb-6 mt-3 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            type="text"
                            value={data.alamat}
                            onChange={(e) => setData("alamat", e.target.value)}
                        />
                        <label className="mb-3 font-semibold text-slate-900">
                            Nomor Telepon
                        </label>
                        <input
                            className="mb-6 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            type="number"
                            value={data.no_telp}
                            onChange={(e) => setData("no_telp", e.target.value)}
                        />

                        <label className="mb-3 font-semibold text-slate-900">
                            Nomor SIM A
                        </label>
                        <input
                            className="mb-6 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            type="number"
                            value={data.no_sim}
                            onChange={(e) => setData("no_sim", e.target.value)}
                        />

                        <label className="font-semibold text-slate-900">
                            Password
                        </label>
                        <input
                            className="mt-3 mb-6 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        <label className="font-semibold text-slate-900">
                            Konfirmasi Password
                        </label>
                        <input
                            className="mt-3 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                        />
                        <p className="mt-2 text-sm self-end">
                            Sudah punya akun?{" "}
                            <a
                                href="/login"
                                className="text-blue-500 hover:underline"
                            >
                                Login!
                            </a>
                        </p>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 rounded-lg bg-red-500 mt-4 text-white font-semibold"
                        >
                            Daftar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

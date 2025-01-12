import React from "react";
import { usePage, useForm } from "@inertiajs/react";

export default function Login() {
    const { data, setData, post, errors, processing } = useForm({
        no_telp: "",
        password: "",
    });

    const { props } = usePage();
    const errorMessage = props.flash ? props.flash.error : null;

    function handleSubmit(e) {
        // console.log(data.nama);
        e.preventDefault();
        post("/login");
    }
    return (
        <>
            <div className="container flex flex-col mx-auto mt-12">
                <h1 className="font-extrabold tracking-wide italic text-red-500 text-4xl text-center my-4">
                    RENTCAR
                </h1>
                <div className="bg-white rounded-lg p-4 w-full max-w-96 mx-auto shadow">
                    <h1 className="font-semibold text-slate-900 text-xl mb-4 text-center">
                        Login
                    </h1>
                    <hr />
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col mt-4"
                    >
                        <label className="mb-3 font-semibold text-slate-900">
                            Nomor Telepon
                        </label>
                        <input
                            className="mb-6 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            type="text"
                            value={data.no_telp}
                            onChange={(e) => setData("no_telp", e.target.value)}
                            autoFocus
                            required
                        />
                        {errors.no_telp && (
                            <p className="text-red-500 my-2">
                                {errors.no_telp}
                            </p>
                        )}
                        <label className="font-semibold text-slate-900">
                            Password
                        </label>
                        <input
                            className="mt-3 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                        />
                        {errors.password && (
                            <p className="text-red-500 my-2">
                                {errors.password}
                            </p>
                        )}
                        {errorMessage && (
                            <p className="text-red-500 my-2">{errorMessage}</p>
                        )}
                        <p className="mt-2 text-sm self-end">
                            Belum punya akun?{" "}
                            <a
                                href="/register"
                                className="text-blue-500 hover:underline"
                            >
                                Daftar!
                            </a>
                        </p>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 rounded-lg bg-red-500 mt-4 text-white font-semibold"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

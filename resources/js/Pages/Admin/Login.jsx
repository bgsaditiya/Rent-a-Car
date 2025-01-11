import React from "react";
import { useState } from "react";
import { usePage, useForm } from "@inertiajs/react";

export default function Login() {
    const { data, setData, post, errors, processing } = useForm({
        username: "",
        password: "",
    });

    const { props } = usePage();
    const errorMessage = props.flash ? props.flash.error : null;

    function handleSubmit(e) {
        e.preventDefault();
        post("/admin/login");
    }

    return (
        <>
            <div className="container flex flex-col mx-auto mt-12">
                <h1 className="font-extrabold tracking-wide italic text-red-500 text-4xl text-center my-4">
                    RENTCAR
                </h1>
                <div className="bg-white rounded-lg p-4 w-full max-w-96 mx-auto shadow">
                    <h1 className="font-semibold text-slate-900 text-xl mb-4 text-center">
                        Masuk Dashboard Admin
                    </h1>
                    <hr />

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col mt-4"
                    >
                        <label className="font-semibold text-slate-900">
                            Username
                        </label>
                        <input
                            value={data.username}
                            className="mt-2 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 required:"
                            type="text"
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                        />
                        {errors.username && (
                            <p className="text-red-500 my-2">
                                {errors.username}
                            </p>
                        )}

                        <label className="mt-4 font-semibold text-slate-900">
                            Password
                        </label>
                        <input
                            value={data.password}
                            className="mt-2 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            type="password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        {errors.password && (
                            <p className="text-red-500 mt-2">
                                {errors.password}
                            </p>
                        )}
                        {errorMessage && (
                            <p className="text-red-500 my-2">{errorMessage}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full py-2 px-4 rounded-lg bg-red-500 mt-4 text-white font-semibold"
                        >
                            Masuk
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

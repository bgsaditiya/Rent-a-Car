import React from "react";
import { useState } from "react";
import { usePage, router } from "@inertiajs/react";

export default function Dashboard() {
    function handleLogout(e) {
        e.preventDefault();
        router.post("/admin/logout");
    }
    return (
        <>
            <div className="container max-w-[1080px] mx-auto mt-12">
                <h1 className="font-extrabold tracking-wide italic text-red-500 text-4xl text-center my-4">
                    RENTCAR
                </h1>

                <div className="bg-white rounded-lg p-4 w-full max-w-96 mx-auto shadow">
                    <h1 className="font-semibold text-slate-900 text-xl mb-4 text-center">
                        Menu Dashboard Admin
                    </h1>
                    <hr />
                    <a
                        href="/admin/dashboard/mobil"
                        className="my-4 flex items-center justify-center w-full h-auto py-2 rounded-md bg-red-500 text-white text-center mx-auto font-semibold"
                    >
                        Kelola Mobil
                    </a>
                    <a
                        href="#"
                        className="flex items-center justify-center w-full h-auto py-2 rounded-md bg-red-500 text-white text-center mx-auto font-semibold"
                    >
                        Lihat Mobil yang Disewa
                    </a>
                </div>

                <div className="flex justify-end w-full mx-auto max-w-96">
                    <button
                        onClick={handleLogout}
                        className="mt-4 font-semibold text-white mb-4 text-center rounded-lg bg-red-500 py-2 px-4 mx-2 md:mx-0"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}

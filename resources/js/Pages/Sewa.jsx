import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Sewa({}) {
    return (
        <>
            <Navbar />
            <div className="container mx-auto max-w-[1080px] mb-4 px-2">
                <div className="mt-[75px] md:mt-[80px]">
                    <div className="flex flex-col w-full p-4 rounded-lg bg-white shadow">
                        <form action="">
                            <input
                                className="border w-full p-2 rounded-md"
                                placeholder="Pilih Tanggal Akhir"
                                type="date"
                            />
                            <input
                                className="border w-full p-2 rounded-md my-2"
                                placeholder="Pilih Tanggal Akhir"
                                type="date"
                            />
                            <button
                                type="submit"
                                className="rounded-md bg-red-500 w-full py-2 text-center text-white font-semibold"
                            >
                                Cari
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

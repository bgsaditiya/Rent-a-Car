import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { usePage, useForm } from "@inertiajs/react";

export default function Sewa({ car }) {
    const { data, setData, post, errors, processing } = useForm({
        start_date: "",
        end_date: "",
        car_id: car.id,
    });

    console.log(data.start_date);

    const { props } = usePage();
    const errorMessage = props.flash ? props.flash.error : null;

    function handleSubmit(e) {
        e.preventDefault();
        post("/sewa");
    }
    return (
        <>
            <Navbar />
            <div className="container mx-auto max-w-[1080px] mb-4 px-2">
                <div className="mt-[75px] md:mt-[80px]">
                    <div className="flex flex-col w-full p-4 rounded-lg bg-white shadow">
                        <form onSubmit={handleSubmit}>
                            <input
                                value={data.start_date}
                                onChange={(e) =>
                                    setData("start_date", e.target.value)
                                }
                                className="border w-full p-2 rounded-md"
                                placeholder="Pilih Tanggal Akhir"
                                type="date"
                            />
                            {errors.start_date && (
                                <p className="text-red-500 my-2">
                                    {errors.start_date}
                                </p>
                            )}
                            <input
                                value={data.end_date}
                                onChange={(e) =>
                                    setData("end_date", e.target.value)
                                }
                                className="border w-full p-2 rounded-md my-2"
                                placeholder="Pilih Tanggal Akhir"
                                type="date"
                            />
                            {errors.end_date && (
                                <p className="text-red-500 my-2">
                                    {errors.end_date}
                                </p>
                            )}
                            <input
                                className="border w-full p-2 rounded-md my-2"
                                value={car.merk + " " + car.model}
                                readOnly
                                disabled
                            />
                            {errors.car_id && (
                                <p className="text-red-500 my-2">
                                    {errors.car_id}
                                </p>
                            )}
                            <button
                                type="submit"
                                className="rounded-md bg-red-500 w-full py-2 text-center text-white font-semibold"
                            >
                                Sewa
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

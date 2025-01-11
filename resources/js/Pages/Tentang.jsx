import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Tentang({}) {
    return (
        <>
            <Navbar />
            <div className="container mx-auto max-w-[1080px] mb-4 px-2">
                <div className="mt-[75px] md:mt-[80px]">
                    <img
                        className="mx-auto rounded-lg"
                        src="images/poster.png"
                        alt="Image Poster"
                    />
                </div>
                <h1 className="text-xl md:text-2xl font-semibold text-red-500 mt-4">
                    Tentang Kami : RENTCAR BAGAS
                </h1>
                <h1 className="text-lg md:text-xl font-semibold text-slate-800 mt-4">
                    RENTCAR BAGAS: Solusi Terpercaya dalam Transportasi Modern
                </h1>
                <p className="text-justify text-slate-600 mt-2 indent-8">
                    Transportasi adalah salah satu aspek penting dalam kehidupan
                    kita. Masyarakat modern sangat bergantung pada berbagai
                    bentuk transportasi untuk memenuhi kebutuhan sehari-hari,
                    baik itu untuk bekerja, berbelanja, berlibur, atau sekadar
                    berpindah dari satu tempat ke tempat lain. Dalam hal ini,
                    RENTCAR BAGAS hadir sebagai solusi terpercaya dalam dunia
                    transportasi modern.
                </p>
                <p className="text-justify text-slate-600 mt-2 indent-8">
                    RENTCAR BAGAS adalah solusi terpercaya dalam dunia
                    transportasi modern. Mereka mengutamakan kepuasan pelanggan,
                    menyediakan berbagai pilihan kendaraan, menawarkan harga
                    yang bersaing, menjaga keamanan dan kebersihan, serta
                    memberikan kemudahan pemesanan. Dengan semua keunggulan ini,
                    tidak mengherankan jika RENTCAR BAGAS menjadi pilihan utama
                    bagi banyak orang ketika mereka membutuhkan layanan
                    transportasi yang handal dan berkualitas. Jadi, jika Anda
                    mencari solusi transportasi yang terpercaya, pertimbangkan
                    RENTCAR BAGAS sebagai pilihan Anda
                </p>
            </div>
            <Footer />
        </>
    );
}

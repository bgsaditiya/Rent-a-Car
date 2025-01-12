import React from "react";
import { usePage, router } from "@inertiajs/react";

export default function Navbar() {
    const { auth } = usePage().props;

    function handleLogout(e) {
        e.preventDefault();
        router.post("/logout");
    }
    return (
        <nav className="fixed top-0 w-full bg-white shadow">
            <div className="container flex justify-between py-3 mx-auto items-center px-2 max-w-[1080px]">
                <a
                    href="/"
                    className="font-extrabold tracking-wide italic text-red-500 text-xl hidden md:block"
                >
                    RENTCAR
                </a>
                <div className="flex flex-warp md:gap-3 font-medium text-slate-900">
                    <a
                        href="/"
                        className="rounded-md text-center p-2 md:py-2 md:px-4"
                    >
                        Beranda
                    </a>

                    {!auth.user ? (
                        // Jika pengguna belum login, tampilkan tombol Login
                        <a
                            href="/tentang-kami"
                            className="rounded-md text-center p-2 md:py-2 md:px-4"
                        >
                            Tentang Kami
                        </a>
                    ) : (
                        // Jika pengguna sudah login, tampilkan tombol Logout
                        <a
                            href="/list-sewa"
                            className="rounded-md text-center p-2 md:py-2 md:px-4"
                        >
                            Daftar Sewa
                        </a>
                    )}
                </div>

                {!auth.user ? (
                    // Jika pengguna belum login, tampilkan tombol Login
                    <a
                        href="/login"
                        className="bg-red-500 py-2 px-4 rounded-md font-medium text-white"
                    >
                        Login
                    </a>
                ) : (
                    // Jika pengguna sudah login, tampilkan tombol Logout
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 py-2 px-4 rounded-md font-medium text-white"
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}

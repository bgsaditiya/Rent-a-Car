import React from "react";
import { usePage, router } from "@inertiajs/react";

export default function Navbar() {
    const { auth } = usePage().props;

    function handleLogout(e) {
        e.preventDefault();
        router.post("/logout");
    }
    return (
        <nav className="fixed top-0 w-full bg-white">
            <div className="container flex justify-between py-3 mx-auto items-center px-2 max-w-[1080px]">
                <a
                    href="/"
                    className="font-extrabold tracking-wide italic text-red-500 text-xl hidden md:block"
                >
                    RENTCAR
                </a>
                <div className="flex flex-warp md:gap-2 font-medium text-slate-900">
                    <a
                        href="/"
                        className="rounded-md text-center py-2 px-4 bg-slate-200"
                    >
                        <p className="hidden md:block">Beranda</p>
                        <svg
                            className="md:hidden"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M20.29 7.00048L14.73 2.89048C13.1036 1.70317 10.8964 1.70317 9.27 2.89048L3.72 7.00048C2.64544 7.77462 2.0061 9.01612 2 10.3405V17.7705C2.06002 20.1637 4.04665 22.0564 6.44 22.0005H17.56C19.9534 22.0564 21.94 20.1637 22 17.7705V10.3305C21.9914 9.01185 21.3567 7.77576 20.29 7.00048ZM20.5 17.7705C20.4404 19.3354 19.1251 20.5568 17.56 20.5005H6.44C4.87698 20.5512 3.56502 19.333 3.5 17.7705V10.3405C3.50534 9.4904 3.91817 8.69448 4.61 8.20048L10.16 4.10048C11.2561 3.30006 12.7439 3.30006 13.84 4.10048L19.39 8.21048C20.0812 8.6959 20.4948 9.48583 20.5 10.3305V17.7705ZM7.5 15.7505H16.5C16.9142 15.7505 17.25 16.0863 17.25 16.5005C17.25 16.9147 16.9142 17.2505 16.5 17.2505H7.5C7.08579 17.2505 6.75 16.9147 6.75 16.5005C6.75 16.0863 7.08579 15.7505 7.5 15.7505Z"
                                fill="black"
                            />
                        </svg>
                    </a>
                    {auth.user && (
                        // Jika pengguna belum login, tampilkan tombol Login
                        <a
                            href="/sewa"
                            className="rounded-md text-center py-2 px-4"
                        >
                            <p className="hidden md:block">Sewa</p>
                            <svg
                                className="md:hidden"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M17.0645 12.1579L20.9592 16.0526C21.2212 16.3525 21.3124 16.765 21.2013 17.1474L20.4856 19.6421C20.3753 20.0196 20.0826 20.3163 19.7066 20.4316L17.1487 21.2C16.741 21.3105 16.3053 21.1986 16.0013 20.9053L12.0961 17C11.5653 16.4697 10.8464 16.1708 10.0961 16.1684C9.73491 16.17 9.37746 16.2415 9.04345 16.3789C8.70814 16.5108 8.35111 16.5786 7.99082 16.5789C7.23959 16.5813 6.51893 16.2816 5.99082 15.7474L2.83292 12.5895C2.11555 11.8746 1.83459 10.831 2.09608 9.85263L3.32766 5.29474C3.57794 4.30573 4.34269 3.5289 5.32766 3.26316L9.92766 2.09474C10.1683 2.03221 10.4159 2.00037 10.6645 2C11.4148 2.00233 12.1337 2.30126 12.6645 2.83158L15.8224 5.98947C16.6314 6.79876 16.8762 8.01434 16.4434 9.07368C16.0107 10.133 16.2555 11.3486 17.0645 12.1579ZM16.9803 19.6526L19.0856 19.0316L19.6645 16.9684L15.9487 13.2526C14.6842 11.9957 14.3056 10.0987 14.9908 8.45263C15.1717 7.97833 15.0561 7.44201 14.6961 7.08421L11.5382 3.92632C11.3059 3.6882 10.9866 3.55514 10.654 3.55789C10.5458 3.5419 10.4358 3.5419 10.3277 3.55789L5.73819 4.78947C5.30689 4.9055 4.97 5.24239 4.85398 5.67368L3.6224 10.3053C3.50688 10.7381 3.63131 11.1997 3.94871 11.5158L7.10661 14.6737C7.33886 14.9118 7.65821 15.0449 7.99082 15.0421C8.1523 15.0406 8.31239 15.0121 8.4645 14.9579C8.98451 14.7403 9.54292 14.6293 10.1066 14.6316C11.291 14.6183 12.4303 15.0854 13.2645 15.9263L16.9803 19.6526Z"
                                    fill="black"
                                />
                                <path
                                    d="M10.2961 6.96842L7.03292 10.2316C6.72508 10.5398 6.72508 11.0391 7.03292 11.3474C7.34115 11.6552 7.84048 11.6552 8.14871 11.3474L11.4119 8.08421C11.5623 7.93759 11.6472 7.73641 11.6472 7.52632C11.6472 7.31622 11.5623 7.11504 11.4119 6.96842C11.1036 6.66058 10.6043 6.66058 10.2961 6.96842Z"
                                    fill="black"
                                />
                            </svg>
                        </a>
                    )}

                    <a
                        href="/tentang-kami"
                        className="rounded-md text-center py-2 px-4"
                    >
                        <p className="hidden md:block">Tentang Kami</p>
                        <svg
                            className="md:hidden"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M8 2H15.58C18.8937 2 21.58 4.68629 21.58 8V15.58C21.58 18.8937 18.8937 21.58 15.58 21.58H8C4.68629 21.58 2 18.8937 2 15.58V8C2 4.68629 4.68629 2 8 2ZM15.58 20.08C18.063 20.0745 20.0745 18.063 20.08 15.58V8C20.0745 5.517 18.063 3.5055 15.58 3.5H8C5.517 3.5055 3.5055 5.517 3.5 8V15.58C3.5055 18.063 5.517 20.0745 8 20.08H15.58Z"
                                fill="black"
                            />
                            <path
                                d="M11.79 8.04C11.378 8.04539 11.0454 8.37804 11.04 8.79C11.04 9.20586 11.3742 9.54453 11.79 9.55C11.9915 9.5528 12.1854 9.47329 12.327 9.32985C12.4685 9.18641 12.5455 8.99145 12.54 8.79C12.54 8.37579 12.2042 8.04 11.79 8.04Z"
                                fill="black"
                            />
                            <path
                                d="M11.79 10.92C11.3758 10.92 11.04 11.2558 11.04 11.67V14.79C11.04 15.2042 11.3758 15.54 11.79 15.54C12.2042 15.54 12.54 15.2042 12.54 14.79V11.69C12.5483 11.4868 12.4726 11.2892 12.3307 11.1436C12.1888 10.9979 11.9933 10.9171 11.79 10.92Z"
                                fill="black"
                            />
                        </svg>{" "}
                    </a>
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

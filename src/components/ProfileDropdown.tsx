"use client";

import { useState } from "react";
import Link from "next/link";
import { UserRound, LogOut } from "lucide-react";
import { signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface IUser {
    id: string;
    name: string;
    email: string;
    image?: string | null;
}

const ProfileDropdown = ({ user }: {user: IUser}) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    if (!user) return null;
    // console.log("user", user);

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in");
                },
            },
        });
        toast.success("Sign Out successfull!")
    };

    return (
        <div className="relative">

            {/* Profile Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 sm:gap-2 cursor-pointer max-w-full"
            >
                {user.image ? (
                    <img
                        src={user.image}
                        alt={user.name}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover shrink-0"
                    />
                ) : (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                        <UserRound size={18} />
                    </div>
                )}

                <span className="text-xs sm:text-sm font-medium max-w-24 sm:max-w-40 truncate">
                    {user.name}
                </span>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="absolute right-0 top-full mt-2 sm:mt-3 z-50 w-64 sm:w-72 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-gray-200 bg-white p-3 sm:p-4 shadow-lg">

                        {/* User Info */}
                        <div className="border-b border-gray-200 pb-3 sm:pb-4">
                            <h3 className="font-semibold text-sm sm:text-base text-gray-800 truncate">
                                {user.name}
                            </h3>

                            <p className="text-xs text-gray-500 mt-1 break-all">
                                {user.email}
                            </p>
                        </div>

                        {/* Profile */}
                        <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 py-3 text-sm text-gray-700 hover:text-blue-600"
                        >
                            <UserRound size={17} />
                            আমার প্রোফাইল
                        </Link>

                        {/* Logout */}
                        <button
                            type="button"
                            onClick={() => {
                                setIsOpen(false);
                                handleSignOut();
                            }}
                            className="flex w-full items-center gap-2 text-left text-sm text-red-500 cursor-pointer hover:text-red-600"
                        >
                            <LogOut size={17} />
                            সাইন আউট
                        </button>

                    </div>
                </>
            )}
        </div>
    );
};

export default ProfileDropdown;
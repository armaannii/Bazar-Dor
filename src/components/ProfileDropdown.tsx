
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

const ProfileDropdown = ({ user }) => {
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
                className="flex items-center gap-2 cursor-pointer"
            >
                {user.image ? (
                    <img
                        src={user.user.image}
                        alt={user.user.name}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <UserRound size={18} />
                    </div>
                )}

                <span className="text-sm font-medium">
                    {user.user.name}
                </span>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="absolute right-0 top-full mt-3 z-50 w-72 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg">

                        {/* User Info */}
                        <div className="border-b border-gray-200 pb-4">
                            <h3 className="font-semibold text-gray-800">
                                {user.user.name}
                            </h3>

                            <p className="text-xs text-gray-500 mt-1">
                                {user.user.email}
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

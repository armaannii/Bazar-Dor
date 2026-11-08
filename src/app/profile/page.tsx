
"use client";

import { useState } from "react";
import Image from "next/image";
import { UserRound, LogOut } from "lucide-react";
import { authClient, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
    const { data: session, isPending } = authClient.useSession();
    
    const router = useRouter();

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const user = session?.user;

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        try {
            const { error } = await authClient.updateUser({
                name: name.trim(),
            });

            if (error) {
                toast.error(error.message || "আপডেট করা যায়নি");
            } else {
                toast.success("নাম সফলভাবে আপডেট হয়েছে");
                setName("");
            }
        } catch (error) {
            console.error("সমস্যা হয়েছে: ", error);
        } finally {
            setLoading(false);
        }
    };

    if (isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Please login to view your profile.
            </div>
        );
    }

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
        <div className="min-h-screen bg-[#f0f5f0] py-10 px-4">
            <div className="max-w-3xl mx-auto">

                {/* Page Heading */}
                <div className="mb-5">
                    <h1 className="text-xl font-bold text-gray-800">
                        আমার প্রোফাইল
                    </h1>

                    <p className="text-xs text-gray-500 mt-1">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </div>

                {/* User Profile Card */}
                <div className="bg-white/70 border border-gray-200 rounded-xl p-4 md:p-5 flex items-center justify-between gap-3 mb-4">

                    <div className="flex items-center gap-3">

                        {user.image ? (
                            <img
                                src={user.image}
                                alt={user.name}
                                className="w-12 h-12 rounded-xl object-cover"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center">
                                <UserRound size={25} />
                            </div>
                        )}

                        <div>
                            <h3 className="font-semibold text-gray-800">
                                {user.name}
                            </h3>

                            <p className="text-xs text-gray-500 mt-1">
                                {user.email}
                            </p>
                        </div>

                    </div>

                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-1.5 text-xs text-red-500 border border-red-400 rounded-lg px-3 py-2 hover:bg-red-50 transition cursor-pointer"
                    >
                        <LogOut size={14} />
                        সাইন আউট
                    </button>

                </div>

                {/* Update Information Card */}
                <div className="bg-white/70 border border-gray-200 rounded-xl p-4 md:p-5">

                    <h3 className="font-semibold text-gray-800 mb-6">
                        তথ্য
                    </h3>

                    <form
                        onSubmit={handleUpdate}
                        className="px-2 md:px-3"
                    >

                        <label
                            htmlFor="name"
                            className="block text-sm text-gray-700 mb-2"
                        >
                            নাম
                        </label>

                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={user.name}
                            className="w-full h-10 px-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-green-600 bg-transparent"
                        />

                        <button
                            type="submit"
                            disabled={loading || !name.trim()}
                            className="w-full mt-3 h-10 rounded-lg bg-green-700 text-white text-sm font-medium shadow-xl cursor-pointer transition"
                        >
                            {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
                        </button>

                    </form>

                </div>

            </div>
        </div>
    );
};

export default ProfilePage;

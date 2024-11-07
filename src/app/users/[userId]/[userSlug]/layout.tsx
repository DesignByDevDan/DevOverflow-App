// src/app/users/[userId]/[userSlug]/layout.tsx

import { avatars } from "@/models/client/config";
import { users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import convertDateToRelativeTime from "@/utils/relativeTime";
import React from "react";
import EditButton from "./EditButton";
import Navbar from "./Navbar";
import { IconClockFilled, IconUserFilled } from "@tabler/icons-react";

// Separate component for fetching user data
async function UserData({ userId }: { userId: string }) {
    const user = await users.get<UserPrefs>(userId);

    return (
        <div className="flex flex-col gap-4 sm:flex-row">
            <div className="w-40 shrink-0">
                <picture className="block w-full">
                    <img
                        src={avatars.getInitials(user.name, 200, 200)}
                        alt={user.name}
                        className="h-full w-full rounded-xl object-cover"
                    />
                </picture>
            </div>
            <div className="w-full">
                <div className="flex items-start justify-between">
                    <div className="block space-y-0.5">
                        <h1 className="text-3xl font-bold">{user.name}</h1>
                        <p className="text-lg text-gray-500">{user.email}</p>
                        <p className="flex items-center gap-1 text-sm font-bold text-gray-500">
                            <IconUserFilled className="w-4 shrink-0" /> Dropped{" "}
                            {convertDateToRelativeTime(new Date(user.$createdAt))},
                        </p>
                        <p className="flex items-center gap-1 text-sm text-gray-500">
                            <IconClockFilled className="w-4 shrink-0" /> Last activity&nbsp;
                            {convertDateToRelativeTime(new Date(user.$updatedAt))}
                        </p>
                    </div>
                    <div className="shrink-0">
                        <EditButton />
                    </div>
                </div>
            </div>
        </div>
    );
}

const Layout = ({ children, params }: { children: React.ReactNode; params: { userId: string; userSlug: string }; }) => {
    const { userId } = params;

    return (
        <div className="container mx-auto space-y-4 px-4 pb-20 pt-32">
            {/* Render the UserData Component */}
            <React.Suspense fallback={<p>Loading user data...</p>}>
                <UserData userId={userId} />
            </React.Suspense>
            <div className="flex flex-col gap-4 sm:flex-row">
                <Navbar />
                <div className="w-full">{children}</div>
            </div>
        </div>
    );
};

export default Layout;
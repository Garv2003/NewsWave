import type { User } from "~/types";
import Image from "next/image";
import EditProfile from "./EditProfile";

const UserDetails = ({ user }: { user: User }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center p-8">
      <Image
        src={
          user?.image
            ? user?.image
            : "data:image/jpeg;base64,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"
        }
        alt={user?.firstname ?? ""}
        width={100}
        height={100}
        className="h-24 w-24 rounded-full"
      />
      <h1 className="text-2xl font-bold text-black dark:text-white">
        {user?.firstname + " " + user?.lastname}
      </h1>
      <p className="text-gray-500 dark:text-gray-300">{user?.email}</p>
      <p className="mb-2 text-gray-500 dark:text-gray-300">{user?.bio}</p>
      <EditProfile detail={{ image: user?.image ?? "", bio: user?.bio }} />
    </div>
  );
};

export default UserDetails;

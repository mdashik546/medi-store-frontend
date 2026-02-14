import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import UserStatusUpdate, { UserStatus } from "./user-staus-update";
export interface UserType {
  id: string;
  name: string;
  email: string;
  image: string | null;
  status: UserStatus;
}
const UserTable = ({ data }: { data: UserType[] }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Seller Orders</h1>
      <div className="rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {data.length - index}
                </TableCell>

                <TableCell>
                  <Image
                    src={user?.image ?? "/images/default-user.png"}
                    alt="loading..."
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </TableCell>
                <TableCell>{user?.name}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>
                  <div
                    className={`lowercase rounded-full w-20 text-center text-sm font-medium 
                    ${
                      user?.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user?.status}
                  </div>
                </TableCell>

                <TableCell>
                  <UserStatusUpdate user={user} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserTable;

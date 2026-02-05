import Image from "next/image";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { CircleUser } from "lucide-react";
export function ProfileDialog({ user }: { user: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {user.image ? (
            <Image
              src={user.image}
              alt="avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <CircleUser size={18} />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await authClient.signOut();
            window.location.href = "/login";
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

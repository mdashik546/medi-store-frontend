import Link from "next/link";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { ProfileDialog } from "./profile.dialog";

export function AuthSection({
  data,
  isPending,
}: {
  data: any;
  isPending: boolean;
}) {
  if (isPending) return <Spinner />;

  if (!data?.user) {
    return (
      <div className="flex lg:flex-row flex-col gap-3">
        <Button asChild variant="outline">
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/register">Register</Link>
        </Button>
      </div>
    );
  }

  return <ProfileDialog user={data.user} />;
}

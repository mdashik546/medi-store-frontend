"use client";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { sellerAction } from "@/actions/seller.action";
import { Spinner } from "@/components/ui/spinner";
import { updateStatusAction } from "@/actions/admin.action";

const userStatus = ["ACTIVE", "INACTIVE"] as const;
export type UserStatus = (typeof userStatus)[number];

const statusSchema = z.object({
  status: z.enum(userStatus),
});

type StatusForm = z.infer<typeof statusSchema>;
type User = {
  id: string;
  status: UserStatus;
};
export default function UserStatusUpdate({ user }: { user: User }) {
  console.log(user?.id);
  const [isPending, startTransition] = useTransition();

  const form = useForm<StatusForm>({
    resolver: zodResolver(statusSchema),
    defaultValues: {
      status: user?.status,
    },
  });

  const handleChange = (newStatus: StatusForm["status"]) => {
    const previousStatus = form.getValues("status");

    startTransition(async () => {
      const toastId = toast.loading("Updating status...");
      try {
        const res = await updateStatusAction(user?.id, newStatus);
        console.log(res);

        toast.success("Status updated", {
          id: toastId,
        });
      } catch (error) {
        form.setValue("status", previousStatus);
        toast.error("Failed to update status", {
          id: toastId,
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="w-28">
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value: UserStatus) => {
                    field.onChange(value);
                    handleChange(value);
                  }}
                  disabled={isPending}
                >
                  <SelectTrigger className="w-full">
                    {isPending ? (
                      <div className="flex items-center gap-2">
                        <Spinner className="text-blue-500" /> Loading...
                      </div>
                    ) : (
                      <SelectValue />
                    )}
                  </SelectTrigger>

                  <SelectContent>
                    {userStatus?.map((status, idx) => (
                      <SelectItem key={idx} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

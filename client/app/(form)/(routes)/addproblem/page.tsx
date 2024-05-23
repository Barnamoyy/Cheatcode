"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import ExampleModal from "@/components/example-modal";
import useExampleStore from "@/store/example-store";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  difficulty: z.string().min(3, {
    message: "Difficulty must be at least 3 characters.",
  }),
  acceptance: z.string().min(2, {
    message: "Acceptance must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Example must be at least 2 characters.",
  }),
});

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const { example, setExample } = useExampleStore();

  const user = useUser();

  useEffect(() => {
    if (user?.user?.publicMetadata.role !== "admin") {
      window.location.href = "/dashboard";
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      acceptance: "",
      difficulty: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true);
    const data = { ...values, example };
    try {
      const res = axios.post("/api/add", data);
      console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setSuccess(true);
    }
  }

  return (
    <div className="px-4 py-4 lg:px-4 lg:py-8 flex items-center w-full h-full flex-col space-y-4 lg:space-y-8">
      <div className="flex justify-end items-center w-full">
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant={"outline"} className="text-sm lg:text-md">
              Cancel
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  window.location.href = "/dashboard";
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {success ? (
          <AlertDialog open={success} onOpenChange={setSuccess}>
            {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Problem added successfully!</AlertDialogTitle>
                <AlertDialogDescription>
                  This problem will now be visible to others. Others will be
                  able to see the examples and the main problem statement.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction
                  onClick={() => {
                    window.location.href = "/dashboard";
                    setSuccess(false);
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <></>
        )}
      </div>
      <h1 className="text-md lg:text-xl font-semibold">Add a question</h1>
      <div className="w-full h-full lg:w-2/3 lg:h-2/3 py-2 lg:py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Question title goes here" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty</FormLabel>
                  <FormControl>
                    <Input placeholder="Is this enough?" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="acceptance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Acceptance</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Not many people were able to do this!"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="The question says..." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-start items-center flex-row space-x-2 lg:space-x-4">
              <h1>Add Example</h1>
              <ExampleModal />
            </div>
            {example.map((item) => (
              <div className="w-full bg-slate-800 flex justify-start items-center flex-col space-y-2 lg:space-y-4 px-2 py-2 lg:px-4 lg:py-4 rounded-lg">
                <div className="flex justify-start items-center flex-row space-x-2 lg:gap-x-4 w-full">
                  <h1>Input:</h1>
                  {item?.input}
                </div>
                <div className="flex justify-start items-center flex-row space-x-2 lg:gap-x-4 w-full">
                  <h1>Output:</h1>
                  {item?.output}
                </div>
              </div>
            ))}
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;

"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useTestcaseStore from "@/store/testcase-store";

const dialogSchema = z.object({
  input: z.string().min(2, {
    message: "input must be at least 2 characters.",
  }),
  output: z.string().min(2, {
    message: "input must be at least 2 characters.",
  }),
});

const TestcaseModal = () => {
  const { testcase, setTestcase } = useTestcaseStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dialog = useForm<z.infer<typeof dialogSchema>>({
    resolver: zodResolver(dialogSchema),
    defaultValues: {
      input: "",
      output: "",
    },
  });

  function onSubmit(data: z.infer<typeof dialogSchema>) {
    console.log(data);
  }

  const handleExampleSubmit = () => {
    setTestcase({
      input: dialog.getValues("input"),
      output: dialog.getValues("output"),
    });
    setIsDialogOpen(false);
  };
  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus size={24} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <Form {...dialog}>
            <form
              onSubmit={dialog.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={dialog.control}
                name="input"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Input</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Question title goes here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={dialog.control}
                name="output"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Output</FormLabel>
                    <FormControl>
                      <Input placeholder="Is this enough?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="button" className="w-full" onClick={() => {handleExampleSubmit()}}>
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestcaseModal;

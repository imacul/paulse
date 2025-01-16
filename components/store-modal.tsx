"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const formSchema = z.object({
  name: z.string().min(2).max(50),
})

import  Modal from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal"

const StoreModal = () =>{
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values)
  }
  
  const storeModal = useStoreModal();
  return(
    <Modal title="Create store" description="Create a store to continue" isOpen={storeModal.isOpen} onClose={storeModal.onClose}>
      <div>
        <div className=" rounded-lg space-y-4 py-2 pb-4">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="store name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button type="submit">Continue</Button>
        <Button variant="outline" onClick={storeModal.onClose}>Cancel</Button>
        </div>
      </form>
    </Form>
        </div>
      </div>
    </Modal>
    )
}
export default StoreModal;
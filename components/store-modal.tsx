//"use client";

import { z } from "zod"
import axios from "axios";
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
import { useState } from "react";

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
 
 
  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    try {
      setLoading(true);
      const response = await axios.post('/api/stores', values);

      console.log(response.data)
    } catch (error) {
      console.log(error);

    } finally{
      setLoading(true);
    }

  }

  const [loading, setLoading] = useState(false);
  
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
                <Input disabled={loading} placeholder="store name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} type="submit">Continue</Button>
        <Button disabled={loading} variant="outline" onClick={storeModal.onClose}>Cancel</Button>
        </div>
      </form>
    </Form>
        </div>
      </div>
    </Modal>
    )
}
export default StoreModal;
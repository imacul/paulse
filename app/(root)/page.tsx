"use client";

//import Image from "next/image";
//import Link from 'next/link';
//import { Button } from '@/components/ui/button';
//import { UserButton } from "@clerk/nextjs";
import { useEffect } from "react";
import { useStoreModal } from "@/hooks/use-store-modal";

export default function SetupPage() {
  const isOpen = useStoreModal((state) => state.isOpen);
  const onOpen = useStoreModal((state) => state.onOpen);
  
  useEffect(() => {
    if(!isOpen){
      onOpen();
    }
  }, [isOpen, onOpen])
  
  return (
    
       <div className="p-4 text-white">
        {/* 
        <UserButton afterSignOutUrl="/" />
        */} 
         Root Layout
       </div>
    )
};
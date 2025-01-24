import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
        try {
          const { userId } = await auth();
          console.log("USER ID:", userId); // ✅ Log userId for debugging
      
          if (!userId) {
            return new NextResponse("Not Authorized", { status: 401 });
          }
      
          const body = await req.json();
          const { name } = body;
      
          if (!name) {
            return new NextResponse("Name is required", { status: 400 });
          }
      
          const store = await prismadb.store.create({
            data: { name, userId },
          });
      
          return NextResponse.json(store);
        } catch (error) {
          console.error(`[STORES_POST]`, error);
          return new NextResponse("Internal Server Error", { status: 500 });
        }
      }
      
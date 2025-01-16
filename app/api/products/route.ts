import { NextResponse } from 'next/server'

// This is a mock database. In a real app, you'd use a proper database.
let products: any[] = []

export async function GET() {
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  const product = await request.json()
  products.push(product)
  return NextResponse.json(product, { status: 201 })
}
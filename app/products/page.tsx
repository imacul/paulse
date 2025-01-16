'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Pencil, Trash } from 'lucide-react'

interface Product {
  id: string
  title: string
  description: string
  price: number
  category: string
}

// Mock function to fetch products
const fetchProducts = async () => {
  // This would typically come from your backend
  return [
    { id: '1', title: 'Cool T-Shirt', description: 'A very cool t-shirt', price: 19.99, category: 'Clothing' },
    { id: '2', title: 'Awesome Jeans', description: 'The best jeans ever', price: 49.99, category: 'Clothing' },
    { id: '3', title: 'Smart Watch', description: 'A watch that does it all', price: 199.99, category: 'Electronics' },
  ]
}

// Mock function to delete a product
const deleteProduct = async (id: string) => {
  console.log('Deleting product:', id)
  // This would typically send a request to your backend
  return { success: true }
}

// This would typically come from your backend
const mockProducts: Product[] = [
  { id: '1', title: 'Cool T-Shirt', description: 'A very cool t-shirt', price: 19.99, category: 'Clothing' },
  { id: '2', title: 'Awesome Jeans', description: 'The best jeans ever', price: 49.99, category: 'Clothing' },
  { id: '3', title: 'Smart Watch', description: 'A watch that does it all', price: 199.99, category: 'Electronics' },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts()
      setProducts(fetchedProducts)
    }
    loadProducts()
  }, [])

  const handleDeleteProduct = async (id: string) => {
    const result = await deleteProduct(id)
    if (result.success) {
      setProducts(products.filter(product => product.id !== id))
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-3xl text-white font-bold">Products</h1>
        <Link href="/products/create">
          <Button className="bg-pink-500 hover:bg-pink-700 text-white">Create New Product</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{product.description}</p>
              <p className="font-bold mt-2">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">{product.category}</p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Link href={`/products/edit/${product.id}`}>
                <Button variant="outline" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="icon" onClick={() => handleDeleteProduct(product.id)}>
                <Trash className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
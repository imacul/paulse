'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ImageUpload } from '@/components/image-upload'

// Mock function to fetch product data
const fetchProduct = async (id: string) => {
  // This would typically come from your backend
  return {
    id,
    title: 'Sample Product',
    description: 'This is a sample product description',
    price: '19.99',
    stock: '100',
    sku: 'SAMPLE001',
    discount: '0',
    coupon: '',
    category: 'Electronics',
    images: []
  }
}

// Mock function to update product
const updateProduct = async (id: string, data: any) => {
  console.log('Updating product:', id, data)
  // This would typically send data to your backend
  return { success: true }
}

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    sku: '',
    discount: '',
    coupon: '',
    category: '',
  })
  const [images, setImages] = useState<File[]>([])
  const [categories] = useState(['Electronics', 'Clothing', 'Home & Garden', 'Books', 'Toys'])

  useEffect(() => {
    const loadProduct = async () => {
      const product = await fetchProduct(params.id)
      setFormData(product)
    }
    loadProduct()
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await updateProduct(params.id, { ...formData, images })
    if (result.success) {
      router.push('/products')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input id="stock" name="stock" type="number" value={formData.stock} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="sku">SKU</Label>
          <Input id="sku" name="sku" value={formData.sku} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="discount">Discount</Label>
          <Input id="discount" name="discount" type="number" step="0.01" value={formData.discount} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="coupon">Coupon Code</Label>
          <Input id="coupon" name="coupon" value={formData.coupon} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select name="category" value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Product Images</Label>
          <ImageUpload onImagesSelected={setImages} />
        </div>
        <Button type="submit">Update Product</Button>
      </form>
    </div>
  )
}


'use client';

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ImageUpload } from '@/components/image-upload'

// Mock function to create a product
const createProduct = async (data: any) => {
  console.log('Creating product:', data)
  // This would typically send data to your backend
  return { success: true, id: 'new-product-id' }
}

// This would typically come from your backend
let mockCategories = ['Electronics', 'Clothing', 'Home & Garden', 'Books', 'Toys']

type FieldType = 'text' | 'number' | 'percentage' | 'image'

interface Variation {
  name: string
  values: { type: FieldType; value: string | File }[]
}

export default function CreateProductPage() {
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
  const [variations, setVariations] = useState<Variation[]>([])
  const [categories, setCategories] = useState(mockCategories)
  const [newCategory, setNewCategory] = useState('')
  const [images, setImages] = useState<File[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }))
  }

  const addVariation = () => {
    setVariations(prev => [...prev, { name: '', values: [{ type: 'text', value: '' }] }])
  }

  const updateVariation = (index: number, field: 'name' | 'values', value: any) => {
    setVariations(prev => {
      const newVariations = [...prev]
      newVariations[index][field] = value
      return newVariations
    })
  }

  const addVariationValue = (variationIndex: number) => {
    setVariations(prev => {
      const newVariations = [...prev]
      newVariations[variationIndex].values.push({ type: 'text', value: '' })
      return newVariations
    })
  }

  const updateVariationValue = (variationIndex: number, valueIndex: number, field: 'type' | 'value', newValue: string | File) => {
    setVariations(prev => {
      const newVariations = [...prev]
      newVariations[variationIndex].values[valueIndex][field] = newValue
      return newVariations
    })
  }

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory.trim()])
      setNewCategory('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await createProduct({ ...formData, variations, images: images.map(img => img.name) })
    if (result.success) {
      router.push('/products')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-white">Create New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 text-white">
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
        <div className="flex items-end gap-2">
          <div className="flex-grow">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={handleCategoryChange}>
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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add New Category</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
              </DialogHeader>
              <div className="flex items-center gap-2">
                <Input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter new category name"
                />
                <Button onClick={handleAddCategory}>Add</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div>
          <Label>Product Images</Label>
          <ImageUpload onImagesSelected={setImages} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Variations</h2>
          {variations.map((variation, variationIndex) => (
            <div key={variationIndex} className="border p-4 rounded-lg mb-4">
              <Input
                placeholder="Variation Name"
                value={variation.name}
                onChange={(e) => updateVariation(variationIndex, 'name', e.target.value)}
                className="mb-2"
              />
              {variation.values.map((value, valueIndex) => (
                <div key={valueIndex} className="flex gap-2 mb-2">
                  <Select
                    value={value.type}
                    onValueChange={(newType) => updateVariationValue(variationIndex, valueIndex, 'type', newType)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                    </SelectContent>
                  </Select>
                  {value.type === 'image' ? (
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          updateVariationValue(variationIndex, valueIndex, 'value', file)
                        }
                      }}
                    />
                  ) : (
                    <Input
                      value={value.value as string}
                      onChange={(e) => updateVariationValue(variationIndex, valueIndex, 'value', e.target.value)}
                      type={value.type === 'number' || value.type === 'percentage' ? 'number' : 'text'}
                      step={value.type === 'percentage' ? '0.01' : undefined}
                    />
                  )}
                </div>
              ))}
              <Button type="button" onClick={() => addVariationValue(variationIndex)} variant="outline" size="sm">
                Add Value
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addVariation} variant="outline">
            Add Variation
          </Button>
        </div>
        <Button type="submit">Create Product</Button>
      </form>
    </div>
  )
}
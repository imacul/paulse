'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Pencil, Trash } from 'lucide-react'

// This would typically come from your backend
let mockCategories = ['Electronics', 'Clothing', 'Home & Garden', 'Books', 'Toys']

export default function CategoriesPage() {
  const [categories, setCategories] = useState(mockCategories)
  const [newCategory, setNewCategory] = useState('')
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (newCategory.trim()) {
      setCategories([...categories, newCategory.trim()])
      setNewCategory('')
    }
  }

  const handleEditCategory = (index: number) => {
    setEditingIndex(index)
    setNewCategory(categories[index])
  }

  const handleUpdateCategory = () => {
    if (editingIndex !== null && newCategory.trim()) {
      const updatedCategories = [...categories]
      updatedCategories[editingIndex] = newCategory.trim()
      setCategories(updatedCategories)
      setNewCategory('')
      setEditingIndex(null)
    }
  }

  const handleDeleteCategory = (index: number) => {
    const updatedCategories = categories.filter((_, i) => i !== index)
    setCategories(updatedCategories)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Manage Categories</h1>
      <form onSubmit={handleAddCategory} className="mb-4">
        <Label htmlFor="newCategory">New Category</Label>
        <div className="flex gap-2">
          <Input
            id="newCategory"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter new category name"
          />
          {editingIndex !== null ? (
            <Button type="button" onClick={handleUpdateCategory}>Update Category</Button>
          ) : (
            <Button type="submit">Add Category</Button>
          )}
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="border p-4 rounded-lg flex justify-between items-center">
            <span>{category}</span>
            <div>
              <Button variant="ghost" size="icon" onClick={() => handleEditCategory(index)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(index)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
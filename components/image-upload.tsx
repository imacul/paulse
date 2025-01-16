'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface ImageUploadProps {
  onImagesSelected: (images: File[]) => void
}

export function ImageUpload({ onImagesSelected }: ImageUploadProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    onImagesSelected(files)

    const newPreviewUrls = files.map(file => URL.createObjectURL(file))
    setPreviewUrls(prevUrls => [...prevUrls, ...newPreviewUrls])
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    const files = Array.from(event.dataTransfer.files)
    onImagesSelected(files)

    const newPreviewUrls = files.map(file => URL.createObjectURL(file))
    setPreviewUrls(prevUrls => [...prevUrls, ...newPreviewUrls])
  }

  return (
    <div>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <p>Drag and drop images here, or click to select files</p>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        accept="image/*"
        className="hidden"
      />
      <div className="mt-4 grid grid-cols-3 gap-4">
        {previewUrls.map((url, index) => (
          <div key={index} className="relative">
            <Image src={url} alt={`Preview ${index + 1}`} width={100} height={100} className="object-cover rounded-lg" />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-0 right-0 rounded-full"
              onClick={() => {
                setPreviewUrls(prevUrls => prevUrls.filter((_, i) => i !== index))
                onImagesSelected(prevImages => prevImages.filter((_, i) => i !== index))
              }}
            >
              X
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
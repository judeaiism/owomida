'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface CategoryData {
  name: string;
  description: string;
  products: Product[];
}

export default function CategoryPage() {
  const { category } = useParams()
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCategoryData() {
      setIsLoading(true)
      setError(null)
      try {
        const categorySlug = Array.isArray(category) ? category[0] : category
        console.log('Attempting to load category:', categorySlug) // Debug log
        
        // Try lowercase first, then uppercase if that fails
        let module;
        try {
          module = await import(`@/lib/categoryData/${categorySlug.toLowerCase()}.ts`)
        } catch (e) {
          module = await import(`@/lib/categoryData/${categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)}.ts`)
        }
        
        console.log('Module loaded:', module) // Debug log
        setCategoryData(module.categoryData)
      } catch (error) {
        console.error('Failed to load category data:', error)
        setError(`Category not found: ${category}`)
      } finally {
        setIsLoading(false)
      }
    }

    loadCategoryData()
  }, [category])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error || !categoryData) {
    return <div>{error || 'Category not found'}</div>
  }

  return (
    <div className="container py-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-2">{categoryData.name}</h1>
      <p className="text-gray-600 mb-6">{categoryData.description}</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categoryData.products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <img
                alt={product.name}
                className="aspect-square object-cover rounded-md"
                height="200"
                src={product.image}
                width="200"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>{product.name}</CardTitle>
              <p className="text-muted-foreground">${product.price.toFixed(2)}</p>
              <p className="text-sm mt-2">{product.description}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}
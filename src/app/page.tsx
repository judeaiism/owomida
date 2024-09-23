'use client'

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, MessageCircle, Search, ShoppingCart, ChevronDown, User, Bell as BellIcon, Heart, DollarSign, Facebook, Users, Bookmark, Car, Home, Shirt } from "lucide-react"
import Link from "next/link"

// Mock product data with real images
const mockProducts = [
  { id: 1, name: "Vintage Leather Sofa", price: 599.99, image: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE/vintage-sofa-3vQR9dL1TLtVH8YyuYhk0fKTw5wS1l.jpg", category: "Furniture" },
  { id: 2, name: "Mountain Bike", price: 350, image: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE/mountain-bike-PCyOBWHbmH6ckwzfXrA6UKgCjV4Irl.jpg", category: "Sports" },
  { id: 3, name: "Antique Wooden Desk", price: 275, image: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE/antique-desk-5iHEXfYTuAM1wD4gguqIY9TBNKVrIv.jpg", category: "Furniture" },
  { id: 4, name: "Acoustic Guitar", price: 200, image: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE/acoustic-guitar-0eGnCdBYOXrKB9VbcydDf1VdRiWNVY.jpg", category: "Musical Instruments" },
  { id: 5, name: "DSLR Camera", price: 450, image: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE/dslr-camera-78hkZ9e6HyMWaNhNqgE5eqWsJEfGtI.jpg", category: "Electronics" },
  { id: 6, name: "Yoga Mat Set", price: 30, image: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE/yoga-mat-set-sPGQ2TzEUL9LO2EEHcGtHaZ0XuCuZE.jpg", category: "Sports" },
  { id: 7, name: "Vintage Record Player", price: 120, image: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE/record-player-rlVQpwOXCLfnbWAIUNLxKhgBWtmZBc.jpg", category: "Electronics" },
  { id: 8, name: "Air Fryer", price: 80, image: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE/air-fryer-Ux2TlnbdxX3CTvpF7fxsaXt1WDe0Xq.jpg", category: "Home Appliances" },
  { id: 9, name: "Leather Armchair", price: 250, image: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE/leather-armchair-Yl0uCWkaVlneeHQWoWqBfHWuAzrGmE.jpg", category: "Furniture" },
  { id: 10, name: "Electric Skateboard", price: 399, image: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE/electric-skateboard-KTYbLKDjbslgGZBYEJedbXvsRFNZnc.jpg", category: "Sports" },
]

const allCategories = [
  "Antiques & Collectibles", "Appliances", "Arts & Crafts", "Auto Parts", "Baby",
  "Books, Movies & Music", "Electronics", "Furniture", "Garage Sale", "Health & Beauty",
  "Home Goods & Decor", "Home Improvement & Tools", "Housing for Sale", "Jewelry & Watches",
  "Luggage & Bags", "Men's Clothing & Shoes", "Miscellaneous", "Musical Instruments",
  "Patio & Garden", "Pet Supplies", "Rentals", "Sporting Goods", "Toys & Games",
  "Vehicles", "Women's Clothing & Shoes"
]

export default function MarketplaceLanding() {
  const [isOfferDialogOpen, setIsOfferDialogOpen] = useState(false)
  const [offerType, setOfferType] = useState<'percentage' | 'exact'>('percentage')
  const [offerValue, setOfferValue] = useState('')
  const [products, setProducts] = useState(mockProducts)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

  const observer = useRef<IntersectionObserver | null>(null)
  const lastProductElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreProducts()
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  const loadMoreProducts = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setProducts(prevProducts => [
        ...prevProducts,
        ...mockProducts.map(product => ({
          ...product,
          id: prevProducts.length + product.id
        }))
      ])
      setLoading(false)
      setHasMore(products.length < 100) // Load up to 100 products for this example
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex md:hidden">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <ShoppingCart className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">ModernMarket</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/browse">Browse</Link>
              <Link href="/sell">Sell</Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button variant="ghost" size="icon">
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">Messages</span>
              </Button>
              <Button variant="ghost" size="icon">
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="32"
                  src="/placeholder-avatar.jpg"
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width="32"
                />
                <span className="sr-only">Profile</span>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <Button>Create new listing</Button>
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search Marketplace" className="pl-8" />
          </div>
          <DropdownMenu open={isCategoryOpen} onOpenChange={setIsCategoryOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-[180px] justify-between">
                All Categories
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                <span>Buy & sell groups</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bookmark className="mr-2 h-4 w-4" />
                <span>Saved items</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Top categories</DropdownMenuLabel>
              <DropdownMenuItem>
                <Car className="mr-2 h-4 w-4" />
                <span>Vehicles</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Home className="mr-2 h-4 w-4" />
                <span>Rentals</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Shirt className="mr-2 h-4 w-4" />
                <span>Women's Clothing & Shoes</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Shirt className="mr-2 h-4 w-4" />
                <span>Men's Clothing & Shoes</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>Furniture</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>Electronics</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>All categories</DropdownMenuLabel>
              {allCategories.map((category, index) => (
                <DropdownMenuItem key={index}>
                  <span>{category}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <Card key={product.id} ref={index === products.length - 1 ? lastProductElementRef : null}>
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
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">View Details</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>{product.name}</DialogTitle>
                      <DialogDescription>
                        Interact with this listing or the seller.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => console.log('Message seller')}
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Message seller
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => console.log('Set alert for listing')}
                      >
                        <BellIcon className="mr-2 h-4 w-4" />
                        Set alert for listing
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-between">
                            <span className="flex items-center">
                              <DollarSign className="mr-2 h-4 w-4" />
                              Send offer
                            </span>
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuItem onClick={() => {
                            setOfferType('percentage')
                            setIsOfferDialogOpen(true)
                          }}>
                            Percentage off
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setOfferType('exact')
                            setIsOfferDialogOpen(true)
                          }}>
                            Exact amount
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => console.log('Save product')}
                      >
                        <Heart className="mr-2 h-4 w-4" />
                        Save product
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => console.log('Follow seller')}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Follow seller
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => console.log('See seller details')}
                      >
                        <User className="mr-2 h-4 w-4" />
                        See seller details
                      </Button>
                      <Button
                        className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => console.log('View on Facebook Marketplace')}
                      >
                        <Facebook className="mr-2 h-4 w-4" />
                        Facebook Marketplace Listing
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
        {loading && <p className="text-center mt-4">Loading more products...</p>}
      </main>
      <Dialog open={isOfferDialogOpen} onOpenChange={setIsOfferDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Offer</DialogTitle>
            <DialogDescription>
              {offerType === 'percentage' ? 'Enter percentage off' : 'Enter exact amount'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <Input
                type="number"
                placeholder={offerType === 'percentage' ? 'Percentage' : 'Amount'}
                value={offerValue}
                onChange={(e) => setOfferValue(e.target.value)}
              />
              {offerType === 'percentage' && <span>%</span>}
              {offerType === 'exact' && <span>$</span>}
            </div>
            <Button onClick={() => {
              console.log(`Offer sent: ${offerValue} ${offerType === 'percentage' ? '%' : '$'}`)
              setIsOfferDialogOpen(false)
              setOfferValue('')
            }}>
              Send Offer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PromotedItem {
  id: number
  title: string
  description: string
  image: string
  price: number
}

const promotedItems: PromotedItem[] = [
  {
    id: 16,
    title: "Avaya B189 - Conference VoIP phone - H.323",
    description: "Avaya B189 Conference VoIP phone",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7ZgnoJvFpgKU44R4JNht91YmQr4dl4.png",
    price: 1017.40
  },
  {
    id: 17,
    title: "Samsung QM49R 49\" LED display",
    description: "Samsung QM49R 49\" LED display for professional environments",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5y4NizKPNypuzBy4ZjEhaXI5CTlAry.png",
    price: 820.88
  },
  {
    id: 18,
    title: "Canon CanoScan LIDE 300",
    description: "Canon CanoScan LIDE 300 - Flatbed scanner - Contact Image Sensor",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-D20Z3cqHkEKvO3o0MYiII4aC2kiFGO.png",
    price: 66.07
  }
]

export function PromotionalBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % promotedItems.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const navigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentIndex((current) => 
        current === 0 ? promotedItems.length - 1 : current - 1
      )
    } else {
      setCurrentIndex((current) => 
        (current + 1) % promotedItems.length
      )
    }
  }

  const currentItem = promotedItems[currentIndex]

  return (
    <div className="relative bg-white rounded-lg shadow-md mb-8 overflow-hidden">
      <div className="flex items-center p-8 h-[300px]">
        <button 
          onClick={() => navigate('prev')}
          className="absolute left-4 p-2 rounded-full bg-white/80 hover:bg-white"
          aria-label="Previous item"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <div className="flex items-center gap-8 w-full">
          <div className="w-1/3 h-full flex items-center justify-center">
            <div className="relative w-[200px] h-[200px]">
              <Image
                src={currentItem.image}
                alt={currentItem.title}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="text-[#4A90E2] font-semibold mb-2">Featured</div>
            <h2 className="text-2xl font-bold mb-2">{currentItem.title}</h2>
            <p className="text-gray-600 mb-4">{currentItem.description}</p>
            <p className="text-xl font-bold mb-4">€{currentItem.price.toFixed(2)}</p>
            <Link href={`/product/${currentItem.id}`} passHref>
              <Button variant="default" className="bg-[#4A90E2] text-white hover:bg-[#357ABD]">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        <button 
          onClick={() => navigate('next')}
          className="absolute right-4 p-2 rounded-full bg-white/80 hover:bg-white"
          aria-label="Next item"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}


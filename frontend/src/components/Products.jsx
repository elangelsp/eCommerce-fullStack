import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { fetchProducts, fetchAllProductImg } from '../services/services'

const Products = () => {
  const [products, setProducts] = useState([])
  const [images, setImages] = useState([])

  useEffect(() => {
    const load = async () => {
      const p = await fetchProducts()
      setProducts(p || [])
      const imgs = await fetchAllProductImg()
      setImages(imgs || [])
    }
    load()
  }, [])

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-8 p-8">
      {products.map((product) => {
        const primary = images.find(
          (img) => Number(img.is_primary) === 1 && img.product_id === product.id
        )
        const imageUrl = primary ? primary.url : null
        return (
          <ProductCard
            key={product.id}
            product={product}
            imageUrl={imageUrl}
          />
        )
      })}
    </div>
  )
}

export default Products
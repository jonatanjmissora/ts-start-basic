import { ProductType } from "@/lib/types/products"

interface ProductProps {
	product: ProductType | undefined
}

export function ProductElement({ product }: ProductProps) {
	if (!product) {
		return <div>Product not found</div>
	}
	return (
		<div
			key={product?.id}
			className={`flex flex-col justify-between gap-2 rounded-lg bg-blue-800 w-40 h-40 p-2 shadow-lg`}
		>
			<img src={product.image} alt="" className="h-24 object-contain" />
			<div className="flex flex-col justify-between gap-2 text-xs">
				<h2 className="truncate">{product.title}</h2>
				<div className="flex justify-between items-center">
					<span>{product.category}</span>
					<span>$ {product.price}</span>
				</div>
			</div>
		</div>
	)
}


por que no esta el success en queries notes


0 - cuando solo hago una llamada a la api y me traigo todos los elementos, y luego filtro o muestro 
alguno de los elementos mediante el getQueryData. Solo es una llamada al array de productos, y con cargarlos en el loader
es suficiente.

cuando tengo que hacer varias llamadas, una para la lista, y otras para los elementos individuales,
tengo 3 opciones:

1 - cargo la lista y los elementos individuales (si son pocos) en el loader, y los tengo en cache.

2 - idem, pero en el link del producto, pongo un onMouseEnter={() => prefetchQuery(productQueryOptions(String(p.id)));

3 - cargo la lista en el loader del router, y luego hago un loader en productId, entonces cuando hago hover del
link de cada producto, ya se va cargando.

================
CODIGO
================

0 - UNA SOLA LLAMADA
======================
index.tsx
---------
export const Route = createFileRoute("/fake-api/")({
    loader: ({ context }) => context.queryClient.ensureQueryData(productsQueryOptions)
})
function RouteComponent() {
	return (
        ...
        <Suspense fallback={<ProductsSkeleton />}>
            <ProductsList />
        </Suspense>
        ...
    )}

export default function ProductsList() {
	const products = useSuspenseQuery(productsQueryOptions).data
	return (
        ...
			{products.map((product: ProductType) => (
				<Link
					key={product.id}
					to="/fake-api/$productId"
					params={{ productId: String(product.id) }}
				>
					<Product product={product} />
				</Link>
			))}
        ...
	)
}

$productId.tsx
---------------
export const Route = createFileRoute("/fake-api/$productId")({
	component: RouteComponent,
})

function RouteComponent() {
	const { productId } = Route.useParams()
	const router = useRouter()
	const { queryClient } = router.options.context
	const products = queryClient.getQueryData(["products"]) as
		| ProductType[]
		| undefined
	const product = products?.find(p => String(p.id) === productId)
	return (
        ...
    )
}

1 - VARIAS LLAMADAS
=====================
export const Route = createFileRoute("/fake-api2")({
	component: RouteComponent,
	loader: ({ context }) => {
		context.queryClient.ensureQueryData(productsQueryOptions)
		context.queryClient.ensureQueryData(productQueryOptions("1"))
		context.queryClient.ensureQueryData(productQueryOptions("2"))
		context.queryClient.ensureQueryData(productQueryOptions("3"))
	},
})

function RouteComponent() {
	return (
        <Suspense fallback={<div>CARGANDO...</div>}>
                <ProductsList />
            </Suspense>
        <Outlet />
    )
}
export default function ProductsList() {
	const products = useSuspenseQuery(productsQueryOptions).data
	return (
        ...
			{products.map((product: ProductType) => (
				<Link
					key={product.id}
					to="/fake-api/$productId"
					params={{ productId: String(product.id) }}
				>
					<Product product={product} />
				</Link>
			))}
        ...
	)
}

$productId.tsx
---------------
export const Route = createFileRoute("/fake-api/$productId")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
            <Suspense fallback={<div>Cargando...</div>}>
                <ProductSuspense />
            </Suspense>
	)
}

const ProductSuspense = () => {
	const { productId } = Route.useParams()
	const product = useSuspenseQuery(productQueryOptions(productId))
	return <Product product={product.data} />
}
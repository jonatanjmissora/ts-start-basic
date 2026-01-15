import { useNavigate, useSearch } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import { useDebouncedValue } from "@/lib/utils"

export function SearchInput() {
	const navigate = useNavigate({ from: "/fake-api" })
	const { q } = useSearch({ from: "/fake-api/" })

	const [inputValue, setInputValue] = useState(q ?? "")
	const debouncedValue = useDebouncedValue(inputValue, 400)

	// sincroniza input ← URL al entrar/back/forward
	useEffect(() => {
		setInputValue(q ?? "")
	}, [q])

	// cuando cambia el debounced, actualiza la URL
	useEffect(() => {
		navigate({
			search: prev => ({
				...prev,
				q: debouncedValue || undefined,
			}),
			replace: true, // no ensucia el history
		})
	}, [debouncedValue, navigate])

	const resetInput = () => {
		setInputValue("")
		navigate({
			search: { q: undefined },
			replace: true,
		})
	}
	return (
		<div className="flex items-center gap-4">
			<input
				type="text"
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				placeholder="Buscar"
				className="border border-gray-300 rounded px-2 py-1"
			/>
			<button
				className="bg-blue-500 text-white px-4 py-2 rounded"
				onClick={resetInput}
			>
				Clear
			</button>
		</div>
	)
}

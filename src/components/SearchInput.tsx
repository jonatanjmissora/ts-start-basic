import { useNavigate, useSearch } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import { useDebouncedValue } from "@/lib/utils"
import { X } from "lucide-react"

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
		<div className="relative flex items-center">
			<input
				type="text"
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				placeholder="Buscar"
				className="border border-gray-300 rounded px-2 py-1"
			/>
			<X
				className={`absolute right-2 top-1/2 -translate-y-1/2 size-5 cursor-pointer hover:bg-gray-700 ${inputValue ? "block" : "hidden"}`}
				onClick={resetInput}
			/>
		</div>
	)
}

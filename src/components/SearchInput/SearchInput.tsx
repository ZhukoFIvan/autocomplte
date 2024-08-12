import { AxiosResponse } from 'axios'
import { FC, useCallback, useMemo, useState } from 'react'
import { useDebounce } from 'react-use'
import { useSearchStore } from '../../store/useSearchStore'
import Info from '../Info/Info'
import PlacesList from '../PlacesList/PlacesList'
import styles from './SearchInput.module.scss'

export interface IPlace {
	type: string
	query: string
	features: {
		id: string
		place_name?: string
		text: string
	}[]
	attribution: string
}
interface ISuggestion {
	properties: {
		text: string
	}
}
const SearchInput: FC = () => {
	const fetchPlaces = useSearchStore((state) => state.fetchPlaces)

	const query = useSearchStore((state) => state.query)
	const setQuery = useSearchStore((state) => state.setQuery)
	const isLoading = useSearchStore((state) => state.isLoading)

	const [place, setPlace] = useState({} as IPlace)
	const [selectedSuggestion, setSelectedSuggestion] =
		useState<ISuggestion | null>(null)

	const queryText = useMemo(() => query[0], [query]) || query[0]

	useDebounce(
		() => {
			fetchPlaces(query[0]).then((res: AxiosResponse<IPlace>) =>
				setPlace(res.data)
			)
		},
		200,
		[query]
	)

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setQuery([e.target.value])
		},
		[setQuery]
	)

	const handleSuggestionClick = useCallback(
		(feature: any) => {
			setSelectedSuggestion(feature)
			setPlace({} as any)
			setQuery([''])
		},
		[setSelectedSuggestion, setPlace, setQuery]
	)

	return (
		<div className={styles.wrapper}>
			<input
				type='text'
				placeholder='Let`s search...'
				className={`${styles.input} ${isLoading ? styles.loading : ''}`}
				style={{
					backgroundImage: isLoading
						? 'url(/public/infinite-spinner.svg)'
						: 'none',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'calc(100% - 10px) center',
					backgroundSize: '30px',
				}}
				onChange={(e) => handleChange(e)}
				value={query}
			/>

			{queryText?.length > 0 && (
				<PlacesList
					place={place}
					handleSuggestionClick={handleSuggestionClick}
				/>
			)}

			{selectedSuggestion && <Info feature={selectedSuggestion} />}
		</div>
	)
}
export default SearchInput

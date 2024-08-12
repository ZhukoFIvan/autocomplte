import { FC } from 'react'
import { IPlace } from '../SearchInput/SearchInput'
import styles from './Places.module.scss'

interface IPLacesList {
	place: IPlace
	handleSuggestionClick: (feature: any) => void
}

const PlacesList: FC<IPLacesList> = ({ place, handleSuggestionClick }) => {
	return (
		<ul className={styles.list}>
			{place.features?.length !== 0  ? (
				place.features?.map((feature) => (
					<li key={feature.id} onClick={() => handleSuggestionClick(feature)}>
						{feature.place_name}
					</li>
				))
			) : (
				<li>Not Found</li>
			)}
		</ul>
	)
}

export default PlacesList

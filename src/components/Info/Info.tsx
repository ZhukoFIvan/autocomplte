import { FC, memo } from 'react'
import styles from './Info.module.scss'

interface IFeature {
	feature: any
}

const Info: FC<IFeature> = memo(({ feature }) => {

	return (
		<ul className={styles.info}>
			{feature.length !== 0 ? (
				<>
					<li>{feature.place_name}</li>
					<li>
						{feature.properties.category &&
							`Category: ${feature.properties.category}`}
					</li>
					<li>
						{feature.properties?.landmark === true
							? 'Landmark: ✅'
							: 'Landmark: ❌'}
					</li>
				</>
			) : (
				<li>not found</li>
			)}
		</ul>
	)
})

export default Info

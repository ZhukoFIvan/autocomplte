import axios, { AxiosResponse } from 'axios'
import { create } from 'zustand'
const MAPBOX_GEOCODING_API_URL='https://api.mapbox.com/geocoding/v5/mapbox.places'
const MAPBOX_PUBLIC_ACCESS_TOKEN='pk.eyJ1IjoidGVybW94aW4iLCJhIjoiY2w0NjdhOHgxMDVtcTNjbjIwdWxjZHVsdCJ9.-RRQ9TZ9JdX8wkZfsOKq5g'

interface IUseSearchStore {
	query: string[]
	setQuery: (query: string[]) => void
	isLoading: boolean
	errors: string[]
	fetchPlaces: (query: string) => Promise<AxiosResponse<any>>
}


export const useSearchStore = create<IUseSearchStore>((set) => ({
	query: [],
	setQuery: (query) => set({ query }),
	isLoading: true,
	errors: [],
	fetchPlaces: async (query) => {
		set({ isLoading: true })
		try {
			const res = await axios.get(`${MAPBOX_GEOCODING_API_URL}/${query}.json`, {
				params: {
					access_token: MAPBOX_PUBLIC_ACCESS_TOKEN,
					limit: 10
				}
			})
			return res
		} catch (error) {
			throw new Error('Something went wrong')
		}finally{
			set({ isLoading: false })
		}
	}
}))


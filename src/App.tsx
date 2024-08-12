import { FC } from 'react'
import Container from './components/Container/Container'
import SearchInput from './components/SearchInput/SearchInput'
import Title from './components/Title/Title'

const App: FC = () => {
	return (
		<Container>
			<Title />
			<SearchInput />
		</Container>
	)
}

export default App

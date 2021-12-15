import RoutesPath from './routes'
import { Provider } from 'react-redux'
import store from './redux/store'
import './styles/global.scss'

function App() {
  return (
    <div>
      <Provider store={store}> 
        <RoutesPath/>
      </Provider>
    </div>
  )
}

export default App

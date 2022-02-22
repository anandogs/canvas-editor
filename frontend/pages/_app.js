import '../styles/globals.css'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from '../components/Header'
import { store } from '../app/store'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }) {
  return (
  
    <Provider store={store}>
    <Header />
  <Component {...pageProps} />
  <ToastContainer/>
  </Provider>
  
  )}

export default MyApp

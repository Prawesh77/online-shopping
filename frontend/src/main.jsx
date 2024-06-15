import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './redux/store'
import App from './components/App'
import './css/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
            {/* <Provider> chahi state management ko lagi */}
            <Provider store={store}>   
                 
                  <App />
            </Provider>
            
      </React.StrictMode>     
)

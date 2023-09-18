import ReactDOM from 'react-dom/client'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import blogReducer from './reducers/blogReducer'
import notifReducer from './reducers/notifReducer'
import userReducer from './reducers/userReducer'
import allUserReducer from './reducers/allUserReducer'
import { BrowserRouter as Router } from 'react-router-dom'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notif: notifReducer,
    user: userReducer,
    allUser: allUserReducer,
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)

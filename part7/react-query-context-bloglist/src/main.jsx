import ReactDOM from 'react-dom/client'
import App from './App'
import { NotifContextProvider } from './context/NotifContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <NotifContextProvider>
        <Router>
          <App />
        </Router>
      </NotifContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
)

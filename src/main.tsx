import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from './components/ui/sonner.tsx'
import DeleteModal from './components/modals/menuItems/DeleteModal.tsx'
import EditModal from './components/modals/menuItems/EditModal.tsx'
import SignupModal from './components/modals/auth/SignupModal.tsx'
import LoginModal from './components/modals/auth/LoginModal.tsx'
import {Provider} from 'react-redux'
import store from './features/store.ts'
import ViewModal from './components/modals/menuItems/ViewModal.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    <EditModal/>
    <ViewModal/>
    <DeleteModal/>
    <SignupModal/>
    <LoginModal/>
    
    <Toaster position='top-center' duration={2000}/>
    </Provider>
  </React.StrictMode>,
)

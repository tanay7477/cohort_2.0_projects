import {RouterProvider} from 'react-router'
import {router} from './app.routes'
import './App.css'
import FaceExpression from './features/Expression/components/FaceExpression'
import './features/shared/styles/global.scss'
import {  AuthProvider } from './features/auth/auth.context.jsx'
function App() {

  return (

    <AuthProvider>
        <RouterProvider router={router}/>
    </AuthProvider>
    
  )
}

export default App

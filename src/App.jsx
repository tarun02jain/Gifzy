import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AppLayout from './layouts/AppLayout'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Search from './pages/Search'
import SingleGif from './pages/Singlegif'
import Favourites from './pages/Favourites'
import GifProvider from './context/gif-context'


const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children:[
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/:category',
        element: <Categories />
      }, 
      {
        path: '/search/:query',
        element: <Search />
      }, 
      {
        path: '/:type/:slug',
        element: <SingleGif />
      },
      {
        path: '/favourites',
        element: <Favourites />
      },

    ]
  }
])
function App() {
  

  return (
    
    <RouterProvider router={router}/>
    
  )
}

export default App

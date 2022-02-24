import './App.css'
import {ItemListContainer} from './components/container/ItemListContainer'
import { ItemDetailContainer } from './components/container/ItemDetailContainer'
import {NavBar} from './components/NavBar/NavBar'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { CartContextProvider } from './components/utils/CartContext'
import { Cart } from './components/Cart/Cart'

function App() {
  return (
    <CartContextProvider>
      <BrowserRouter>

        <NavBar/>
        
        <Routes>
          <Route path ="/category/:catId" element={<ItemListContainer/>}></Route>
          <Route path ="/category" element={<ItemListContainer/>}/>
          <Route path ="/item/:itemId" element={<ItemDetailContainer/>}/>
          <Route path ="/cart" element={<Cart/>}/>
          <Route path="*" element={<Navigate to="/category"/>}/>
        </Routes>
      </BrowserRouter>
    </CartContextProvider>
  );
}

export default App;

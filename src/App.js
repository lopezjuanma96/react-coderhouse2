import './App.css'
import {ItemListContainer} from './components/container/ItemListContainer'
import { ItemDetailContainer } from './components/container/ItemDetailContainer'
import {NavBar} from './components/NavBar/NavBar'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { CartContextProvider } from './components/utils/CartContext'
import { UserContextProvider } from './components/utils/UserContext'
import { Cart } from './components/Cart/Cart'
import { Checkout } from './components/Checkout/Checkout'
import { UserContainer } from './components/User/UserContainer'

function App() {
  return (
    <CartContextProvider>
      <UserContextProvider>
        <BrowserRouter>

          <NavBar/>
          
          <Routes>
            <Route path ="/category/:catId" element={<ItemListContainer/>}></Route>
            <Route path ="/category" element={<ItemListContainer/>}/>
            <Route path ="/item/:itemId" element={<ItemDetailContainer/>}/>
            <Route path ="/cart" element={<Cart/>}/>
            <Route path ="/check" element={<Checkout/>}/>
            <Route path ="/user" element={<UserContainer/>}/>
            <Route path="*" element={<Navigate to="/category"/>}/>
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </CartContextProvider>
  );
}

export default App;

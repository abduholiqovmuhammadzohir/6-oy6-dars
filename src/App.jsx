import { useState, useEffect } from 'react'
import './App.css'
import Form from './components/Form'
import Products from './components/Products'


function App() {

  const [products, setProducts] = useState([]);
  const [isLoding, setIsLoding] = useState(false)

  useEffect(() => {
    setIsLoding(true)
    fetch('https://auth-rg69.onrender.com/api/products/all')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoding(false)
      })
  }, [])

  return (
    <div className='container'>
      {
        isLoding ? (
          <p style={{textAlign:'center' , fontSize:"26px"}}>Loading...</p>
        ) : (
          <>
            <Form addValue = {setProducts} products = {products}></Form>
            <Products data={products} setProducts = {setProducts}></Products>
          </>
        )
      }
    </div>
  )
}

export default App

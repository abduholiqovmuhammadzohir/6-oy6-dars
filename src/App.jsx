import { useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false)
  const nameRef = useRef();
  const priceRef = useRef();
  const descRef = useRef();
  const [name,setName] = useState('')
  const [price,setPrice] = useState('')
  const [desc,setDesc] = useState('')

  useEffect(() => {
    setLoader(true)
    fetch('https://auth-rg69.onrender.com/api/products/all')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoader(false);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  function handleButton(id) {
    let isDelete = confirm("Rostan ham o'chirmoqchimisiz?")
    if (isDelete) {
      fetch(`https://auth-rg69.onrender.com/api/products/${id}`, {
        method: "DELETE"
      })
        .then(res => res.json())
        .then(dataRes => {
          if (dataRes.message == "Mahsulot muvaffaqiyatli o'chirildi") {
            let copy = JSON.parse(JSON.stringify(data))
            copy = copy.filter(el => {
              return el.id != id;
            })
            setData(copy)
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    useEffect(() => {
      fetch('https://auth-rg69.onrender.com/api/products', {
        method:"POST"
      })
      .then(res => res.json())
      .then(data => {
        setName(data)
      })
      .catch(err => {
        console.log(err);
      })
    },[])

    if (!nameRef.current.value) {
      alert("Namega ma'lumot kiritilmadi");
      nameRef.current.focus();
    }

    if (!priceRef.current.value) {
      alert("Pricega ma'lumot kiritilmadi");
      nameRef.current.focus();
    }

    if (priceRef.current.value <= 100) {
      alert("Narhdi juda arzon kiritmoqdasiz");
      nameRef.current.focus();
    }

    if (!descRef.current.value) {
      alert("Izoh yozmadiningiz");
      nameRef.current.focus();
    }

  }
  return (
    <>

      <form onSubmit={handleSubmit}>
        <input onChange={onChangeName} maxLength={20} ref={nameRef} type="text" placeholder='Name' /><br />
        <input onChange={onChangePrice} maxLength={12} ref={priceRef} type="number" placeholder='Price' /><br />
        <textarea onChange={onChangeDesc} ref={descRef} maxLength={25} cols="30" rows="10" placeholder='Description'></textarea>
        <button>Saqlash</button>
      </form>

      {
        loader && <p className='loader'>Loading...</p>
      }

      <table>
        <tr>
          <th>No</th>
          <th>Nomi</th>
          <th>Narxi</th>
          <th>Izoh</th>
          <th>Amallar</th>
        </tr>
        {
          data.map((phone, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{phone.name}</td>
                <td>{phone.price}</td>
                <td>{phone.description}</td>
                <td><button onClick={() => { handleButton(phone.id) }}>delete</button></td>
              </tr>
            )
          })
        }
      </table>
    </>
  )
}

export default App

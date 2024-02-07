import style from "./index.module.css"
import React from 'react'
import Product from "../Product"

export default function Products({ data = [], setProducts  }) {
  function deleteProduct(id) {
    let copied = JSON.parse(JSON.stringify(data))
    copied = copied.filter(el => {
      return el.id != id
    })
    setProducts(copied)
  }
  return (
    <div className={style.wrapper}>
      {
        data.map((el, index) => {
          return (
            <Product key={index} phone={el} del = {deleteProduct}></Product>
          )
        })
      }
    </div>
  )
}

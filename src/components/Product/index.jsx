import style from "./index.module.css"

export default function Product(props) {
  const { name, price, description, id } = props.phone;
  const {del} = props;

  function handleClick({deleteProduct}) {
    let isDelete = confirm(`Rosdan ham ${name} ni ochirmoqchimisiz `)
    if (isDelete) {
      fetch(`https://auth-rg69.onrender.com/api/products/${id}`, {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(data => {
        if (data.message == "Mahsulot muvaffaqiyatli o'chirildi") {
          del(id);
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  return (
    <div className={style.product}>
      <h3 className={style.name}>{name}</h3>
      <h3 className={style.price}>{price}</h3>
      <h3 className={style.description}>{description}</h3>
      <button onClick={handleClick} className={style.btn}>delete</button>
    </div>
  )
}

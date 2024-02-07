import style from "./index.module.css"
import React, { useRef, useState } from 'react'

export default function Form({products,addValue}) {

    const [btnDisabled, setBtnDisabled] = useState(false)

    const nameRef = useRef('');
    const descRef = useRef(0);
    const priceRef = useRef('');
    const formRef = useRef('');

    function validate(nameRef, priceRef) {

        if (!nameRef.current.value) {
            nameRef.current.focus();
            alert('Name kiritilishi shart')
            return false;
        }
        if (nameRef.current.value.trim().length < 4) {
            nameRef.current.focus();
            alert('Name 4ta belgidan kam bolmasligi kerak')
            return false;
        }
        if (!priceRef.current.value) {
            priceRef.current.focus();
            alert('Price kiritilishi shart')
            return false;
        }
        if (Number(!priceRef.current.value)) {
            priceRef.current.focus();
            alert('Price number bolishi shart')
            return false;
        }


        return true;
    }

    function handlesubmit(e) {
        e.preventDefault();
        setBtnDisabled(true);
        if (validate(nameRef, priceRef)) {
            const phone = {
                name: nameRef.current.value,
                price: priceRef.current.value,
                description: descRef.current.value,
                category_id: '2',
                status: "active"
            }

            fetch("https://auth-rg69.onrender.com/api/products", {
                method: "POST",
                headers: {
                    'Content-type': "application/json"
                },
                body: JSON.stringify(phone)
            })
                .then(res => res.json())
                .then(data => {
                    let copied = JSON.parse(JSON.stringify(products))
                    copied.push(data);
                    addValue(copied);
                    formRef.current.reset();
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() =>{
                    setBtnDisabled(false)
                });

        }
    }

    return (
        <form ref={formRef} className={style.form} onSubmit={handlesubmit}>
            <input ref={nameRef} className={style.field} type="text" placeholder="Enter name..." />
            <input ref={priceRef} className={style.field} type="number" placeholder="Enter price..." />
            <textarea ref={descRef} className={style.field} cols="30" rows="10" placeholder="Enter description..."></textarea>
            <button disabled = {btnDisabled ? true : false} className={style.button}>{btnDisabled ? "Loading..." : 
            "Save"}</button>
        </form>
    )
}

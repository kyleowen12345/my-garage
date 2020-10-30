import React from 'react'

const CartContent = ({image,name,handleDelete,price,quantity}) => {
    return (
        <div className="sign__form">
            <img src={image} alt="my-garage"/>
    <p>{name}</p>
    <p>$ {price * quantity}</p>
    <p>{quantity}</p>
    <button onClick={handleDelete}>Remove</button>
        </div>
    )
}

export default CartContent

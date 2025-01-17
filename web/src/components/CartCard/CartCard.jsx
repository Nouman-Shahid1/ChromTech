import React from 'react';
import { useMyContext } from '../../ContextApi/store';
import { FaTrashCan } from "react-icons/fa6";

const CartCard = ({ product }) => {
    const { addToCart, removeFromCart, currency,decrementCart} = useMyContext();
    const { _id, name, quantity, price, imageUrl } = product;

    return (
        <div className="flex justify-between items-center border m-2 p-1">

            <div className='p-1 flex items-center'>
                <div className='m-6'>
                    <img src={imageUrl} width="70px" />
                </div>
                <div>
                    <p>{name}</p>
                    <div>
                        <button
                            className='bg-black text-white text-lg px-2 mr-2'
                            onClick={() => decrementCart(_id)}
                        >
                            -
                        </button>
                        <span>{quantity}</span>
                        <button
                            className='bg-black text-white text-lg px-1.5 ml-2'
                            onClick={() => addToCart(product)}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div className='pr-2'>
                <div className='ml-7 mb-3' onClick={()=>removeFromCart(_id)}>
                <FaTrashCan style={{fontSize:'25px', color:'red', cursor:'pointer'}} />
                </div>
                <div>
                {currency}{(price * quantity).toFixed(2)}
                </div>
            </div>
        </div>
    );
};

export default CartCard;

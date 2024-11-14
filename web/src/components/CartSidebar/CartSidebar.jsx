import { useMyContext } from "@/ContextApi/store";
import Link from "next/link";
import { RxCrossCircled } from "react-icons/rx";
import CartCard from "../CartCard/CartCard";

const CartSidebar = () => {
  const { showCartBar, closeCartBar, cartItems , clearCart,totalPrice,currency } = useMyContext();

  if (!showCartBar) return null;

  return (
    <div className="fixed right-0 top-0 w-[400px] h-screen bg-white z-50 shadow-xl">
      <div className="block absolute top-5 right-5 cursor-pointer" onClick={closeCartBar}>
        <RxCrossCircled style={{ fontSize: "25px", color: "red" }} />
      </div>
      <div className="text-xl px-5 py-8">
        <p>Cart Items</p>
      </div>
      <div className="border overflow-scroll mx-8 h-[600px]">
        {cartItems.length ? cartItems.map(item => <CartCard key={item._id} product={item} />) : <p className="m-10 text-bolder">Your cart is empty</p>}
      </div>
      <div className="flex justify-between m-5">
    <div className="px-5">
        <p>SubTotal</p>
    </div>
    <div className="px-5">
        <strong>{currency}{totalPrice}</strong>
    </div>
      </div>
      <div className="absolute bottom-5 left-5">
        <button className="px-4 py-3 bg-red-600 rounded-lg text-white" onClick={clearCart}>Clear Cart</button>
        <Link href="/check-out" className="px-4 py-4 bg-green-400 rounded-lg text-white ml-3">Checkout</Link>
      </div>
    </div>
  );
};

export default CartSidebar;

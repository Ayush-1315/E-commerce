import { CartProductCard } from "../../components/cartProduct";
import { EmptyState } from "../../components/emptyState";
import { PriceCard } from "../../components/priceCard";
import { useCart } from "../../context/cartContext";
export const Cart = () => {
  const { cartState } = useCart();
  const encodedToken = localStorage.getItem("token");
  const cartEmpty = cartState.length === 0;
  return (
    <div style={{ minHeight: "72vh", display: "flex", flexWrap: "wrap" }}>
      <div style={{ width:"100%"}}>
        {encodedToken ? (
          cartEmpty ? (
            <>
              <EmptyState
                message={
                  "Empty cart syndrome detected. Start adding items and bring it back to life!"
                }
              />
            </>
          ) : (
            <>
              {cartState.map((product, index) => (
                <CartProductCard product={product} key={index} />
              ))}
              <PriceCard />
            </>
          )
        ) : (
          <h1>Login First</h1>
        )}
      </div>
    </div>
  );
};
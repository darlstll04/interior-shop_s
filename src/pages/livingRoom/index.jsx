import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Order } from "../../components/order";
import { FaCartShopping } from "react-icons/fa6";
import { LivingrProduct } from "../../components/livingrProduct";
import SearchBar from "../../components/searchBar";
import s from "./index.module.css"


export const LivingRoom = () => {
  
  const LIVINGR_URL = "http://localhost:3800/livingRoom";

  const ORDERS_URL = "http://localhost:3800/orders";

  
  const [livingr, setLivingr] = useState([]);
  
  const [error, setError] = useState("");
  
  const { id } = useParams();
  
  const [orders, setOrders] = useState([]);

  let [cardOpen, setCardOpen] = useState(false);

  
  const getLivingr = async () => {
    try {
      const { data } = await axios(LIVINGR_URL);
      setLivingr(data);
    } catch (err) {
      setError(err.message);
    }
  };
  
  useEffect(() => {
    getLivingr();
  }, []);
  
  const addToOrder = async (productId) => {
    try {
      const { data } = await axios.post(ORDERS_URL, {productId});
      setOrders([...orders, data]);
      setCardOpen(true);
    } catch (err) {
      setError(err.message);
    }
  };


  const filterProducts = (query) => {
    const filteredProducts = decor.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.price.toString().includes(query)
    );
    setDecor(filteredProducts);
  };

  
function deleteFromOrder(productId) {
  const updatedOrder = orders.filter((item) => item.productId !== productId);
  setOrders(updatedOrder);
}

  return (
    <>
      {error && <p>{error}</p>}
      {!error && (
        <div className="container">
          <div className="search-shop-card">
            <SearchBar onSearch={filterProducts} />
            <FaCartShopping onClick={() => setCardOpen(cardOpen = !cardOpen)} className={`shop_card_button ${cardOpen ? "active" : ""}`}/>
                {cardOpen && orders.length > 0 && (
                  <div className="shop-card">
                    {orders.map(order=>(
                      <Order key={order.id} productId={order.productId} onDelete={() => deleteFromOrder(order.productId)}/>
                      ))}
                  </div>
                )}
          </div>
          <div className={s.cards}>
            {livingr.map((product) => (
              <LivingrProduct key={product.id} product={product} addToOrder={()=> addToOrder(product)}/>
              ))}
          </div>
          </div>
      )}
    </>
  )
};

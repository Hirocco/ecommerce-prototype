import React , {createContext , useContext , useState,useEffect} from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext();

export const StateContext = ({children}) =>{
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

//dodawanie produktu do koszyka
    const onAdd = (product, quantity) =>{
        //sprawdzam czy dany produkt jest juz w koszyku 
        const checkProductInCart = cartItems.find(item=> item._id === product._id)
        setTotalPrice((prevTotalPrice) => prevTotalPrice + quantity*product.price);
        setTotalQuantity((prevTotalQuantity)=> prevTotalQuantity + quantity);

        if(checkProductInCart){
        //wrzucam produkt do koszyka (jezeli jest juz taki sam produkt w koszyku to zwiekszamy tylko jego ilosc)
            const updatedCartItems = cartItems.map((cartProduct)=>{
                if(cartProduct._id === product._id) return{
                    ...cartProduct,
                    quantity : cartProduct.quantity + quantity
                }
            })
        setCartItems(updatedCartItems);
        }else{
            //jezeli zas jest to nowy produkt, dodajemy go do naszej tablicy 
            product.quantity = quantity;
            setCartItems([...cartItems , {...product}])
        }
        toast.success(`${qty} ${product.name} added to the cart.`);
    }
//zwiekszanie ilosci zamawianych produktow
    const increaseQuantity = () =>{
        setQty((prevQty)=>prevQty+1)
    }
//zmniejszanie ilosci zamawianych produktow
    const decreaseQuantity = () =>{
        setQty((prevQty)=>{
            if(prevQty -1 < 1) return 1;
            return prevQty-1;
        })
    }

    const onRemove = (product) =>{
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);
    
        setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
        setTotalQuantity(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    const toggleCartItemQuantity = (id,value)=>{
        foundProduct = cartItems.find(item=>item._id === id); 
        // index = cartItems.findIndex(product=>product._id === id); 
        const newCartItems = cartItems.filter(item=>item._id !== id) //.filter() nie tworzy nowej tablicy w przeciwienstwie do .splice()
        
        if(value === 'increase'){
            setCartItems([...newCartItems , {...foundProduct , quantity: foundProduct.quantity + 1}]); //robimy to w ten sposob aby nie zlamac regul react, (useState mutation)
            setTotalPrice((prevTotalPrice)=>prevTotalPrice + foundProduct.price)
            setTotalQuantity((prevTotalQuantity)=>prevTotalQuantity+1)
        }else if(value === 'decrease'){
            if(foundProduct.quantity > 1){
                setCartItems([...newCartItems , {...foundProduct , quantity: foundProduct.quantity - 1}]); //robimy to w ten sposob aby nie zlamac regul react, (useState mutation)
                setTotalPrice((prevTotalPrice)=>prevTotalPrice - foundProduct.price)
                setTotalQuantity((prevTotalQuantity)=>prevTotalQuantity-1)
            }
        }
    }

    return (
        <Context.Provider 
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantity,
                qty,
                increaseQuantity,
                decreaseQuantity,
                onAdd,
                toggleCartItemQuantity,
                onRemove,
                setCartItems,
                setTotalPrice,
                setTotalQuantity,
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);
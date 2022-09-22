/**
 * Slug poniewaz jest to unikalne id kazdego produktu w bazie sanity
 * W kwadratowych nawaisach poniewaz po klikniecu na baner produktu nextjs automatycznie przekieruje nas do strony danego produktu
 */
import React , {useState} from 'react'
import {client , urlFor} from '../../lib/client'
import {AiOutlineMinus , AiOutlinePlus , AiFillStar,AiOutlineStar} from 'react-icons/ai'
import {Product } from '../../components'
import {useStateContext} from '../../context/StateContext'

const ProductDetails = ({product, products}) => {
    const { image , name, details, price } = product;
    const [index, setindex] = useState(0)
    const {decreaseQuantity , increaseQuantity,qty,onAdd , setShowCart} = useStateContext();

    const handleBuyNow = () =>{
        onAdd(product,qty);
        setShowCart(true);
    }

  return (
    <div>
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    <img className='product-detail-image' src={urlFor(image && image[index])}/>
                </div>
                {<div className='small-images-container'>
                    {image?.map((item,ind)=>(
                        <img key={ind} src={urlFor(item)} className={ind === index ? 'small-image selected-image' : 'small-image'} onMouseEnter={()=>setindex(ind)} />
                    ))}
                </div>}
            </div>
            <div className='product-detail-desc'>
                <h1>{name}</h1>
                <div className='reviews'>
                    <div>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiOutlineStar/>
                    </div>
                    <p>
                        (20)
                    </p>
                </div>
                <h4>Details:</h4>
                <p>{details}</p>
                <p className='price'>{price}$</p>
                <div className='quantity'>
                    <h3>Quantity:</h3>
                    <p className='quantity-desc'>
                        <span className='minus' onClick={decreaseQuantity}><AiOutlineMinus/></span>
                        <span className='num'>{qty}</span>
                        <span className='plus' onClick={increaseQuantity}><AiOutlinePlus/></span>
                    </p>
                </div>
                <div className='buttons'>
                    <button type='button' className='add-to-cart' onClick={()=>onAdd(product,qty)}>Add to Cart</button>
                    <button type='button' className='buy-now' onClick={handleBuyNow}>Buy Now</button>
                </div>
            </div>
        </div>
        <div className='maylike-products-wrapper'>
            <h2>You may also like:</h2>
            <div className='marquee'>
                <div className='maylike-products-container track'>
                    {products.map((item)=>(
                        <Product key={item._id} product={item}/>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

//nextJs wyrzuca error jezeli tego nie ma, getStaticProps i getStaticPaths ida ze soba w parze (https://nextjs.org/docs/basic-features/data-fetching/get-static-paths)
export const getStaticPaths = async()=>{
    //Mowimy sanity ze nie chcemy brac wszystkich produktow, tylko ten z ID (slug) ktory kliknelismy na banerze 
    const query = `*[_type =="product"]{ 
        slug {
            current
        }
    }`
    const products = await client.fetch(query);

    const paths = products.map((product)=>({
        params:{
            slug: product.slug.current
        }
    }));
    return{
        paths,
        fallback:'blocking' //renderuje jeden przedmiot i reszcie kaze czekac (https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-blocking)
    }
}

//nextJS data fetching
export const getStaticProps = async({params: {slug}}) =>{ //ta nazwa funkcji nie moze zostac zmieniana (https://nextjs.org/docs/basic-features/data-fetching/get-static-props)
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;  //dajemy znac nextjs ze po klikniecu na baner produktu chcemy przejsc dokladnie do tego produktu, nak tory kliknelismy
    const productsQuery = '*[_type=="product"]';

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);

    return {
      props: { product, products }
    }
  }

export default ProductDetails
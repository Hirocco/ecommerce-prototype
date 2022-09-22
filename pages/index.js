import React from 'react'
import {Product , HeroBanner , FooterBanner} from '../components'
import {client} from '../lib/client'


const Home = ({products , bannerData}) => {
  //console.log(bannerData)
  return (
    <div>
      <HeroBanner heroBanner={bannerData && bannerData[0]}/>

      <div className="products-heading">
        <h2>Best Seller Products</h2>
        <p>speaker There are many variations passages</p>
      </div>


      <div className='products-container'>
        {products?.map((product)=>
        <Product
          key={product._id}
          product={product}
        />)}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[1]}/>
    </div>
  )
}

//nextJS data fetching
export const getServerSideProps = async() =>{ //ta nazwa funkcji nie moze zostac zmieniana (wg. nextjs dokumentacji)
  const query = '*[_type == "product"]';  //bierzemy wszystkie produkty z sanity dashboard
  const products = await client.fetch(query);
  
  const bannerQuery = '*[_type == "banner"]';  //bierzemy banery z snity dashboard
  const bannerData = await client.fetch(bannerQuery);
  return {
    props: { products, bannerData }
  }
}

export default Home
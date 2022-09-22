import React from 'react'
import Head from 'next/head'    //podobne jak w html, taka metadata w nextjs 
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div className='layout'>
      <Head>
        <title>Juicy headphones shop</title>
      </Head>
      <header>
        <Navbar/>
      </header>
      <main className='main-container'>
        {children /*Renderuje rzeczy,jakie zostaly owiniete w pages->_app.js */}
      </main>
      <footer>
        <Footer/>
      </footer>


    </div>
  )
}

export default Layout
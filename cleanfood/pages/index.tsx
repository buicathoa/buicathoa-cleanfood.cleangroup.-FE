import { Drawer } from 'antd'
import type { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Image from 'next/image'
import Bonus from '../components/Home/Bonus'
import Carousels from '../components/Home/Carousels'
import Categories from '../components/Home/Categories'
import Combo from '../components/Home/Combo'
import FAQ from '../components/Home/FAQ'
import OrderWay from '../components/Home/OrderWay'

const Home: NextPage = (props) => {
  // console.log('loading ne', props.loading)
  return (
    <>
    {/* <div className={`home-page ${props?.loading ? 'slide' : 'normal'}`}> */}
      <Carousels />
      <Categories />
      <OrderWay />
      <Bonus />
      <Combo />
      <FAQ />
    {/* </div> */}
    </>
  )
}

export default Home

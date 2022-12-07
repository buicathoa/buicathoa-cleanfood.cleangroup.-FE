import { Drawer } from 'antd'
import { AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import Bonus from '../components/Home/Bonus'
import Carousels from '../components/Home/Carousels'
import Categories from '../components/Home/Categories'
import Combo from '../components/Home/Combo'
import FAQ from '../components/Home/FAQ'
import OrderWay from '../components/Home/OrderWay'
import { apiUrl } from '../constants'
import { ComboItem, listCombo, listMenuTableData, ResponseFormatItem } from '../interface'
import { apiRequest } from '../utils/apiRequest'

export async function getServerSideProps() {
    const [resCombo] = await Promise.all([
      apiRequest(
        apiUrl.comboPackage.getAll,
        {},
        'general'
      )
    ])
    const [listCombo] = await Promise.all([
      resCombo,
    ])
    return {
        props: {
          listCombo: listCombo.data,
        }
    };
}

const Home = ({listCombo}: listCombo) => {
  return (
    <>
    {/* <div className={`home-page ${props?.loading ? 'slide' : 'normal'}`}> */}
      <Carousels />
      {/* <Categories listCombo={listCombo}/> */}
      <OrderWay />
      <Bonus />
      <Combo listCombo={listCombo}/>
      <FAQ />
    {/* </div> */}
    </>
  )
}

export default Home

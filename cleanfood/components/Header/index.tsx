import React, { Fragment, useEffect, useState } from "react";
import {
  MessageFilled,
  ShoppingFilled,
  BellFilled
} from "@ant-design/icons";
import { Input, Badge, Space } from "antd";
import { ResponseFormatItem } from "../../interface";
import { useAppDispatch } from "../../reducer/hook";
import { CartActions } from "../../reducer/cartReducer";
import Cookies from 'js-cookie';
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const { Search } = Input;

const Header: React.FC = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const fetchAllCart = (param: any): Promise<ResponseFormatItem> => {
    return new Promise((resolve, reject) => {
      dispatch(CartActions.fetchAllCart({ param, resolve, reject }));
    });
  };

  const listCartQuantity = useSelector((state) => state.cart.listCartQuantity)
  useEffect(() => {
    if (Cookies.get('cleanfood')) {
      fetchAllCart({})
    }
  }, [])

  return (
    <header className="header-component">
      <div className="header-container">
        <div className="header-content">
          <div className="personal-contact">
            <MessageFilled />
          </div>
          <span className="header-logo">
            Fresh Meals
          </span>
          <div className="header-personal">
            <Space size="middle">
              <Badge count={5} size="small">
                <BellFilled className="icon" />
              </Badge>
              <Badge count={listCartQuantity || 0} size="small">
                <ShoppingFilled className="icon" onClick={() => router.push('/gio-hang')}/>
              </Badge>
            </Space>
          </div>
        </div>
      </div>
    </header>
  );
  // return <div></div>
}

export default Header;

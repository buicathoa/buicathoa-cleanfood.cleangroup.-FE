/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  MessageFilled,
  ShoppingFilled,
  BellFilled
} from "@ant-design/icons";
import { Badge, Space } from "antd";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";

import { useAppDispatch, useAppSelector } from "../../reducer/hook";
import { UserActions } from "../../reducer/userReducer";

import { ResponseFormatItem, CartItemInterface } from "../../interface";
import { CartActions } from "../../reducer/cartReducer";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const Header: React.FC = (props) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [cartQuantity, setCartQuantity] = useState<number>()

  const fetchUserInfo = (param: any): Promise<ResponseFormatItem> => {
    return new Promise((resolve, reject) => {
      dispatch(UserActions.fetchUserInfo({ param, resolve, reject }));
    });
  };

  const fetchAllCart = (param: any): Promise<ResponseFormatItem> => {
    return new Promise((resolve, reject) => {
      dispatch(CartActions.fetchAllCart({ param, resolve, reject }));
    });
  };

  const listCartQuantity = useAppSelector((state) => state.cart.listCartQuantity)
  const user = useAppSelector((state) => state.user.user)
  useEffect(() => {
    if (Cookies.get('cleanfood')) {
      fetchUserInfo({})
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

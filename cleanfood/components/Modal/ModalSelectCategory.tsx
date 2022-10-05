import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { CategoryInterface, InterfaceModalCategory, SubcategoryInterface } from "../../interface";
import { QqOutlined, RightOutlined, LeftOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../reducer/hook";
import { CategoryAction } from "../../reducer/categoryReducer";
import { NextApiResponse } from "next";
import { useRouter } from 'next/router'
import _ from 'lodash'
import { HREF } from "../../constants";

const ModalSelectCategory = (props: InterfaceModalCategory) => {
  const router = useRouter()
  const { visible, setVisible, categorySelected, setCategorySelected, setSubcategorySelected } = props;
  const [listCategory, setListCategory] = useState([]);
  // const [categorySelected, setCategorySelected] = useState<CategoryInterface>()
  const [isToSubcateMenu, setIsToSubcateMenu] = useState(false)
  const dispatch = useAppDispatch();
  const fetchListCategory = (param) => {
    return new Promise((resolve, reject) => {
      dispatch(CategoryAction.fetchListCategory({ param, resolve, reject }));
    });
  };

  useEffect(() => {
    if (visible) {
      fetchListCategory({}).then((res) => {
        setListCategory(res?.data?.data);
      });
    }
  }, [visible]);

  const handleCancel = () => {
    setVisible(false)
    // props.setVisible(false);
  };

  const handleClickSelectCategory = (item:CategoryInterface) => { 
    setCategorySelected(item)
    setIsToSubcateMenu(true)
  }

  const handleClickSelectSubCategory = (item:SubcategoryInterface) => {
    router.push(`${HREF}/dang-tin?subCategory=${item._id}`)
    setSubcategorySelected(item)
    setVisible(false)
  }

  return (
    <Modal title={!isToSubcateMenu ? <span className="modal-title">Đăng tin</span> : <div className="header-category-modal"><LeftOutlined onClick={() => setIsToSubcateMenu(false)}/><div className="modal-title">Đăng tin</div></div>} visible={visible} onCancel={handleCancel}>
      <div className="modal-category-content">
        <div className="modal-category-content-container">
          <span className="title">CHỌN DANH MỤC</span>
          <div className="modal-category-list">
            {!isToSubcateMenu ? listCategory.map((item: CategoryInterface, index) => {
              return (
                <div key={index} onClick={() => handleClickSelectCategory(item)}>
                  <div className="modal-category-item">
                    <div className="modal-category-left">
                      <QqOutlined />
                      <span className="modal-category-left-title">
                        {item?.title}
                      </span>
                    </div>
                    <div className="modal-category-right">
                      <RightOutlined />
                    </div>
                  </div>
                </div>
              );
            }) : categorySelected?.sub_categories.map((item:SubcategoryInterface, index) => {
              return (
                <div key={index} onClick={() => handleClickSelectSubCategory(item)}>
                  <div className="modal-category-item">
                    <div className="modal-category-left">
                      <QqOutlined />
                      <span className="modal-category-left-title">
                        {item?.title}
                      </span>
                    </div>
                    <div className="modal-category-right">
                      <RightOutlined />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSelectCategory;

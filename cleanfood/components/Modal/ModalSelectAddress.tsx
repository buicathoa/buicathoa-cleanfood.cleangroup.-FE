import { Button, Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import { InterfaceModalAddress, ResponseFormatList } from "../../interface";
import { useAppDispatch } from "../../reducer/hook";
import { LocationAction } from "../../reducer/locationReducer";
import { UserActions } from "../../reducer/userReducer";

const ModalSelectAddress = (props: InterfaceModalAddress) => {
  const {
    visible,
    setVisible,
    citySelected,
    setCitySelected,
    districtSelected,
    setDistrictSelected,
    wardSelected,
    setWardsSelected,
    listCity,
    listDistrict,
    setListDistrict,
    listWard,
    setListWard,
    addressDetail,
    setAddressDetail,
    setIsChangeFullAddress,
  } = props;

  const fetchListDistricts = (param:any):Promise<ResponseFormatList> => {
    return new Promise((resolve, reject) => {
      dispatch(LocationAction.fetchListDistricts({ param, resolve, reject }));
    });
  };

  const fetchListWards = (param:any):Promise<ResponseFormatList> => {
    return new Promise((resolve, reject) => {
      dispatch(LocationAction.fetchListWards({ param, resolve, reject }));
    });
  };

  const { Option } = Select;
  const validateMessages = {
    required: "'Vui lòng điền thông tin vào trường này",
    // ...
  };
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const onSubmitForm = () => {
    setIsChangeFullAddress(true);
    setVisible(false);
  };

  const onCancelModal = () => {
    setVisible(false);
    setIsChangeFullAddress(false);
  };

  const handleChangeLocation = (event:any, type:string) => {
    if (type === "city") {
      const city = {...event}
      delete city['key']
      delete city['disabled']
      setCitySelected(city);
      setDistrictSelected({});
      setWardsSelected({});
      fetchListDistricts({
        province_id: event.value,
      }).then((resDistrict) => {
        setListDistrict(resDistrict?.data?.data);
      });
    } else if (type === "district") {
      const district = {...event}
      delete district['key']
      delete district['disabled']
      setDistrictSelected(district);
      setWardsSelected({});
      fetchListWards({ district_id: event.value }).then((resWards) => {
        setListWard(resWards?.data?.data);
      });
    } else if(type === 'ward'){
      const ward = {...event}
      delete ward['key']
      delete ward['disabled']
      setWardsSelected(ward);
    } else {
      setAddressDetail(event.target.value)
    }
  };

  return (
    <Modal
      title={"Địa chỉ"}
      visible={visible}
      centered
      className="custom-modal-dialog-green edit-custom-field-component"
      closeIcon={<span className="icon-close"></span>}
      onOk={() => onSubmitForm()}
      onCancel={() => onCancelModal()}
      // footer={[
      //   <Button
      //     form="edit_custom_field_form_collect"
      //     key="submit"
      //     htmlType="submit"
      //   >
      //     Xong
      //   </Button>,
      // ]}
    >
      <Form
        id="post_news_form"
        form={form}
        layout="vertical"
        name="post_news_form"
        onFinish={onSubmitForm}
        //   initialValues={formValues}
        scrollToFirstError
        validateMessages={validateMessages}
        requiredMark={false}
      >
        <div className="edit-file-extension-body">
          <div className="city-select">
            <Form.Item
              className="custom-form-item form-select-brand"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                className="form-select"
                allowClear
                labelInValue
                virtual={false}
                placeholder="Tỉnh / Thành phố"
                value={citySelected?.value}
                onChange={(event) => handleChangeLocation(event, "city")}
              >
                {listCity?.map((city, index) => {
                  return (
                    <Option value={city?.province_id} key={index}>
                      {city.province_name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
          <div className="city-select">
            <Form.Item
              className="custom-form-item form-select-brand"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                className="form-select"
                allowClear
                labelInValue
                virtual={false}
                placeholder="Tỉnh / Thành phố"
                value={districtSelected?.value}
                onChange={(event) => handleChangeLocation(event, "district")}
              >
                {listDistrict?.map((district, index) => {
                  return (
                    <Option value={district?.district_id} key={index}>
                      {district.district_name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
          <div className="city-select">
            <Form.Item
              className="custom-form-item form-select-brand"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                className="form-select"
                allowClear
                labelInValue
                virtual={false}
                placeholder="Tỉnh / Thành phố"
                value={wardSelected?.value}
                onChange={(event) => handleChangeLocation(event, "ward")}
              >
                {listWard?.map((ward, index) => {
                  return (
                    <Option value={ward?.ward_id} key={index}>
                      {ward.ward_name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
          <div className="detail-address-input">
            <Input placeholder="Địa chỉ cụ thể" value={addressDetail} onChange={(event) => handleChangeLocation(event, "addressDetail")}/>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalSelectAddress;

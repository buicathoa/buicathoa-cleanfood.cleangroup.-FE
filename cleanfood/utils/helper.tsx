export const getrandomcolor = () =>  {
  let letters = '0123456789ABCDEF';
    let color = '#';
    for (let j = 0; j < 6; j++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  return color
}

export const getAvatar = (data) => {
  if (data && !_.isNull(data) && !_.isEmpty(data)) {
      return data
  } else {
      return 'images/default-avatar.jpg'
  }
}

export const genLocation = async (address_detail, province_id, district_id, ward_id) => {
  let provinceName;
  let districtName;
  let wardName;
    let province = await Province.findOne({
      province_id: province_id,
    });
    if(province){
      provinceName = province.province_name
    }
    let district = await District.findOne({
      district_id: district_id,
    });
    if(district){
      districtName= district.district_name
    }
    let ward = await Ward.findOne({ ward_id: ward_id });
    if(ward){
      wardName = ward.ward_name
    }
    return `${address_detail}, ${wardName}, ${districtName}, ${provinceName}`
}
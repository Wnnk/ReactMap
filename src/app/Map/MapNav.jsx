"use client"
import { Input, Select, Space, Divider, Form, Button,Radio,message   } from 'antd';
import { province, city as cityData } from 'province-city-china/data'
import { useState } from "react";




export const MapNav = ({  
  getWeather={getWeather}, 
  map={map} ,
  handleTravelModeChange={handleTravelModeChange},
  handleStartPointChange={handleStartPointChange},
  handleEndPointChange={handleEndPointChange},
  handleSubmit={handleSubmit},
  state={state},
  dispatch={dispatch}
}) => {
  const [selectedProvince, setSelectedProvince] = useState(province[0].name);
  const [selectedCity, setSelectedCity] = useState(null);
  const [messageApi, contextHolder ] = message.useMessage();


  /* ******选择省市代码******** */
  
  /* 选择省份 */
  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
    setSelectedCity(null);
  
  };
  /* 选择城市 */
  const onSecondCityChange = (value) => {
    setSelectedCity(value);
    /* 查询城市天气 */
    getWeather(mapInstance,map,value);
  };
  return (

    <div className="dark:bg-gray-800 dark:text-gray-100  h-full bg-gray-100  w-[16rem] rounded-lg">
      <h3 className='p-0 m-0 text-center mb-2'>天气查询</h3>
    <Space wrap>
      <Select
        defaultValue={selectedProvince}
        style={{
          width: 120,
        }}
        onChange={handleProvinceChange}
        options={province.map((pro) => ({
          label: pro.name,
          value: pro.name,
        }))}
      />
      <Select
        style={{
          width: 120,
        }}
        value={selectedCity}
        onChange={onSecondCityChange}
        options={cityData.filter(city => city.province === province.find(pro => pro.name === selectedProvince).province).map(item =>{
          return {
            label: item.name,
            value: item.name,
          }
        })}
      />
    </Space>

    <Divider /> 
    <h3 className='p-0 m-0 text-center mb-2'>路线规划</h3>
    <Form>
      {contextHolder}
      <Form.Item label="起点">
        <Input onChange={handleStartPointChange}/>
      </Form.Item>
      <Form.Item label="终点">
        <Input onChange={handleEndPointChange}/>
      </Form.Item>
      <Form.Item label="出行方式">
        <Radio.Group onChange={handleTravelModeChange} value={state.travelMode}>
          <Radio value="Driving">驾车</Radio>
          <Radio value="Walking">步行</Radio>
          <Radio value="Riding">骑行</Radio>
          <Radio value="Transfer">公交</Radio>
        </Radio.Group>
      </Form.Item>
      <Button type="primary" className='align-self-center' onClick={handleSubmit}>搜索</Button>
    </Form>
    <div id="panel"></div>

     
    </div>
  )
}
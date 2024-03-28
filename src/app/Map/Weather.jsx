import { Card } from 'antd';
import {CloseOutlined } from '@ant-design/icons';

const { Meta } = Card;
export const Weather = ({city,weather,windPower,windDirection, setCloseWeatherHook}) => {
  return (
    <div className="absolute inset-x-1/2 translate-middle z-10 ">
      <Card 
        title={`${city}市实时天气`}
        style={{ width: 300 }}
        extra={[
          <CloseOutlined key="close"  />
        ]}
        onClick={() => {
          setCloseWeatherHook(true);
        }}
      >
        <p>{`${weather}天`}</p>
        <p>{windDirection}风 {windPower}级</p>
      </Card>
    </div>
  )
};
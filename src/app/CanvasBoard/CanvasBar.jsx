'use client'
import {  Tabs, Form,  Slider, ConfigProvider,ColorPicker  } from 'antd';
import { CloseOutlined, UnorderedListOutlined, } from '@ant-design/icons';
import { BorderOutlined } from '@ant-design/icons';
import { useState } from 'react';
import {TextType} from "./TextType" 



export const CanvasBar = ({changeFreeLine}) => {
    const [visible, setVisible] = useState(true);
    const items = [
        {key: '绘画', label: '绘画', children:<PaintType changeFreeLine={changeFreeLine} />},
        {key: '橡皮搽', label: '橡皮搽', children:<Eraser changeFreeLine={changeFreeLine} />},
        {key: '文字绘制', label: '文字绘制', children:<TextType changeFreeLine={changeFreeLine} />},
        {key: '4', label: 'Layer 4', children:'Layer 4 content'},
    ];
    /* 切换tab */
    const changeTabs = (key) => {
        switch(key){
            case '绘画':{
                changeFreeLine('isClearing',false);
                break;
            }
            case '橡皮搽':{
                changeFreeLine('isClearing',true);
                break;
            }
            case '文字绘制':{
                changeFreeLine('isClearing',false);
            };
        }
    };


    return (
        <div  className="fixed top-8 left-8 flex-col card shadow-xl 
        z-3 bg-[#eef1ff] max-h-[80%] max-w-[18%] p-5 relative">
            <div className='absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[#333C4D] flex justify-center items-center'>
                {
                    visible? <CloseOutlined onClick={() => setVisible(false)} className='text-white '/> : <UnorderedListOutlined onClick={() => setVisible(true)} className='text-white'/>
                }
            </div>
            {
                visible &&    <div className={`max-h-[100%]`}> <Tabs defaultActiveKey="1" items={items} onChange={changeTabs} /> </div>
            }
            

        </div>
    )
};

const PaintType = ({changeFreeLine}) => {
    const tabs = [{key:'自由绘画',label:'自由绘画',children:<FreePaint changeFreeLine={changeFreeLine} />},
    {key:'类型绘画',label:'类型绘画',children:<ShapePaint changeFreeLine={changeFreeLine} />}];
    return (
        <div >
            <h3 className='mt-1 mb-1'>绘画类型</h3>
            <div>
               <Tabs defaultActiveKey='自由绘画' items={tabs} /> 
            </div>
        </div>
    )
}
/* 自由绘画 */
const FreePaint = ({changeFreeLine}) => {
    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            layout="vertical"
        >
            <Form.Item label="绘画风格" >
                <button className={`rounded-lg min-w-[115px] bg-[#333C4D] text-white`}>基础</button>
                {/* <button className='rounded-r-lg min-w-[115px] bg-[#333C4D] text-white'>彩色</button> */}
            </Form.Item>
            <Form.Item label="画笔宽度">
                <ConfigProvider
                    theme={{
                        token:{
                            colorPrimary: '#00b96b',
                            borderRadius: 2,
                        }
                    }}
                >
                    <Slider defaultValue={1} min={1} max={10} onChange={(value) =>{changeFreeLine('lineWidth',value)}} />
                </ConfigProvider>
            </Form.Item>
            <Form.Item label="画笔颜色">
            <ColorPicker defaultValue="#000" defaultFormat ="rgb" onChangeComplete={(color) => {changeFreeLine('color',`${color.toHexString()}`)}}/>
            </Form.Item>
            <Form.Item label="阴影">
            <ConfigProvider
                    theme={{
                        token:{
                            colorPrimary: '#00b96b',
                            borderRadius: 2,
                        }
                    }}
                >
                    <Slider defaultValue={0} min={0} max={50}  onChange={(value) =>{changeFreeLine('shadowBlur',value)}}/>
                </ConfigProvider>
            </Form.Item>
        </Form>
    )
};

/* 类型绘画 */
const ShapePaint = ({changeFreeLine}) => {
    const items = [
        {icon:<BorderOutlined  />,label:'矩形',value:'rect'},
        {icon:<i className='iconfont icon-big-circle'></i>,label:'圆形',value:'circle'},
        {icon:<i className='iconfont icon-xingzhuang-sanjiaoxing'></i>,label:'三角形',value:'triangle'},
    ];
    const [active, setActive] = useState('');
    return (
        <>
        <h3>形状类型</h3>
        <div className=' rounded-l-lg rounded-r-lg text-white bg-[#333C4D] flex '>
            {
                items.map((item,index) => {
                    return (
                        <div key={item.value} 
                        className={`w-[32px] h-[32px] justify-center items-center flex mr-2 ${active === item.value ? 
                        'bg-[#00b96b]' : ''} ${index === 0 ? 'rounded-l-lg' : ''} `} onClick={() => {setActive(item.value),changeFreeLine('type',item.value)}}
                        
                        >
                            {item.icon}
                        </div>
                    )
                })
            }
        </div>
        </>
    )
};

/* 橡皮擦 */
const Eraser = ({changeFreeLine}) => {
    return (
        <>
            <h3>橡皮擦宽度</h3>
            <ConfigProvider
                theme={{
                    token:{
                        colorPrimary: '#00b96b',
                        borderRadius: 2,
                    }
                }}
            >
                <Slider defaultValue={20} min={5} max={50} onChange={(value) =>{changeFreeLine('clearWidth',value)}}/>
            </ConfigProvider>
        </>
    )
};
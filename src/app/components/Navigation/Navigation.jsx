"use client"
import {LeftOutlined  } from '@ant-design/icons'
import { useAppContext } from '@/app/AppContext';
import {  Button } from 'antd';
export default function Navigation() {
  const { 
      state: {displayNavigation}, 
      setState, 
    } = useAppContext();

    return (

      <nav className={`${displayNavigation ? '' : 'hidden'} 
        w-[16rem] h-full bg-gray-900 text-gray-300 p-2
       
        `}>
        <Button
          type="primary" shape="circle"
          onClick={() =>{
            setState((v) => {
              return { ...v, displayNavigation: false }
            })
          }}
          icon={ <LeftOutlined /> }
          className='fixed top-2 left-2'
        />

      </nav>
      
     
      

    )
}
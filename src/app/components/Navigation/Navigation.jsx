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

      <nav className={`${displayNavigation ? 'animate-nav-in animate-nav-appear' : 'hidden'} 
        w-[16rem] min-h-screen bg-gray-900 text-gray-300 p-2 rounded-lg
       
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
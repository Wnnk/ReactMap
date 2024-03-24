import OpenNav from "./OpenNav"
import { SunOutlined, MoonOutlined    } from '@ant-design/icons';
import { Button } from 'antd';
import { useAppContext } from "@/app/AppContext";
import Link from 'next/link'

export default function TopBar() {
  /* 主题模式 */
  const { state: {themeMode}, setState } = useAppContext();

  const toLink = [{linkName: 'Home', linkUrl: '/'},{linkName: 'Map', linkUrl: '/Map'},{linkName: 'About', linkUrl: '/About'}]

  return (
    <div className={` flex items-center ml-16 mb-32`}>
      <OpenNav/>
      <div className={`flex items-center justify-between w-full ml-auto mr-16 pt-2`}>
        {/* 导航链接 */}
          {
            toLink.map((item, index) => (
              <Link key={index} href={item.linkUrl} className={`font-normal p-2 text-base no-underline text-gray-500 hover:text-gray-900 `}>
                 {item.linkName}
              </Link>
            ))
          }
        {/* 切换主题模式 */}
        <Button
          shape="circle"
          icon={ themeMode === "light" ? <MoonOutlined/> : <SunOutlined/>}
          onClick={() => {
            setState((v) => {
              return { 
                ...v, 
                themeMode: v.themeMode === "light" ? "dark" : "light",
              }
            })
          }}
        />

      </div>
    </div>
  )
}
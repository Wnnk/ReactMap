import { Button } from 'antd';
import { RightOutlined  } from '@ant-design/icons';
import { useAppContext } from '@/app/AppContext';
export default function OpenNav() {
  const { 
    state: { displayNavigation },
    setState,
  } = useAppContext();
  return (
     <Button 
     type="primary" 
     icon={<RightOutlined />}
     shape="circle"
     className={`${displayNavigation ? 'hidden' : ''} fixed top-2 left-2`}
     onClick={() =>{
      setState((v) => {
       return {
        ...v,
        displayNavigation: true
       }
      })
     }}
    />
      
     

  )
}
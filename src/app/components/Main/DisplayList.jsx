import { Tabs,Card  } from 'antd';
const { Meta } = Card;
export const DisplayList = () => {
  const onChangeTab = (key) => {
    console.log(key); 
  }
  const tabs = [
    {
      key: '1',
      label: 'Map',
      children: <List />,
    },
    {
      key: '2',
      label: 'Table',
      children: <h2>Table</h2>,
    },
    {
      key: '3',
      label: 'Chart',
      children: <h2>Table</h2>,
    },
  ];
  return (
    <div className="w-full ">
      <div className="flex justify-center items-center flex-col">
        <h2 className="font-bold text-5xl">Display</h2>
        <div className='w-3/4'>
         <Tabs 
          defaultActiveKey='1'
          items={tabs}
          onChange={onChangeTab}
          size='large'
          centered
         />
        </div>
      </div>

    </div>
  )
}


const List = () => {
  const picList = [{imgUrl: 'https://via.placeholder.com/250', name: 'pic1',title: 'Europe Street beat',description:"www.instagram.com"},
  {imgUrl: 'https://via.placeholder.com/250', name: 'pic2',title: 'Europe Street beat',description:"www.tiktok.com"},
  {imgUrl: 'https://via.placeholder.com/250', name: 'pic3',title: 'Europe Street beat',description:"www.titter.com"},
  {imgUrl: 'https://via.placeholder.com/250', name: 'pic4',title: 'Europe Street beat',description:"www.youtube.com"},
  {imgUrl: 'https://via.placeholder.com/250', name: 'pic5',title: 'Europe Street beat',description:"www.github.com"}];
  return (
    <div className='grid grid-cols-3 gap-4  '>
      {
        picList.map((pic, index) => {
          return (
            <Card  
              key={index}
              style={{ width: 250,  }}
              cover={
                <>
                  <img src={`${pic.imgUrl}` } className='rounded-lg '/>
                  <h4 className='text-center text-lg opacity-0 absolute 
                  top-[30%] left-[50%] translate-x-[-50%] text-gray-50 group-hover:opacity-100
                  font-bold text-2xl
                  '>Business Startup</h4>
                </>

              }
              className='hover:-translate-y-2 hover:drop-shadow-2xl	filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15)) relative group'
            >
              <Meta title={pic.title} description={pic.description} />
            </Card>
            
          )
        })
      }
    </div>
  )
}
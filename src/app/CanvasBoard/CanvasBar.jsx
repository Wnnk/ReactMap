import {UndoOutlined, RedoOutlined, Divider  } from '@ant-design/icons';
export const CanvasBar = () => {

    const tools =[
        {name:'撤回',icon:<UndoOutlined />},
        {name:'重做',icon:<RedoOutlined />},
    ];
    const colors = [
        {name:'红色',color:'#FF0000'},
        {name:'绿色',color:'#00FF00'},
        {name:'蓝色',color:'#0000FF'},
        {name:'黄色',color:'#FFFF00'},
        {name:'紫色',color:'#FF00FF'},
        {name:'粉色',color:'#FFC0CB'},
        {name:'青色',color:'#00FFFF'},
        {name:'白色',color:'#FFFFFF'},
        {name:'黑色',color:'#000000'},
    ];

    return (
        <div className=" flex top-0 right-0  bg-gray-500 h-full w-1/4 flex-col rounded-md ">
            <div className="grow">
                <h4 className="mb-2 mt-1 ml-1 text-xl pl-4 border-l-2 border-t-0 border-r-0 border-b-0 border-solid border-blue-500">工具</h4>
                <div>
                    {
                        tools.map((tool, index) => {
                            return (
                                <div key={index} className='border-2 border-solid border-blue-500 inline-block'>
                                    <div className='flex items-center justify-center h-12 w-12'>
                                        {tool.icon}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className='grow'>
                <h4 className="mb-2 mt-1 ml-1 text-xl pl-4 border-l-2 border-t-0 border-r-0 border-b-0 border-solid border-blue-500">颜色</h4>
                <div>
                    {
                        colors.map((color, index) => {
                            return (
                                <div key={index} className='inline-block m-1'>
                                    <div className='rounded-full h-12 w-12' style={{backgroundColor:color.color}}></div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
};
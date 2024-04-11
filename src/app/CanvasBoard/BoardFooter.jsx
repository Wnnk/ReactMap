import {Tooltip } from 'antd';

export const BoardFooter = ({undo,clearCanvas,redo}) => {
    return (
      <div className="fixed bottom-5 left-2/4 -translate-x-2/4 
        flex items-center bg-[#eef1ff] rounded-full xs:flex-col
        xsLright-5 xs:left-auto xs:translate-x-0 xs:justify-normal 
        xs:max-h-[70vh] xs:overflow-y-auto xs:noScrollbar">

       
        <div className="min-xs:tooltip cursor-pointer py-1.5 pl-3 pr-2 
        rounded-l-full hover:bg-slate-200 xs:pl-2 xs:rounded-l-none xs:rounded-t-full"
          onClick={undo}
        >
          <Tooltip placement="top" title="撤销">
          <i className={`iconfont icon-chehui `} style={{fontSize:'26px',color:'#66cc8a'}}></i>
          </Tooltip>
        </div>
        <div className="min-xs:tooltip cursor-pointer py-1.5 pl-3 pr-2 
        rounded-l-full hover:bg-slate-200 xs:pl-2 
        xs:rounded-l-none xs:rounded-t-full"
          onClick={redo}
        >
          <Tooltip placement="top" title="重做">
            <i className="iconfont icon-zhongzuo" style={{fontSize:'26px',color:'#66cc8a'}}></i>
          </Tooltip>
        </div>
        <div className="min-xs:tooltip cursor-pointer py-1.5 pl-3 pr-2 
        rounded-l-full hover:bg-slate-200 xs:pl-2 
        xs:rounded-l-none xs:rounded-t-full"
          onClick={clearCanvas}
        >
          <Tooltip placement="top" title="刷新画板">
            <i className="iconfont icon-shuazi" style={{fontSize:'26px',color:'#66cc8a'}}></i>
          </Tooltip>
        </div>
        
        
        
      </div>
    )
};
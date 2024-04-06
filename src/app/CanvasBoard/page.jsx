'use client'
import { useEffect, useState, useRef } from "react"
export default function CanvasBoard () {
    /* camvas 栈 保存画布轨迹*/
    const [canvasStack, setCanvasStack] = useState([]);
    /* 画布对象大小 */
    const [canvasSize, setCanvasSize] = useState({width: 800, height: 800});
    const canvasRef = useRef(null);
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    

    const startDrawing = (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];
    };


    const draw = (e) => {
        if (!isDrawing) return;
        const ctx = canvasRef.current.getContext("2d");
        let rect = canvasRef.current.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        [lastX, lastY] = [x, y];
        ctx.closePath();
    };
    
    const endDrawing = (e) => {
        isDrawing = false;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.strokeStyle = "#000";
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.lineWidth = 0.2;
    },[]);

   
    return (
        <div className="w-full h-full w-min-[1000px] h-min-[1000px]">
            <div>
               <canvas  
                id="canvas" 
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={endDrawing}
                onMouseLeave={endDrawing}
                style={{width: canvasSize.width, height: canvasSize.height}}
                className="z-10 bg-gray-100 absolute top-0 left-0" 

                >
                    Your browser does not support the canvas element.
                </canvas> 
            </div>
            
        </div>
    )
}


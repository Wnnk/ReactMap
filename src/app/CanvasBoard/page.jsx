'use client'
import { useEffect, useRef  } from "react"
import {CanvasBar } from "./CanvasBar"
import { BoardFooter } from "./BoardFooter";


export default function CanvasBoard () {
    /* 画布 */
    const canvasEl = useRef(null);
    let ctx = useRef(null);
    let freeLine = {
        /* 历史记录，用于撤销与反撤销 */
        history: [],  //鼠标位置记录
        index: 0,  //历史记录索引
        /* 画笔样式相关 */
        color: "black", //画笔颜色
        lineWidth: 1, //最后画笔宽度
        clearWidth: 10, //清除宽度
        shadowBlur: 10, //阴影模糊度
        shadowColor: "rgba(0,0,0,0.8)", //阴影颜色
        /* 位置相关 */
        lastPoint: {x:0,y:0}, //上一次鼠标位置
        newPoint: {x:0,y:0}, //当前鼠标位置
        /* 画笔状态 */
        isClearing: false, //是否正在清除
        isDrawing: false, //是否正在绘画
        /* 画笔类型 */
        type: 'free', //作画类型
        /* 文本相关 */
        text: "", //文本内容
        textFont: "serif" ,//文本字体
        textSize: 16, //文本大小
        textColor: "black" //文本颜色
    }


    const mouseDown = (e) => {
        freeLine.isDrawing = true;
        const x = e.clientX; const y = e.clientY;
        freeLine.lastPoint = {x,y};
        if (freeLine.type !== 'text') {
            drawPoint(x,y,freeLine.lineWidth);
            return;
        } else if(freeLine.type === 'text') {
            drawText(x,y,freeLine.text);
            return;
        }     
    };

    const drawPoint = (x,y,radius) => {
        ctx.current.save();
        ctx.current.beginPath();
        ctx.current.arc(x,y,radius,0,Math.PI*2);
        ctx.current.fill();
    };

    /* 开始绘制 */
    const startDraw = (e) => {
        if(!freeLine.isDrawing) return;
        /* 获取当前鼠标位置 */
        const x = e.clientX; const y = e.clientY;
        freeLine.newPoint = {x,y};
        switch(freeLine.type) {
            case 'free':{
                drawFreeLine(freeLine.lastPoint.x,freeLine.lastPoint.y,freeLine.newPoint.x,freeLine.newPoint.y);
                freeLine.lastPoint = freeLine.newPoint;
                break;
            }
            case "rect": {
                drawRect(freeLine.lastPoint.x,freeLine.lastPoint.y,freeLine.newPoint.x,freeLine.newPoint.y);
                break;
            }
            case "circle": {
                drawCircle(freeLine.lastPoint.x,freeLine.lastPoint.y,freeLine.newPoint.x,freeLine.newPoint.y);
                break;
            }
            case "triangle": {
                drawTriangle(freeLine.lastPoint.x,freeLine.lastPoint.y,freeLine.newPoint.x,freeLine.newPoint.y);
                break;
            }
            // case "text": {
            //     drawText(freeLine.newPoint.x,freeLine.newPoint.y,freeLine.text);
            // }
        };
       
       
    };

    /* 绘制自由线 */
    const drawFreeLine = (x1,y1,x2,y2) => {
        ctx.current.strokeStyle = freeLine.color;
        ctx.current.lineCap = "round";
        ctx.current.lineJoin = "round";
        if(freeLine.isClearing){
            const temp = freeLine.lineWidth;
            ctx.current.lineWidth = freeLine.clearWidth;
            ctx.current.save();
            ctx.current.globalCompositeOperation = "destination-out";
            ctx.current.moveTo(x1,y1);
            ctx.current.lineTo(x2,y2);
            ctx.current.stroke();
            ctx.current.closePath();
            ctx.current.clip();
            ctx.current.clearRect(0,0,ctx.current.canvas.width,ctx.current.canvas.height);
            ctx.current.restore();
            ctx.current.lineWidth = temp;
        } else {
            ctx.current.lineWidth = freeLine.lineWidth;
            ctx.current.shadowBlur = freeLine.shadowBlur;
            ctx.current.shadowColor = freeLine.shadowColor;
            ctx.current.beginPath();
            ctx.current.moveTo(x1,y1);
            ctx.current.lineTo(x2,y2);
            ctx.current.stroke();
            ctx.current.closePath();
        }
    };

    /**
     * @description 画矩形框
     * @param {number} x1 原点x坐标
     * @param {number} y1 原点y坐标
     * @param {number} x2 当前鼠标x坐标
     * @param {number} y2 当前鼠标y坐标
     * @returns {void}
     **/ 

    const drawRect = (x1,y1,x2,y2) =>{
        /* 设计基本样式 */
        ctx.current.strokeStyle = freeLine.color;
        ctx.current.lineCap = "round";
        ctx.current.lineJoin = "round";
        const width = x2 - x1;
        const height = y2 - y1;
        /* 恢复未绘制前图像 */
        ctx.current.putImageData(freeLine.history[freeLine.history.length - 1],0,0);
        /* 绘制矩形框 */
        ctx.current.strokeRect(x1,y1,width,height);
        return;
    }

    /**
     * @description 画圆
     * @param {number} x1 圆心x坐标
     * @param {number} y1 圆心y坐标
     * @param {number} x2 鼠标x坐标
     * @param {number} y2 鼠标y坐标
     * @returns {void}
     */

    const drawCircle = (x1,y1,x2,y2) => {
        const radius = Math.hypot(x2-x1,y2-y1);
        ctx.current.putImageData(freeLine.history[freeLine.history.length - 1],0,0);
        ctx.current.beginPath();
        ctx.current.arc(x1, y1, radius, 0, 2 * Math.PI);
        ctx.current.stroke();
        return;
    };

    /**
     * @description 画三角形
     * @param {number} x1 鼠标按下时的x坐标
     * @param {number} y1 鼠标按下时的y坐标
     * @param {number} x2 三角形顶点x坐标
     * @param {number} y2 三角形顶点y坐标
     */

    const drawTriangle = (x1,y1,x2,y2) => {
        ctx.current.putImageData(freeLine.history[freeLine.history.length - 1],0,0);
        ctx.current.beginPath();
        ctx.current.moveTo(x1,y1);
        ctx.current.lineTo(x2,y1);
        ctx.current.lineTo((x1+x2) / 2, y2);
        ctx.current.lineTo(x1,y1);
        ctx.current.stroke();
        ctx.current.closePath();
        return;

    };

    /**
     * @description 绘制文本预览
     * @param {number} x 文本x坐标
     * @param {number} y 文本y坐标
     * @param {string} text 文本内容
     * @returns {void}
     **/
    
    const drawText = (x,y,text) => {
        /* 拼接文本大小和字体 */
        const font = freeLine.textSize + "px" + " " + freeLine.textFont;
        console.log(font);
        ctx.current.font = font;
        ctx.current.fillStyle = freeLine.textColor;
        ctx.current.textAlign = "center";
        ctx.current.fillText(text,x,y);
        return;
    };

    /* 保存历史 */
    const saveHistory = (data) => {
        /* 回撤时添加画布数据，删除临时数据 */
        if (freeLine.index !== freeLine.history.length - 1) {
            freeLine.history.length = freeLine.index + 1;
        }
        if(freeLine.history.length >= 10) {
            freeLine.history.shift();
        }
        freeLine.history.push(data);
        /* 更新index到最新 */
        freeLine.index = freeLine.history.length - 1;
    };

    /* 撤回 */
    const undo = () => {
        if (freeLine.index > 0) {
            /* 绘制保存会导致当前画布和历史最新画布一致，需要回撤时减1 */
            if (freeLine.index === freeLine.history.length - 1) {
                freeLine.index--;
            }
            freeLine.index--;
            ctx.current.putImageData(freeLine.history[freeLine.index],0,0);
        }

    };
    /**
     * @description 重做
     * @returns {void}
     **/
    const redo = () => {
        if (freeLine.index < freeLine.history.length - 1)  {
            freeLine.index++;
            ctx.current.putImageData(freeLine.history[freeLine.index],0,0);
        }
    };


    /* 画笔宽度调整 */
    const changeFreeLine = (prop,value) => {
        if(freeLine.hasOwnProperty(prop)) {
            freeLine[prop] = value;
        }
    };

    /** 
     * @description 清空画布
     */
    const clearCanvas = () => {
        ctx.current.clearRect(0,0,ctx.current.canvas.width,ctx.current.canvas.height);
        freeLine.history = [];
    };


    /** 
     * @description 鼠标抬起或离开结束作画
     * @returns {void}
    **/
    const mouseUp = () => {
        freeLine.isDrawing = false;
        const data = ctx.current.getImageData(0,0,ctx.current.canvas.width,ctx.current.canvas.height);
        saveHistory(data);
        return;
    };



    useEffect(() => {
        //初始化画布
        const canvas = canvasEl.current;
        if (canvas) {
            let el = canvasEl.current.getContext("2d");
            ctx.current = el;
        }

        /* 保存空白画布 */
        const data = ctx.current.getImageData(0,0,ctx.current.canvas.width,ctx.current.canvas.height);
        saveHistory(data);
       
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        return () => {
            window.removeEventListener("resize", resizeCanvas);
        }
    }, [])
    return (
        <>
        <canvas  
        id="canvas" 
        ref={canvasEl}
        onMouseDown={(e) => mouseDown(e)}
        onMouseMove={startDraw}
        onMouseUp={mouseUp}
        onMouseLeave={mouseUp}
        className="z-1 bg-gray-100 absolute top-0 left-0" 

        >
            Your browser does not support the canvas element.
        </canvas>

            <CanvasBar  
                changeFreeLine={changeFreeLine}
            />

            <BoardFooter undo={undo} clearCanvas={clearCanvas} redo={redo}/>

       
        </>
    )


}



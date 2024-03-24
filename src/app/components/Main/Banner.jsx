import { useState, useEffect } from "react"
import { Button } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";
export default function Banner() {
  const [loopNum, setLoopNum ] = useState(0);
  const [isDeletingText, setIsDeletingText ] = useState(false);
  const [text, setText ] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const writeTextArr = ['Lets,Go to a new Place', 'Discover new places','Explore the world']
  const period = 3000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    },delta);
    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % writeTextArr.length;
    let fullText = writeTextArr[i];
    let updatedText = isDeletingText? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);
    setText(updatedText);

    if(isDeletingText) {
      setDelta(prevDelta => prevDelta  / 2)
    }
    if(!isDeletingText && updatedText === fullText) {
      setIsDeletingText(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if(isDeletingText && updatedText === ""){
      setIsDeletingText(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500)
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }
  return (
    <div className="flex items-center justify-center min-w-full ">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 ">Welcome to ReactMap,
          <span className="border-r-6 border-b-0 border-l-0 border-t-0 border-[#666] border-solid ">{text}</span>
        </h1>
        <strong className="">
          Let’s Connect 
          <Button type="circle" size="large" icon={<RightCircleOutlined />} className="hover:translate-x-3"/>
        </strong>
      </div>
      
    </div>
  )
}
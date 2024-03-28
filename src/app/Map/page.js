"use client"
import AMapLoader from '@amap/amap-jsapi-loader';
import { useAppContext } from "../AppContext"
import { MapNav } from "./MapNav";
import { useState, useEffect, useReducer, useRef  } from "react";
import { Weather } from "./Weather";
import toolsReducer from './toolsReducer';

export default function Map() {
  /* 主题 */
  const { state: {themeMode}, setState } = useAppContext();
  /* 天气结果 */
  const [showWeatherResult, setShowWeatherResult] = useState();
  /* 关闭天气Card */
  const [closeWeatherHook, setCloseWeatherHook] = useState(false);
  /* 地图 */
  const mapContainerRef = useRef(null);
  const panelRef = useRef(null);
  const mapRef = useRef(null);
  const drivingRef = useRef(null);
 

  

  /* 地图初始化定位 */
  const getUserlocation = (AMap) => {
    const geolocation = new AMap.Geolocation({
      enableHighAccuracy: true, // 是否使用高精度定位，默认:true
      timeout: 10000, // 超过10秒后停止定位，默认：无穷大
      position: "LB",
      offset: [10, 20],
      zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    });
    mapRef.current.addControl(geolocation);
    geolocation.getCurrentPosition(function (status, result) {
      if (status === 'complete') {
        onComplete(result);
      } else {
        onError(result);
      }
    });  
  }
  /* 定位成功回调 */
  function onComplete(data) {
    console.log("定位成功:", data);
    
  }
  /* 定位失败回调 */
  function onError(data) {
    console.log("定位失败", data);
    // 定位出错
  }
  

  /* 城市天气查询 */
  const getCityWeather = (AMap,map) => {
    const citySearch = new AMap.CitySearch();
    citySearch.getLocalCity(function(
      status, //状态
      result //结果
    ){
      if (status === 'complete' && result.info === 'OK') {
        /* 获取当前城市 */
        const city = result.city;
        /* 获取当前城市的天气信息 */
        getWeather(AMap,map,city);
      }
    })
  }
  /* 实时天气查询 */
  const getWeather = (AMap,map,city) => {
    const weather = new AMap.Weather();
    weather.getLive( city, function(err, data){
      if (!err) {
        console.log(data);
        /* 显示天气结果 */
        setCloseWeatherHook(false);
        setShowWeatherResult(data)
      } else{
        console.log(err);
      }
    })
  }
  /* 显示天气Card */
  const showWeatherHook = (data) => {
    return <Weather 
      city={data.city} 
      weather={data.weather} 
      windPower={data.windPower} 
      windDirection={data.windDirection}
      setCloseWeatherHook = {setCloseWeatherHook} 
    />
  }

  /* ****************************路径规划*************************************** */
  /* 初始化state */
  const initialState = {
    startPoint: null,
    endPoint: null,
    travelMode: 'DRIVING',
    mapType: 'ROADMAP'
  };
  const [state, dispatch] = useReducer(toolsReducer, initialState);
  /* 选择出行方式 */
  const handleTravelModeChange = (e) => {
    dispatch({ type: 'SET_TRAVEL_MODE', payload: e.target.value });
  };
  /* 起点 */
  const handleStartPointChange = (e) => {
    dispatch({ type: 'SET_START_POINT', payload: e.target.value });
  };
  /* 终点 */
  const handleEndPointChange = (e) => {
    dispatch({ type: 'SET_END_POINT', payload: e.target.value });
  };

  /* 提交规划表单 */
  const handleSubmit = () => {
    if (!state.startPoint ||!state.endPoint) {
      messageApi.open({
        type: 'error',
        content: '起点或终点不能为空',
      });
    return;
    }
    switch (state.travelMode) {
      case 'DRIVING':{
        driving(mapRef.current);
        break;
      }
      case 'WALKING':{
        console.log('步行出行');
        break;
      }
      case 'BICYCLING':{
        console.log('骑行出行');
        break;
      }
      case 'TRANSFER':{
        console.log('公交出行');
        break;
      }
      default: break;
    }
  }

  const driving =  () => {
    if (!drivingRef.current) {
        drivingRef.current = new AMap.Driving({
        map: mapRef.current,
        panel: panelRef.current,
        autoFitView: true,
      });
    }
    drivingRef.current.search([{keyword: state.startPoint, city: '全国'}, {keyword: state.endPoint, city:'全国'}], (status, result) => {
      if (status === 'complete' && result.info === 'OK') {
        console.log(result);
      } else {
        console.log(status);
      }
    });
  };



  window._AMapSecurityConfig = {
    securityJsCode: "8354e71f73abf634688a42c35b800e0d",
  };
  

  useEffect(() => {
    AMapLoader.load({
      key: 'aa6c92a807de065ca1e75689bdbafc07',
      version: '2.0',
      plugins: ['AMap.Geocoder', 'AMap.PlaceSearch',  'AMap.ToolBar', 
      'AMap.Driving', "AMap.Weather","AMap.Geolocation","AMap.CitySearch"],
     
    })
    .then((AMap) => {
      const map = new AMap.Map(mapContainerRef.current);
      let toolbar = new AMap.ToolBar();
      /* 设置地图实例 */
      mapRef.current = map;
      /* 添加工具条 */
      mapRef.current.addControl(toolbar);
      /* 地图初始化定位 */
      getUserlocation(AMap);
      /* 实时天气查询 */
      getCityWeather(AMap,mapRef.current);
      
    })
    .catch((e) => {
      console.log(e);
    });
    return () => {
      if (mapRef.current){
        mapRef.current.destroy();
      }
      
    };
  }, []);


  return (
    <div className={`${themeMode} w-full h-full grounded-lg flex`}>
      {
        showWeatherResult && !closeWeatherHook ? showWeatherHook(showWeatherResult) : null
      }
      <div className="pr-2">
        <MapNav 
          getWeather={getWeather} 
          map={mapRef.current}
          handleTravelModeChange={handleTravelModeChange}
          handleStartPointChange={handleStartPointChange}
          handleEndPointChange={handleEndPointChange}
          handleSubmit={handleSubmit}
          state={state}
          dispatch={dispatch}
        />
      </div>
      <div className="dark:bg-gray-800 dark:text-gray-100 w-full h-full bg-gray-100 flex-1">
      <div id="container"  ref={mapContainerRef}  className='w-full h-full'></div>
      <div id="panel"></div>
      </div>
    </div>
  )
}
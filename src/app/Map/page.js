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
  const planRouteRef = useRef(null);
  const curentCity = useRef(null);
 

  

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
        curentCity.current = city;
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
    removePlanRoute(state.travelMode);
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

  /* 清除路径规划 */
  const removePlanRoute = (mode) => {
    if (planRouteRef.current) {
      planRouteRef.current.clear();
    }
    planRouteRef.current = null;
  };

  /* 提交规划表单 */
  const handleSubmit =  async () => {
    if (!state.startPoint ||!state.endPoint) {
      messageApi.open({
        type: 'error',
        content: '起点或终点不能为空',
      });
    return;
    };
    /* 地点转换经纬度 */
    const lnglatStart = await getLongitube(state.startPoint);
    const lnglatEnd = await getLongitube(state.endPoint);
    
    planRoute(mapRef.current, lnglatStart, lnglatEnd, state.travelMode,panelRef.current,curentCity.current);
  }

  const getLongitube =  (place) => {
    return new Promise((resolve, reject) => {
      let geocoder = new AMap.Geocoder({
        city:'全国'
      });
      geocoder.getLocation(place, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
          const lnglat = result.geocodes[0].location;
          resolve(lnglat);
        } else {
          reject(new Error('获取经纬度失败'));
        }
      });
    });
  };



  /* 出行规划 */
  const planRoute = (map, start, end, mode,panel,city) => {
    const options = {
      map,
      panel,
      autoFitView:true,
      policy: 0, // 0：速度优先
    }

    const transferOptions = {
      map,
      city,
      nightflag:1,
      autoFitView:true,
      policy: AMap.TransferPolicy.LEAST_TIME,
      panel,
    };
    
    if (!planRouteRef.current) {
      switch (mode) {
        case 'Driving':{
          planRouteRef.current = new AMap.Driving(options);
          break;
        }
        case 'Walking':{
          planRouteRef.current = new AMap.Walking(options);
          break;
        }
        case 'Riding':{
          planRouteRef.current = new AMap.Riding(options);
          break;
        }
        case 'Transfer':{
          planRouteRef.current = new AMap.Transfer(transferOptions);
          break;
        }
      }
    }

    planRouteRef.current.search([start.lng, start.lat], [end.lng, end.lat], function(status, result) {
      if (status === 'complete') {
      }else {
        console.log(status);
      }
    })
  };


  useEffect(() => {
    if (typeof window !== 'undefined') {
      window._AMapSecurityConfig = {
        securityJsCode: "8354e71f73abf634688a42c35b800e0d",
      };
    }
    AMapLoader.load({
      key: 'aa6c92a807de065ca1e75689bdbafc07',
      version: '2.0',
      plugins: ['AMap.Geocoder', 'AMap.PlaceSearch',  'AMap.ToolBar', 
      'AMap.Driving',"AMap.Walking", "AMap.Weather","AMap.Transfer","AMap.Riding","AMap.Geolocation","AMap.CitySearch"],
     
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
      <div id="panel" ref={panelRef} className="absolute top-0 right-0 z-10   w-[200px]   overflow-y-scroll"></div>
      
      </div>
    </div>
  )
}
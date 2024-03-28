export default function toolsReducer(state, action) {
  switch (action.type) {
    case 'SET_START_POINT': {
      return {
        ...state,
        startPoint: action.payload
      };
    }
    case 'SET_END_POINT': {
      return {
        ...state,
        endPoint: action.payload
      };
    }
    case 'SET_TRAVEL_MODE': {
      return {
        ...state,
        travelMode: action.payload
      };
    }
    case 'SET_MAP_TYPE': {
      return {
        ...state,
        mapType: action.payload
      };
    }
    default:
      return state;
  }
}


import { ADD_ROOMS_A, ADD_ROOMS_U, FAV_ROOMS } from '../actions/types';
import { phoneRoomMockData } from "../mockdata";

const initialState = {
    mockData: phoneRoomMockData,
    phoneRoomsAvailable: [],
    phoneRoomsUnavailable: [],
    favRooms: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ROOMS_A:
            // console.log('line 12 rooms reducer - ADD_ROOMS_A: ', action.payload.item)
            return {
                ...state,
                phoneRoomsAvailable: action.payload.item
            }
        case ADD_ROOMS_U:
            // console.log('line 20 rooms reducer - ADD_ROOMS_U: ', action.payload.item)
            return {
                ...state,
                phoneRoomsUnavailable: action.payload.item
            }
        case FAV_ROOMS:
            // console.log('line 28 rooms reducer - FAV_ROOM: ', action.payload)
            // logic for avoiding double room adding
            // it is already added
            if (!state.favRooms.some(alreadyFavorite => alreadyFavorite.id == action.payload.item.id)) {
                // console.log('line 34 rooms reducer - FAV_ROOM')
                return {
                    ...state,
                    favRooms: state.favRooms.concat(action.payload.item).map((item, index) => {
                        if (item.id === action.payload.item.id) {
                            // console.log('line 49: rooms reducer - FAV_ROOMS', item)
                            return {
                                ...item,
                                favorite: !item.favorite,
                            }
                        }
                        return item
                    }),
                    mockData: state.mockData.filter(x => {
                        return x.id !== action.payload.item.id
                    })
                }
            } else {
                // console.log('line 64: hello world else statmenet')
                return {
                    mockData: state.mockData.concat(action.payload.item).map((item, index) => {
                        if (item.id === action.payload.item.id) {
                            // console.log('line 68: else statement true to false')
                            return {
                                ...item,
                                favorite: !item.favorite,
                            }
                        }
                        return item
                    }),
                    favRooms: state.favRooms.filter(x => {
                        return x.id !== action.payload.item.id
                    })
                }
            }
        default:
            return state;
    }
};

export default reducer
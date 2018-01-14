/**
 * Created by liao on 2017/12/14.
 */
import {createStore,combineReducers} from 'redux'
import {usermodel,cart_num,cart,goodslist,vip,car,progress} from "./reducer/IndexModel"
const rootreducer=combineReducers({
    usermodel, //把所有的reducer添加进来
    cart_num,
    cart,
    goodslist,
    vip,
    car,
    progress
})
const store=createStore(rootreducer);
export default store
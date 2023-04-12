import React from "react";
import "../PublicPage.css";
import {useSelector , useDispatch} from 'react-redux'
import _ from 'lodash'
import { toast } from "react-toastify";

const Card_Home = ({item}) => {

  const dispatch = useDispatch()
  
  const handleAddtocart = () =>{
    //console.log('Add to cart')
    // เช็คด้วยว่าเพิ่มแล้วจะไม่  toast -------------------
    toast.success('เพิ่มลงตะกร้า '+item.title+' เรียบร้อย')
    let cart = []
    if(localStorage.getItem('cart')){
      cart = JSON.parse(localStorage.getItem('cart'))
    }
    cart.push({
      ...item,
      count:1
    })
    let unique = _.unionWith(cart,_.isEqual)
    localStorage.setItem("cart",JSON.stringify(unique))

    dispatch({
      type:"ADD_TO_CART",
      payload:unique
    })
  }
// console.log(item.images[0])

  return (

      <a className="col-md-4 mt-2">
        <div
          id="addtocart"
          onClick={handleAddtocart}
          className="card card_shadow p-1"
        >
          <div id="badge_card" className="position-absolute top-0 start-0">
            <p className="mt-3 "> {item.amount} ใบ</p>
          </div>
          {item.images.length == 0
          ? <div>
            <p className="text-center text-danger">ผิดพลาด!!! ไม่มีรูปภาพ</p>
            <p className="text-center text-danger">{item.title}</p>
          </div>
        : <img className="" src={item.images[0].url} />
        }
          {/* <img className="" src={item.images[0].url} /> */}
          <h4 className="text-center mt-1 text-white">
            <i className="bi bi-cart3"></i>
          </h4>
        </div>
      </a>

  );
};

export default Card_Home;

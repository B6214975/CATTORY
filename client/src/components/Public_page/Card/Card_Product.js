import React from "react";
import {useSelector , useDispatch} from 'react-redux'
import _ from 'lodash'
import "../PublicPage.css";
import { toast } from "react-toastify";

const Card_Product = ({item}) => {
  const dispatch = useDispatch()

  const handleAddtocart = () =>{
    // console.log('Add to cart',item.title)
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

  return (
    <a className="col-md-4 mt-2">
            <div
              id="addtocart"
              onClick={handleAddtocart}
              className="card card_shadow p-1"
            >
              <div id="badge_card"
               className="position-absolute top-0 start-0">
                <p className="mt-3 "> {item.amount} ใบ</p>
              </div>

              <img className="" src={item.images[0].url} />
              <h4 className="text-center mt-1 text-white">
                <i className="bi bi-cart3"></i>
              </h4>
            </div>
          </a>
  );
};

export default Card_Product;

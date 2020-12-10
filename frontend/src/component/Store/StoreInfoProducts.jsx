import React from 'react'
import { message,Card,Button,Image,Empty } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Cookie from "js-cookie";

const StoreInfoProducts = ({PinSInfo,userInfo,getStore,setProductInfo,setProductName,addtocartact,dispatch,loader}) => {

    return (
        <div className="ProductList">
 {PinSInfo?.length < 1 ?<Empty description={'Products unavailable'} /> :PinSInfo?.map(item=>{
                const handleAdd=()=>{
                    const token=userInfo?.token
                    const productId=item._id
                    const name=item.productName
                            dispatch(addtocartact(productId,token,message,name))   
                }
               return(
                   <div className="Products" key={item._id} >
                       <Card
    hoverable
     cover={<Image src={item.image} alt="my garage"  height={250} width={250} />}
  >
               <h2>{item.productName}</h2>
               <p>${item.price}</p>
              
               {userInfo?._id !==getStore?.sellerName._id &&<Button onClick={handleAdd} ><ShoppingCartOutlined />{loader ? "Adding..":"Add to cart"}</Button>}
               <h3 onClick={()=>{ Cookie.set('_pductFam',item._id)
    setProductInfo(true)
    setProductName(item.productName)}} className='product__clicked'>View More Info</h3>
  </Card>
                   </div>
               )
           })}
        </div>
    )
}

export default StoreInfoProducts

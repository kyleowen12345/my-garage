import React,{useState} from 'react'
import { message,Card,Button,Image,Empty,Pagination } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Cookie from "js-cookie";


const StoreInfoProducts = ({PinSInfo,userInfo,getStore,setProductInfo,setProductName,addtocartact,dispatch,loader}) => {
    const [minValue,setMinValue]=useState(0)
    const [maxValue,setMaxValue]=useState(3)
    // Card
const numEachPage=3
const handleChange = (item) => {
	setMinValue((item-1)*numEachPage)
    setMaxValue(item * numEachPage)
    window.scrollTo(0, 500);
  };
    return (
        <>
        <div className="ProductList">
 {PinSInfo?.length < 1 ?<Empty description={'Products unavailable'} /> :PinSInfo && PinSInfo?.length >0 && PinSInfo?.slice(minValue,maxValue).map(item=>{
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
              
               {userInfo?._id !==getStore?.sellerName._id &&<Button onClick={handleAdd} disabled={loader} ><ShoppingCartOutlined />{loader ? "Adding..":"Add to cart"}</Button>}
               <h4 onClick={()=>{ Cookie.set('_pductFam',item._id)
    setProductInfo(true)
    setProductName(item.productName)}} className='product__clicked'>View More Info</h4>
  </Card>
                   </div>
               )
           })}
        </div>
        {PinSInfo && <Pagination
		total={PinSInfo?.length}
		showTotal={total => `Total ${total} Products`}
				  defaultCurrent={1}
				  size="small"
				  defaultPageSize={numEachPage} //default size of page
				  onChange={handleChange}
				  responsive={true}
      showQuickJumper
				  style={{display:'flex',justifyContent:'center', margin:30}}
				/>}
        </>
    )
}

export default StoreInfoProducts

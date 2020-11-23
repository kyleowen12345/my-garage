import React from 'react'
import {Card, Skeleton } from 'antd';
const StoreInfoLoad = () => {
    return (
       <div className="Store__info">
           <div className="Store__fulldetails">
                <Skeleton.Image  />
                <br/>
                <div className="Store__details">
                <Skeleton.Input style={{ width: 200 }} active size={'default'} />
           
                <Skeleton.Input style={{ width: 200 }} active size={'default'} />
                
                <Skeleton.Input style={{ width: 200 }} active ssize={'default'} />
                
                <Skeleton.Input style={{ width: 200 }} active size={'default'} />
                
                <Skeleton.Input style={{ width: 200 }} active size={'default'} />
                
                <Skeleton.Input style={{ width: 200 }} active size={'default'} />
                </div>
                
                <div className="ProductList">
                    <div className="Products">
                    <Card    hoverable={true} bodyStyle={{display:'flex', flexDirection:'column',alignItems:'center'}}  cover={<Skeleton.Image />}>
                <Skeleton.Input style={{ width: 100 }} active size={'default'} />
            </Card>
            </div>
            <div className="Products">
            <Card    hoverable={true} bodyStyle={{display:'flex', flexDirection:'column',alignItems:'center'}}  cover={<Skeleton.Image />}>
                <Skeleton.Input style={{ width: 100 }} active size={'default'} />
            </Card>
            </div>
            <div className="Products">
            <Card    hoverable={true} bodyStyle={{display:'flex', flexDirection:'column',alignItems:'center'}}  cover={<Skeleton.Image />}>
                <Skeleton.Input style={{ width: 100 }} active size={'default'} />
            </Card>
            </div>
            <div className="Products">
            <Card    hoverable={true} bodyStyle={{display:'flex', flexDirection:'column',alignItems:'center'}}  cover={<Skeleton.Image />}>
                <Skeleton.Input style={{ width: 100 }} active size={'default'} />
            </Card>
                    </div>
                </div>
           </div>
       </div>

    )
}

export default StoreInfoLoad

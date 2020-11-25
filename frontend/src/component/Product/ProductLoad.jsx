import React from 'react'
import { Skeleton } from 'antd';

const ProductLoad = () => {
    return (
        <div className="ProductInfo">
            <Skeleton.Image  />
            <Skeleton.Input style={{ width: 250 }} active size={'default'} />
           
                <Skeleton.Input style={{ width: 250 }} active size={'default'} />
                
                <Skeleton.Input style={{ width: 250 }} active ssize={'default'} />
                
                <Skeleton.Input style={{ width: 250 }} active size={'default'} />
                
                <Skeleton.Input style={{ width: 250 }} active size={'default'} />
                
                <Skeleton.Input style={{ width: 250 }} active size={'default'} />
        </div>
    )
}

export default ProductLoad

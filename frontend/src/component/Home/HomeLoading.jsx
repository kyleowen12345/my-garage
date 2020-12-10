import React from 'react'
import {Card,Skeleton } from 'antd';

const HomeLoading = () => {
    return (
        <div className="home">
            <Card  hoverable={true} bodyStyle={{display:'flex', flexDirection:'column',alignItems:'center'}}  cover={<Skeleton.Image />}>
            <Skeleton.Input style={{ width: 150 }} active size={'default'} />
            </Card>
            <Card   hoverable={true} bodyStyle={{display:'flex', flexDirection:'column',alignItems:'center'}}  cover={<Skeleton.Image />}>
            <Skeleton.Input style={{ width: 150 }} active size={'default'} />
            </Card>
            <Card    hoverable={true} bodyStyle={{display:'flex', flexDirection:'column',alignItems:'center'}}  cover={<Skeleton.Image />}>
            <Skeleton.Input style={{ width: 150 }} active size={'default'} />
            </Card>
            <Card    hoverable={true} bodyStyle={{display:'flex', flexDirection:'column',alignItems:'center'}}  cover={<Skeleton.Image />}>
            <Skeleton.Input style={{ width: 150 }} active size={'default'} />
            </Card>
            <Card    hoverable={true} bodyStyle={{display:'flex', flexDirection:'column',alignItems:'center'}}  cover={<Skeleton.Image />}>
            <Skeleton.Input style={{ width: 150 }} active size={'default'} />
            </Card>
            <Card    hoverable={true} bodyStyle={{display:'flex', flexDirection:'column',alignItems:'center'}}  cover={<Skeleton.Image />}>
            <Skeleton.Input style={{ width: 150 }} active size={'default'} />
            </Card>
        </div>
    )
}

export default HomeLoading

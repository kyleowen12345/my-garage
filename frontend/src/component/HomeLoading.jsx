import React from 'react'
import {Card,Skeleton } from 'antd';

const HomeLoading = () => {
    return (
        <div className="home">
            <Card style={{ width: 300 ,border:'1px solid lightgray'}}   hoverable={true} bodyStyle={{display:'flex', flexDirection:'column',alignItems:'center'}}  cover={<Skeleton.Image />}>
            <Skeleton loading avatar active/>
            </Card>
            <Card style={{ width: 300 ,border:'1px solid lightgray'}}   hoverable={true} bodyStyle={{display:'flex', flexDirection:'column',alignItems:'center'}}  cover={<Skeleton.Image />}>
            <Skeleton loading avatar active/>
            </Card>
            <Card style={{ width: 300 ,border:'1px solid lightgray'}}   hoverable={true} bodyStyle={{display:'flex', flexDirection:'column',alignItems:'center'}}  cover={<Skeleton.Image />}>
            <Skeleton loading avatar active/>
            </Card>
            <Card style={{ width: 300 ,border:'1px solid lightgray'}}   hoverable={true} bodyStyle={{display:'flex', flexDirection:'column',alignItems:'center'}}  cover={<Skeleton.Image />}>
            <Skeleton loading avatar active/>
            </Card>
            <Card style={{ width: 300 ,border:'1px solid lightgray'}}   hoverable={true} bodyStyle={{display:'flex', flexDirection:'column',alignItems:'center'}}  cover={<Skeleton.Image />}>
            <Skeleton loading avatar active/>
            </Card>
            <Card style={{ width: 300 ,border:'1px solid lightgray'}}   hoverable={true} bodyStyle={{display:'flex', flexDirection:'column',alignItems:'center'}}  cover={<Skeleton.Image />}>
            <Skeleton loading avatar active/>
            </Card>
        </div>
    )
}

export default HomeLoading

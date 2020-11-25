import React from 'react'
import { Skeleton } from 'antd';
const ProfileLoad = () => {
    return (
        <div className="ProfileLoad">
            <Skeleton.Image  />
            <div className="Info">
            <Skeleton.Input style={{ width: 250, marginBottom:20 }} active size={'default'} />
           <Skeleton.Input style={{ width: 250, marginBottom:20 }} active size={'default'} />
           <Skeleton.Input style={{ width: 250, marginBottom:20 }} active ssize={'default'} /> 
           <Skeleton.Input style={{ width: 250, marginBottom:20 }} active size={'default'} />
            </div>
            
        </div>
    )
}

export default ProfileLoad

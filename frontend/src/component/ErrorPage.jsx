import React from 'react'
import {FileExclamationOutlined } from '@ant-design/icons';

const ErrorPage = () => {
    return (
        <div className="Error__page">
           <h2>Something went wrong</h2> 
           <FileExclamationOutlined />
           <p>Please Check your Internet Connection and Reload the page</p>
        </div>
    )
}

export default ErrorPage

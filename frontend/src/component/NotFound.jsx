import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="notFound">
<h1>404 Page NotFound</h1>
<Link to="/">Go Back Home</Link>
        </div>
        
    )
}

export default NotFound

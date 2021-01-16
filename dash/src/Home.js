import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            HOME Comp
            <Link to="/admin/arduino/module/2222222">Go to module</Link>
        </div>
    )
}

export default Home

import React from 'react'
import { Link } from 'react-router-dom'
const Module = (props) => {
    console.log("IDDD - ", props.match.params.id)
    console.log("TYPEE", props.match.params.type)
    return (
        <div>
            Module comp
            <Link to="/admin">
                GO to Home
            </Link>
        </div>
    )
}

export default Module

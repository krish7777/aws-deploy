import React from 'react'
import { Link } from 'react-router-dom'
const Module = () => {
    console.log("IDDD - ", this.props.match.params.id)
    console.log("TYPEE", this.props.match.params.type)
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

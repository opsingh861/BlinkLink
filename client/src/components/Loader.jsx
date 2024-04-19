import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

const Loader = () => {
    return (
        <RotatingLines
            visible={true}
            height="96"
            width="96"
            strokeColor="#4169E1"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    )
}

export default Loader
import React from 'react'

const SuperBigHeadline = ({ children }) => {
    return (
            <span style={{
            fontSize: "200px"
        }}>
            {children}
        </span>
       
    )
}

export default SuperBigHeadline
import React from 'react'

const Dog = ({imageSrc}) => {

    return (
    <>
    {
        imageSrc &&
        <img src={imageSrc} alt="Doggo" style={{width:400}} />
    }    
    </>
    )
}

export default Dog

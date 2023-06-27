import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const ScrollButton = () => {

    const handleClick = () => {
        window.scrollTo(0, 0);
    }

    return (
        <div onClick={handleClick} className='position-fixed d-inline-flex align-items-center justify-content-center bg-green rounded-circle back-to-top' style={{ bottom: "3%", height: "45px", width: "45px", cursor: "pointer" }}>
            <FontAwesomeIcon icon={faArrowUp} />
        </div>
    )
}

export default ScrollButton
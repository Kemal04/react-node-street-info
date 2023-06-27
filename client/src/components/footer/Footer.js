import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='py-3 text-center bg-green text-white'>
            © 2023
            <Link to="https://it.net.tm/" target="_blank" className='link-underline'> Sanly Çözgüt IT meýdança</Link>.
            Ähli hukuklar goragly.
        </div>
    )
}

export default Footer
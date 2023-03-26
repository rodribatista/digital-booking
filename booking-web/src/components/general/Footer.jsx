import React from 'react'
import { Link } from 'react-router-dom'

import facebook from '../../assets/icons/social_fb.svg'
import instagram from '../../assets/icons/social_ig.svg'
import twitter from '../../assets/icons/social_tw.svg'
import linkedin from '../../assets/icons/social_lk.svg'

import '../../styles/footer.css'

const Footer = () => {
  return (
    <footer>
      <p>©2023 Digital Booking</p>
      <div className='socials onTablet onDesktop'>
        <Link to='/'>
          <img src={facebook} alt="" />
        </Link>
        <Link to='/'>
          <img src={instagram} alt="" />
        </Link>
        <Link to='/'>
          <img src={twitter} alt="" />
        </Link>
        <Link to='/'>
          <img src={linkedin} alt="" />
        </Link>
      </div>
    </footer>
  )
}

export default Footer
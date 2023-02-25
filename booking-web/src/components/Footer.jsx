import React from 'react'
import { Link } from 'react-router-dom'

import icon_fb from '../assets/icons/icon-fb.svg'
import icon_ig from '../assets/icons/icon-ig.svg'
import icon_tw from '../assets/icons/icon-tw.svg'
import icon_lk from '../assets/icons/icon-lk.svg'

import '../styles/footer.css'

const Footer = () => {
  return (
    <footer>
      <p>©2023 Digital Booking</p>
      <div className='socials'>
        <Link to='/'>
          <img src={icon_fb} alt="" />
        </Link>
        <Link to='/'>
          <img src={icon_ig} alt="" />
        </Link>
        <Link to='/'>
          <img src={icon_tw} alt="" />
        </Link>
        <Link to='/'>
          <img src={icon_lk} alt="" />
        </Link>
      </div>
    </footer>
  )
}

export default Footer
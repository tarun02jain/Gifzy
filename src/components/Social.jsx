import React from 'react'
import { FaInstagram } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'

const Social = () => {
  return (
    <div className='faded-text pt-2'>
      <span>
        Contact on:
      </span>
      <div className='flex gap-4 pt-3'>
        <a href="mailto:jaintarun2202@gmail.com?subject=Hey%20from%20Giphy!">
          <SiGmail />
        </a>
        <a href="https://www.instagram.com/tarun_02jain/?hl=en" target='_blank'>
          <FaInstagram />
        </a>
      </div>
    </div>
  )
}

export default Social
import React from 'react'

import '../../styles/categoryCard.css'
import '../../styles/skeleton.css'

const SkeletonCategory = () => {
  return (
    <div className='categoryCard blink-1'
      style={{
        width: '100%'
        
      }}>
      <div
        style={{
          width: '100%',
          height: '150px',
          backgroundColor: '#f0f0f0',
        }}>
      </div>
      <div style={{
        height: '50px',
        gap: '10px',
      }}>
        <div
          style={{
            width: '60%',
            height: '70%',
            backgroundColor: '#f0f0f0',
            borderRadius: '5px'
          }}>
        </div>
        <div
          style={{
            width: '40%',
            height: '30%',
            backgroundColor: '#f0f0f0',
            borderRadius: '5px'
          }}>
        </div>
      </div>
    </div>
  )
}

export default SkeletonCategory
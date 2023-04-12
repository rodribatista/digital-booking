import React from 'react'

import '../../styles/productCard.css'

const SkeletonProductCard = () => {
  return (
    <div className='productCard blink-1'>
      <div className='productCardImage'>
        <div
          style={{
            minHeight: '200px',
            height: '100%',
            backgroundColor: '#f0f0f0'
          }}>
      </div>
      </div>
      <div className='productCardInfo'
        style={{
          minHeight: '250px',
          height: '100%',
          gap: '10px'
        }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '30%',
          gap: '5px'}}>
          <div
            style={{
              width: '40%',
              height: '30%',
              backgroundColor: '#f0f0f0',
              borderRadius: '5px'
            }}>
          </div>
          <div
            style={{
              width: '90%',
              height: '70%',
              backgroundColor: '#f0f0f0',
              borderRadius: '5px'
            }}>
          </div>
        </div>
        <div
          style={{
            width: '50%',
            height: '10%',
            backgroundColor: '#f0f0f0',
            borderRadius: '5px'
          }}>
        </div>
        <div
          style={{
            width: '70%',
            height: '10%',
            backgroundColor: '#f0f0f0',
            borderRadius: '5px'
          }}>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '30%',
            gap: '5px'
          }}>
          <div
            style={{
              width: '100%',
              height: '33%',
              backgroundColor: '#f0f0f0',
              borderRadius: '5px'
            }}>
          </div>
          <div
            style={{
              width: '100%',
              height: '33%',
              backgroundColor: '#f0f0f0',
              borderRadius: '5px'
            }}>
          </div>
          <div
            style={{
              width: '40%',
              height: '33%',
              backgroundColor: '#f0f0f0',
              borderRadius: '5px'
            }}>
          </div>
        </div>
        <div
          style={{
            width: '100%',
            height: '20%',
            backgroundColor: '#f0f0f0',
            borderRadius: '5px'
          }}>
        </div>
      </div>
    </div>
  )
}

export default SkeletonProductCard
import React from 'react'
import ThemeIconWh from '../assets/theme_wh.svg'
import ProfileIconWh from '../assets/profile_wh.svg'

function TopActBar() {
  return (
    <div class='topbar'>
      <span> <img className='topbar-icon' src={ThemeIconWh} /> </span>
      <span>LifeTrack</span>
      <span> <img className='topbar-icon' src={ProfileIconWh} /> </span>
    
    </div>
    
    )
}

export default TopActBar;
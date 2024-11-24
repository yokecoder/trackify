import { useState } from "react";


function DialogBox({ children , isOpen }){
  const style = {
   display: isOpen ? 'flex' : 'none' 
  }
 
  return (
  <> 
    <div style={style} className='dialogbox-wrapper'>
      <div style={style}  className='dialog-box' >
        { children }
      </div>
    </div>
  </>
    )
}



export { DialogBox };
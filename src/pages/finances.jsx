import React , { useState, useEffect } from 'react';
import { DialogBox } from "../comps/dialogs"
import CardContainer  from "../comps/cards"




function Finances() {
  const [financesList, setFinancesList] = useState([])
  const [finTitle, setFinTitle] = useState("")
  const [finAmount, setFinAmount] = useState(0)
  
  
  const [isDlOpen, setDlOpen] = useState(false)
  const openDl = () => { setDlOpen(true) }
  const closeDl = () => { setDlOpen(false) }
  
  return (
  <>
  
    <DialogBox isOpen={isDlOpen}>
      <div className="cent-dbox">
        <input className="ip-box prod-inp" placeholder="Product..." />
        <div className="fin-amt-opts" >
          <input type="Number" className="ip-box fin-amt-ip" placeholder="Amount... " /> 
          <select className="fin-curr-type"   >
            <option value="inr" >INR</option>
            <option value="usd">USD</option>
          </select>
        </div>
        
        <div className="dl-optBtns">
          <span className='dl-cls-btn' onClick={ closeDl } > close </span>
          <span className='dl-add-btn'> Add Record</span>
        </div>
      </div>
    </DialogBox>
    
    
    <button className="new-rec-btn" onClick={ openDl } >New Record</button>
    
    
  </>
  );
}

export default Finances;
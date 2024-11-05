import React from 'react'


type D_B_Props ={
handleCancelPopup:()=>void
handleAccecptPopup:()=>void
}

const Diaglog_Box = ({handleCancelPopup,handleAccecptPopup}:D_B_Props) => {
  return (
<div className="alert-box outer-border scale-down w-80 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"  >
  <div className="inner-border">
    <div className="alert-contents p-6" >
      <section className="field-row" >
        <div className="square"></div>
        <p className="alert-text">You Sure Wanna Delete That? This Action Is Non-reversable</p>
      </section>
      <section className="field-row flex justify-end pt-5" >
        <button className="btn" onClick={handleCancelPopup}>Cancel</button>
        <button className="btn" onClick={handleAccecptPopup}>OK</button>
      </section>

    </div>

  </div>
</div>
  )
}

export default Diaglog_Box

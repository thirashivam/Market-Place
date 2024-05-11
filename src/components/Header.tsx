import React from 'react';
import Navbar from './Navbar';

const Header: React.FC = (props) => {
  const {handleClick}=props
  return (
    <>
    <div className="shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]">
      <Navbar handleClick={handleClick}/>
    </div>
    </>
  )
}

export default Header;

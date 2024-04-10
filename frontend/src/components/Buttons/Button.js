import PropTypes from "prop-types";
import React, { useState } from 'react';
import './Button.css';

const Button = ({name,onClick,color,bgColor,backgroundColor}) => {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const ANIMATION_SPEED = 1000;

    const { offsetLeft, offsetTop } = e.target;
    const x = e.clientX - offsetLeft;
    const y = e.clientY - offsetTop;

    const newRipple = {
      x,
      y,
      id: new Date().getTime(),
    };

    setRipples((prevRipples) => [...prevRipples, newRipple]);

    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.filter((ripple) => ripple.id !== newRipple.id));
    }, ANIMATION_SPEED);
  };

  return (
    <button className="ripple-effect" style={{color:color,background:backgroundColor}} onClick={handleClick} >
      {name}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="ripple"
          style={{ left: ripple.x, top: ripple.y , background:bgColor}}
        ></div>
      ))}
    </button>
  );
};

Button.propTypes = {
    name: PropTypes.string,
    onClick: PropTypes.func,
    color: PropTypes.string,
    bgColor: PropTypes.string,
    backgroundColor: PropTypes.string,
}
Button.defaultProps = {
    color: "#fff",
    bgColor: "#fff",
    name: "-",
    backgroundColor: "back",
    onClick: ()=>{},
}

export default Button;

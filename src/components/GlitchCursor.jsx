import { useEffect } from 'react';

const GlitchCursor = () => {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.classList.add('curzr');
    document.body.appendChild(cursor);

    const cursorStyle = {
      boxSizing: 'border-box',
      position: 'fixed',
      top: '-12.5px',
      left: '-12.5px',
      zIndex: '2147483647',
      width: '25px',
      height: '25px',
      backgroundColor: CSS.supports('backdrop-filter', 'invert(1)') ? '#fff0' : '#222',
      backdropFilter: CSS.supports('backdrop-filter', 'invert(1)') ? 'invert(1)' : 'none',
      borderRadius: '50%',
      boxShadow: '0 0 0 #00feff, 0 0 0 #ff4f71',
      transition: '100ms, transform 100ms',
      userSelect: 'none',
      pointerEvents: 'none'
    };

    Object.assign(cursor.style, cursorStyle);

    let moving = false;
    let previousPointerX = 0;
    let previousPointerY = 0;

    const handleMouseMove = (event) => {
      const pointerX = event.pageX + document.body.getBoundingClientRect().x;
      const pointerY = event.pageY + document.body.getBoundingClientRect().y;
      const distanceX = Math.min(Math.max(previousPointerX - pointerX, -10), 10);
      const distanceY = Math.min(Math.max(previousPointerY - pointerY, -10), 10);

      cursor.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      cursor.style.boxShadow = `
        ${+distanceX}px ${+distanceY}px 0 #00feff, 
        ${-distanceX}px ${-distanceY}px 0 #ff4f71`;

      if (!moving) {
        moving = true;
        setTimeout(() => {
          cursor.style.boxShadow = '';
          moving = false;
        }, 50);
      }

      previousPointerX = pointerX;
      previousPointerY = pointerY;
    };

    const handleClick = () => {
      cursor.style.transform += ' scale(0.75)';
      setTimeout(() => {
        cursor.style.transform = cursor.style.transform.replace(' scale(0.75)', '');
      }, 35);
    };

    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('click', handleClick);
    }

    return () => {
      cursor.remove();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
};

export default GlitchCursor;
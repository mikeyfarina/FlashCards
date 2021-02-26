import { useState } from 'react';

const useMousePosition = (flip, setTransition) => {
  const [mousePosition, setMousePosition] = useState({
    xAxis: 0,
    yAxis: 0,
  });

  const handleMouseMove = (e) => {
    if (!flip) {
      const xAxis = -(window.innerWidth / 2 - e.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      setMousePosition({ xAxis, yAxis });
    }
  };

  const handleMouseEnterExit = () => {
    setTransition('transform .5s ease-out');
    setMousePosition({ xAxis: 0, yAxis: 0 });
  };
  return { handleMouseMove, handleMouseEnterExit, mousePosition };
};

export default useMousePosition;

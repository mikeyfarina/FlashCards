import { useCallback, useState } from 'react';

const useMousePosition = (flip) => {
  const [mousePosition, setMousePosition] = useState({
    xAxis: 0,
    yAxis: 0,
  });

  const handleMouseMove = useCallback(
    (e) => {
      if (!flip) {
        const xAxis = -(window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        setMousePosition({ xAxis, yAxis });
      }
    },
    [flip, window.innerWidth, window.innerHeight]
  );

  const handleMouseEnterExit = useCallback(() => {
    setMousePosition({ xAxis: 0, yAxis: 0 });
  }, []);

  return { handleMouseMove, handleMouseEnterExit, mousePosition };
};

export default useMousePosition;

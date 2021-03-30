import { useCallback, useState } from 'react';
import { isSafari, isMobileSafari } from 'react-device-detect';

const useMousePosition = (flip) => {
  const [mousePosition, setMousePosition] = useState({
    xAxis: isSafari || isMobileSafari ? 1 : 0,
    yAxis: 0,
  });

  const handleMouseMove = useCallback(
    (e) => {
      if (!flip) {
        const xAxis = -(window.innerWidth / 2 - e.pageX) / 100;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 55;
        setMousePosition({ xAxis, yAxis });
      }
    },
    [flip, window.innerWidth, window.innerHeight]
  );

  const handleMouseEnterExit = useCallback(() => {
    setMousePosition({ xAxis: isSafari || isMobileSafari ? 1 : 0, yAxis: 0 });
  }, []);

  return { handleMouseMove, handleMouseEnterExit, mousePosition };
};

export default useMousePosition;

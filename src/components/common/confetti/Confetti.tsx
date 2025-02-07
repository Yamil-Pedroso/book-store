import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

interface ConfettiComponentProps {
  isActive: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
}

const ConfettiComponent: React.FC<ConfettiComponentProps> = ({ isActive, containerRef }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, [isActive, containerRef]);

  return (
    isActive && (
      <Confetti
      width={dimensions.width}
      height={dimensions.height}
      numberOfPieces={150} // Aumentamos la cantidad de confettis
      gravity={0.05} // Menos gravedad para que caigan más lento
      wind={0.01} // Menos viento lateral
      tweenDuration={8000} // Aumentamos la duración de la animación
      recycle={false} // Para que los confettis no se reinicien continuamente
      />
    )
  );
};

export default ConfettiComponent;

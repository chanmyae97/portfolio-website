import { useEffect, useRef } from "react";

const CursorTrail = () => {
  const canvasRef = useRef(null);
  const pointerRef = useRef({
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.5,
  });
  const mouseMovedRef = useRef(false);

  const params = {
    pointsNumber: 40,
    widthFactor: 0.15,
    mouseThreshold: 0.6,
    spring: 0.4,
    friction: 0.5,
  };

  // Function to generate random copper colors based on theme
  const getRandomColor = () => {
    const isDarkMode = document.documentElement.classList.contains("dark");

    if (isDarkMode) {
      // Silver colors for dark mode
      const r = Math.floor(Math.random() * 40) + 192; // Range: 192-232
      const g = r; // Match red component for silver
      const b = r; // Match red component for silver
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      // Lighter copper colors for light mode
      const r = Math.floor(Math.random() * 30) + 184; // Range: 184-214 (copper)
      const g = Math.floor(Math.random() * 25) + 115; // Range: 115-140
      const b = Math.floor(Math.random() * 20) + 51; // Range: 51-71
      return `rgb(${r}, ${g}, ${b})`;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pointer = pointerRef.current;

    // Initialize trail points
    const trail = new Array(params.pointsNumber).fill(null).map(() => ({
      x: pointer.x,
      y: pointer.y,
      dx: 0,
      dy: 0,
    }));

    // Setup canvas dimensions
    const setupCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Update mouse position
    const updateMousePosition = (eX, eY) => {
      pointer.x = eX;
      pointer.y = eY;
    };

    // Animation update function
    const update = (t) => {
      // Intro motion when mouse hasn't moved
      if (!mouseMovedRef.current) {
        pointer.x =
          (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) *
          window.innerWidth;
        pointer.y =
          (0.5 + 0.2 * Math.cos(0.005 * t) + 0.1 * Math.cos(0.01 * t)) *
          window.innerHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update trail points
      trail.forEach((p, pIdx) => {
        const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
        const spring = pIdx === 0 ? 0.4 * params.spring : params.spring;
        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy;
      });

      // Draw trail
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);

      for (let i = 1; i < trail.length - 1; i++) {
        const xc = 0.5 * (trail[i].x + trail[i + 1].x);
        const yc = 0.5 * (trail[i].y + trail[i + 1].y);
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
        ctx.strokeStyle = getRandomColor();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(xc, yc);
      }

      requestAnimationFrame(update);
    };

    // Event listeners
    const handleMouseMove = (e) => {
      mouseMovedRef.current = true;
      updateMousePosition(e.clientX, e.clientY);
    };

    const handleResize = () => {
      setupCanvas();
    };

    // Initialize
    setupCanvas();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    requestAnimationFrame(update);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
};

export default CursorTrail;

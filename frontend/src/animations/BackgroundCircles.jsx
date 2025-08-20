import { useEffect, useRef } from "react";

function BackgroundCircles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const circles = [];
    const colors = ["rgba(255,255,255,0.7)", "rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"];

    for(let i=0; i<30; i++) {
      circles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 10 + Math.random() * 20,
        dx: (Math.random()-0.5)*(Math.random() < 0.5 ? -1 : 1),
        dy: (Math.random()-0.5)*(Math.random() < 0.5 ? -1 : 1),
        color: colors[Math.floor(Math.random()*colors.length)]
      });
    }

    function animate() {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      circles.forEach(c => {
        c.x += c.dx;
        c.y += c.dy;

        if(c.x<0 || c.x>canvas.width) c.dx *= -1;
        if(c.y<0 || c.y>canvas.height) c.dy *= -1;

        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI*2);
        ctx.fillStyle = c.color;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }

    animate();

    // Resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);

  }, []);

  return <canvas ref={canvasRef} style={{position:"fixed", top:0, left:0, zIndex:-1, background: "#000"}} />;
}

export default BackgroundCircles;

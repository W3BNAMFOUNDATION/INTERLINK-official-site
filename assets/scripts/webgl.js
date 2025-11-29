const canvas = document.getElementById('glCanvas');
if (canvas) {
  const gl = canvas.getContext('2d');
  const particles = Array.from({ length: 90 }, () => ({
    x: Math.random() * canvas.offsetWidth,
    y: Math.random() * canvas.offsetHeight,
    r: Math.random() * 2.2 + 0.6,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
  }));

  const resize = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };
  window.addEventListener('resize', resize);
  resize();

  function draw() {
    gl.clearRect(0, 0, canvas.width, canvas.height);
    gl.fillStyle = 'rgba(108,245,255,0.08)';
    gl.strokeStyle = 'rgba(108,245,255,0.18)';
    gl.lineWidth = 1.2;

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      gl.beginPath();
      gl.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      gl.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          gl.globalAlpha = 1 - dist / 140;
          gl.beginPath();
          gl.moveTo(p.x, p.y);
          gl.lineTo(p2.x, p2.y);
          gl.stroke();
          gl.globalAlpha = 1;
        }
      }
    });
    requestAnimationFrame(draw);
  }

  draw();
}

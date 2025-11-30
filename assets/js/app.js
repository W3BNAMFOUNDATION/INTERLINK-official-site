const logo = document.querySelector('.logo-3d');
const frame = document.querySelector('.logo-frame');

if (logo && frame) {
  frame.addEventListener('mousemove', (event) => {
    const { left, top, width, height } = frame.getBoundingClientRect();
    const x = (event.clientX - left) / width - 0.5;
    const y = (event.clientY - top) / height - 0.5;
    logo.style.transform = `rotateY(${x * 30}deg) rotateX(${y * -30}deg)`;
  });

  frame.addEventListener('mouseleave', () => {
    logo.style.transform = '';
  });
}

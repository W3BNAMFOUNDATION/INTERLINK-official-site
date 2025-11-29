const canvas = document.getElementById("glCanvas");
const gl = canvas.getContext("webgl");

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.7;
}
resize();
window.onresize = resize;

function render(t){
    const r = (Math.sin(t * 0.001) + 1) / 2;
    gl.clearColor(0.05 + r * 0.1, 0.10 + r * 0.1, 0.20, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    requestAnimationFrame(render);
}
render(0);

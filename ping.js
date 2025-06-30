function testPing(){
  const addr = document.getElementById('addr').value;
  const out = document.getElementById('output');
  out.textContent = 'Pinging...';

  const start = performance.now();
  fetch('https://' + addr + '/', {mode:'no-cors'})
    .then(() => {
      const latency = (performance.now() - start).toFixed(1);
      out.textContent = `Reachable! ≈ ${latency} ms (HTTP round-trip)`;
    })
    .catch(err => {
      const latency = (performance.now() - start).toFixed(1);
      out.textContent = `Unreachable (or blocked). Time: ${latency} ms`;
    });
}

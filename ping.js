async function testPing(rounds = 5) {
  const addr = document.getElementById('addr').value.trim();
  const out = document.getElementById('output');
  if (!addr) return out.textContent = '⛔ Please enter an address.';
  out.textContent = `Pinging ${addr} – ${rounds} times...`;

  const times = [];
  for (let i = 0; i < rounds; i++) {
    const start = performance.now();
    try {
      await fetch('https://' + addr + '/', { mode: 'no-cors' });
      const dt = performance.now() - start;
      times.push(dt);
      out.textContent = `Ping ${i + 1}: ${dt.toFixed(1)} ms\n` + out.textContent;
    } catch (_) {
      const dt = performance.now() - start;
      times.push(null);
      out.textContent = `Ping ${i + 1}: ❌ failed (${dt.toFixed(1)} ms)\n` + out.textContent;
    }
  }

  // Process results
  const successful = times.filter(t => t !== null);
  if (successful.length === 0) {
    return out.textContent += `\n❌ All pings failed.`;
  }

  const min = Math.min(...successful);
  const max = Math.max(...successful);
  const avg = successful.reduce((a, b) => a + b, 0) / successful.length;

  out.textContent += `\n✅ Stats — Sent: ${rounds}, Success: ${successful.length}, ` +
                     `Min: ${min.toFixed(1)} ms, Avg: ${avg.toFixed(1)} ms, Max: ${max.toFixed(1)} ms.`;
}

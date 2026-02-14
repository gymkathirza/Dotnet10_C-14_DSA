// Initial Weights
const px: number = 20; // 20%
const py: number = 50; // 50%
const pz: number = 30; // 30%

// Update the UI map on load
window.onload = () => {
    document.getElementById('zoneX')!.style.width = `${px}%`;
    document.getElementById('zoneY')!.style.width = `${py}%`;
    document.getElementById('zoneZ')!.style.width = `${pz}%`;
    
    document.getElementById('zoneX')!.innerText = `X (${px}%)`;
    document.getElementById('zoneY')!.innerText = `Y (${py}%)`;
    document.getElementById('zoneZ')!.innerText = `Z (${pz}%)`;
};

function runSimulation() {
    let countX = 0, countY = 0, countZ = 0;
    const totalIterations = 1000;

    for (let i = 0; i < totalIterations; i++) {
        // Logic from your C# code
        const r = Math.floor(Math.random() * 100);

        if (r < px) {
            countX++;
        } else if (r < (px + py)) {
            countY++;
        } else {
            countZ++;
        }
    }

    updateChart(countX, countY, countZ, totalIterations);
}

function updateChart(x: number, y: number, z: number, total: number) {
    // Scale results to width (max 100%)
    const maxVal = Math.max(x, y, z);
    
    document.getElementById('resultsX')!.style.width = `${(x / total) * 100}%`;
    document.getElementById('resultsY')!.style.width = `${(y / total) * 100}%`;
    document.getElementById('resultsZ')!.style.width = `${(z / total) * 100}%`;

    document.getElementById('stats')!.innerText = 
        `After ${total} rolls: X hit ${x} times, Y hit ${y} times, Z hit ${z} times.`;
}
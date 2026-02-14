import { WeightedRandomManager, Item } from './weighted-random.ts';

const manager = new WeightedRandomManager([
    { name: "Common", weight: 70 },
    { name: "Rare", weight: 25 },
    { name: "Legendary", weight: 5 }
]);

const render = () => {
    const container = document.getElementById('itemContainer');
    if (!container) return;

    container.innerHTML = '';
    manager.getItems().forEach((item, index) => {
        const row = document.createElement('div');
        row.className = "flex gap-2 items-center mb-2";
        // ... (HTML string as before)
        container.appendChild(row);
        
        // Use event delegation or direct listeners here
        row.querySelector('.btn-delete')?.addEventListener('click', () => {
            manager.removeItem(index);
            render();
        });
    });
};

document.getElementById('btnRun')?.addEventListener('click', () => {
    const results = manager.runSimulation(1000);
    updateUIResults(results);
});

render();
import { WeightedRandomManager } from './weighted-random';

// Initialize the manager with default items
const manager = new WeightedRandomManager([
    { name: "Common", weight: 70 },
    { name: "Rare", weight: 25 },
    { name: "Legendary", weight: 5 }
]);

/**
 * Updates the visual result bars in the UI
 */
const updateUIResults = (results: Record<string, number>): void => {
    const resultsSection = document.getElementById('results');
    const resultsList = document.getElementById('resultsList');
    
    if (!resultsSection || !resultsList) return;

    // Reveal the results area
    resultsSection.classList.remove('hidden');
    resultsList.innerHTML = '';
    
    // Calculate the total iterations for percentage math
    const totalIterations = Object.values(results).reduce((a, b) => a + b, 0);

    Object.entries(results).forEach(([name, count]) => {
        const pct = totalIterations > 0 ? ((count / totalIterations) * 100).toFixed(1) : "0.0";
        
        resultsList.innerHTML += `
            <div class="animate-in slide-in-from-bottom-2 duration-500">
                <div class="flex justify-between text-sm mb-1">
                    <span class="font-medium text-slate-700">${name}</span>
                    <span class="text-slate-500">${count} hits (${pct}%)</span>
                </div>
                <div class="w-full bg-slate-100 rounded-full h-2.5">
                    <div class="bg-indigo-600 h-2.5 rounded-full transition-all duration-1000" 
                         style="width: ${pct}%"></div>
                </div>
            </div>`;
    });
};

/**
 * Renders the input rows based on the current state of the manager
 */
const renderInputs = (): void => {
    const container = document.getElementById('itemContainer');
    if (!container) return;

    container.innerHTML = '';

    console.log("Rendering items from:", manager);
    console.log("Rendering items:", manager.getItems());
    
    manager.getItems().forEach((item, index) => {
        const row = document.createElement('div');
        row.className = "flex gap-2 items-center group animate-in fade-in duration-300";
        
        row.innerHTML = `
            <input type="text" value="${item.name}" data-index="${index}" data-field="name"
                   class="flex-[2] p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
            <input type="number" value="${item.weight}" data-index="${index}" data-field="weight"
                   class="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
            <button class="btn-delete p-2 text-slate-400 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
            </button>
        `;

        // Event: Update Data
        row.querySelectorAll('input').forEach(input => {
            input.addEventListener('change', (e) => {
                const target = e.target as HTMLInputElement;
                const field = target.dataset.field as any;
                manager.updateItem(index, field, target.value);
            });
        });

        // Event: Delete Item
        row.querySelector('.btn-delete')?.addEventListener('click', () => {
            manager.removeItem(index);
            renderInputs();
        });

        container.appendChild(row);
    });
};

// --- Initialization & Global Listeners ---

document.getElementById('btnAdd')?.addEventListener('click', () => {
    manager.addItem();
    renderInputs();
});

document.getElementById('btnRun')?.addEventListener('click', () => {
    const iterations = 1000;
    console.log("simulation on:", manager);
    const results = manager.runSimulation(iterations);
    updateUIResults(results);
});

// Initial Render
renderInputs();
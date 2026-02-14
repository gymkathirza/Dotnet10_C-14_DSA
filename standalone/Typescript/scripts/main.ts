import { WeightedRandomManager } from './weighted-random';

// Initialize the manager
const manager = new WeightedRandomManager();

/**
 * Updates the visual result bars for the simulation
 */
const updateUIResults = (results: Record<string, number>): void => {
    const resultsSection = document.getElementById('results');
    const resultsList = document.getElementById('resultsList');
    
    if (!resultsSection || !resultsList) return;

    resultsSection.classList.remove('hidden');
    resultsList.innerHTML = '';
    
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
 * Renders the input rows.
 * Since we are using the Observer pattern, this is called automatically
 * whenever manager.addItem() or manager.removeItem() is triggered.
 */
const renderInputs = (): void => {
    const container = document.getElementById('itemContainer');
    const totalDisplay = document.getElementById('totalDisplay');
    if (!container) return;

    const items = manager.getItems();
    container.innerHTML = '';
    
    items.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = "flex gap-2 items-center group animate-in fade-in duration-300";
        
        row.innerHTML = `
            <input type="text" value="${item.name}" data-index="${index}" data-field="name"
                   class="flex-[2] p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
            <div class="flex-1 relative">
                <input type="number" value="${item.weight.toFixed(1)}" data-index="${index}" data-field="weight"
                       class="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                <span class="absolute right-8 top-2 text-slate-400 text-sm">%</span>
            </div>
            <button data-action="delete" data-index="${index}" class="p-2 text-slate-400 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
            </button>
        `;

        // Attach internal listeners for data updates
        const inputs = row.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('change', (e) => {
                const target = e.target as HTMLInputElement;
                const field = target.dataset.field as any;
                manager.updateItem(index, field, target.value);
                
                // If the weight was changed, we might want to show the new total immediately
                if (field === 'weight') updateWeightTotalDisplay();
            });
        });

        container.appendChild(row);
    });

    updateWeightTotalDisplay();
};

/**
 * Helper to update the 100% total indicator
 */
const updateWeightTotalDisplay = () => {
    const totalDisplay = document.getElementById('totalDisplay');
    if (!totalDisplay) return;

    const total = manager.getItems().reduce((sum, i) => sum + i.weight, 0);
    totalDisplay.innerText = `Total: ${total.toFixed(1)}%`;
    
    if (Math.abs(total - 100) < 0.1) {
        totalDisplay.className = "text-sm font-semibold text-emerald-600";
    } else {
        totalDisplay.className = "text-sm font-semibold text-amber-600";
    }
};

// --- Observer Subscription ---
manager.subscribe(renderInputs);

// --- Global Event Delegation ---
document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest('[data-action]');
    if (!target) return;

    const action = (target as HTMLElement).dataset.action;
    
    switch (action) {
        case 'add':
            manager.addItem();
            break;
        case 'run':
            updateUIResults(manager.runSimulation(1000));
            break;
        case 'delete':
            const index = parseInt((target as HTMLElement).dataset.index || "0");
            manager.removeItem(index);
            break;
    }
});

// Initial Render
renderInputs();
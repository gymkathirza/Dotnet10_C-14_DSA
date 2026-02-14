// Define the shape of our data
interface Item {
    name: string;
    weight: number;
}

// Initial state
let items: Item[] = [
    { name: "Common", weight: 70 },
    { name: "Rare", weight: 25 },
    { name: "Legendary", weight: 5 }
];

/**
 * Renders the input rows for each item
 */
const renderInputs = (): void => {
    const container = document.getElementById('itemContainer');
    if (!container) return;

    container.innerHTML = '';
    
    items.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = "flex gap-2 items-center animate-in fade-in duration-300";
        row.innerHTML = `
            <input type="text" value="${item.name}" 
                   id="name-${index}"
                   class="flex-[2] p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
            <input type="number" value="${item.weight}" 
                   id="weight-${index}"
                   class="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
            <button id="del-${index}" class="p-2 text-slate-400 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
            </button>
        `;
        container.appendChild(row);

        // Add event listeners instead of inline onchange for better TS practice
        document.getElementById(`name-${index}`)?.addEventListener('change', (e) => {
            updateItem(index, 'name', (e.target as HTMLInputElement).value);
        });
        document.getElementById(`weight-${index}`)?.addEventListener('change', (e) => {
            updateItem(index, 'weight', (e.target as HTMLInputElement).value);
        });
        document.getElementById(`del-${index}`)?.addEventListener('click', () => removeItem(index));
    });
};

const addItem = (): void => {
    items.push({ name: "New Item", weight: 10 });
    renderInputs();
};

const updateItem = (index: number, field: keyof Item, value: string): void => {
    if (field === 'weight') {
        items[index].weight = parseInt(value) || 0;
    } else {
        items[index].name = value;
    }
};

const removeItem = (index: number): void => {
    items.splice(index, 1);
    renderInputs();
};

/**
 * The core Weighted Random Logic
 */
const runSimulation = (): void => {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    const counts: Record<string, number> = {};
    
    // Initialize counts
    items.forEach(item => counts[item.name] = 0);

    for (let i = 0; i < 1000; i++) {
        const r = Math.random() * totalWeight;
        let runningTotal = 0;

        for (const item of items) {
            runningTotal += item.weight;
            if (r < runningTotal) {
                counts[item.name]++;
                break;
            }
        }
    }
    displayResults(counts);
};

const displayResults = (counts: Record<string, number>): void => {
    const resultsSection = document.getElementById('results');
    const resultsList = document.getElementById('resultsList');
    if (!resultsSection || !resultsList) return;

    resultsSection.classList.remove('hidden');
    resultsList.innerHTML = '';
    
    Object.entries(counts).forEach(([name, count]) => {
        const pct = ((count / 1000) * 100).toFixed(1);
        resultsList.innerHTML += `
            <div>
                <div class="flex justify-between text-sm mb-1">
                    <span class="font-medium text-slate-700">${name}</span>
                    <span class="text-slate-500">${count} hits (${pct}%)</span>
                </div>
                <div class="w-full bg-slate-100 rounded-full h-2.5">
                    <div class="bg-indigo-500 h-2.5 rounded-full transition-all duration-700" style="width: ${pct}%"></div>
                </div>
            </div>`;
    });
};

// Expose functions to the window object for HTML button access
(window as any).addItem = addItem;
(window as any).runSimulation = runSimulation;

// Initial render
renderInputs();
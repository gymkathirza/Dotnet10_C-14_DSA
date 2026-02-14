export interface Item {
    name: string;
    weight: number;
}

export type Listener = () => void;

/**
 * Manages a list of weighted items and handles the logic for 
 * maintaining a 100% total during modifications.
 */
export class WeightedRandomManager {
    // Initial setup with your specific requirements
    private items: Item[] = [
        { name: "X", weight: 70 },
        { name: "Y", weight: 20 },
        { name: "Z", weight: 10 }
    ];
    
    private listeners: Listener[] = [];

    // --- Observer Pattern ---

    /**
     * Subscribe a function to be called whenever the state changes.
     */
    public subscribe(fn: Listener): void {
        this.listeners.push(fn);
    }

    /**
     * Triggers all subscribed functions.
     */
    private notify(): void {
        this.listeners.forEach(fn => fn());
    }

    // --- State Access ---

    public getItems(): Item[] {
        // Returns a deep copy to prevent direct external mutation
        return this.items.map(item => ({ ...item }));
    }

    // --- Mutators ---

    /**
     * Logic: Assigns 5% to the new item by taking it from the item 
     * currently holding the largest weight.
     */
    public addItem(name: string = "New Item"): void {
        const WEIGHT_TO_STEAL = 5;

        // Find the "Alpha" item
        const biggestItem = this.getBiggestItem();

        if (biggestItem) {
            // Take 5% (or whatever is left if biggest is < 5)
            const actualSteal = Math.min(biggestItem.weight, WEIGHT_TO_STEAL);
            biggestItem.weight -= actualSteal;
            
            // Add new item with the stolen percentage
            this.items.push({ name, weight: actualSteal });
        } else {
            // Fallback for empty list
            this.items.push({ name, weight: 100 });
        }

        this.notify();
    }

    /**
     * Logic: Deletes an item and returns its weight to the 
     * remaining largest item to maintain the 100% total.
     */
    public removeItem(index: number): void {
        if (this.items.length <= 1) return; // Prevent deleting the last item

        const weightToReturn = this.items[index].weight;
        this.items.splice(index, 1);

        const biggestItem = this.getBiggestItem();
        if (biggestItem) {
            biggestItem.weight += weightToReturn;
        }

        this.notify();
    }

    /**
     * Manual update for name or weight.
     */
    public updateItem(index: number, field: keyof Item, value: string): void {
        if (!this.items[index]) return;

        if (field === 'weight') {
            this.items[index].weight = parseFloat(value) || 0;
        } else {
            this.items[index].name = value;
        }
        // We don't notify here to prevent re-rendering inputs while typing
    }

    // --- Internal Helpers ---

    private getBiggestItem(): Item | null {
        if (this.items.length === 0) return null;
        return this.items.reduce((prev, current) => 
            (prev.weight > current.weight) ? prev : current
        );
    }

    // --- Simulation Core ---

    /**
     * Logic: Standard Weighted Random Selection.
     */
    public pickRandom(): Item | null {
        if (this.items.length === 0) return null;

        const totalWeight = this.items.reduce((sum, i) => sum + i.weight, 0);
        const r = Math.random() * totalWeight;
        let runningTotal = 0;

        for (const item of this.items) {
            runningTotal += item.weight;
            if (r < runningTotal) return item;
        }
        return this.items[this.items.length - 1];
    }

    /**
     * Runs many iterations to show statistical distribution.
     */
    public runSimulation(iterations: number = 1000): Record<string, number> {
        const counts: Record<string, number> = {};
        this.items.forEach(item => counts[item.name] = 0);

        for (let i = 0; i < iterations; i++) {
            const picked = this.pickRandom();
            if (picked) counts[picked.name]++;
        }
        return counts;
    }
}
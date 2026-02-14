// Define the shape of our data
export interface Item {
    name: string;
    weight: number;
}

export class WeightedRandomManager {
    private items: Item[];

    constructor(initialItems: Item[] = []) {
        this.items = [...initialItems];
    }

    public getItems(): Item[] {
        return this.items;
    }

    public addItem(name: string = "New Item", weight: number = 10): void {
        this.items.push({ name, weight });
    }

    public updateItem(index: number, field: keyof Item, value: string | number): void {
        if (this.items[index]) {
            if (field === 'weight') {
                this.items[index].weight = typeof value === 'string' ? parseInt(value) || 0 : value;
            } else {
                this.items[index].name = value as string;
            }
        }
    }

    public removeItem(index: number): void {
        this.items.splice(index, 1);
    }

    /**
     * Core logic: performs the weighted selection
     */
    public pickRandom(): Item | null {
        if (this.items.length === 0) return null;
        
        const totalWeight = this.items.reduce((sum, item) => sum + item.weight, 0);
        const r = Math.random() * totalWeight;
        let runningTotal = 0;

        for (const item of this.items) {
            runningTotal += item.weight;
            if (r < runningTotal) return item;
        }
        return this.items[this.items.length - 1];
    }

    public runSimulation(iterations: number = 1000): Record<string, number> {
        const counts: Record<string, number> = {};
        this.items.forEach(item => counts[item.name] = 0);

        for (let i = 0; i < iterations; i++) {
            const result = this.pickRandom();
            if (result) counts[result.name]++;
        }
        return counts;
    }
}
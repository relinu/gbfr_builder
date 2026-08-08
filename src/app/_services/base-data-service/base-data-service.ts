import { HttpClient } from '@angular/common/http';
import { inject, signal } from '@angular/core';

type DataType = { id: string };

export abstract class BaseDataService<T extends DataType> {

    private readonly data = signal<T[]>([]);

    constructor(dataPath: string) {
        const http: HttpClient = inject(HttpClient);
        http.get<T[]>(dataPath).subscribe(v => this.data.set(v));
    }

    public get(id: string): T | undefined {
        return this.data().find(e => e.id === id);
    }

    public getAll(): T[] {
        return this.data();
    }
}

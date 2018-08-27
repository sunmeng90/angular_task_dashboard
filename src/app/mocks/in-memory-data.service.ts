import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task } from '../model/task';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const tasks: Task[] = [
            { id: 1, name: 'task1', description: 'this is first task' },
            { id: 2, name: 'task2', description: 'this is second task' },
            { id: 3, name: 'task3', description: 'this is third task' },
            { id: 4, name: 'task4', description: 'this is fourth task' },
            { id: 5, name: 'task5', description: 'this is fifth task' },
            { id: 6, name: 'task6', description: 'this is sixth task' },
            { id: 7, name: 'task7', description: 'this is seventh task' },
            { id: 8, name: 'task8', description: 'this is eighth task' },
            { id: 9, name: 'task9', description: 'this is ninth task' },
            { id: 10, name: 'task10', description: 'this is tenth task' }
        ];
        return { tasks };
    }
}


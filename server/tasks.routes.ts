import { TASKS } from './data';
import { Application, Request, Response } from 'express';
import { ObjectUnsubscribedError } from 'rxjs';

export function getTasks(req: Request, resp: Response) {
    const tasks = Object.values(TASKS);
    resp.status(200).json(tasks);
}

export function addTask(req: Request, resp: Response) {
    let task = req.body;
    console.log('saving task: ', JSON.stringify(task));
    // Math.max(...Object.values(TASKS).filter(t => t.id === task.id));
    TASKS.push(task);
    resp.status(200).json(task);
}



import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { Task } from '../model/task';

export class TasksDataSource implements DataSource<Task> {

    tasks: Task[];

    connect(collectionViewer: CollectionViewer) {
        return null;
    }

    disconnect(collectionViewer: CollectionViewer) {
        return null;
    }

}

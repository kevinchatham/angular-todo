import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { TodoDto } from '../interfaces/TodoDto';

@Injectable({ providedIn: 'root' })
export class TodoDataService extends EntityCollectionServiceBase<TodoDto> {
    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Todo', serviceElementsFactory);
    }
}
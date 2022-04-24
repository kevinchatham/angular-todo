import { DefaultDataServiceConfig, EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
    Todo: {},
};

const pluralNames = { Todo: 'Todos' };

export const entityConfig = {
    entityMetadata,
    pluralNames
};

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
    root: 'http://localhost/api',
    timeout: 3000, // request timeout
}
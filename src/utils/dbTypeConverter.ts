import { DATA_SOURCE, mongoClient, postgreClient } from '../db/clientPrisma';

export const dbTypeConverter = (id: string) => {
    if (DATA_SOURCE === 'postgresql') {
        return Number(id)
    } else {
        return id
    }
}
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaClient as MongoClient } from '../../prisma/generated/mongodb_client';
import { PrismaClient as PostgreClient } from '../../prisma/generated/postgresql_client';

import { Prisma } from "@prisma/client";

export const DATA_SOURCE = process.env.DATA_SOURCE || 'mongodb'

type MongoClientType = MongoClient<Prisma.PrismaClientOptions, never, DefaultArgs>
type PostgreClientType = PostgreClient<Prisma.PrismaClientOptions, never, DefaultArgs>

export const mongoClient: MongoClientType = new MongoClient();
export const postgreClient: PostgreClientType = new PostgreClient();


export let prismaClient: any

if (DATA_SOURCE === 'postgresql') {
    prismaClient = postgreClient;
} else {
    prismaClient = mongoClient;
}
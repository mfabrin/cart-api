import { Type, Static } from '@sinclair/typebox';

export const emptyResponseSchema = Type.Object({})

export type EmptyResponse = Static<typeof emptyResponseSchema>;
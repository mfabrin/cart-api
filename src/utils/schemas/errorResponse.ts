import { Type, Static } from '@sinclair/typebox';

export const errorResponseSchema = Type.Object({
    statusCode: Type.Number(),
    code: Type.String(),
    error: Type.String(),
    message: Type.String()
})

export type ErrorResponse = Static<typeof errorResponseSchema>;
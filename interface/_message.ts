import z, { ZodType } from 'zod';

type TypeFromZod<T extends ZodType> = ReturnType<T['parse']>;

export const Messages = z.object({
  // [message_type] : [interface]
  message: z.object({
    text: z.string(),
  }),
});

type PayloadBase<T = unknown, I = unknown> = T extends string ? {
  type: T,
  interface: I
} : {
  type: unknown,
  interface: unknown,
};

type Messages = TypeFromZod<typeof Messages>;
type GetMessagePayload<T extends keyof Messages> = PayloadBase<T, Messages[T]>;

// utility
export type ParseMessage<D extends PayloadBase, T extends 'type' | 'interface'> = D[T];

// payload
export type MessagePayload = GetMessagePayload<'message'>;






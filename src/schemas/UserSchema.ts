import { z } from "zod";

export default class UserSchema {

    public static login = z.object({
        username: z.string().max(50),
        password: z.string().max(50)
    })

    public static creation = z.object({
        username: z.string().max(50),
        password: z.string().max(50)
    });
}

export type TUserLogin = z.infer<typeof UserSchema.login>;
export type TUserCreation = z.infer<typeof UserSchema.creation>;
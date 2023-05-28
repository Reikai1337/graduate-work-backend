import { Request } from "express";
import { User } from "src/users/user.entity";

export type RequestWithUser = Request & Partial<Record<"user", User>>;

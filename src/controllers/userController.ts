import { Request, Response } from "express";
import userService from "../services/userService";
import { CreateUserRequest } from "../@types/types";

export const createUser = async (req: CreateUserRequest, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const user = await userService.createUser({ name, email, password });
    res.status(201).json(user);
  } catch (error: any) {
    if (error.message === "Email already exists") {
      res.status(400).json({ error: error.message });
      return;
    } else {
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const timezoneOffsetRaw = req.headers['x-timezone-offset'];
        const timezoneOffset = timezoneOffsetRaw ? parseInt(timezoneOffsetRaw as string, 10) : 0;

        if (isNaN(timezoneOffset)) {
            res.status(400).json({ error: "Invalid timezone offset" });
            return;
        }

        const user = await userService.getUserById(Number(id), timezoneOffset);

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
        return;
    }
};
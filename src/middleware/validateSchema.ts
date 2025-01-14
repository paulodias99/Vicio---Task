import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

const validateSchema = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const data = {
        ...req.body,
        ...req.params,
        headers: req.headers,
      };

      schema.parse(data); 
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
          validation: err.code,
        }));

        res.status(400).json({ errors: formattedErrors });
      } else {
        res.status(400).json({ error: "Invalid request data" });
      }
    }
  };
};

export default validateSchema;

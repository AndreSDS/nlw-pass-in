import { FastifyInstance } from "fastify";
import { BadRequestError } from "../routes/_errors/bad-request";
import { ZodError } from "zod";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  console.error({error});

  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: `Invalid request body.`,
      errors: error.flatten().fieldErrors,
    });
  }

  if (error instanceof BadRequestError) {
    return reply
      .status(error.statusCode || 400)
      .send({ message: error.message });
  }

  return reply.status(500).send({
    message: "Something went wrong. Please try again later.",
  });
};

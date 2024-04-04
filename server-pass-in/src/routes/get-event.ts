import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";
import { BadRequestError } from "./_errors/bad-request";

export async function getEvent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/events/:eventId",
    {
      schema: {
        summary: "Get an event",
        tags: ["events"],
        params: z.object({
          eventId: z.string().uuid(),
        }),
        response: {
          201: z.object({
            event: z.object({
              id: z.string().uuid(),
              title: z.string(),
              details: z.string().nullable(),
              slug: z.string(),
              maximumAttendees: z.number().int().positive().nullable(),
              attendeesAmount: z.number().int(),
            }),
          }),
          409: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { eventId } = request.params;

      const event = await prisma.event.findUnique({
        select: {
          id: true,
          title: true,
          details: true,
          slug: true,
          maximumAttendees: true,
          _count: {
            select: {
              attendees: true,
            },
          },
        },
        where: {
          id: eventId,
        },
      });

      if (event === null) {
        throw new BadRequestError("Event not found");
      }

      return reply.status(201).send({
        event: {
          ...event,
          attendeesAmount: event._count.attendees,
        },
      });
    }
  );
}

import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";
import { BadRequestError } from "./_errors/bad-request";

export async function registerForevent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/events/:eventId/attendees",
    {
      schema: {
        summary: "Register for an event",
        tags: ["events"],
        body: z.object({
          name: z.string().min(5),
          email: z.string().email(),
        }),
        params: z.object({
          eventId: z.string().uuid(),
        }),
        response: {
          201: z.object({
            attendeeId: z.number().int(),
          }),
          409: z.object({
            message: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body;
      const { eventId } = request.params;

      const existingAttendee = await prisma.attendee.findUnique({
        where: { eventId_email: { eventId, email } },
      });

      if (existingAttendee !== null) {
        throw new BadRequestError(
          "Attendee with the same email already exists."
        );
      }

      const [event, attendeesCount] = await Promise.all([
        prisma.event.findUnique({
          where: { id: eventId },
        }),

        prisma.attendee.count({
          where: { eventId },
        }),
      ]);

      if (!event) {
        return reply.status(404).send({ message: "Event not found." });
      }

      if (event.maximumAttendees !== null) {
        if (attendeesCount >= event.maximumAttendees) {
          throw new BadRequestError("Maximum attendees reached.");
        }
      }

      const attendee = await prisma.attendee.create({
        data: {
          name,
          email,
          eventId,
        },
      });

      return reply.send({ attendeeId: attendee.id });
    }
  );
}

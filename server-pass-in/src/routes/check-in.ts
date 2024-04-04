import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { generateSlug } from "../utils/generate-slug";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";
import { BadRequestError } from "./_errors/bad-request";

export async function checkIn(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/attendees/:attendeeId/check-in",
    {
      schema: {
        summary: "Check in an attendee",
        tags: ["check-in"],
        params: z.object({
          attendeeId: z.coerce.number().int(),
        }),
        response: {
          201: z.object({}),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { attendeeId } = request.params;

      const attendee = await prisma.checkIn.findUnique({
        where: {
          attendeeId,
        },
      });

      if (attendee !== null) {
        throw new BadRequestError("Attendee already checked in");
      }

      await prisma.checkIn.create({
        data: {
          attendeeId,
        },
      });
    }
  );
}

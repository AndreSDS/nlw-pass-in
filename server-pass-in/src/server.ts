import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { createEvent } from "./routes/create-event";
import { registerForevent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getAttendeeBadge } from "./routes/get-attendee-badge";
import { checkIn } from "./routes/check-in";
import { getEventAttendees } from "./routes/get-event-attendee";
import { errorHandler } from "./utils/error-handler";
import fastifyCors from "@fastify/cors";

const app = fastify();

app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "Event Management API",
      description: "Event Management API",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifyCors, {
  origin: "*",
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent);
app.register(registerForevent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);

app.setErrorHandler(errorHandler);

app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("🚀 Http server running.");
});

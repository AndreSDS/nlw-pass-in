import { Attendee } from "@prisma/client";
import { prisma } from "../src/lib/prisma";

async function seed() {
  // create a event
  await prisma.event.create({
    data: {
      id: "bcf25cd0-c2ed-4a6c-8712-baf095a45dcb",
      title: "My first event",
      slug: "my-first-event",
      details: "This is my first event",
      maximumAttendees: 100,
    },
  });

  // add participants to the event
  const seedPromises = [] as Promise<Attendee>[];

  for (let i = 0; i < 100; i++) {
    seedPromises.push(
      prisma.attendee.create({
        data: {
          name: `Attendee ${i}`,
          email: `particpante${i}@email.com`,
          eventId: "bcf25cd0-c2ed-4a6c-8712-baf095a45dcb",
        },
      })
    );
  }

  // wait for all promises to resolve
  await Promise.all(seedPromises);
}

seed().then(() => {
  console.log("🌱 Seeding complete.");
  prisma.$disconnect();
});

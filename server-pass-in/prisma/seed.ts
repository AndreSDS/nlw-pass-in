import { prisma } from "../src/lib/prisma";

async function seed() {
  await prisma.event.create({
    data: {
      id: "597dc166-ecd3-4a49-b63a-16c01260ba20",
      title: "My first event",
      slug: "my-first-event",
      details: "This is my first event",
      maximumAttendees: 100,
    },
  });
}

seed().then(() => {
  console.log("🌱 Seeding complete.");
  prisma.$disconnect();
});

/* eslint-disable @typescript-eslint/no-require-imports */
// This file is deprecated - we now use Supabase instead of Prisma
// Keep for reference only
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 12);
  
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      name: 'Test User',
      email: 'test@example.com',
      hashedPassword,
      role: 'user',
      emailVerified: new Date(),
    },
  });

  console.log('Test user created:', user);

  // Create some test events
  const event1 = await prisma.event.upsert({
    where: { id: 'event1' },
    update: {},
    create: {
      id: 'event1',
      title: 'Annual Community Gala',
      description: 'Join us for our biggest event of the year!',
      date: new Date('2023-12-15T18:00:00Z'),
      location: 'Grand Ballroom, 123 Main St',
    },
  });

  const event2 = await prisma.event.upsert({
    where: { id: 'event2' },
    update: {},
    create: {
      id: 'event2',
      title: 'Winter Workshop Series',
      description: 'Learn new skills and network with professionals',
      date: new Date('2024-01-20T10:00:00Z'),
      location: 'Community Center',
    },
  });

  console.log('Test events created:', { event1, event2 });

  // Create a membership for the test user
  const membership = await prisma.membership.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      status: 'active',
      startDate: new Date(),
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    },
  });

  console.log('Test membership created:', membership);

  // Create a sample file for the test user
  const sampleFile = await prisma.file.create({
    data: {
      userId: user.id,
      membershipId: membership.id,
      originalName: 'welcome.pdf',
      displayName: 'Welcome Letter',
      path: '/uploads/welcome-letter.pdf',
      mimeType: 'application/pdf',
      size: 1024, // 1KB
    },
  });

  console.log('Sample file created:', sampleFile);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

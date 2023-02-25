// This is going to be used to seed the database with a single user

const prisma = require('./prisma.js');
const { faker } = require('@faker-js/faker')
const bcrypt = require('../src/utils/bcrypt.js');

// This function will be used to seed the database
async function seed() {
    // Clear the database
    await clearDB();

    // Seed the database
    console.log('Seeding database...');
    await seedUsers();
    console.log('Seeded users');
    await seedCounters();
    console.log('Seeded counters');
    console.log('Database seeded');
}

async function clearDB() {
    await prisma.prisma.$executeRaw`DELETE FROM "Counter"`;
    await prisma.prisma.$executeRaw`DELETE FROM "User"`;
}

async function seedUsers() {
    // Create a new user
    const user = await prisma.prisma.user.create({
        data: {
            forename: 'Admin',
            surname: 'Admin',
            email: 'admin@admin.com',
            phoneNumber: faker.phone.imei(),
            password: await bcrypt.hashPassword('admin'),
        }
    });

    // Create a new user
    const user2 = await prisma.prisma.user.create({
        data: {
            forename: 'User',
            surname: 'User',
            email: 'user@user.com',
            phoneNumber: faker.phone.imei(),
            password: await bcrypt.hashPassword('user'),
        }
    });
}

async function seedCounters() {
    // Create a new counter
    const counter = await prisma.prisma.counter.create({
        data: {
            counterName: 'test',
            counterValue: 0,
            userId: {
                connect: {
                    id: 1
                }
            },
            dateCreated: new Date(),
            dateUpdated: new Date()
        }
    });

    // Create a new counter
    const counter2 = await prisma.prisma.counter.create({
        data: {
            counterName: 'test 2',
            counterValue: 0,
            userId: {
                connect: {
                    id: 2
                }
            },
            dateCreated: new Date(),
            dateUpdated: new Date()
        }
    });
}

async function main() {
    await seed();
}

main()
    .then(async () => {
        await prisma.prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.prisma.$disconnect();
        process.exit(1);
    });

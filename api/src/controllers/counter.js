// Controller for counters

const prisma = require('../../prisma/prisma.js');
const jwt = require('../utils/jwt.js');

async function increment(req, res) {
    let decoded = null;
    try {
        // Decode the JWT token
        decoded = await jwt.verifyToken(req.headers.authorization);

    } catch (err) {
        // If the token is invalid, return an error
        return res.status(401).json({ error: 'Invalid token' });
    }

    // Check that the request body contains a counterId
    if (!req.body.counterId) {
        return res.status(400).json({ error: 'Missing counterId' });
    }

    // Check that the counterId is a number
    if (isNaN(req.body.counterId)) {
        return res.status(400).json({ error: 'counterId must be a number' });
    }


    // Check that the user id is not null
    if (!decoded.user.id) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    const counter = await prisma.prisma.counter.findUnique({
        where: {
            id: req.body.counterId,
        }
    });

    // If the counter doesn't exist, return an error
    if (!counter) {
        return res.status(404).json({ error: 'Counter not found' });
    }

    // Check that the user is the owner of the counter
    if (counter.user !== decoded.user.id) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    // Increment the counter
    await prisma.prisma.counter.update({
        where: {
            id: req.body.counterId
        },
        data: {
            counterValue: counter.counterValue + 1,
            dateUpdated: new Date()
        }
    });

    // Get the updated counter
    const updatedCounter = await prisma.prisma.counter.findUnique({
        where: {
            id: req.body.counterId
        }
    });

    // Return the updated counter
    return res.status(200).json(updatedCounter);
}

async function decrement(req, res) {
    let decoded = null;
    try {
        // Decode the JWT token
        decoded = await jwt.verifyToken(req.headers.authorization);

    } catch (err) {
        // If the token is invalid, return an error
        return res.status(401).json({ error: 'Invalid token' });
    }

    // Check that the request body contains a counterId
    if (!req.body.counterId) {
        return res.status(400).json({ error: 'Missing counterId' });
    }

    // Check that the counterId is a number
    if (isNaN(req.body.counterId)) {
        return res.status(400).json({ error: 'counterId must be a number' });
    }


    // Check that the user id is not null
    if (!decoded.user.id) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    const counter = await prisma.prisma.counter.findUnique({
        where: {
            id: req.body.counterId,
        }
    });

    // If the counter doesn't exist, return an error
    if (!counter) {
        return res.status(404).json({ error: 'Counter not found' });
    }

    // Check that the user is the owner of the counter
    if (counter.user !== decoded.user.id) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    // Increment the counter
    await prisma.prisma.counter.update({
        where: {
            id: req.body.counterId
        },
        data: {
            counterValue: counter.counterValue - 1,
            dateUpdated: new Date()
        }
    });

    // Get the updated counter
    const updatedCounter = await prisma.prisma.counter.findUnique({
        where: {
            id: req.body.counterId
        }
    });

    // Return the updated counter
    return res.status(200).json(updatedCounter);
}

async function reset(req, res) {
    let decoded = null;
    try {
        // Decode the JWT token
        decoded = await jwt.verifyToken(req.headers.authorization);

    } catch (err) {
        // If the token is invalid, return an error
        return res.status(401).json({ error: 'Invalid token' });
    }

    // Check that the request body contains a counterId
    if (!req.body.counterId) {
        return res.status(400).json({ error: 'Missing counterId' });
    }

    // Check that the counterId is a number
    if (isNaN(req.body.counterId)) {
        return res.status(400).json({ error: 'counterId must be a number' });
    }


    // Check that the user id is not null
    if (!decoded.user.id) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    const counter = await prisma.prisma.counter.findUnique({
        where: {
            id: req.body.counterId,
        }
    });

    // If the counter doesn't exist, return an error
    if (!counter) {
        return res.status(404).json({ error: 'Counter not found' });
    }

    // Check that the user is the owner of the counter
    if (counter.user !== decoded.user.id) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    // Increment the counter
    await prisma.prisma.counter.update({
        where: {
            id: req.body.counterId
        },
        data: {
            counterValue: 0,
            dateUpdated: new Date()
        }
    });

    // Get the updated counter
    const updatedCounter = await prisma.prisma.counter.findUnique({
        where: {
            id: req.body.counterId
        }
    });

    // Return the updated counter
    return res.status(200).json(updatedCounter);
}


async function create(req, res) {
    let decoded = null;

    try {
        // Decode the JWT token
        decoded = await jwt.verifyToken(req.headers.authorization);
    } catch (err) {
        // If the token is invalid, return an error
        return res.status(401).json({ error: 'Invalid token' });
    }

    // Check that the user id is not null
    if (!decoded.user.id) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    // Check that the request body contains a counterName
    if (!req.body.counterName) {
        return res.status(400).json({ error: 'Missing counterName' });
    }

    // Check that the counterName is a string
    if (typeof req.body.counterName !== 'string') {
        return res.status(400).json({ error: 'counterName must be a string' });
    }

    // Check that the counterName is not empty
    if (req.body.counterName === '') {
        return res.status(400).json({ error: 'counterName must not be empty' });
    }

    // Check that the counterName has not already been used and is not longer than 50 characters
    const counterNameExists = await prisma.prisma.counter.findFirst({
        where: {
            counterName: req.body.counterName,
            user: decoded.user.id
        }
    });

    if (counterNameExists) {
        return res.status(400).json({ error: 'counterName already exists' });
    }

    if (req.body.counterName.length > 50) {
        return res.status(400).json({ error: 'counterName must not be longer than 50 characters' });
    }

    // Create the counter
    const counter = await prisma.prisma.counter.create({
        data: {
            counterName: req.body.counterName,
            counterValue: 0,
            user: decoded.user.id,
            dateCreated: new Date(),
            dateUpdated: new Date()
        }
    });

    // Return the created counter
    return res.status(200).json(counter);
}

async function deleteCounter(req, res) {
    let decoded = null;

    try {
        // Decode the JWT token
        decoded = await jwt.verifyToken(req.headers.authorization);
    } catch (err) {
        // If the token is invalid, return an error
        return res.status(401).json({ error: 'Invalid token' });
    }

    // Check that the user id is not null
    if (!decoded.user.id) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    // Check that the request body contains a counterId
    if (!req.body.counterId) {
        return res.status(400).json({ error: 'Missing counterId' });
    }

    // Check that the counterId is a number
    if (isNaN(req.body.counterId)) {
        return res.status(400).json({ error: 'counterId must be a number' });
    }

    const counter = await prisma.prisma.counter.findUnique({
        where: {
            id: req.body.counterId,
        }
    });

    // If the counter doesn't exist, return an error
    if (!counter) {
        return res.status(404).json({ error: 'Counter not found' });
    }

    // Check that the user is the owner of the counter
    if (counter.user !== decoded.user.id) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    // Delete the counter
    await prisma.prisma.counter.delete({
        where: {
            id: req.body.counterId
        }
    });

    // Return a success message
    return res.status(200).json({ message: 'Counter deleted' });
}

async function getAll(req, res) {
    let decoded = null;

    try {
        // Decode the JWT token
        decoded = await jwt.verifyToken(req.headers.authorization);
    } catch (err) {
        // If the token is invalid, return an error
        return res.status(401).json({ error: 'Invalid token' });
    }

    // Check that the user id is not null
    if (!decoded.user.id) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    // Get all the counters
    const counters = await prisma.prisma.counter.findMany({
        where: {
            user: decoded.user.id
        }
    });

    // Return the counters
    // wrap the counters in an object called counters to avoid returning an array
    return res.status(200).json({ counters });
}

async function incrementAlternate(req, res) {
    let decoded = null;

    try {
        // Decode the JWT token
        decoded = await jwt.verifyToken(req.headers.authorization);
    } catch (err) {
        // If the token is invalid, return an error
        return res.status(401).json({ error: 'Invalid token' });
    }

    // Check that the user id is not null
    if (!decoded.user.id) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    // Check that the request body contains a counterId
    if (!req.body.counterId || !req.body.incrementAmount) {
        return res.status(400).json({ error: 'Missing information' });
    }

    // Check that the incrementAmount is a positive number
    if (isNaN(req.body.incrementAmount) || req.body.incrementAmount <= 0) {
        return res.status(400).json({ error: 'incrementAmount must be a positive number' });
    }

    // Check that the counterId is a number
    if (isNaN(req.body.counterId)) {
        return res.status(400).json({ error: 'counterId must be a number' });
    }

    const counter = await prisma.prisma.counter.findUnique({
        where: {
            id: req.body.counterId,
        }
    });

    // If the counter doesn't exist, return an error
    if (!counter) {
        return res.status(404).json({ error: 'Counter not found' });
    }

    // Check that the user is the owner of the counter
    if (counter.user !== decoded.user.id) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    // Increment the counter
    await prisma.prisma.counter.update({
        where: {
            id: req.body.counterId
        },
        data: {
            counterValue: counter.counterValue + req.body.incrementAmount,
            dateUpdated: new Date()
        }
    });

    // Return a success message
    return res.status(200).json({ message: 'Counter incremented' });
}

async function decrementAlternate(req, res) {
    let decoded = null;

    try {
        // Decode the JWT token
        decoded = await jwt.verifyToken(req.headers.authorization);
    } catch (err) {
        // If the token is invalid, return an error
        return res.status(401).json({ error: 'Invalid token' });
    }

    // Check that the user id is not null
    if (!decoded.user.id) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    // Check that the request body contains a counterId
    if (!req.body.counterId || !req.body.decrementAmount) {
        return res.status(400).json({ error: 'Missing information' });
    }

    // Check that the decrementAmount is a positive number
    if (isNaN(req.body.decrementAmount) || req.body.decrementAmount <= 0) {
        return res.status(400).json({ error: 'decrementAmount must be a positive number' });
    }

    // Check that the counterId is a number
    if (isNaN(req.body.counterId)) {
        return res.status(400).json({ error: 'counterId must be a number' });
    }

    const counter = await prisma.prisma.counter.findUnique({
        where: {
            id: req.body.counterId,
        }
    });

    // If the counter doesn't exist, return an error
    if (!counter) {
        return res.status(404).json({ error: 'Counter not found' });
    }

    // Check that the user is the owner of the counter
    if (counter.user !== decoded.user.id) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    // Decrement the counter
    await prisma.prisma.counter.update({
        where: {
            id: req.body.counterId
        },
        data: {
            counterValue: counter.counterValue - req.body.decrementAmount,
            dateUpdated: new Date()
        }
    });

    // Return a success message
    return res.status(200).json({ message: 'Counter decremented' });
}



module.exports = {
    increment,
    decrement,
    reset,
    create,
    deleteCounter,
    getAll,
    incrementAlternate,
    decrementAlternate
};
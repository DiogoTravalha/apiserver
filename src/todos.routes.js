const { request, response } = require('express');
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const todosRoutes = express.Router();

//C
todosRoutes.post('/todos', async (request, response) => {
    const { name } = request.body;
    const todo = await prisma.todo.create({
        data: {
            name,
        },
    });

    return response.status(201).json(todo);
});
//R
todosRoutes.get('/todos', async (request, response) => {
    const todos = await prisma.todo.findMany();
    return response.status(200).json(todos);
});
//U
todosRoutes.put('/todos', async (request, response) => {
    const { name, id, status } = request.body;

    if (!id) {
        return response.status(400).json('Id é Obrigatorio');
    }

    const todoAlreadyExist = await prisma.todo.findUnique({ where: { id } });

    if (!todoAlreadyExist) {
        return response.status(404).json('Id não Existe');
    }

    const todo = await prisma.todo.update({
        where: {
            id,
        },
        data: {
            name,
            status,
        },
    });

    return response.status(200).json(todo);
});
//D
todosRoutes.delete('/todos/:id', async (request, response) => {
    const { id } = request.params;
    const intId = parseInt(id);

    if (!intId) {
        return response.status(400).json('Id é Obrigatorio');
    }

    const todoAlreadyExist = await prisma.todo.findUnique({
        where: { id: intId },
    });

    if (!todoAlreadyExist) {
        return response.status(404).json('Id não Existe');
    }

    await prisma.todo.delete({ where: { id: intId } });

    return response.status(200).send();
});

module.exports = todosRoutes;

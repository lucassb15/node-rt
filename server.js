// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//     response.write('ola')

//     return response.end()
// })

// server.listen(3333)


import  { fastify } from 'fastify'
// import { DataBaseMemory } from "./database-memory.js"
import { DatabasePostgres } from './database.postgres.js'
const server = fastify()
// const database = new DataBaseMemory()
const database = new DatabasePostgres
// GET, Buscar informação
// POST, Criação 
// PUT, Alteração
// DELETE, Deletar
// PATCH, Alterar apenas uma informação especifica

server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body

    await database.create({
        title,
        description,
        duration,
    })
    return reply.status(201).send()
})

server.get('/videos', async (request) => {
    const search = request.query.search

    const videos = await database.list(search)


    return videos
})

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body

    await database.update(videoId,{
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id 

    database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    port: 3333,
})


// fastify é um micro framework
// vantagem: trás poucas funcionalidades
// ele não vai definir a estrutura de pastas ou nomenclatura
// ele faz a parte de roteamento onde acessa um endereço especifico e redireciona para alguma parte da aplicação

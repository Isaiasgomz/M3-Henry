// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let  posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests
let id = 1


server.post('/posts', ( req,res) => {
    const {author, title, contents } = req.body

    if(!author || !title || !contents){
        res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }else{
        const Post = {
            id: id++,
            author,
            title,
            contents
        }
        posts.push(Post)
        res.json(Post)
    }
})

server.post('/posts/author/:author', (req,res) =>{
   const  {title, contents} = req.body
   const {author} = req.params
   if(!title || !contents){
       res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
   }else{
       const Post = {
           id: id++,
           author,
           title,
           contents
       }
       posts.push(Post)
       res.json(Post)
   }
})


server.get('/posts', (req,res) =>{
    const {term} = req.query
    if(term){
        const search = posts.filter(item => item.contents === term)
        // const search2 = posts.filter(item =>  item.title.icludes(term))

       
        res.json(search)
        
    }else{
        res.json(posts)
    }
})


server.get('/posts/:author', (req,res) =>{
    const {author} = req.params
    const search = posts.filter(item => item.author === author)
    if(search.length){
        res.json(search)
    }else{
        res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"})
    }
})

server.get('/posts/:author/:title', (req,res) =>{
    const {author, title} = req.params
    const search = posts.filter(item => item.author  ===author && item.title === title)
    if(search.includes(author)&& search.includes(title)){
        res.json(search) 
    }else{
        res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"})
    }
})


server.put('/posts', (req,res) =>{
    const {id, title, contents} = req.body
    if(!id || !title || !contents){
        res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
    }else{
        const search = posts.findIndex(item => item.id === id)
        if(search !== -1){

           let updatedPost =  posts[search] = {
                ...search,
                ...req.body
            }
            res.json(updatedPost)
        }else{
            res.status(STATUS_USER_ERROR).json({error: "No se recibio el id correcto para modificar el Post"})
        }
    }
})


server.delete('/posts', (req,res) =>{
   const {id} = req.body
    const search = posts.findIndex(item => item.id === id)
   if(search !== -1){
       posts.splice(search,1)
       res.json({ success: true })
   }else{
       res.status(STATUS_USER_ERROR).json({error: "id not found or invalid"})
   }
})


server.delete('/posts', (req,res) =>{
   const {author} = req.body
   if(author){
        const searchDelete = posts.filter(item => item.author === author)
        // const restOfPosts = posts.filter(item => item.author !== author)
        // posts = restOfPosts
        if(searchDelete.includes(author)){
            res.json(searchDelete)
        }else{
            res.status(STATUS_USER_ERROR).json({error: "Author not found"})
        }
    }else{
        res.status(STATUS_USER_ERROR).json({error: "Author not found"})
    }
})

module.exports = { posts, server };

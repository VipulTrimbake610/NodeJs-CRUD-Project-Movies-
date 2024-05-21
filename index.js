const express = require('express');
const mongoose = require('mongoose');
const Movie = require('./model/MovieSchema')

const app = express();

app.use(express.json());

// CRUD Operations --> Create Read Update Delete
// Create 
app.post('/add-movie',async(req,res)=>{
    try{
        const movieObj = new Movie(req.body);
        await movieObj.save(); 
        res.status(201).send({
            status:201,
            message:"Movie Successfully Saved!"
        });
    }catch(err){
        res.status(400).send({
            status:400,
            message:"Unable to add movie!",
            data:err
        })
    }
})

// Read 
// Fetch All Movies
app.get('/movies',async(req,res)=>{
    try{
        const movies = await Movie.find();
        res.status(200).send({
            status:200,
            message:"Movies Fetched Successfully!",
            data:movies
        })

    }catch(err){
        res.status(400).send({
            status:400,
            message:"Unable to fetch movies",
            data:err
        })
    }
})

// Fetch Single Movie by its id
app.get('/movie/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const movie = await Movie.findById(id);
        res.status(200).send({
            status:200,
            message:"Movie Fetched Successfully!",
            data:movie
        })

    }catch(err){
        res.status(400).send({
            status:400,
            message:"Unable to fetch todo",
            data:err
        })
    }
})

// Update
app.put('/update-movie/:id',async(req,res)=>{
    const id = req.params.id;
    await Movie.findByIdAndUpdate(id,req.body);
    res.status(200).send({
        status:200,
        message:"Movie Updated Successfully!"
    })
})

// Delete
app.delete('/delete-movie/:id',async(req,res)=>{
    const id = req.params.id;
    await Movie.findByIdAndDelete(id);
    res.status(200).send({
        status:200,
        message:"Movie Deleted Successfully!"
    })
})

// MongoDB Connection 
const MONGO_URI = 'mongodb+srv://vipul:vipul@cluster0.ewkz292.mongodb.net/MovieApp?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(MONGO_URI)
.then(()=>console.log("MongoDB is Connected!"))
.catch((err)=>console.log(err))

// Backend Server Started on port 9000
app.listen(9000,()=>{
    console.log("Server is running on port : ", 9000);
})
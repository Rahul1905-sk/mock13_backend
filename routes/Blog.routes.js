const express = require('express');
const { BlogModel } = require('../model/Blog.model');

const blogRoutes = express.Router()


// to get all blogs

blogRoutes.get('/', async(req,res)=> {
  
    const {page, limit, title, category, sort, order} = req.query
    
    try {

if(title) {
    let posts = await BlogModel.find({userID:req.body.userID, title});
    res.status(200).send(posts)
 
    
} else if(category) {
    let posts = await BlogModel.find({userID:req.body.userID, category})
    res.status(200).send(posts)
    

} else if(order === 'asc' && sort) {
    let posts = await BlogModel.find({userID:req.body.userID}).sort({date:1})
    res.status(200).send(posts)
    

} else if(order === 'desc' && sort) {
    let posts = await BlogModel.find({userID:req.body.userID}).sort({date:-1})
    res.status(200).send(posts)
    

} else if(page && limit) {
    let posts = await BlogModel.find({userID:req.body.userID}).skip((page-1)*limit).limit(limit)
    res.status(200).send(posts)
    

} else {

    let posts = await BlogModel.find({userID:req.body.userID})
    res.status(200).send(posts)

}

    } catch (error) {
        res.status(400).send({err:error.message})
    }
})


// to add new blog
blogRoutes.post('/', async(req,res)=> {

    let today = new Date().toISOString().slice(0, 10)
    console.log(today)
    req.body.likes = 0
    req.body.comments = []
     
    try {
        let posts = new BlogModel({...req.body, date:today})
        await posts.save()
        res.status(200).send({msg:'Blog Added Successfully'})

    } catch (error) {
        res.status(400).send({err:error.message})
    }
})


// to update blog
 
blogRoutes.patch('/:id', async(req,res)=> {

    const {id} = req.params
      
    try {
     await BlogModel.findByIdAndUpdate({userID: req.body.userID ,_id: id}, req.body)
         
        res.status(200).send({msg:'Blog Updated Successfully'})

    } catch (error) {
        res.status(400).send({err:error.message})
    }
})



// to update blog likes
 
blogRoutes.patch('/:id/like', async(req,res)=> {

    const {id} = req.params
      
    try {
     await BlogModel.findByIdAndUpdate({userID: req.body.userID ,_id: id}, req.body)
         
        res.status(200).send({msg:'Like Updated Successfully'})

    } catch (error) {
        res.status(400).send({err:error.message})
    }
})




// to update blog comments
 
blogRoutes.patch('/:id/comment', async(req,res)=> {

    const {id} = req.params
      
    try {
     await BlogModel.findByIdAndUpdate({userID: req.body.userID ,_id: id}, req.body)
         
        res.status(200).send({msg:'Comment Updated Successfully'})

    } catch (error) {
        res.status(400).send({err:error.message})
    }
})


// to delete blog 
blogRoutes.delete('/:id', async(req,res)=> {

    const {id} = req.params
      
    try {
     await BlogModel.findByIdAndDelete({userID: req.body.userID ,_id: id})
         
        res.status(200).send({msg:'Blog Deleted Successfully'})

    } catch (error) {
        res.status(400).send({err:error.message})
    }
})








module.exports = {
    blogRoutes
}
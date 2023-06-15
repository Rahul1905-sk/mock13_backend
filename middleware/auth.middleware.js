const jwt = require('jsonwebtoken');

const auth = async(req,res,next) => {


    try {
        const t = req.headers.authorization
        const token = t?.split(" ")[1]
      
        if(token) {
            jwt.verify(token, 'rahul', async(err, decoded) => {
                    if(err) {
                        res.status(400).send({err:err.message})
                    } 
    
                    if(decoded) {
                        req.body.userID = decoded.userID
                        req.body.username = decoded.username
                       
                        next()
                    }
              });
        } else {
            res.status(200).send({msg:'Login First'})
        }
    
    } catch (err) {
        res.status(400).send({err:err.message})
    }
   
}


module.exports = {
    auth
}
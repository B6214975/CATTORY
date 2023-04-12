const jwt = require('jsonwebtoken')

exports.auth = (req,res,next) =>{
    try{
        const token = req.headers["authtoken"]
        if(!token){
            return res.status(401).send("no token, authorization denied")
        }
        const decoded = jwt.verify(token,"jwtSecret")
        

        console.log("Middleware: ",decoded)
        req.user = decoded.user
        next()
    }catch(err){
        console.log(err)
        res.status(400).send('Token Invalid!!!')
    }
}

exports.adminCheck = async(req,res,next) =>{
    try{
        const {username} = req.user
        const adminUser = await User.findOne({username}).exec()
        if(adminUser.role !== 'admin'){
            res.status(403).send(err,"Amin Access denied")
        }else{
            next()
        }
        
    }catch(err){
        console.log(err)
        res.status(400).send('Amin Access denied')
    }
}
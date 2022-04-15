import dbConnect from "../../../middleware/connectdb";
import User from "../../../models/users"
import mongoose from "mongoose";

dbConnect()

export default async(req,res) => {

    // console.log("Database instance : ",db)
    const {method} = req

    // console.log("The method is : ",method)
    // const users = new user(req.body)
    switch (method) {

        case 'POST':
            try{
                let stat = await User.create(req.body)

                if(!stat){
                    return res.status(400).json({success : false})
                }

                res.status(201).json({success : true,data : stat})

            }catch(err){
                res.status(400).json({success : false})
            }
            break;
        
            case 'GET':
                try{
                    let stat = await User.find({})
    
                    if(!stat){
                        return res.status(400).json({success : false})
                    }
    
                    res.status(200).json({success : true,data : stat})
    
                }catch(err){
                    res.status(400).json({success : false})
                }
                break;
    
        default:
            break;
    }
}
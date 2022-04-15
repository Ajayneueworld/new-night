import dbConnect from "../../../middleware/connectdb";
import User from "../../../models/users"
import mongoose from "mongoose";

dbConnect()

export default async(req,res) => {

    const {method,
        query: {address},
    } = req
    console.log("The query is : ",{address})
    switch (method) {

        case 'GET':
            try{
                let stat = await User.findOne({address})

                if(!stat){
                    return res.status(400).json({success : false})
                }

                res.status(201).json({success : true,data : stat})

            }catch(err){
                res.status(400).json({success : false})
            }
            break;
        
            case 'PUT':
                try{

                    let stat = await User.findOneAndUpdate({address} ,{$push : req.body},{
                        new : true,
                    })
    
                    if(!stat){
                        return res.status(400).json({success : false})
                    }
    
                    res.status(201).json({success : true,data : stat})
    
                }catch(err){
                    res.status(400).json({success : false})
                }
            break;
        default:
            break;
    }
}
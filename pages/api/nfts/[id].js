import dbConnect from "../../../middleware/connectdb";
import NFT from "../../../models/NFT"
import mongoose from "mongoose";

dbConnect()

export default async(req,res) => {

    const {method,
        query : {id}
    } = req
    console.log("The query is : ",req.query)
    switch (method) {

        case 'GET':
            try{
                let stat = await NFT.findById(id)
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
    
                    let stat = await NFT.findByIdAndUpdate(id ,{$inc : {"vote" : 1}},
                    {multi : false})
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
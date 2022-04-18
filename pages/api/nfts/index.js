import dbConnect from "../../../middleware/connectdb";
import NFT from "../../../models/NFT"
import mongoose from "mongoose";

dbConnect()

export default async(req,res) => {

    const {method,query} = req
    console.log("The query is : ",req.body.search)
    switch (method) {

        case 'POST':
            try{
                let stat = await NFT.create(req.body)

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
                let stat = await NFT.find({})

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
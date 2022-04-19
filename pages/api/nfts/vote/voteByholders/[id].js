import dbConnect from "../../../../../middleware/connectdb";
import NFT from "../../../../../models/NFT"

dbConnect()


export default async(req,res) => {

    const {method,
        query : {id}
    } = req
    console.log(req)
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
            

                    let stat = await NFT.findByIdAndUpdate(id ,{$inc : {"voteByholders" : 1}},
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
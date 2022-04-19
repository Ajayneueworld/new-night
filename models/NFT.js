const mongoose = require('mongoose')

const NFTstruct = new mongoose.Schema(
    
    {       
        address : {
                type : String,
                unique : true
            },
        name : {
                type : String,
                unique : true
            },
        symbol : { 
                type : String,
                unique : true
            },

        voteByholders : {
                type : Number,
                default : 0
            },
        voteByNonholders : {
                type : Number,
                default : 0
            },
        signatures : {
            type : [String],
            default : null
            
        }
    }
)

module.exports = mongoose.models.NFT || mongoose.model('NFT', NFTstruct);


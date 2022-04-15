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

        vote : {
                type : Number,
                default : 0
            }
    }
)

module.exports = mongoose.models.NFT || mongoose.model('NFT', NFTstruct);


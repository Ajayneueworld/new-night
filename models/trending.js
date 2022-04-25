const mongoose = require('mongoose')

const TrendingNFTstruct = new mongoose.Schema({
    
    address : {
        type : String,
        unique : true
    },
    name : {
        type : String,
        unique : true
    },

    stats : {
        totalSales: Number,
        average : mongoose.Types.Decimal128,
        ceiling : mongoose.Types.Decimal128,
        floor : mongoose.Types.Decimal128,
        volume: mongoose.Types.Decimal128
        
    },
    symbol : {
        type : String,
        unique : true
    }
})

module.exports = mongoose.models.Trending || mongoose.model('Trending',TrendingNFTstruct);

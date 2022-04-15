import mongoose from 'mongoose';
import NFT from "./NFT";

var user = new mongoose.Schema({
  address : {
    type : String,
    unique : true,
    index : true
  },
  votingHistory: {
    type : [mongoose.Schema.ObjectId],
    ref : NFT,
    default : null
  }
});

module.exports = mongoose.models.User || mongoose.model('User',user)

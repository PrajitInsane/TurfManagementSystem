const mongoose= require('mongoose');
const TurfSchema= mongoose.Schema({
    turf_name:{type:String,required:true},
    turf_manager:{type:String,required:true},
    turf_location:{type:String,required:true},
    turf_contact:{type:Number,required:true , unique:true},
    turf_email:{type:String,required:true , unique:true},
    turf_price:{type:Number,required:true}
},{
    timestamps:true
});

module.exports=mongoose.model('Turf',TurfSchema);
const mongoose = require('mongoose')

const PeriodSchema = new mongoose.Schema(
    {
    date:{
        type:String,
        default:'1 ตุลาคม 2022',
    }
},
{timestamps: true}
);

module.exports = Period = mongoose.model("period",PeriodSchema);
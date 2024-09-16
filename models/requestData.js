import { mongoose } from "mongoose"

const requestDataSchema = new mongoose.Schema({

    TotalReqs: {
        type: Number,
        default: 0,
    },
    
    monthlyReqs: {
        type: Number,
        default: 0,
    },
    failedReqs: {
        type: Number,
        default: 0,
    },

},
);

const RequestsData = mongoose.models.requestsdata || mongoose.model('requestsdata', requestDataSchema);

export default RequestsData;
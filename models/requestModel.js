import { mongoose } from "mongoose"

const requestSchema = new mongoose.Schema({

    Imei: {
        type: String,
    },
    Date: {
        type: String,
    },
    Time: {
        type: String,
    },
    latitude: {
        type: String,
    },
    longitude: {
        type: String,
    },
    status: {
        type: String,
        default: "success",
    },
    reqType:{
        type: String,
        default: "NRM"
    }


},
);

const Requests = mongoose.models.requests || mongoose.model('requests', requestSchema);

export default Requests;
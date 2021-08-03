import mongoose from 'mongoose'

const whatsAppSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    recieved: Boolean,
});

export default mongoose.model('messagecontent', whatsAppSchema);
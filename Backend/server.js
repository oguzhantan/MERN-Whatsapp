//importing
import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from 'pusher'
import Cors from 'cors'

//app config
const app = express();
const port = process.env.PORT || 9000
//99odIWlTTXZCSPd0

//pusher
const pusher = new Pusher({
  appId: "1203589",
  key: "76ef90196474ff06cd1c",
  secret: "e7e533f3092a08c40c1d",
  cluster: "eu",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});

//middleware 
app.use(express.json());
app.use(Cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
})

//DB Config
const connection_url = 'mongodb+srv://admin:99odIWlTTXZCSPd0@cluster0.dd5yo.mongodb.net/whatsappdb?retryWrites=true&w=majority';
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.once("once", () => {
    console.log("DB Connected");
    
    const msgCollection = db.collection("messagecontent");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        console.log(change);
        
        if (change.operationType === "insert") {
            const messageDetails = change.fullDocument;
            pusher.trigger("messages", "inserted",
                {
                   name: messageDetails.user,
                   message: messageDetails.message,
                   timestamp: messageDetails.timestamp,
                   received:messageDetails.received,
                }
            );
        } else {
            console.log("Error Trigger Pusher");
        }

    }) 
})

//API Routes
app.get('/', (req, res) => res.status(200).send('Message recieved'))

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    });
});

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

//listen 
app.listen(port, () => console.log(`Listening on localhost:${port}`));
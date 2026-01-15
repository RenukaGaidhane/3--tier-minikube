const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({
   origin: '*',
   methods: ['GET', 'POST', 'DELETE'], 
   credentials: true               
}));

app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo-service:27017/reactdb";

mongoose.connect(MONGO_URI)
 .then(() => console.log(' MongoDB connected'))
 .catch(err => console.error('MongoDB connection error:', err));


const ItemSchema = new mongoose.Schema({
    name: String
});
const Item = mongoose.model('Item', ItemSchema);

app.get('/api/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

app.post('/api/items', async (req, res) => {
    const newItem = new Item({ name: req.body.name });
    await newItem.save();
    res.json(newItem);
});

app.delete('/api/items/:id', async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
     console.log('Backend running on port ${PORT}');
});

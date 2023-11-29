const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4623;

// MongoDB Atlas connection setup
mongoose.connect('mongodb+srv://harinadh14:N%40dh2306@atlascluster.9fb52n9.mongodb.net/userdata', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



// Define schema for file documents
const fileSchema = new mongoose.Schema({
  filename: String,
  originalName: String,
  mimeType: String,
  url: String,
});



const File = mongoose.model('File', fileSchema); // Assuming you have a fileSchema defined

// API endpoint to retrieve file data
app.get('/:id', async (req, res) => {
  try {
    const fileId = req.params.id;
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.sendFile(path.join(__dirname, file.url)); // Serve the file
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


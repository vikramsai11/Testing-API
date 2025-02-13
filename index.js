const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.json());

// Sample student data
const students = [
  {
    "student_id": "1",
    "name": "Alice Johnson",
    "marks": {
      "math": 85,
      "science": 90,
      "english": 78,
      "history": 88,
      "geography": 92
    },
    "total": 433
  },
  {
    "student_id": "2",
    "name": "Bob Smith",
    "marks": {
      "math": 75,
      "science": 80,
      "english": 70,
      "history": 85,
      "geography": 90
    },
    "total": 410
  },
  {
    "student_id": "3",
    "name": "Charlie Davis",
    "marks": {
      "math": 65,
      "science": 70,
      "english": 68,
      "history": 75,
      "geography": 78
    },
    "total": 356
  }
];

app.post('/students/above-threshold', (req, res) => {
  const { threshold } = req.body;

  // Validate threshold
  if (typeof threshold !== 'number' || threshold < 0) {
    return res.status(400).json({
      error: 'Invalid threshold value. Please provide a positive number.'
    });
  }

  // Filter students whose total marks are above the threshold
  const filteredStudents = students.filter(student => student.total > threshold);

  // Send response
  res.json({
    count: filteredStudents.length,
    students: filteredStudents.map(student => ({
      name: student.name,
      total: student.total
    }))
  });
});

// Serve static files (like the index.html) for other routes if necessary
app.use(express.static('static'));
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
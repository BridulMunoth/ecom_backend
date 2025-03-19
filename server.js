const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes'); // Ensure the file exists and is correctly exported

const app = express();

// Middleware
app.use(cors(
    {
        origin: function (origin, callback) {
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
        credentials: true, // Allows cookies and authentication headers if needed
        }
));

app.use(express.json());


// Connect to the database
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const port = 3000;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

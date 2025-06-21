const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
const dbPath = path.join(__dirname, "db.json");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; font-src 'self'; style-src 'self'; script-src 'self';"
  );
  next();
});

// Utility: Read DB
function readDB() {
  if (!fs.existsSync(dbPath)) return { users: [], contacts: [] }; // Return empty arrays for both users and contacts
  const raw = fs.readFileSync(dbPath);
  return JSON.parse(raw);
}

// Utility: Write DB
function writeDB(data) {
  try {
    console.log("Writing to DB...");
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    console.log("Data written successfully to db.json.");
  } catch (err) {
    console.error("Error writing to db.json:", err);
  }
}



// Contact form route
app.post("/contact", (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Simple validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Read DB and get the contacts array
    const data = readDB();

    // Ensure contacts array exists
    if (!data.contacts) {
      data.contacts = []; // Initialize contacts if not already present
    }

    const contacts = data.contacts;

    // Create a new contact object
    const newContact = {
      id: contacts.length + 1, // Adding a new contact ID based on length
      name,
      email,
      message,
    };

    // Add the new contact to the contacts array
    contacts.push(newContact);

    // Write updated data back to db.json
    writeDB(data); // Ensure this is being called properly

    res.json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error) {
    console.error("Error in /contact route:", error); // Log the error
    res.status(500).json({ error: "Something went wrong on the server." });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

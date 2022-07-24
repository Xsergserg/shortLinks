const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = config.get('port');

app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth_routes'));
app.use('/api/link', require('./routes/link_routes'));
app.use('/to', require('./routes/redirect_routes'));

async function start() {
    try {
        await mongoose.connect(config.get('mongoUrl'), {
            useNewUrlParser: true,
            user: config.get('user'),
            pass: config.get('pass')
        })
        app.listen(PORT, () => console.log(`App started on port ${PORT}`));
    } catch (e) {
        console.log("Server error", e.message);
        process.exit(1);
    }
}

start();
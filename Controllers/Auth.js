const bcrypt = require('bcrypt');
const ContactMessage = require("../Models/contactmessages");
const Signup = require("../Models/Signup");

require("dotenv").config()

// signup
exports.signup = async (req, res) => {
    try {
        const { userType, firstName, lastName, email, password, confirmPassword, onlineOffline, licenseNumber, specialization, customSpecialization } = req.body;

        // Validate password match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new User instance
        const user = new Signup({
            userType,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            onlineOffline,
            licenseNumber,
            specialization,
            customSpecialization,
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
// login

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = await Signup.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'User Not Found' });
        }
        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//ContactUs

exports.ContactUs = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // Save the contact form message to the database
        const Message = new ContactMessage({ name, email, message });
        await Message.save();

        // console.log('Contact Form Submission:', { name, email, message });

        res.status(200).json({ message: 'Contact form submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

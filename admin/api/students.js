// Student Management API
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

// In-memory student storage (replace with database in production)
let students = [];

// Create new student
router.post('/students', async (req, res) => {
    try {
        const { name, email, phone, courseId } = req.body;
        
        // Validate input
        if (!name || !email || !phone || !courseId) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        // Check if student already exists
        const existingStudent = students.find(s => s.email === email);
        if (existingStudent) {
            return res.status(400).json({ error: 'Student already exists' });
        }
        
        // Generate student ID and password
        const studentId = `STU${Date.now().toString().slice(-6)}`;
        const tempPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(tempPassword, 10);
        
        const newStudent = {
            id: uuidv4(),
            studentId,
            name,
            email,
            phone,
            courseId,
            password: hashedPassword,
            createdAt: new Date(),
            courses: [courseId],
            progress: {}
        };
        
        students.push(newStudent);
        
        // Send back student info (exclude password)
        const { password, ...studentInfo } = newStudent;
        res.status(201).json({
            ...studentInfo,
            tempPassword
        });
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ error: 'Failed to create student' });
    }
});

// Get all students
router.get('/students', (req, res) => {
    try {
        // Return students without sensitive info
        const safeStudents = students.map(({ password, ...student }) => student);
        res.json(safeStudents);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Failed to fetch students' });
    }
});

// Get student by ID
router.get('/students/:id', (req, res) => {
    try {
        const student = students.find(s => s.id === req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        const { password, ...studentInfo } = student;
        res.json(studentInfo);
    } catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({ error: 'Failed to fetch student' });
    }
});

// Update student
router.put('/students/:id', async (req, res) => {
    try {
        const studentIndex = students.findIndex(s => s.id === req.params.id);
        if (studentIndex === -1) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        const { name, email, phone, courseId } = req.body;
        const updatedStudent = {
            ...students[studentIndex],
            name: name || students[studentIndex].name,
            email: email || students[studentIndex].email,
            phone: phone || students[studentIndex].phone,
            courseId: courseId || students[studentIndex].courseId,
            updatedAt: new Date()
        };
        
        students[studentIndex] = updatedStudent;
        
        const { password, ...studentInfo } = updatedStudent;
        res.json(studentInfo);
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ error: 'Failed to update student' });
    }
});

// Delete student
router.delete('/students/:id', (req, res) => {
    try {
        const studentIndex = students.findIndex(s => s.id === req.params.id);
        if (studentIndex === -1) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        students.splice(studentIndex, 1);
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ error: 'Failed to delete student' });
    }
});

// Verify student credentials
router.post('/verify-student', async (req, res) => {
    try {
        const { studentId, password } = req.body;
        
        const student = students.find(s => s.studentId === studentId);
        if (!student) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const validPassword = await bcrypt.compare(password, student.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const { password: _, ...studentInfo } = student;
        res.json(studentInfo);
    } catch (error) {
        console.error('Error verifying student:', error);
        res.status(500).json({ error: 'Authentication failed' });
    }
});

// Get student's courses
router.get('/student-courses/:studentId', (req, res) => {
    try {
        const student = students.find(s => s.id === req.params.studentId);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        // Get courses with progress
        const courses = student.courses.map(courseId => ({
            id: courseId,
            progress: student.progress[courseId] || 0
        }));
        
        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
});

// Update student progress
router.put('/student-progress/:studentId', (req, res) => {
    try {
        const { courseId, progress } = req.body;
        const student = students.find(s => s.id === req.params.studentId);
        
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        if (!student.courses.includes(courseId)) {
            return res.status(400).json({ error: 'Student not enrolled in this course' });
        }
        
        student.progress[courseId] = progress;
        res.json({ success: true, progress: student.progress });
    } catch (error) {
        console.error('Error updating progress:', error);
        res.status(500).json({ error: 'Failed to update progress' });
    }
});

// Get student's upcoming classes
router.get('/student-classes/:studentId', (req, res) => {
    try {
        const student = students.find(s => s.id === req.params.studentId);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        // Mock upcoming classes (replace with actual data)
        const classes = [
            {
                id: 1,
                title: 'Advanced Accounting Concepts',
                date: '2025-01-15',
                time: '10:00 AM',
                meetingLink: 'https://meet.google.com/xyz'
            },
            {
                id: 2,
                title: 'Business Case Studies',
                date: '2025-01-16',
                time: '2:00 PM',
                meetingLink: 'https://meet.google.com/abc'
            }
        ];
        
        res.json(classes);
    } catch (error) {
        console.error('Error fetching classes:', error);
        res.status(500).json({ error: 'Failed to fetch classes' });
    }
});

module.exports = router;

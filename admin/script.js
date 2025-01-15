// Admin credentials (for demo only)
const ADMIN_EMAIL = 'admin123@gmail.com';
const ADMIN_PASSWORD = 'admin123';

// DOM Elements
const loadingSpinner = document.getElementById('loadingSpinner');
const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const togglePasswordBtn = document.getElementById('togglePassword');
const navLinks = document.querySelectorAll('.nav-link[data-page]');
const contentSections = document.querySelectorAll('.content-section');

// Show/Hide Loading Spinner
function showLoading() {
    loadingSpinner.style.display = 'flex';
}

function hideLoading() {
    loadingSpinner.style.display = 'none';
}

// Toggle Password Visibility
togglePasswordBtn.addEventListener('click', () => {
    const passwordInput = document.getElementById('password');
    const icon = togglePasswordBtn.querySelector('i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
});

// Login Form Handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const spinner = submitBtn.querySelector('.spinner-border');
    
    // Disable form submission
    submitBtn.disabled = true;
    spinner.classList.remove('d-none');
    loginError.classList.add('d-none');
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            localStorage.setItem('isLoggedIn', 'true');
            showDashboard();
        } else {
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        loginError.textContent = error.message;
        loginError.classList.remove('d-none');
    } finally {
        submitBtn.disabled = false;
        spinner.classList.add('d-none');
    }
});

// Logout Handler
logoutBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    showLoading();
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        localStorage.removeItem('isLoggedIn');
        showLogin();
    } finally {
        hideLoading();
    }
});

// Navigation Handler
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = e.target.closest('.nav-link').dataset.page;
        
        // Update active state
        navLinks.forEach(l => l.classList.remove('active'));
        e.target.closest('.nav-link').classList.add('active');
        
        // Show corresponding content
        contentSections.forEach(section => {
            section.classList.add('d-none');
            if (section.id === `${targetPage}Content`) {
                section.classList.remove('d-none');
                section.classList.add('fade-in');
            }
        });
    });
});

// Initialize Statistics
function initializeStats() {
    const stats = [
        { id: 'totalStudents', value: 150, prefix: '', suffix: '' },
        { id: 'activeCourses', value: 12, prefix: '', suffix: '' },
        { id: 'totalRevenue', value: 50000, prefix: '₹', suffix: '' },
        { id: 'newInquiries', value: 25, prefix: '', suffix: '' }
    ];
    
    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        if (element) {
            animateNumber(element, stat.value, stat.prefix, stat.suffix);
        }
    });
}

// Number Animation
function animateNumber(element, target, prefix = '', suffix = '') {
    let current = 0;
    const increment = target / 50; // Adjust for smoother animation
    const duration = 1500; // Animation duration in milliseconds
    const stepTime = duration / 50;
    
    const updateNumber = () => {
        current += increment;
        if (current > target) current = target;
        
        element.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
        
        if (current < target) {
            setTimeout(updateNumber, stepTime);
        }
    };
    
    updateNumber();
}

// Show Dashboard
function showDashboard() {
    loginSection.style.display = 'none';
    dashboardSection.classList.remove('d-none');
    dashboardSection.classList.add('fade-in');
    initializeStats();
}

// Show Login
function showLogin() {
    dashboardSection.classList.add('d-none');
    loginSection.style.display = 'flex';
    loginForm.reset();
}

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', () => {
    // Check login state
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
        showDashboard();
    } else {
        showLogin();
    }
    
    hideLoading();
});

// Add Course Modal Handler
document.getElementById('addCourseBtn')?.addEventListener('click', () => {
    // Implement add course functionality
    alert('Add course functionality will be implemented here');
});

// Table Action Handlers
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        const action = e.target.textContent.toLowerCase();
        switch (action) {
            case 'edit':
                alert('Edit functionality will be implemented');
                break;
            case 'delete':
                if (confirm('Are you sure you want to delete this item?')) {
                    alert('Delete functionality will be implemented');
                }
                break;
            case 'view':
                alert('View details functionality will be implemented');
                break;
            case 'respond':
                alert('Response functionality will be implemented');
                break;
        }
    }
});

// Stats Counter Animation
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize stats animation
document.querySelectorAll('.card-text').forEach(stat => {
    const value = parseInt(stat.textContent);
    if (!isNaN(value)) {
        animateValue(stat, 0, value, 1000);
    }
});

// Student Management
let currentStudentId = null;
const studentModal = new bootstrap.Modal(document.getElementById('studentModal'));
const viewStudentModal = new bootstrap.Modal(document.getElementById('viewStudentModal'));

// Sample student data (replace with database)
let students = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        course: 'Advanced Accounts',
        joinDate: '2024-01-01',
        status: 'Active',
        address: '123 Main St, City',
        notes: 'Good student',
        performance: [
            { month: 'January', attendance: '90%', performance: 'Excellent', remarks: 'Very attentive' },
            { month: 'February', attendance: '85%', performance: 'Good', remarks: 'Needs more practice' }
        ]
    }
];

// View Student
function viewStudent(btn) {
    const row = btn.closest('tr');
    const student = students.find(s => s.name === row.cells[0].textContent);
    
    if (student) {
        currentStudentId = student.id;
        document.getElementById('viewName').textContent = student.name;
        document.getElementById('viewEmail').textContent = student.email;
        document.getElementById('viewPhone').textContent = student.phone;
        document.getElementById('viewCourse').textContent = student.course;
        document.getElementById('viewJoinDate').textContent = student.joinDate;
        document.getElementById('viewStatus').textContent = student.status;
        document.getElementById('viewAddress').textContent = student.address;
        document.getElementById('viewNotes').textContent = student.notes;

        // Update performance table
        const performanceBody = document.getElementById('performanceTableBody');
        performanceBody.innerHTML = student.performance.map(p => `
            <tr>
                <td>${p.month}</td>
                <td>${p.attendance}</td>
                <td>${p.performance}</td>
                <td>${p.remarks}</td>
            </tr>
        `).join('');

        viewStudentModal.show();
    }
}

// Edit Student
function editStudent(btn) {
    const row = btn.closest('tr');
    const student = students.find(s => s.name === row.cells[0].textContent);
    
    if (student) {
        currentStudentId = student.id;
        document.getElementById('studentModalTitle').textContent = 'Edit Student';
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentEmail').value = student.email;
        document.getElementById('studentPhone').value = student.phone;
        document.getElementById('studentCourse').value = student.course;
        document.getElementById('studentJoinDate').value = student.joinDate;
        document.getElementById('studentStatus').value = student.status;
        document.getElementById('studentAddress').value = student.address;
        document.getElementById('studentNotes').value = student.notes;

        studentModal.show();
    }
}

// Edit from View Modal
function editCurrentStudent() {
    viewStudentModal.hide();
    const student = students.find(s => s.id === currentStudentId);
    if (student) {
        editStudent({ closest: () => ({ cells: [{ textContent: student.name }] }) });
    }
}

// Delete Student
function deleteStudent(btn) {
    if (confirm('Are you sure you want to delete this student?')) {
        const row = btn.closest('tr');
        const studentName = row.cells[0].textContent;
        students = students.filter(s => s.name !== studentName);
        row.remove();
    }
}

// Save Student
document.getElementById('saveStudentBtn').addEventListener('click', () => {
    const studentData = {
        id: currentStudentId || students.length + 1,
        name: document.getElementById('studentName').value,
        email: document.getElementById('studentEmail').value,
        phone: document.getElementById('studentPhone').value,
        course: document.getElementById('studentCourse').value,
        joinDate: document.getElementById('studentJoinDate').value,
        status: document.getElementById('studentStatus').value,
        address: document.getElementById('studentAddress').value,
        notes: document.getElementById('studentNotes').value,
        performance: [] // New students start with empty performance history
    };

    if (currentStudentId) {
        // Update existing student
        const index = students.findIndex(s => s.id === currentStudentId);
        if (index !== -1) {
            students[index] = { ...students[index], ...studentData };
            updateStudentRow(studentData);
        }
    } else {
        // Add new student
        students.push(studentData);
        addStudentRow(studentData);
    }

    studentModal.hide();
    document.getElementById('studentForm').reset();
    currentStudentId = null;
});

// Add new student row to table
function addStudentRow(student) {
    const tbody = document.querySelector('#studentsTable tbody');
    const row = tbody.insertRow();
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.course}</td>
        <td>${student.phone}</td>
        <td>${student.joinDate}</td>
        <td><span class="badge bg-${student.status === 'Active' ? 'success' : 'warning'}">${student.status}</span></td>
        <td>
            <button class="btn btn-sm btn-info" onclick="viewStudent(this)">View</button>
            <button class="btn btn-sm btn-warning" onclick="editStudent(this)">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteStudent(this)">Delete</button>
        </td>
    `;
}

// Update existing student row
function updateStudentRow(student) {
    const rows = document.querySelectorAll('#studentsTable tbody tr');
    for (const row of rows) {
        if (row.cells[0].textContent === student.name) {
            row.cells[1].textContent = student.course;
            row.cells[2].textContent = student.phone;
            row.cells[3].textContent = student.joinDate;
            row.cells[4].innerHTML = `<span class="badge bg-${student.status === 'Active' ? 'success' : 'warning'}">${student.status}</span>`;
            break;
        }
    }
}

// Reset form when modal is closed
document.getElementById('studentModal').addEventListener('hidden.bs.modal', () => {
    document.getElementById('studentForm').reset();
    document.getElementById('studentModalTitle').textContent = 'Add New Student';
    currentStudentId = null;
});

// Quick Action Button Handlers
const quickActionButtons = {
    'addCourse': () => showModal('addCourseModal'),
    'addStudent': () => showModal('addStudentModal'),
    'scheduleClass': () => showModal('scheduleClassModal'),
    'sendNotification': () => showModal('notificationModal')
};

// Initialize Quick Action Buttons
document.querySelectorAll('.quick-action-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const action = button.dataset.action;
        if (quickActionButtons[action]) {
            quickActionButtons[action]();
        }
    });
});

// Modal Handler
function showModal(modalId) {
    const modal = new bootstrap.Modal(document.getElementById(modalId));
    modal.show();
}

// Form Handlers
document.getElementById('addCourseForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        name: document.getElementById('courseName').value,
        description: document.getElementById('courseDescription').value,
        price: document.getElementById('coursePrice').value,
        duration: document.getElementById('courseDuration').value
    };
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Course added:', formData);
        bootstrap.Modal.getInstance(document.getElementById('addCourseModal')).hide();
        showToast('Success', 'Course added successfully!');
        e.target.reset();
    } catch (error) {
        showToast('Error', 'Failed to add course. Please try again.');
    }
});

async function addStudent(formData) {
    try {
        const response = await fetch('/admin/api/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to add student');
        }
        
        const newStudent = await response.json();
        
        // Show student credentials modal
        showStudentCredentials(newStudent.studentId, newStudent.tempPassword);
        
        return newStudent;
    } catch (error) {
        throw error;
    }
}

function showStudentCredentials(studentId, tempPassword) {
    const credentialsHtml = `
        <div class="alert alert-info">
            <h6 class="alert-heading mb-3">Student Credentials</h6>
            <p class="mb-2"><strong>Student ID:</strong> ${studentId}</p>
            <p class="mb-2"><strong>Temporary Password:</strong> ${tempPassword}</p>
            <hr>
            <small class="mb-0">Please provide these credentials to the student securely.</small>
        </div>
    `;
    
    showToast('Student Added', 'New student has been added successfully. Credentials generated.');
    
    // Add credentials to the modal
    const modalBody = document.querySelector('#addStudentModal .modal-body');
    modalBody.insertAdjacentHTML('afterbegin', credentialsHtml);
}

document.getElementById('addStudentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('studentName').value,
        email: document.getElementById('studentEmail').value,
        phone: document.getElementById('studentPhone').value,
        courseId: document.getElementById('selectedCourse').value
    };
    
    try {
        const newStudent = await addStudent(formData);
        console.log('Student added:', newStudent);
    } catch (error) {
        showToast('Error', 'Failed to add student. Please try again.');
    }
});

document.getElementById('scheduleClassForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        title: document.getElementById('classTitle').value,
        date: document.getElementById('classDate').value,
        time: document.getElementById('classTime').value,
        duration: document.getElementById('classDuration').value
    };
    
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Class scheduled:', formData);
        bootstrap.Modal.getInstance(document.getElementById('scheduleClassModal')).hide();
        showToast('Success', 'Class scheduled successfully!');
        e.target.reset();
    } catch (error) {
        showToast('Error', 'Failed to schedule class. Please try again.');
    }
});

document.getElementById('notificationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        type: document.getElementById('notificationType').value,
        title: document.getElementById('notificationTitle').value,
        message: document.getElementById('notificationMessage').value,
        recipients: document.getElementById('notificationRecipients').value
    };
    
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Notification sent:', formData);
        bootstrap.Modal.getInstance(document.getElementById('notificationModal')).hide();
        showToast('Success', 'Notification sent successfully!');
        e.target.reset();
    } catch (error) {
        showToast('Error', 'Failed to send notification. Please try again.');
    }
});

// Toast Notification
function showToast(title, message) {
    const toastContainer = document.createElement('div');
    toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
    toastContainer.style.zIndex = '11';
    
    const toastHtml = `
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">${title}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    
    toastContainer.innerHTML = toastHtml;
    document.body.appendChild(toastContainer);
    
    const toastElement = toastContainer.querySelector('.toast');
    const toast = new bootstrap.Toast(toastElement);
    
    toast.show();
    
    toastElement.addEventListener('hidden.bs.toast', () => {
        document.body.removeChild(toastContainer);
    });
}

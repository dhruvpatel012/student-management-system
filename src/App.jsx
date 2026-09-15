import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './Dashboard';
import Students from './Students';
import StudentModal from './components/StudentModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';

// API base endpoint for JSON Server
const API_URL = 'http://localhost:3000/students';

// Main App container managing data fetching, CRUD operations, Toast feedback, and responsive layout
function App() {
  // Navigation state: 'dashboard' or 'students'
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  // Mobile responsive sidebar drawer state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Central student records state
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add/Edit modal state & active student being edited
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);

  // Custom Delete confirmation modal state
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success', // 'success' | 'error' | 'info'
  });

  // Helper to trigger small modern SaaS toast notifications
  const showToast = (message, type = 'success') => {
    setToast({
      show: true,
      message,
      type,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  // Fetch students from JSON Server when the page loads
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      console.error('Error fetching students:', err);
      const errorMessage = err.message || 'Unable to connect to JSON Server';
      setError(errorMessage);
      showToast('Could not connect to JSON Server. Ensure backend is running.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Initial data load on mount
  useEffect(() => {
    fetchStudents();
  }, []);

  // Unified save handler: handles Create (POST) and Update (PUT) with Toast feedback
  const handleSaveStudent = async (studentData) => {
    try {
      if (studentToEdit) {
        // UPDATE operation: PUT to http://localhost:3000/students/:id
        const response = await fetch(`${API_URL}/${studentToEdit.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...studentData,
            id: studentToEdit.id,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update student on server');
        }

        const updatedStudent = await response.json();

        // Update the existing student in React state
        setStudents((prev) =>
          prev.map((student) =>
            student.id === updatedStudent.id ? updatedStudent : student
          )
        );

        // Close modal and show success toast
        setIsModalOpen(false);
        setStudentToEdit(null);
        showToast('Student updated successfully', 'success');
      } else {
        // CREATE operation: POST to http://localhost:3000/students
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(studentData),
        });

        if (!response.ok) {
          throw new Error('Failed to create student on server');
        }

        const createdStudent = await response.json();

        // Append new student to React state
        setStudents((prev) => [...prev, createdStudent]);

        // Close modal and show success toast
        setIsModalOpen(false);
        setStudentToEdit(null);
        showToast('Student added successfully', 'success');
      }
    } catch (err) {
      console.error('Error saving student:', err);
      showToast(err.message || 'Something went wrong. Please try again.', 'error');
    }
  };

  // Trigger custom in-app delete confirmation modal
  const handleRequestDelete = (student) => {
    setStudentToDelete(student);
  };

  // Confirmed DELETE operation: DELETE http://localhost:3000/students/:id
  const handleConfirmDelete = async () => {
    if (!studentToDelete) return;

    setDeleting(true);
    try {
      const response = await fetch(`${API_URL}/${studentToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete student on server');
      }

      // Remove deleted student from local state
      setStudents((prev) =>
        prev.filter((student) => student.id !== studentToDelete.id)
      );

      // Close modal and show success toast
      setStudentToDelete(null);
      showToast('Student deleted successfully', 'success');
    } catch (err) {
      console.error('Error deleting student:', err);
      showToast(err.message || 'Failed to delete student record.', 'error');
    } finally {
      setDeleting(false);
    }
  };

  // Open modal in "Add" mode
  const handleOpenAddModal = () => {
    setStudentToEdit(null);
    setIsModalOpen(true);
  };

  // Open modal in "Edit" mode
  const handleOpenEditModal = (student) => {
    setStudentToEdit(student);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Navigation Sidebar (Desktop rail + Mobile drawer) */}
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          currentPage={currentPage}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />

        {/* Comfortable responsive padding */}
        <main className="flex-1 p-3.5 sm:p-6 md:p-8">
          {currentPage === 'dashboard' ? (
            <Dashboard
              students={students}
              loading={loading}
              error={error}
              onRetry={fetchStudents}
              onNavigateToStudents={() => setCurrentPage('students')}
            />
          ) : (
            <Students
              students={students}
              loading={loading}
              onOpenAddModal={handleOpenAddModal}
              onEditStudent={handleOpenEditModal}
              onDeleteStudent={handleRequestDelete}
            />
          )}
        </main>
      </div>

      {/* Add / Edit Student Modal */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setStudentToEdit(null);
        }}
        onSubmit={handleSaveStudent}
        studentToEdit={studentToEdit}
      />

      {/* Custom SaaS Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(studentToDelete)}
        student={studentToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setStudentToDelete(null)}
        deleting={deleting}
      />

      {/* Modern SaaS Toast Notification */}
      <Toast toast={toast} onClose={hideToast} />
    </div>
  );
}

export default App;

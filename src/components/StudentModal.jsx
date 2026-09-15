import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, BookOpen, Calendar, Save, AlertCircle } from 'lucide-react';

// StudentModal component with custom form validation and responsive controls
function StudentModal({ isOpen, onClose, onSubmit, studentToEdit }) {
  // Form input state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    year: '1st Year',
  });

  // Validation error state for each field
  const [errors, setErrors] = useState({});

  // Submitting indicator
  const [submitting, setSubmitting] = useState(false);

  // Common course and year options
  const courseOptions = ['BCA', 'B.Tech', 'MCA', 'B.Sc CS', 'B.Com', 'M.Tech'];
  const yearOptions = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  // Initialize or reset form data and validation errors
  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        name: studentToEdit.name || '',
        email: studentToEdit.email || '',
        phone: studentToEdit.phone || '',
        course: studentToEdit.course || courseOptions[0],
        year: studentToEdit.year || yearOptions[0],
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        course: courseOptions[0],
        year: yearOptions[0],
      });
    }
    setErrors({});
  }, [studentToEdit, isOpen]);

  // Handle field change and clear related validation error
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Basic validation rules (Required, valid email, exactly 10 digits phone)
  const validateForm = () => {
    const newErrors = {};

    // Validate Name
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate Phone (must be exactly 10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    // Validate Course & Year
    if (!formData.course) {
      newErrors.course = 'Please select a course';
    }
    if (!formData.year) {
      newErrors.year = 'Please select an academic year';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler with validation check
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        status: studentToEdit?.status || 'Active',
      });
      onClose();
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs transition-opacity overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-lg my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              {studentToEdit ? 'Edit Student Details' : 'Add New Student'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {studentToEdit
                ? 'Update academic information for this student'
                : 'Enter student information to enroll them in the system'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} noValidate className="p-6 space-y-4">
          {/* Full Name Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border rounded-lg text-sm text-slate-800 focus:outline-none focus:bg-white transition-all ${
                  errors.name
                    ? 'border-rose-400 focus:ring-2 focus:ring-rose-400 bg-rose-50/20'
                    : 'border-slate-200 focus:ring-2 focus:ring-blue-500'
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-rose-500 flex items-center space-x-1 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Email Address Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. rahul@example.com"
                className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border rounded-lg text-sm text-slate-800 focus:outline-none focus:bg-white transition-all ${
                  errors.email
                    ? 'border-rose-400 focus:ring-2 focus:ring-rose-400 bg-rose-50/20'
                    : 'border-slate-200 focus:ring-2 focus:ring-blue-500'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-rose-500 flex items-center space-x-1 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Phone Number Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Phone Number (10 Digits) *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                name="phone"
                maxLength="10"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border rounded-lg text-sm text-slate-800 focus:outline-none focus:bg-white transition-all ${
                  errors.phone
                    ? 'border-rose-400 focus:ring-2 focus:ring-rose-400 bg-rose-50/20'
                    : 'border-slate-200 focus:ring-2 focus:ring-blue-500'
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-rose-500 flex items-center space-x-1 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>

          {/* Course & Academic Year Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Course Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Course *
              </label>
              <div className="relative">
                <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all cursor-pointer"
                >
                  {courseOptions.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Academic Year Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Year *
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all cursor-pointer"
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Footer Form Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center space-x-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{submitting ? 'Saving...' : studentToEdit ? 'Save Changes' : 'Add Student'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentModal;

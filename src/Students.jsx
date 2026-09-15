import React, { useState } from 'react';
import { UserPlus, Pencil, Trash2, Phone, Mail, Search, Filter, RotateCcw } from 'lucide-react';

// Students component with desktop data table and mobile-optimized SaaS card list
function Students({ students, loading, onOpenAddModal, onEditStudent, onDeleteStudent }) {
  // Local state for search and filter controls
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

  // Extract unique courses and years from available data
  const availableCourses = ['All', ...new Set(students.map((s) => s.course).filter(Boolean))];
  const availableYears = ['All', ...new Set(students.map((s) => s.year).filter(Boolean))];

  // Combined client-side filtering: search query + course + year
  const filteredStudents = students.filter((student) => {
    const query = searchTerm.toLowerCase().trim();
    
    const matchesSearch =
      !query ||
      student.name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query);

    const matchesCourse = selectedCourse === 'All' || student.course === selectedCourse;
    const matchesYear = selectedYear === 'All' || student.year === selectedYear;

    return matchesSearch && matchesCourse && matchesYear;
  });

  // Reset filters helper
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCourse('All');
    setSelectedYear('All');
  };

  const isFiltered = searchTerm.trim() !== '' || selectedCourse !== 'All' || selectedYear !== 'All';

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Page Header with Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Students Directory</h1>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">
            Manage and view registered students, search records, and filter by criteria.
          </p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-medium rounded-lg shadow-sm transition-colors w-full sm:w-auto cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Student</span>
        </button>
      </div>

      {/* Search and Filters Bar (Full-width & responsive) */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs space-y-3 md:space-y-0 md:flex md:items-center md:gap-4">
        {/* Search Input (Full width on mobile) */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>

        {/* Filters Group (clean 2-column or inline layout) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Course Filter Dropdown */}
          <div className="flex-1 sm:flex-initial">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {availableCourses.map((course) => (
                <option key={course} value={course}>
                  {course === 'All' ? 'All Courses' : course}
                </option>
              ))}
            </select>
          </div>

          {/* Year Filter Dropdown */}
          <div className="flex-1 sm:flex-initial">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year === 'All' ? 'All Years' : year}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters Button */}
          {isFiltered && (
            <button
              onClick={handleResetFilters}
              title="Reset search and filters"
              className="inline-flex items-center space-x-1 px-2.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Container: Mobile Cards OR Desktop Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Loading State */}
        {loading ? (
          <div className="p-12 text-center text-slate-400">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Loading students...</span>
            </div>
          </div>
        ) : filteredStudents.length === 0 ? (
          /* Empty Search/Filter State */
          <div className="p-12 text-center text-slate-400">
            <div className="max-w-xs mx-auto text-center space-y-2">
              <p className="font-medium text-slate-600 text-sm sm:text-base">No students match your criteria</p>
              <p className="text-xs text-slate-400">
                Try adjusting your search keywords or clearing the active filters.
              </p>
              {isFiltered && (
                <button
                  onClick={handleResetFilters}
                  className="mt-2 inline-flex items-center space-x-1 text-xs font-medium text-blue-600 hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear search & filters</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* 1. DESKTOP VIEW: Clean Data Table (hidden on mobile) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Phone</th>
                    <th className="px-6 py-4">Course</th>
                    <th className="px-6 py-4">Year</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-slate-800">{student.name}</p>
                          <p className="text-xs text-slate-400 flex items-center space-x-1 mt-0.5">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span>{student.email}</span>
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                        <span className="flex items-center space-x-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span>{student.phone}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                          {student.course}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                        {student.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {student.status || 'Active'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center space-x-2">
                          <button
                            onClick={() => onEditStudent?.(student)}
                            title="Edit Student"
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteStudent?.(student)}
                            title="Delete Student"
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 2. MOBILE VIEW: Modern Scannable SaaS Student Cards (hidden on desktop) */}
            <div className="block md:hidden divide-y divide-slate-100">
              {filteredStudents.map((student) => (
                <div key={student.id} className="p-4 hover:bg-slate-50/50 transition-colors space-y-3">
                  {/* Top Header: Student Name + Status Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-slate-800 text-base leading-tight">
                        {student.name}
                      </h3>
                      <div className="flex items-center space-x-2 text-xs text-slate-500 mt-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md font-medium bg-blue-50 text-blue-700 border border-blue-100 text-[11px]">
                          {student.course}
                        </span>
                        <span>•</span>
                        <span>{student.year}</span>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                      {student.status || 'Active'}
                    </span>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-1 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{student.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{student.phone}</span>
                    </div>
                  </div>

                  {/* Touch-Friendly Action Buttons */}
                  <div className="flex items-center justify-end space-x-2 pt-1">
                    <button
                      onClick={() => onEditStudent?.(student)}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 transition-colors cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5 text-slate-500" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => onDeleteStudent?.(student)}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 active:bg-rose-200 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Footer Summary */}
        <div className="px-4 sm:px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing {filteredStudents.length} of {students.length} student{students.length === 1 ? '' : 's'}
          </span>
          {isFiltered && (
            <span className="text-blue-600 font-medium">
              Filters active
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Students;

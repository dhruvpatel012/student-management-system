import React from 'react';
import { Users, BookOpen, UserCheck, ArrowRight, Clock, RefreshCw, AlertTriangle, Mail } from 'lucide-react';

// Dashboard component with responsive statistics grid and mobile-optimized recent students list
function Dashboard({ students, loading, error, onRetry, onNavigateToStudents }) {
  // Compute metrics from current state
  const totalStudents = students.length;

  const totalCourses = new Set(
    students.map((student) => student.course).filter(Boolean)
  ).size;

  const activeStudents = students.filter(
    (student) => student.status === 'Active'
  ).length;

  // Get the most recent 5 students (newest first)
  const recentStudents = [...students].slice(-5).reverse();

  const stats = [
    {
      title: 'Total Students',
      value: totalStudents,
      icon: Users,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      description: 'Enrolled in database',
    },
    {
      title: 'Total Courses',
      value: totalCourses,
      icon: BookOpen,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      description: 'Active departments',
    },
    {
      title: 'Active Students',
      value: activeStudents,
      icon: UserCheck,
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      description: 'Currently studying',
    },
  ];

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Loading state banner */}
      {loading && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-xl text-xs sm:text-sm flex items-center space-x-2.5">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin shrink-0"></div>
          <span>Loading dashboard statistics from server...</span>
        </div>
      )}

      {/* Error state alert with Retry button */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center space-x-2.5">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            <div>
              <p className="font-semibold">Unable to connect to backend</p>
              <p className="text-xs text-rose-600 mt-0.5">{error}. Ensure JSON Server is running on port 3000.</p>
            </div>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-medium transition-colors self-start sm:self-auto cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Connection</span>
            </button>
          )}
        </div>
      )}

      {/* Stat Cards Grid: 1 column on mobile, 2 on small tablets, 3 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-xs hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {stat.title}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-slate-800 mt-1">
                    {loading ? '-' : stat.value}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{stat.description}</p>
                </div>
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${stat.iconBg} ${stat.iconColor} flex items-center justify-center shrink-0`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Students Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
            <h3 className="font-semibold text-slate-800 text-sm sm:text-base">Recent Students</h3>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
              Latest {recentStudents.length}
            </span>
          </div>
          <button
            onClick={onNavigateToStudents}
            className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center space-x-1 transition-colors cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Desktop View: Clean Data Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">Name</th>
                <th className="px-6 py-3.5">Course</th>
                <th className="px-6 py-3.5">Year</th>
                <th className="px-6 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentStudents.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-slate-400">
                    {loading ? 'Fetching students...' : 'No students found.'}
                  </td>
                </tr>
              ) : (
                recentStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-800">{student.name}</p>
                        <p className="text-xs text-slate-400">{student.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                        {student.course}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{student.year}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {student.status || 'Active'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Modern Clean Card List (No horizontal scrolling!) */}
        <div className="block md:hidden divide-y divide-slate-100">
          {recentStudents.length === 0 ? (
            <div className="p-6 text-center text-slate-400 text-xs">
              {loading ? 'Fetching students...' : 'No students found.'}
            </div>
          ) : (
            recentStudents.map((student) => (
              <div key={student.id} className="p-4 hover:bg-slate-50/60 transition-colors space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-slate-800 text-sm leading-tight">{student.name}</p>
                    <p className="text-xs text-slate-400 flex items-center space-x-1 mt-0.5">
                      <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate max-w-[200px]">{student.email}</span>
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    {student.status || 'Active'}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-500 pt-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100 font-medium">
                    {student.course}
                  </span>
                  <span>•</span>
                  <span>{student.year}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

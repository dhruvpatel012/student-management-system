# Student Management System

A clean, modern, and easy-to-understand Student Management System built using React.js, Tailwind CSS, and JSON Server. Developed as a college-level academic project to demonstrate core React concepts, RESTful CRUD operations with the native `fetch()` API, client-side search and filtering, non-intrusive Toast notifications, and a dedicated mobile SaaS card layout.

---

# Video Explanation : https://drive.google.com/file/d/1XM3Z0PR1lfz_S4bqBQH-I7m5OzbZl42x/view?usp=sharing

## 1. Project Overview

The **Student Management System** is a single-page web application designed for academic departments to manage student records efficiently. It allows college administrators to:
- Monitor key academic metrics (Total Students, Total Courses, Active Students).
- View recent student admissions in real-time.
- Perform complete CRUD operations (Create, Read, Update, Delete) with smooth, in-app feedback.
- Instantly search students by name or email.
- Filter students by course and academic year.
- Experience a tailored, native-feeling mobile experience with cards instead of squeezed desktop tables.

---

## 2. Features

- **Intuitive Dashboard**: Overview cards for Total Students, Total Courses, and Active Students, plus a dual-layout (cards on mobile, table on desktop) for recently enrolled students.
- **Full CRUD Operations**:
  - **Create**: Add new students with auto-assigned active status.
  - **Read**: Fetch and display student records in an adaptive layout.
  - **Update**: Edit existing student details using a pre-populated modal.
  - **Delete**: Custom in-app confirmation modal before permanent deletion.
- **SaaS Toast Notifications**: Lightweight, non-blocking feedback messages that appear at the bottom-right (or bottom-center on mobile) and auto-dismiss after 3.5 seconds. Zero browser `alert()` or `confirm()` interruptions.
- **Client-Side Search**: Instant keyword search on loaded state by student name or email without triggering API calls on every keystroke.
- **Multi-Criteria Filtering**: Filter students simultaneously by Course and Academic Year, with an instant Reset button.
- **Form Validation**: Clean inline validation for required fields, standard email format, and exactly 10-digit phone numbers.
- **Dedicated Mobile SaaS UX**:
  - Compact sticky top header with hamburger menu.
  - Slide-in navigation drawer with backdrop blur.
  - Mobile student records rendered as scannable, touch-friendly cards with individual action buttons.
  - Elimination of awkward horizontal table scrolling on small screens.

---

## 3. Tech Stack

- **Frontend Framework**: React 19 / 18 (via Vite)
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Mock Backend**: JSON Server (REST API on port 3000)
- **API Communication**: Native `fetch()` API
- **State Management**: React Hooks (`useState`, `useEffect`)

---

## 4. Project Structure

```text
student-management-system/
├── db.json                          # JSON Server mock database
├── index.html                       # HTML root with typography
├── package.json                     # Project dependencies and run scripts
├── vite.config.js                   # Vite and Tailwind configuration
└── src/
    ├── components/
    │   ├── Header.jsx               # Top navigation bar and mobile menu trigger
    │   ├── Sidebar.jsx              # Responsive navigation drawer
    │   ├── StudentModal.jsx         # Unified modal for Add and Edit operations
    │   ├── DeleteConfirmModal.jsx   # Custom in-app delete confirmation modal
    │   └── Toast.jsx                # SaaS toast notification component
    ├── Dashboard.jsx                # Metrics cards and recent students
    ├── Students.jsx                 # Student directory (Table on desktop, Cards on mobile)
    ├── App.jsx                      # Central state, API handlers, and Toast management
    ├── index.css                    # Tailwind CSS directives and font setup
    └── main.jsx                     # Application root mount
```

---

## 5. Installation

1. Clone or extract the project into your desired folder.
2. Open a terminal in the project root and install dependencies:

```bash
npm install
```

---

## 6. How to Run

Running the full project requires starting both the **Frontend** and the **JSON Server** backend.

### Terminal 1: Start Vite Frontend
```bash
npm run dev
```
The application will be accessible at `http://localhost:5173`.

### Terminal 2: Start JSON Server Backend
```bash
npm run server
```
*(Alternatively, you can run: `npx json-server db.json --port 3000`)*

The REST API will be accessible at `http://localhost:3000/students`.

---

## 7. JSON Server Setup

The backend runs on a lightweight local JSON file (`db.json`) that acts as a RESTful database.

**Sample Student Object Schema:**
```json
{
  "id": "1",
  "name": "Rahul Sharma",
  "email": "rahul.sharma@example.com",
  "phone": "9876543210",
  "course": "BCA",
  "year": "3rd Year",
  "status": "Active"
}
```

Any additions, updates, or deletions made in the application are automatically persisted directly to `db.json`.

---

## 8. CRUD Operations

| Operation | HTTP Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Read (All)** | `GET` | `http://localhost:3000/students` | Fetches all students on application load |
| **Create** | `POST` | `http://localhost:3000/students` | Creates a new student record |
| **Update** | `PUT` | `http://localhost:3000/students/:id` | Updates an existing student record |
| **Delete** | `DELETE` | `http://localhost:3000/students/:id` | Deletes a student record by ID |

---
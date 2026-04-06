# Finance Dashboard

A modern, responsive financial dashboard application built with React, Vite, and Tailwind CSS. Features role-based access control, transaction management, and real-time data visualization with dark mode support.

## 🚀 Features

### Core Functionality
- **📊 Dynamic Dashboard**: Real-time financial overview with cards, charts, and insights
- **💰 Transaction Management**: Full CRUD operations for income and expense tracking
- **👥 Role-Based Access Control (RBAC)**: Viewer and Admin roles with different permissions
- **🌙 Dark Mode**: Complete dark theme support across all components
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Dashboard Components
- **Dashboard Cards**: Total balance, income, and expense summaries
- **Interactive Charts**: Balance trend line chart and spending category pie chart
- **Transaction Table**: Searchable, filterable transaction history with admin actions
- **Financial Insights**: Automated spending analysis and trends

### Admin Features
- **Add Transactions**: Create new income/expense entries with validation
- **Edit Transactions**: Modify existing transaction details
- **Delete Transactions**: Remove transactions with confirmation
- **Data Persistence**: All changes saved to localStorage

### User Experience
- **Intuitive Navigation**: Clean sidebar navigation with active state indicators
- **Form Validation**: Real-time validation with error messages
- **Smooth Transitions**: Hover effects and micro-interactions
- **Accessibility**: ARIA labels and semantic HTML

## 🛠️ Tech Stack

### Frontend
- **React 19.2.4** - UI framework with hooks
- **Vite 8.0.1** - Build tool and development server
- **React Router DOM 7.14.0** - Client-side routing
- **Tailwind CSS 4.2.2** - Utility-first CSS framework
- **Lucide React 1.7.0** - Icon library
- **Recharts 3.8.1** - Chart library for data visualization

### Development Tools
- **ESLint** - Code linting and formatting
- **JavaScript** - Programming language (TypeScript ready)

## 📋 Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🚀 Quick Start

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd finance-dashboard-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` (or the URL shown in terminal)

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🏗️ Project Structure

```
finance-dashboard-assignment/
├── public/                 # Static assets
├── src/
│   ├── Components/         # React components
│   │   ├── Charts.jsx      # Chart components (Line, Pie)
│   │   ├── DashboardCards.jsx # Summary cards
│   │   ├── Insights.jsx    # Financial insights
│   │   ├── RoleToggle.jsx  # Role switching
│   │   ├── TransactionForm.jsx # Add/Edit form
│   │   └── TransactionsTable.jsx # Transaction list
│   ├── hooks/              # Custom React hooks
│   │   └── useTransactions.js # Transaction state management
│   ├── data/               # Mock data
│   │   └── mockData.js     # Initial transaction data
│   ├── assets/             # Static assets
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## 🎯 Architecture & Approach

### Component Architecture
- **Modular Design**: Each feature separated into dedicated components
- **Single Responsibility**: Components handle one specific functionality
- **Reusable Components**: Generic components for scalability
- **Props Interface**: Clear component contracts with TypeScript-ready structure

### State Management
- **Custom Hooks**: Centralized business logic in `useTransactions` hook
- **Local State**: Component-specific UI state with React hooks
- **Persistence**: localStorage integration for data durability
- **Reactive Updates**: Automatic UI updates on data changes

### Routing Strategy
- **Client-Side Routing**: React Router for SPA navigation
- **Route-Based Components**: Separate views for Dashboard, Transactions, and Insights
- **Active State Management**: Visual feedback for current route
- **Protected Features**: Role-based component rendering

### Data Flow
1. **Initialization**: Load mock data from `mockData.js`
2. **User Actions**: Trigger CRUD operations through UI
3. **State Updates**: Centralized hook manages state changes
4. **Persistence**: Save to localStorage on every change
5. **UI Re-render**: Components automatically update with new data

## 🔐 Role-Based Access Control (RBAC)

### Viewer Role
- **View**: All dashboard data, charts, and insights
- **Navigate**: Between all pages
- **Search**: Filter transactions
- **Limited**: No add/edit/delete permissions

### Admin Role
- **All Viewer Permissions**: Complete read access
- **Add Transactions**: Create new income/expense entries
- **Edit Transactions**: Modify existing transaction details
- **Delete Transactions**: Remove transactions with confirmation
- **Data Management**: Full CRUD operations

### Implementation
- **Role State**: Managed in `App.jsx` with `userRole` state
- **Conditional Rendering**: Components show/hide features based on role
- **UI Feedback**: Different interface elements for each role
- **Security**: Client-side role validation (server-side recommended for production)

## 📊 Features Deep Dive

### Dashboard Cards
- **Dynamic Calculations**: Real-time balance, income, and expense totals
- **Visual Hierarchy**: Clear typography and spacing
- **Responsive Grid**: Adapts from 1 to 3 columns based on screen size
- **Icon Integration**: Visual indicators for each metric type

### Charts & Visualization
- **Balance Trend**: Line chart showing financial balance over time
- **Spending Categories**: Pie chart displaying expense distribution
- **Interactive Tooltips**: Hover for detailed information
- **Dark Mode Support**: Charts adapt to theme changes
- **Responsive Sizing**: Charts resize based on container

### Transaction Management
- **Full CRUD**: Create, Read, Update, Delete operations
- **Form Validation**: Real-time input validation with error messages
- **Search & Filter**: Find transactions by category and type
- **Data Persistence**: Automatic saving to browser storage
- **Bulk Operations**: Efficient handling of multiple transactions

### User Experience
- **Loading States**: Smooth transitions during data operations
- **Error Handling**: User-friendly error messages
- **Success Feedback**: Confirmation messages for actions
- **Keyboard Navigation**: Full keyboard accessibility
- **Mobile Optimized**: Touch-friendly interface elements

## 🎨 Design System

### Color Palette
- **Primary**: Slate color palette for professional look
- **Semantic Colors**: Green for income, red for expenses
- **Dark Mode**: Carefully selected dark theme colors
- **Accessibility**: WCAG compliant color contrasts

### Typography
- **Hierarchy**: Clear heading and text size relationships
- **Readability**: Optimized line heights and spacing
- **Responsive**: Text scales appropriately across devices

### Spacing & Layout
- **Consistent**: 4-point grid system for spacing
- **Responsive**: Adaptive layouts for all screen sizes
- **White Space**: Thoughtful use of empty space

## 🔧 Customization

### Adding New Features
1. **Create Component**: Add new component in `src/Components/`
2. **Update Routing**: Add route in `App.jsx`
3. **State Management**: Extend `useTransactions` hook if needed
4. **Navigation**: Add link in `Navigation` component

### Styling Changes
- **Tailwind Config**: Modify `tailwind.config.js` for custom themes
- **Component Styles**: Edit individual component classes
- **Global Styles**: Update `src/index.css` for base styles

### Data Management
- **Mock Data**: Edit `src/data/mockData.js` for initial data
- **API Integration**: Replace `useTransactions` hook with API calls
- **Database**: Add backend integration for production

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deployment Options
- **Static Hosting**: Deploy to Netlify, Vercel, or GitHub Pages
- **CDN**: Upload build folder to any static hosting service
- **Server**: Use with Node.js backend for API integration

## 🧪 Testing & Quality

### Code Quality
- **ESLint**: Enforces code standards and best practices
- **Component Structure**: Modular and maintainable code
- **Error Handling**: Comprehensive error management
- **Performance**: Optimized rendering and state updates

### Browser Compatibility
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Responsive Design**: Works on all screen sizes

## 🤝 Contributing

### Development Workflow
1. **Fork Repository**: Create your own copy
2. **Feature Branch**: Create branch for new features
3. **Test Changes**: Ensure all functionality works
4. **Submit PR**: Create pull request for review

### Code Standards
- **Component Naming**: PascalCase for components
- **File Structure**: Follow existing project structure
- **Comments**: Add JSDoc comments for complex logic
- **Accessibility**: Ensure ARIA labels and semantic HTML

## 📝 Future Enhancements

### Planned Features
- **Data Export**: CSV/PDF export functionality
- **Advanced Filtering**: Date range and amount filters
- **Budget Tracking**: Set and monitor budget limits
- **Recurring Transactions**: Automated recurring entries
- **Multi-Currency**: Support for different currencies

### Technical Improvements
- **TypeScript Migration**: Add type safety
- **Unit Testing**: Jest and React Testing Library
- **E2E Testing**: Playwright or Cypress
- **PWA Support**: Offline functionality
- **Backend Integration**: REST API or GraphQL

## 📞 Contact & Support

| Platform              | Link                                                          |
| --------------------- | ------------------------------------------------------------- |
| 🧑 **Author**      | Pranav Thorat                      |
| 🌐 **Live Demo**      | [View Now](https://virtual-courses-lms-platform.vercel.app)                        |
| 🧑‍💻 **GitHub Repo** | [View Code](https://github.com/PranavThorat1432/AI-Powered-Full-Stack-YouTube-Clone) |
| 💼 **LinkedIn**       | [Connect with Me](https://www.linkedin.com/in/curiouspranavthorat)       |
| 📩 **Email**          | [pranavthorat95@gmail.com](mailto:pranavthorat95@gmail.com)   |

---

**Built with ❤️ using React, Vite, and Tailwind CSS**


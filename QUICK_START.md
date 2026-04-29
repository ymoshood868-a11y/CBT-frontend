# 🚀 CBT Platform - Quick Start Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

---

## Installation

### 1. Install Dependencies
```bash
npm install
```

This will install all required packages (~100+ dependencies).

---

## Development

### 1. Start Development Server
```bash
npm run dev
```

The app will be available at: `http://localhost:5173`

### 2. Open Demo Mode
Navigate to: `http://localhost:5173/demo`

### 3. Select a Role
Click on any of the 5 role cards to explore:

#### 🔷 Super Admin
- **Access**: Platform-wide management
- **Features**: School management, billing, analytics, system health
- **Dashboard**: Platform statistics, school health monitoring

#### 🔷 School Admin
- **Access**: Institution-level management
- **Features**: User management, exam approvals, analytics
- **Dashboard**: Student/teacher stats, pending approvals, activity feed

#### 🔷 Teacher
- **Access**: Exam creation and management
- **Features**: Question banks, exam wizard, results management
- **Dashboard**: Exam statistics, recent exams, quick actions

#### 🔷 Invigilator
- **Access**: Exam monitoring
- **Features**: Live monitoring, alert management, retake requests
- **Dashboard**: Active rooms, student tracking, alert feed

#### 🔷 Student
- **Access**: Take exams and view results
- **Features**: Exam taking, passage viewing, results viewing
- **Dashboard**: Upcoming exams, recent results, performance tracking

---

## Demo Mode Features

### What Works:
✅ Role selection and authentication
✅ Dashboard for all 5 roles
✅ Navigation sidebar with role-specific items
✅ User profile display
✅ Demo mode banner with role switching
✅ Mock API responses (40+ endpoints)
✅ Realistic data for all roles

### What's Mocked:
- All API calls are intercepted by MSW (Mock Service Worker)
- Data is realistic but not persistent (resets on page refresh)
- No backend server required

### How to Switch Roles:
1. Click "Switch Role" in the orange demo banner at the top
2. Select a different role from the demo page
3. Explore the new dashboard

---

## Building for Production

### 1. Build the Project
```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### 2. Preview Production Build
```bash
npm run preview
```

The production build will be available at: `http://localhost:4173`

---

## Project Structure

```
cbt-frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base design system (19 components)
│   │   ├── exam/           # Exam-specific components (7 components)
│   │   └── layouts/        # Layout components (Sidebar, Topbar)
│   ├── pages/              # Page components
│   │   ├── demo/           # Demo mode page
│   │   ├── auth/           # Login, signup, password pages
│   │   ├── student/        # Student dashboard & pages
│   │   ├── teacher/        # Teacher dashboard & pages
│   │   ├── admin/          # School admin dashboard & pages
│   │   ├── invigilator/    # Invigilator dashboard & pages
│   │   └── super-admin/    # Super admin dashboard & pages
│   ├── features/           # Feature-based modules
│   │   └── exams/          # Exam engine & components
│   ├── hooks/              # Custom React hooks
│   │   └── exam/           # Exam-specific hooks (8 hooks)
│   ├── stores/             # Zustand state stores
│   ├── lib/                # Utility libraries
│   ├── demo/               # Demo mode setup
│   │   ├── mock-data/      # Mock data for all roles
│   │   ├── handlers.ts     # MSW API handlers
│   │   ├── browser.ts      # MSW worker setup
│   │   └── DemoModeProvider.tsx  # Demo banner component
│   ├── router/             # React Router setup
│   ├── config/             # Configuration files
│   └── main.tsx            # App entry point
├── public/                 # Static assets
├── dist/                   # Production build (generated)
└── docs/                   # Documentation
```

---

## Key Files

### Entry Points:
- `src/main.tsx` - Application entry with providers
- `src/router/index.tsx` - Route configuration
- `index.html` - HTML template

### Demo Mode:
- `src/pages/demo/DemoPage.tsx` - Role selection page
- `src/demo/mock-data/index.ts` - Mock data for all roles
- `src/demo/handlers.ts` - MSW API handlers (40+ endpoints)
- `src/demo/DemoModeProvider.tsx` - Demo banner component

### Dashboards:
- `src/pages/student/StudentDashboard.tsx` - Student dashboard
- `src/pages/teacher/TeacherDashboard.tsx` - Teacher dashboard
- `src/pages/admin/AdminDashboard.tsx` - School admin dashboard
- `src/pages/invigilator/InvigilatorDashboard.tsx` - Invigilator dashboard
- `src/pages/super-admin/SuperDashboard.tsx` - Super admin dashboard

### Core Components:
- `src/components/layouts/AppSidebar.tsx` - Navigation sidebar
- `src/components/layouts/AppTopbar.tsx` - Top navigation bar
- `src/features/exams/ExamEngine.tsx` - Main exam interface

### State Management:
- `src/stores/auth.store.ts` - Authentication state
- `src/stores/exam.store.ts` - Exam state
- `src/stores/ui.store.ts` - UI state

---

## Available Scripts

### Development:
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Testing:
```bash
# No tests configured yet
# Add your test scripts here
```

---

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000
VITE_DEMO_MODE=true
```

### Variables:
- `VITE_API_URL` - Backend API URL (not used in demo mode)
- `VITE_DEMO_MODE` - Enable/disable demo mode (set to "true" for demo)

---

## Troubleshooting

### Build Errors:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear build cache
rm -rf dist
npm run build
```

### Port Already in Use:
```bash
# Kill process on port 5173
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5173 | xargs kill -9
```

### MSW Not Working:
1. Check that `VITE_DEMO_MODE=true` in `.env`
2. Clear browser cache
3. Check browser console for MSW initialization message
4. Restart development server

---

## Browser Support

### Supported Browsers:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Not Supported:
- ❌ Internet Explorer (any version)
- ❌ Opera Mini
- ❌ UC Browser

---

## Performance

### Build Metrics:
- **Build Time**: ~6 seconds
- **Bundle Size**: 569 KB (gzipped: 177 KB)
- **Chunks**: 3 main chunks
- **Dependencies**: 100+ packages

### Optimization Tips:
1. Use code splitting for large pages
2. Lazy load routes
3. Optimize images
4. Enable compression on server
5. Use CDN for static assets

---

## Next Steps

### For Development:
1. ✅ Test demo mode with all 5 roles
2. ✅ Explore dashboards and navigation
3. ⏳ Complete missing pages
4. ⏳ Add error boundaries
5. ⏳ Implement remaining features

### For Production:
1. ⏳ Connect to real backend API
2. ⏳ Add authentication
3. ⏳ Add error tracking (Sentry)
4. ⏳ Add analytics (Google Analytics)
5. ⏳ Deploy to hosting (Vercel, Netlify, etc.)

---

## Getting Help

### Documentation:
- `README.md` - Project overview
- `COMPLETION_SUMMARY.md` - Detailed completion report
- `PROGRESS_REPORT.md` - Current progress status
- `docs/implementation.md` - Complete implementation roadmap

### Resources:
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Radix UI Documentation](https://radix-ui.com)
- [React Query Documentation](https://tanstack.com/query)
- [Zustand Documentation](https://zustand-demo.pmnd.rs)

---

## Tips

### Development Tips:
1. Use React DevTools for debugging
2. Use React Query DevTools for API debugging
3. Check browser console for errors
4. Use network tab to see API calls (mocked by MSW)
5. Hot reload is enabled - changes appear instantly

### Demo Mode Tips:
1. All data is mocked - no backend needed
2. Data resets on page refresh
3. Switch roles anytime via demo banner
4. All API calls are logged in console
5. Edit mock data in `src/demo/mock-data/index.ts`

### Styling Tips:
1. Use inline styles for consistency
2. Follow existing color scheme
3. Use Inter font family
4. Maintain consistent spacing
5. Test on mobile devices

---

## License

This project is proprietary and confidential.

---

## Support

For questions or issues, contact the development team.

---

*Quick Start Guide - Last Updated: April 25, 2026*
*Version: 1.0.0*

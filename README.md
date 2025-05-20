# Vue.js Application

A modern Vue.js application built with TypeScript, featuring authentication, routing, and a responsive layout system.

## 🚀 Features

- Vue 3 with TypeScript support
- Pinia for state management
- Vue Router for navigation
- Element Plus UI framework
- Authentication system with middleware
- Responsive layouts (Main and Auth layouts)
- Cookie-based authentication persistence
- SCSS styling support

## 📁 Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable Vue components
├── composables/    # Vue composables and hooks
├── core/          # Core services, utilities, types and enums
├── layouts/       # Layout components
├── middleware/    # Route middleware
├── router/        # Vue Router configuration
├── stores/        # Pinia stores
├── styles/        # Global styles and SCSS
└── views/         # Page components
```

## 🛠️ Technical Stack

- **Framework**: Vue 3
- **Language**: TypeScript
- **State Management**: Pinia
- **Routing**: Vue Router
- **UI Framework**: Element Plus
- **Styling**: SCSS
- **Build Tool**: Vite

## 🔧 Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## 🏗️ Architecture

The application follows a modular architecture with:

- **Layouts**: Separate layouts for authenticated and non-authenticated states
- **Components**: Reusable UI components
- **Stores**: Centralized state management with Pinia
- **Middleware**: Route protection and authentication checks
- **Composables**: Reusable Vue composition functions

## 🔐 Authentication

The application implements a cookie-based authentication system with:
- Authentication state management
- Protected routes
- Automatic layout switching based on auth state
- Cookie persistence

## 🎨 UI/UX

- Responsive design
- Smooth transitions between routes
- Element Plus components integration
- Custom styling with SCSS
# Expense Tracker – Frontend (Expo)

## Overview
The **Expense Tracker Frontend** is a mobile application built using **Expo**.  
It allows users to track their monthly expenses by setting a budget and adding expenses through pasted expense text. The app provides visual insights, warnings, and summaries to help users stay within their budget.

This frontend communicates with backend services (Authentication, Expense, User, and Data Science services) to provide a complete expense tracking experience.

## Key Features
- Monthly budget-based expense tracking
- Add expenses by pasting expense text
- Graphical insights with budget warnings
- Expense cards with detailed breakdowns
- Secure authentication flow
- Clean and minimal mobile UI

## Screens

### 1. Login
- Allows existing users to log in
- Uses authentication service for verification
- Redirects to Home Screen on success

### 2. Signup
- New user registration
- Collects essential user details
- Creates user account and initializes profile

### 3. Home Screen
- Displays **expense insights using graphs**
- Shows warnings when expenses exceed budget thresholds
- Displays expense cards with:
  - Amount
  - Merchant
  - Date
  - Category (if available)

### 4. Set Budget
- Allows users to set a **monthly budget**
- Budget is valid only for the selected month
- Used to calculate remaining balance and warnings

### 5. Profile
- Displays user information
- User-specific settings and preferences
- Future scope: logout, account management

### 6. Spends
- Displays a list of all expenses
- Filter and view expenses month-wise
- Used for detailed expense analysis

## Tech Stack
- **Frontend Framework:** Expo (React Native)
- **Charts & Graphs:** Chart libraries compatible with Expo
- **API Communication:** REST APIs
- **Authentication:** JWT-based authentication & Secure Store

## System Design

### What This Diagram Represents
The system design diagram explains **how the Expo frontend interacts with backend services via API gateway** to track expenses efficiently.

<img width="1164" height="567" alt="SD" src="https://github.com/user-attachments/assets/afb334e6-bd44-42a5-b0d0-42e5faf57c62" />

### Explanation
1. **Expo Mobile App (Frontend)**
   - User interacts with the app (Login, Add Expense, View Graphs)
   - Sends API requests to backend services

2. **Authentication Service**
   - Handles login & signup
   - Issues JWT tokens for secured APIs

3. **User Service**
   - Stores and manages user profile data
   - Consumes authentication events

4. **Expense Service**
   - Creates and fetches expenses
   - Stores expense data month-wise
   - Provides data to frontend for graphs and cards

5. **Data Science Service**
   - Parses pasted expense text
   - Converts unstructured text into structured expense data
   - Publishes processed expense events

6. **Database**
   - Stores users, budgets, and expenses
   - Supports monthly reset and aggregation

### Flow Summary
<img width="710" height="589" alt="SD2" src="https://github.com/user-attachments/assets/c75dc843-a67c-44ca-bff0-03b08b4b337c" />

This Expo-based frontend acts as the **central user interaction layer** for the Expense Tracker system.  
It focuses on simplicity, clarity, and actionable insights to help users manage their monthly finances effectively.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

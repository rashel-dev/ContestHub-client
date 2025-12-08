---------------project requirements---------------
Description
You are required to develop a complete, production-ready web application named ContestHub(You can choose yourself a better name!) – a modern, user-friendly contest management platform that allows users to create, discover, participate in, and manage creative contests (e.g., design contests, article writing, business ideas, gaming reviews, etc.). The platform must support three user roles (Admin, Contest Creator, Normal User), including secure authentication, payment integration for contest registration, role-based dashboards, and a clean, responsive UI.
Core Goal
Build a fully functional, fully responsive, and visually appealing contest platform where:
Anyone can browse and explore contests
Registered users can participate by paying an entry fee
Contest Creators can add and manage their contests
Admins can approve contests and manage users
Winners are declared by creators, and achievements are celebrated across the site
The final application must be deployed live (client + server), have a professional look, and follow clean coding practices with meaningful Git commits.
This is a complete full-stack project that tests your skills in React, Node.js/Express, MongoDB, authentication (JWT), state management, responsive design, secure APIs, payment flow, role-based access, and deployment.
You are expected to deliver a polished, bug-free, and impressive application that stands out in terms of both functionality and design.
Good luck – build something amazing! 🚀

Main Requirements (Must Do)
At least 20 meaningful GitHub commits on the client-side code
At least 12 meaningful GitHub commits on the server-side code
Create a good readme.md file that includes:
– Website name
– Live site URL
– At least 10 bullet points about your website features
The website must be fully responsive (mobile, tablet, desktop). The dashboard should also be responsive.
Private routes must stay logged in after page refresh (no redirect to login).
Hide Firebase and MongoDB secrets using environment variables.
No Lorem Ipsum text anywhere.
Use sweet alert/toast for login, signup, and all CRUD actions.
Use TanStack Query for all data fetching.

HOME PAGE
Navbar
Logo + Website Name
Menu/NavLink: Home | All Contests | Extra Section 
When logged in → show user profile picture
Click profile picture → dropdown with: User Name | Dashboard | Logout
Banner Section
Beautiful big banner with a search bar
Search works by contest tags (search logic in backend)
Make this section look unique and attractive
Popular Contests Section (show at least 5)
Sorted by highest participation count
For each contest show:
• Contest Name
• Creative image/card design
• Participants count
• Short description (use slice + “…”)
• Details button → goes to contest details page
If not logged in → clicking Details sends user to Login page
“Show All” button → goes to All Contests page
Winner Advertisement Section
Beautiful section to motivate users
Show recent winners, prize money, total winners, etc.
Use nice images and inspiring text
Extra Section(Static)  (Upcoming contest, ongoing Contest, past contest)

Footer
Logo + website name
Copyright © 2025 ContestHub
Social links: Facebook & LinkedIn
404 Not Found Page
Nice error page for wrong URLs
Button to go back to Home

All Contests Page (/all-contests)
Show all admin-approved contests
Same card design as Popular Contests
Add Tabs by contest tags (Image Design, Article Writing, etc.)
Details button works same as home page

Contest Details Page (Private Route)
Only logged-in users can visit. Show:
Contest Name
Big Image/Banner
Participants count (increases after successful payment)
Full Contest Description & Task details
Prize Money
Winner Name + Photo (only after creator declares winner)
Live Deadline Countdown → after deadline show “Contest Ended”
Register / Pay button → goes to payment page(disabled if contest is ended)
After successful payment → user is registered & count increases

ROLE MANAGEMENT (3 Roles) 
Admin
Approve/reject contests
Change user roles
Contest Creator
Add new contests
Edit/delete own contests (only before approval)
Declare winner after deadline
Normal User
Join contests (after payment)
See participated & won contests
Update profile

User Dashboard (Private)
Routes inside dashboard:
My Participated Contests
List all contests user paid for
Show payment status
Sort by upcoming deadline
My Winning Contests
Celebrate wins! Show prizes, contest names, etc. (be creative)
My Profile
Win percentage chart (won/participated)
Update name, photo, and one extra field (e.g., address, bio)

Creator Dashboard (Private)
Add Contest (Form with react-hook-form)
Name, Image, Description, Price, Prize, Task Instruction, Contest type
Deadline (react-datepicker)
My Created Contests (Table)
Show all contests creator made
Status: Pending/Confirmed
Edit & Delete buttons (only if still pending)
“See Submissions” button
Submitted Tasks Page
See all submissions for creator’s contests
Click contest → see participant name, email, submission link
“Declare Winner” button (only one winner per contest)

Admin Dashboard (Private)
Manage Users (Table)
See all users
Change role: User ↔ Creator ↔ Admin
Manage Contests (Table)
See all contests
Buttons: Confirm | Delete

Login & Registration
Show nice error messages
Login: Email/Password + Google Sign-in
Registration: Name, Email, Password, Photo URL
No email verification needed

Challenge Tasks (Must Do All)
Leaderboard Page → show users - ranked by number of contest wins (dynamic)
Use react-hook-form in every form
Use JWT for secure APIs (on all private routes’ APIs and delete and update APIs.)
Add pagination (10 items per page) on at least one table
Add 2 extra meaningful routes/pages – mention in navbar & readme
Dark/Light Theme Toggle (save choice in localStorage – stays after refresh)

Optional Tasks (Choose Any 2)
Add animations (Framer Motion or AOS)
Use Axios interceptors
Package system – creators buy packages to post limited contests

Additional Notes
You can host images anywhere
Use any Component Library (Shadcn, DaisyUI, custom, etc.)
Deploy client on Firebase/Netlify/Vercel
Deploy server on Vercel

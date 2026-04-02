💰 Vault - Premium Personal Finance Suite

Vault is a high-end, responsive personal finance dashboard designed with a "Vibrant Glassmorphism" aesthetic. It provides users with real-time insights into their spending habits, transaction history, and financial health status.

🚀 Engineering Highlights

As a project focused on clean architecture and scalable logic, Vault implements several advanced frontend patterns:

Role-Based Access Control (RBAC): Implemented a centralized UserContext that manages permissions. Administrative privileges (Edit/Delete) are dynamically granted based on user roles (e.g., "admin" vs "user"), ensuring a secure UI experience.

State Management: Utilized React Context API for global user and theme states, reducing prop-drilling and ensuring a "Single Source of Truth."

Data Visualization: Integrated Recharts for interactive financial trends. Custom tooltip logic was engineered to provide granular category data on hover.

Responsive System Design: The UI utilizes a "Mobile-First" approach. Admin controls are intelligently hidden behind hover states on Desktop but remain accessible on Touch devices via responsive opacity logic.

🎨 Design Philosophy: "The Aura Theme"

Vault features a custom-built premium UI characterized by:

Mesh Gradients: Dynamic, blurred radial gradients for visual depth.

Backdrop Filters: Extensive use of backdrop-blur-xl and semi-transparent borders to simulate real glass.

Fluid Motion: Spring-based animations using Framer Motion for layout transitions and sidebar interactions.

🛠 Tech Stack

Framework: React 19

Styling: Tailwind CSS v4 (High-performance engine)

Icons: Lucide React

Animations: Framer Motion

Charts: Recharts

State: Context API

📂 Project Structure

src/
├── components/     # Reusable layout components
├── context/        # Global state (User & Theme)
├── data/           # Initial mock data and transaction generators
├── pages/          # View-specific components (Dashboard, History, etc.)
└── App.jsx         # Root component & Route management


🏗 Future Roadmap (The Backend Transition)

As I transition this project to a full-stack architecture, the following milestones are planned:

Node.js & Express Integration: Replacing the local data/ folder with a RESTful API.

MongoDB Implementation: Moving from mock arrays to a persistent NoSQL database.

JWT Authentication: Replacing name-based admin checks with secure, token-based authentication.

AWS Deployment: Hosting the frontend on S3/CloudFront and the backend on EC2/Lambda.

🛠 Local Setup

Clone the repository:

git clone [https://github.com/your-username/premium-finance-vault.git](https://github.com/your-username/premium-finance-vault.git)


Install dependencies:

npm install


Run the development server:

npm run dev


Developed by Ashish Focused on building scalable, logic-driven applications.

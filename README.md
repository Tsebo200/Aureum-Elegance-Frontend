
<!-- Repository Information & Links -->
<br />

![GitHub repo size](https://img.shields.io/github/repo-size/Tsebo200/Aureum-Elegance-Frontend)
![GitHub watchers](https://img.shields.io/github/watchers/Tsebo200/Aureum-Elegance-Frontend)
![GitHub language count](https://img.shields.io/github/languages/count/Tsebo200/Aureum-Elegance-Frontend)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Tsebo200/Aureum-Elegance-Frontend)
![GitHub Language](https://img.shields.io/github/languages/top/Tsebo200/Aureum-Elegance-Frontend)
![GitHub Downloads](https://img.shields.io/github/downloads/Tsebo200/Aureum-Elegance-Frontend/total)

<!-- HEADER SECTION -->
<h3 align="center">Aureum Elegance</h3>
<h5 align="center">A Warehouse Management System for Perfume</h5>
</br>
<p align="center">
  <a href="https://github.com/Tsebo200/Aureum-Elegance-Frontend">
    <img src="client/src/ui/assets/Wordmark Logo.png" align="center" alt="Aureum Elegance Logo" width="140" height="140">
  </a>
  <br />
  <br />
  <a href="https://github.com/Tsebo200/Aureum-Elegance-Frontend">View Demo</a>
  ·
  <a href="https://github.com/Tsebo200/Aureum-Elegance-Frontend/issues">Report Bug</a>
  ·
  <a href="https://github.com/Tsebo200/Aureum-Elegance-Frontend/issues">Request Feature</a>
</p>

## Table of Contents

* [About the Project](#about-the-project)
  * [Project Description](#project-description)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [How to Install](#how-to-install)
* [Features and Functionality](#features-and-functionality)
* [Concept Process](#concept-process)
  * [Ideation](#ideation)
  * [Wireframes](#wireframes)
  * [Custom UI](#custom-ui)
* [Development Process](#development-process)
  * [Implementation Process](#implementation-process)
    * [Highlights](#highlights)
    * [Challenges](#challenges)
  * [Future Implementation](#future-implementation)
* [Final Outcome](#final-outcome)
  * [Mockups](#mockups)
  * [Video Demonstration](#video-demonstration)
* [Conclusion](#conclusion)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



### Project Description

Aureum Elegance is a full-stack warehouse management system tailored specifically for the perfume industry. It streamlines inventory tracking, order processing, and analytics by leveraging modern web technologies and a user-friendly interface.

---

### Built With

- **Frontend**
  - [React](https://reactjs.org/) with **TypeScript**  
  - [Vite](https://vitejs.dev/)  
  - [Material UI](https://mui.com/)  
  - [SCSS](https://sass-lang.com/)  
  - [React Router DOM](https://reactrouter.com/)  
  - [Chart.js](https://www.chartjs.org/)  
  - [Electron](https://www.electronjs.org/) (for desktop deployment)
- **Backend**
  - [.NET Core (C#)](https://dotnet.microsoft.com/)  
  - [PostgreSQL](https://www.postgresql.org/)  
  - [PgAdmin](https://www.pgadmin.org/)  
  - [Aiven](https://aiven.io/) (managed database hosting)
- **DevOps & Tooling**
  - [Docker](https://www.docker.com/)  
  - [Swagger](https://swagger.io/)  
- **Testing**
  - [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)  

---

## Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing.

### Prerequisites

- **Node.js** (v16+) and **npm** (v8+) installed on your machine:  
```sh
  node --version
  npm --version
```

* **.NET SDK** (v6.0+) installed for backend services:

  ```sh
  dotnet --version
  ```

* **Docker** installed (optional, for containerized setup):

   ```sh
  docker --version
  ```
* **Git** or **GitHub Desktop** to clone the repository.
* A **PostgreSQL** database (local or hosted via Aiven).

### How to Install

1. **Clone the Repository**

```sh
   git clone https://github.com/Tsebo200/Aureum-Elegance-Frontend.git
   ```

   Navigate into the cloned directory:

   ```sh
   cd Aureum-Elegance-Frontend
   ```

2. **Install Frontend Dependencies**

  ```sh
   npm install
   ```
 

3. **Set Up Environment Variables**
   Create a `.env` file in the `client/` directory with the following (example values):

   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_GOOGLE_AUTH_CLIENT_ID=your_google_client_id
   ```

   Create a `.env` file in the `server/` directory with the following (example values):

   ```env
   ASPNETCORE_ENVIRONMENT=Development
   ConnectionStrings__DefaultConnection=Host=localhost;Port=5432;Database=aureum_db;Username=postgres;Password=your_password
   JWT__Secret=your_jwt_secret_key
   ```

4. **Set Up the Database**

   * If using local PostgreSQL:

     ```sh
     psql -U postgres -c "CREATE DATABASE aureum_db;"
     ```
   * If using Aiven, configure the connection string accordingly in `server/.env`.

5. **Run Backend (Development Mode)**

   ```sh
   cd server
   dotnet restore
   dotnet ef database update        # Apply EF Core migrations
   dotnet run
   ```

   The backend should now be running at `http://localhost:5000/`.

6. **Run Frontend (Development Mode)**

   ```sh
   cd client
   npm run dev
   ```

   The frontend should be available at `http://localhost:5173/` (or indicated by Vite).

7. **(Optional) Run via Docker**
   Ensure Docker is running, then from the root directory:

   ```sh
   docker-compose up --build
   ```

   This will build and launch both the frontend and backend containers, along with a PostgreSQL instance.

---

## Features and Functionality

### Key Features

* **Inventory Management**

  * Add / Edit / Delete perfume products
  * Track stock levels in real-time
  * Low-stock alerts and threshold settings

* **Order Processing**

  * Create, update, and fulfill orders
  * Generate packing lists and shipping labels
  * Order history with filter and search

* **User Authentication & Authorization**

  * Role-based access control (Admin, Warehouse Staff, Viewer)
  * Secure login via JWT (with optional Google OAuth)
  * Password reset and account recovery

* **Dashboard & Analytics**

  * Interactive charts (Chart.js) for sales, stock trends, and order volume
  * Filter by date ranges, product categories, or warehouse locations

* **Desktop App Support**

  * Electron integration for offline usage and desktop notifications
  * Automatic updates via built-in Electron auto-updater

---

## Concept Process

### Ideation

We conducted several brainstorming sessions to identify pain points in warehouse workflows specific to the perfume industry:

* **Fragile Packaging**: Perfume bottles can break easily, so careful stock handling and alerting mechanisms were prioritized.
* **Batch Tracking**: Lot numbers and expiration dates are critical for fragrances.
* **Fragrance Demand**: The capabilities for staff to create and update perfumes and fragrances.

These insights helped shape a system that emphasizes visual clarity, real-time responsiveness, and traceability. Our goal was to create a tool that is not only technically robust but also aligns with the aesthetics of the perfume industry; elegance, simplicity, and precision

### Wireframes

Initial wireframes were created in Figma, focusing on:

1. **Login / Registration Flow**
2. **Dashboard Overview** with card-based metrics
3. **Product CRUD Interfaces**
4. **Order Management Pages**

![Wireframe - Login](client/src/assets/wireframe-login.png)
![Wireframe - Dashboard](client/src/assets/wireframe-dashboard.png)
![Wireframe - Product CRUD](client/src/assets/wireframe-product-crud.png)

These wireframes served as a blueprint to balance functionality with minimalism. We prioritized intuitive user flows, ensuring users could perform key actions like updating inventory or processing orders in under three clicks.

### Custom UI

* **Color Palette**: Elegant gold (#CFAF62), deep charcoal (#2E2E2E), crisp white (#FFFFFF).
* **Typography**: ‘Poppins’ for headings, ‘Roboto’ for body text.
* **Icons**: Custom SVGs for perfume bottles, crates, and shipping boxes.

The design choices reinforce the premium feel associated with perfume branding. UI components are customized for clarity, with responsive layouts ensuring consistent performance on tablets and desktops used in warehouse environments.

---

## Development Process

The `Development Process` covers technical implementations on both frontend and backend.

### Implementation Process

* **Frontend** (React + TypeScript + SCSS + Material UI)

  * Set up `Vite` with HMR for rapid development.
  * Implemented global state management using React Context and custom hooks.
  * Configured Axios interceptors for attaching JWT tokens and handling 401 responses.
  * Created reusable components (e.g., `<Card>`, `<Modal>`, `<DataTable>`, `<Chart>`) in `/client/src/components/`.
  * Integrated Electron to package the app for Windows/macOS distributables.

* **Backend** (.NET Core + Entity Framework Core)

  * Designed relational schema for perfumes, batches, orders, and users.
  * Implemented repository pattern for clean data access.
  * Exposed RESTful endpoints documented via **Swagger UI** (`/swagger/index.html`).
  * Configured JWT-based authentication with role-based policies.
  * Wrote integration tests using **xUnit** and `Microsoft.AspNetCore.Mvc.Testing`.

#### Highlights

* Successfully implemented **batch tracking** with expiration date logic and notifications.
* Built a **real-time low-stock alert** system using SignalR for live updates.
* Packaged a cross-platform **desktop application** with auto-update functionality via Electron.

#### Challenges

* Handling **image uploads** for product photos and storing them in cloud storage (Aiven S3-compatible bucket).
* Securing APIs and preventing **SQL Injection** in custom queries.
* Ensuring **responsive design** for complex dashboard charts on smaller screens.

---

### Future Implementation

* **Automated Report Generation**: Export PDF/Excel reports of inventory and sales.
* **Role-Based Access Extensions**: Add finer-grained permissions (e.g., read-only auditor role).
* **Mobile App Integration**: Build a React Native companion app for on-the-go scanning and inventory updates.
* **Third-Party Integrations**: Integrate with courier APIs (e.g., DHL, FedEx) for shipping rate calculations.

These enhancements aim to make Aureum Elegance not just a warehouse tool, but a comprehensive logistics assistant. They will bring the system closer to being a centralized hub for operational intelligence, compliance tracking, and user collaboration.


---

## Final Outcome

### Mockups

![Mockup - Dashboard](client/src/assets/mockup-dashboard.png)
![Mockup - Inventory](client/src/assets/mockup-inventory.png)
![Mockup - Orders](client/src/assets/mockup-orders.png)

### Video Demonstration

To watch a run-through of the application, click below:
[View Demonstration](https://drive.google.com/file/d/XXXXXXXXXXXXX/view?usp=sharing)

See the [open issues](https://github.com/Tsebo200/Aureum-Elegance-Frontend/issues) for a list of proposed features and known issues.

---

## Conclusion

Aureum Elegance delivers a comprehensive solution for perfume warehouse management by combining modern web technologies with intuitive design. The system addresses the unique challenges of handling fragile products and batch tracking, while also providing real-time analytics and desktop support for offline usage.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Contact

* **Team Lead / Developer**:
  *Name: Lorem Ipsum*
  *Email: [lorem.ipsum@example.com](mailto:lorem.ipsum@example.com)*
  *GitHub: [@LoremIpsum](https://github.com/LoremIpsum)*

* **Project Link**:
  [https://github.com/Tsebo200/Aureum-Elegance-Frontend](https://github.com/Tsebo200/Aureum-Elegance-Frontend)

---

## Acknowledgements

* **Figma** for wireframing
* **Material UI** for component library
* **Chart.js** for visualization tools
* **Electron** for desktop packaging
* **Stack Overflow** and community forums for troubleshooting resources
* **Color Hunt** for palette inspiration
* **Lorem ipsum** for placeholder text

We are grateful to the open-source community and the platforms above for the tools and guidance that made this project possible.


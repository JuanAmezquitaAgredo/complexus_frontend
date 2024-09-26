# *Complexus*

## *Project Description*

*COMPLEXUS* is a private social network aimed at the owners of residential complexes. The main goal is to create a web platform that allows residents to access relevant and updated information about events and activities within their community. Additionally, it will facilitate interaction and communication between owners and administrators, who will have control over publications and user access.

## *Technologies Used*

- *Next.js*
- *React*
- *Firebase*
- *Tailwind CSS*
- *Redux*

## *Installation and Configuration*

To install and configure the project, follow these steps:

1. *Clone the repository:*
   bash
   git clone <https://github.com/JuanAmezquitaAgredo/complexus_frontend.git>
   cd complexus
2. **Install dependencies**
    bash
    npm install
3. *Start the development server*
    bash
    npm run dev
    
    project: http://localhost:3002

    Json-Server: http://localhost:3004/

## Estructure
```bash
Complexus/
│
├── app/                           # Main application folder
│   ├── admin/                     # Admin-related pages and components
│   ├── components/                # Reusable UI components
│   │   ├── alertcomponent/        # Alert messages
│   │   ├── alertDelete/           # Delete confirmation alerts
│   │   ├── common/                # Shared components
│   │   │   ├── button/            # Button components
│   │   │   ├── buttonGradient/    # Gradient-styled buttons
│   │   │   ├── input/             # Input fields
│   │   │   ├── modal/             # Modal components
│   │   │   └── spinner/           # Loading spinners
│   │   ├── footer/                # Footer component
│   │   ├── form-Edit-Admin/       # Form for editing admin profiles
│   │   ├── form-Edit-Owner/       # Form for editing owner profiles
│   │   ├── form-Register-Admin/   # Registration form for admins
│   │   ├── form-Register-Owner/   # Registration form for owners
│   │   ├── form-Create-Post/      # Form for creating posts
│   │   ├── login-Component/       # Login component
│   │   ├── navbar/                # Navigation bar
│   │   ├── pinnedCard/            # Pinned post card component
│   │   ├── pinnedCardOwner/       # Pinned post card component Owner
│   │   ├── postCard/              # General post card component
│   │   ├── postCardOwner/         # General post card component Owner
│   │   ├── profile/               # User profile component
│   │   ├── sidebar/               # General navigation sidebar
│   │   ├── sidebarOwner/          # Sidebar for owner users
│   │   ├── sidebarSuperAdmin/     # Sidebar for super admins
│   ├── database/                  # Database-related logic and queries
│   ├── firebase/                  # Firebase configuration
│   ├── login/                     # Login pages and logic
│   ├── myposts/                   # User-specific posts
│   ├── owner/                     # Owner-related pages and functionality
│   ├── ownerCRUDs/                # CRUD operations for owner data
│   ├── post/                      # Post-related pages and logic
│   ├── postOwner/                 # Owner posts
│   ├── redux/                     # Redux store configuration and slices
│   ├── service/                   # Service files for API and external logic
│   ├── superadmin/                # Super admin pages and management
│   ├── types/                     # Types from project
│   ├── global.css                 # Global CSS styles
│   ├── layout.tsx                 # Layout configuration for pages
│   ├── page.tsx                   # Main entry point for pages
│   ├── provider.tsx               # Context and provider configuration
│   └── styles.module.css          # CSS modules for specific styles
├── public/                        # Public static resources (images, icons)
├── .env                           # Environment variables
├── .eslintrc.json                 # ESLint configuration
├── next.config.js                 # Next.js configuration
├── package-lock.json              # Package lock file
├── package.json                   # Project dependencies and scripts
├── README.md                      # Project documentation
├── tailwind.config.js             # Tailwind CSS configuration
└── tsconfig.json                  # TypeScript configuration
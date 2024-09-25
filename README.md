# **Complexus**

## **Project Description**

**COMPLEXUS** is a private social network aimed at the owners of residential complexes. The main goal is to create a web platform that allows residents to access relevant and updated information about events and activities within their community. Additionally, it will facilitate interaction and communication between owners and administrators, who will have control over publications and user access.

## **Technologies Used**

- **Next.js**
- **React**
- **Firebase**
- **Tailwind CSS**
- **Redux**

## **Installation and Configuration**

To install and configure the project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <https://github.com/JuanAmezquitaAgredo/complexus_frontend.git>
   cd complexus
2. **Install dependencies**
    npm install
3. **Start the development server**
    npm run dev
    project: http://localhost:3002
    Json-Server: http://localhost:3004/

## Estructure

Complexus/
│
├── app/                       
│   ├── admin/
│   ├── components/             
│   │   ├── alertcomponent/
│   │   ├── alertDelete/
│   │   ├── common/
│   │   │   ├── button/
│   │   │   ├── buttonGradient/
│   │   │   ├── input/
│   │   │   ├── modal/
│   │   │   └── spinner/
│   │   ├── footer/
│   │   ├── form-Edit-Admin/
│   │   ├── form-Edit-Owner/
│   │   ├── form-Register-Admin/
│   │   ├── form-Register-Owner/
│   │   ├── form-Create-Post/
│   │   ├── login-Component/
│   │   ├── navbar/
│   │   ├── pinnedCard/
│   │   ├── postCard/
│   │   ├── profile/
│   │   ├── sidebar/
│   │   ├── sidebarOwner/
│   │   └── sidebarSuperAdmin/
│   ├── database/
│   ├── firebase/
│   ├── login/
│   ├── myposts/
│   ├── owner/
│   ├── ownerCRUDs/
│   ├── post/
│   ├── postOwner/
│   ├── redux/
│   ├── service/
│   ├── superadmin/
│   ├── times/
│   ├── utils/
│   ├── global.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── provider.tsx
│   └── styles.module.css
│
├── public/
├── .env
├── .eslintrc.json
├── next.config.js
├── package-lock.json
├── package.json
├── README.md
├── tailwind.config.js
└── tsconfig.json




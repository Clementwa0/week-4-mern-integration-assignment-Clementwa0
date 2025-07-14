# MERN Blog Application

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) blog application with user authentication, CRUD operations for blog posts, comments, and advanced features.

## 🚀 Features

### Core Features
- **User Authentication**: Register, login, and logout functionality
- **Blog Posts**: Create, read, update, and delete blog posts
- **Categories**: Organize posts by categories
- **Comments**: Add comments to blog posts
- **Responsive Design**: Modern UI with Tailwind CSS
- **Real-time Updates**: Optimistic UI updates for better UX

### Advanced Features
- **Slug-based URLs**: SEO-friendly URLs for blog posts
- **View Count**: Track post views
- **Tags System**: Add tags to posts for better organization
- **Search Functionality**: Search posts by title, content, or tags
- **Pagination**: Load posts with pagination support
- **Draft/Published Status**: Control post visibility
- **User Roles**: Support for admin and regular users

## 🛠️ Tech Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

### Frontend
- **React**: UI library
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Build tool and dev server

## 📁 Project Structure

```
mern-blog/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── layout/    # Layout components
│   │   │   ├── posts/     # Post-related components
│   │   │   └── ui/        # UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context providers
│   │   ├── services/      # API services
│   │   └── App.jsx        # Main app component
│   └── package.json
├── server/                # Express backend
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── utils/             # Utility functions
│   └── server.js          # Main server file
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern-blog
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**

   Create `.env` files in both server and client directories:

   **Server (.env)**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mern-blog
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   ```

   **Client (.env)**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Start the development servers**

   **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```

   **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>
```

### Posts Endpoints

#### Get All Posts
```
GET /api/posts?page=1&limit=10&category=categoryId
```

#### Get Single Post
```
GET /api/posts/:id
```

#### Create Post
```
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "string",
  "content": "string",
  "excerpt": "string",
  "category": "categoryId",
  "tags": ["tag1", "tag2"],
  "isPublished": boolean
}
```

#### Update Post
```
PUT /api/posts/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "string",
  "content": "string",
  "excerpt": "string",
  "category": "categoryId",
  "tags": ["tag1", "tag2"],
  "isPublished": boolean
}
```

#### Delete Post
```
DELETE /api/posts/:id
Authorization: Bearer <token>
```

#### Add Comment
```
POST /api/posts/:id/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "string"
}
```

#### Search Posts
```
GET /api/posts/search?q=searchTerm
```

### Categories Endpoints

#### Get All Categories
```
GET /api/categories
```

#### Create Category
```
POST /api/categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "string",
  "description": "string"
}
```

## 🎨 Features in Detail

### User Authentication
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes
- User session management

### Blog Posts
- Rich text content
- SEO-friendly slugs
- Category organization
- Tag system
- Draft/published status
- View count tracking

### Comments System
- Add comments to posts
- User attribution
- Timestamp tracking

### Search & Filtering
- Search by title, content, or tags
- Filter by category
- Pagination support

### Responsive Design
- Mobile-first approach
- Modern UI with Tailwind CSS
- Loading states and error handling
- Optimistic updates

## 🔧 Development

### Available Scripts

**Server**
- `npm run dev`: Start development server with nodemon
- `npm start`: Start production server

**Client**
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

### Database Models

#### User Model
```javascript
{
  username: String,
  email: String,
  password: String,
  role: String,
  avatar: String
}
```

#### Post Model
```javascript
{
  title: String,
  content: String,
  slug: String,
  excerpt: String,
  author: ObjectId,
  category: ObjectId,
  tags: [String],
  isPublished: Boolean,
  viewCount: Number,
  comments: [Comment]
}
```

#### Category Model
```javascript
{
  name: String,
  description: String
}
```

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables
2. Configure MongoDB connection
3. Deploy to platforms like Heroku, Railway, or Vercel

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to platforms like Vercel, Netlify, or GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- MongoDB for the database
- Express.js team for the web framework
- React team for the UI library
- Tailwind CSS for the styling framework 
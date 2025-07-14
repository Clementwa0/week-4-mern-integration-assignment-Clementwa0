const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Post = require('./models/Post');
const Category = require('./models/Category');
const User = require('./models/User');

dotenv.config();

const samplePosts = [
  {
    title: 'Getting Started with React: A Beginner\'s Guide',
    content: `React is one of the most popular JavaScript libraries for building user interfaces. In this comprehensive guide, we'll walk through the fundamentals of React and help you get started with your first React application.

## What is React?

React is a JavaScript library created by Facebook for building user interfaces. It allows you to create reusable UI components and efficiently update the DOM when your data changes.

## Key Concepts

### Components
Components are the building blocks of React applications. They let you split the UI into independent, reusable pieces.

### JSX
JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.

### State and Props
State is used for data that can change over time, while props are used to pass data from parent to child components.

## Getting Started

To create a new React project, you can use Create React App:

\`\`\`bash
npx create-react-app my-app
cd my-app
npm start
\`\`\`

This will create a new React project with all the necessary dependencies and start the development server.

## Next Steps

Once you're comfortable with the basics, explore more advanced topics like:
- Hooks (useState, useEffect)
- Context API
- React Router
- State management with Redux or Context

Happy coding!`,
    excerpt: 'Learn the fundamentals of React and build your first React application with this comprehensive beginner\'s guide.',
    tags: ['react', 'javascript', 'frontend', 'tutorial'],
    isPublished: true
  },
  {
    title: 'The Future of Web Development: What to Expect in 2024',
    content: `Web development is constantly evolving, and 2024 promises to bring exciting new technologies and trends. Let's explore what's on the horizon for developers.

## Emerging Technologies

### WebAssembly (WASM)
WebAssembly continues to gain traction, enabling high-performance applications to run in the browser. We're seeing more frameworks and tools built around WASM.

### Edge Computing
With the rise of edge computing, we're moving towards more distributed architectures that bring computation closer to users.

### AI-Powered Development
AI tools are becoming more sophisticated, helping developers write code, debug issues, and optimize performance.

## Framework Trends

### React 19
React is expected to release version 19 with improved performance and new features like automatic batching and concurrent features.

### Next.js 15
Next.js continues to dominate the React ecosystem with improvements in performance, developer experience, and new features.

### Vue 4
Vue.js is working on version 4 with better TypeScript support and improved performance.

## Development Tools

### Vite
Vite has become the go-to build tool for many projects, offering lightning-fast development server startup and hot module replacement.

### Bun
Bun is a fast all-in-one JavaScript runtime and toolkit that's gaining popularity as an alternative to Node.js.

## Best Practices

1. **Performance First**: Focus on Core Web Vitals and user experience
2. **Accessibility**: Make your applications accessible to all users
3. **Security**: Implement proper security measures from the start
4. **Testing**: Write comprehensive tests for your applications

The future of web development is bright, and staying updated with these trends will help you build better applications.`,
    excerpt: 'Explore the latest trends and technologies shaping the future of web development in 2024.',
    tags: ['web-development', 'trends', 'technology', 'future'],
    isPublished: true
  },
  {
    title: 'Mastering TypeScript: From Beginner to Advanced',
    content: `TypeScript has become an essential tool for modern JavaScript development. Let's dive deep into TypeScript and explore advanced concepts that will make you a better developer.

## Why TypeScript?

TypeScript adds static typing to JavaScript, helping you catch errors early and write more maintainable code. It's especially valuable in large codebases and team environments.

## Advanced TypeScript Concepts

### Generics
Generics allow you to create reusable components that work with multiple types:

\`\`\`typescript
function identity<T>(arg: T): T {
    return arg;
}

// Usage
let output = identity<string>("myString");
let output2 = identity("myString"); // Type inference
\`\`\`

### Utility Types
TypeScript provides several utility types that help with common type transformations:

\`\`\`typescript
interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}

// Partial makes all properties optional
type PartialUser = Partial<User>;

// Pick creates a type with only selected properties
type UserBasicInfo = Pick<User, 'name' | 'email'>;

// Omit creates a type without selected properties
type UserWithoutId = Omit<User, 'id'>;
\`\`\`

### Advanced Patterns

#### Discriminated Unions
\`\`\`typescript
type LoadingState = { status: 'loading' };
type SuccessState = { status: 'success'; data: string };
type ErrorState = { status: 'error'; error: string };

type State = LoadingState | SuccessState | ErrorState;
\`\`\`

#### Conditional Types
\`\`\`typescript
type NonNullable<T> = T extends null | undefined ? never : T;
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
\`\`\`

## Best Practices

1. **Use strict mode**: Enable strict TypeScript configuration
2. **Prefer interfaces over types**: For object shapes, use interfaces
3. **Use union types**: Instead of any, use union types when possible
4. **Leverage type inference**: Let TypeScript infer types when possible

## Migration Strategy

When migrating from JavaScript to TypeScript:
1. Start with a loose configuration
2. Gradually add types to your codebase
3. Use the any type sparingly
4. Enable stricter settings over time

TypeScript is a powerful tool that can significantly improve your development experience and code quality.`,
    excerpt: 'Learn advanced TypeScript concepts and best practices to become a more effective developer.',
    tags: ['typescript', 'javascript', 'programming', 'advanced'],
    isPublished: true
  },
  {
    title: 'Building Scalable APIs with Node.js and Express',
    content: `Building scalable APIs is crucial for modern web applications. Let's explore best practices for creating robust, maintainable APIs using Node.js and Express.

## API Design Principles

### RESTful Design
Follow REST principles for consistent, predictable APIs:

- Use proper HTTP methods (GET, POST, PUT, DELETE)
- Implement proper status codes
- Design resource-oriented URLs
- Use plural nouns for collections

### Authentication & Authorization
Implement proper security measures:

\`\`\`javascript
// JWT Authentication
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }
    
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};
\`\`\`

## Error Handling

Implement comprehensive error handling:

\`\`\`javascript
// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});
\`\`\`

## Validation

Use middleware for input validation:

\`\`\`javascript
const { body, validationResult } = require('express-validator');

const validateUser = [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
\`\`\`

## Performance Optimization

### Caching
Implement caching strategies:

\`\`\`javascript
const redis = require('redis');
const client = redis.createClient();

const cache = (req, res, next) => {
    const key = req.originalUrl;
    client.get(key, (err, data) => {
        if (err) return next();
        if (data) {
            return res.json(JSON.parse(data));
        }
        next();
    });
};
\`\`\`

### Rate Limiting
Protect your API from abuse:

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
\`\`\`

## Testing

Write comprehensive tests for your APIs:

\`\`\`javascript
const request = require('supertest');
const app = require('../app');

describe('POST /api/users', () => {
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                name: 'John Doe',
                email: 'john@example.com'
            });
        
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
    });
});
\`\`\`

## Documentation

Use tools like Swagger/OpenAPI for API documentation:

\`\`\`javascript
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
\`\`\`

Building scalable APIs requires careful planning and implementation of these best practices.`,
    excerpt: 'Learn best practices for building scalable, secure, and maintainable APIs with Node.js and Express.',
    tags: ['nodejs', 'express', 'api', 'backend', 'scalability'],
    isPublished: true
  },
  {
    title: 'The Complete Guide to Modern CSS',
    content: `CSS has evolved significantly over the years. Let's explore modern CSS features and techniques that will make you a better frontend developer.

## CSS Grid

CSS Grid is a powerful layout system that allows you to create complex layouts with ease:

\`\`\`css
.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
}

.item {
    background: #f0f0f0;
    padding: 20px;
    border-radius: 8px;
}
\`\`\`

## Flexbox

Flexbox is perfect for one-dimensional layouts:

\`\`\`css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
}

.nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
}
\`\`\`

## CSS Custom Properties

CSS variables make your styles more maintainable:

\`\`\`css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --border-radius: 8px;
    --spacing: 1rem;
}

.button {
    background-color: var(--primary-color);
    border-radius: var(--border-radius);
    padding: var(--spacing);
}
\`\`\`

## Modern CSS Features

### Container Queries
Container queries allow you to style elements based on their container's size:

\`\`\`css
.card {
    container-type: inline-size;
}

@container (min-width: 400px) {
    .card-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
}
\`\`\`

### Logical Properties
Logical properties provide better internationalization support:

\`\`\`css
.text {
    margin-block: 1rem;
    padding-inline: 2rem;
    border-block-end: 1px solid #ccc;
}
\`\`\`

## CSS-in-JS

Modern frameworks often use CSS-in-JS solutions:

\`\`\`javascript
import styled from 'styled-components';

const Button = styled.button\`
    background-color: \${props => props.primary ? '#007bff' : '#6c757d'};
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
        opacity: 0.8;
    }
\`;
\`\`\`

## Performance Optimization

### Critical CSS
Inline critical CSS to improve page load performance:

\`\`\`html
<style>
    /* Critical CSS here */
    .header { background: #fff; }
    .hero { padding: 2rem; }
</style>
\`\`\`

### CSS Optimization
- Use CSS minification
- Implement CSS purging
- Use modern CSS features for better performance

## Best Practices

1. **Mobile First**: Start with mobile styles and enhance for larger screens
2. **Semantic HTML**: Use proper HTML elements for better accessibility
3. **Progressive Enhancement**: Ensure your site works without JavaScript
4. **Performance**: Optimize your CSS for faster loading times

Modern CSS provides powerful tools for creating beautiful, responsive, and maintainable user interfaces.`,
    excerpt: 'Explore modern CSS features and techniques to create better user interfaces and responsive designs.',
    tags: ['css', 'frontend', 'design', 'responsive', 'modern'],
    isPublished: true
  }
];

const seedPosts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-blog');
    console.log('Connected to MongoDB');

    // Get or create a default user
    let user = await User.findOne({ email: 'admin@blogapp.com' });
    if (!user) {
      user = await User.create({
        username: 'admin',
        email: 'admin@blogapp.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Created default user: admin@blogapp.com');
    }

    // Get categories
    const categories = await Category.find();
    if (categories.length === 0) {
      console.log('No categories found. Please run seed-categories.js first.');
      process.exit(1);
    }

    // Clear existing posts
    await Post.deleteMany({});
    console.log('Cleared existing posts');

    // Add sample posts with random categories and ensure proper slugs
    const postsWithData = samplePosts.map((post, index) => {
      // Generate a proper slug from the title
      const slug = post.title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
      
      return {
        ...post,
        slug,
        author: user._id,
        category: categories[index % categories.length]._id
      };
    });

    const posts = await Post.insertMany(postsWithData);
    console.log(`Successfully added ${posts.length} posts:`);
    
    posts.forEach(post => {
      console.log(`- ${post.title}`);
    });

    console.log('\nPosts seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding posts:', error);
    process.exit(1);
  }
};

seedPosts(); 
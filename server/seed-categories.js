const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');

dotenv.config();

const sampleCategories = [
  {
    name: 'Technology',
    description: 'Latest tech trends, programming tutorials, and software development insights'
  },
  {
    name: 'Programming',
    description: 'Programming languages, frameworks, and coding best practices'
  },
  {
    name: 'Web Development',
    description: 'Frontend, backend, and full-stack web development articles'
  },
  {
    name: 'Mobile Development',
    description: 'iOS, Android, and cross-platform mobile app development'
  },
  {
    name: 'Data Science',
    description: 'Machine learning, artificial intelligence, and data analysis'
  },
  {
    name: 'DevOps',
    description: 'Deployment, CI/CD, cloud computing, and infrastructure'
  },
  {
    name: 'Design',
    description: 'UI/UX design, graphic design, and creative inspiration'
  },
  {
    name: 'Business',
    description: 'Startup stories, entrepreneurship, and business insights'
  },
  {
    name: 'Productivity',
    description: 'Time management, workflow optimization, and personal development'
  },
  {
    name: 'Tutorials',
    description: 'Step-by-step guides and how-to articles'
  },
  {
    name: 'Opinion',
    description: 'Thought leadership, industry insights, and personal perspectives'
  },
  {
    name: 'News',
    description: 'Latest industry news and updates'
  },
  {
    name: 'Tools',
    description: 'Software reviews, tool comparisons, and productivity apps'
  },
  {
    name: 'Career',
    description: 'Job advice, career development, and professional growth'
  },
  {
    name: 'Community',
    description: 'Open source, developer communities, and collaboration'
  }
];

const seedCategories = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-blog');
    console.log('Connected to MongoDB');

    // Clear existing categories
    await Category.deleteMany({});
    console.log('Cleared existing categories');

    // Insert sample categories
    const categories = await Category.insertMany(sampleCategories);
    console.log(`Successfully added ${categories.length} categories:`);
    
    categories.forEach(category => {
      console.log(`- ${category.name}: ${category.description}`);
    });

    console.log('\nCategories seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
};

seedCategories(); 
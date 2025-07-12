import React from 'react'
import {Card} from '@/components/ui/card'


const App = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">
        Welcome to My React App!
      </h1>
      <p className="mt-4 text-lg text-gray-700">
        This is a simple React application styled with Tailwind CSS.
      </p>
      <Card>
        <h2 className="text-2xl font-bold mb-2">Card Title</h2>
        <p className="text-gray-700 mb-4">This is a card component.</p>
        <Button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Click Me
        </Button> 
      </Card>
    </div>
  )
}

export default App
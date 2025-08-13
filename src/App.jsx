import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to iMovie</h1>
        <p className="mt-4 text-lg text-gray-600">Get started by editing <code>src/App.jsx</code></p>
      </div>
  </>
  )
}

export default App

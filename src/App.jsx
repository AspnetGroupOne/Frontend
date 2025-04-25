import { Suspense } from 'react'
import './App.css'
import './stylings/Event_card.css'



import RouteRenderer from './routing/RouteRenderer';

function App() {

  return (
    <Suspense fallback={<div className='spinner'>Loading...</div>}>
      <RouteRenderer />
    </Suspense>
  )
}

export default App

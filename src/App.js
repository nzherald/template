import React, { Suspense } from 'react'
import styled from 'styled-components'

const SVG = React.lazy(() => import('./assets/taylor-app2.svg'))

const Wrap = styled.div` `

const App = () => {
  return (
    <Wrap>
      <Suspense fallback={<div>Loading...</div>}>
        <SVG />
      </Suspense>
    </Wrap>
  )
}

export default App

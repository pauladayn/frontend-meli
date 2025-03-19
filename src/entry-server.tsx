import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './client/App'

export function render(_url: string, data) {
  //console.log('data en entry server', data)
  const html = renderToString(
    <StrictMode>
      <App data={data}/>
    </StrictMode>,
  )
  return { html }
}

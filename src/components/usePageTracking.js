import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ReactGA from 'react-ga'

export const usePageTracking = () => {
  const location = useLocation()
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GA || 'UA-177108374-1')
    setInitialized(true)
  }, [])

  useEffect(() => {
    if (initialized) {
      ReactGA.pageview(location.pathname + location.search)
    }
  }, [initialized, location])
}

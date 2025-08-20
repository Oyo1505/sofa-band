import { useEffect, useState } from "react"

const useScrollPosition = () => {
  const [positionY, setPositionY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      setPositionY(position)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return positionY
}

export default useScrollPosition
import { useState, useEffect, useCallback } from 'react'

const SCROLL_THRESHOLD = 10
const MIDDLE_SCREEN_OFFSET = 0.5

export function useScrollSections(sections: string[]) {
  const [activeSection, setActiveSection] = useState('#top')
  const [isScrolled, setIsScrolled] = useState(false)

  const updateActiveSection = useCallback(() => {
    const scrollPosition =
      window.scrollY + window.innerHeight * MIDDLE_SCREEN_OFFSET
    let currentSection = '#top'

    for (const sectionId of sections) {
      const element = document.querySelector(sectionId)
      if (!element) continue
      const rect = element.getBoundingClientRect()
      const elementTop = window.scrollY + rect.top

      if (scrollPosition >= elementTop) {
        currentSection = sectionId
      }
    }

    setActiveSection(currentSection)
  }, [sections])

  const updateIsScrolled = useCallback(() => {
    setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      updateIsScrolled()
      updateActiveSection()
    }

    window.addEventListener('scroll', onScroll)
    requestAnimationFrame(onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [updateIsScrolled, updateActiveSection])

  return { activeSection, isScrolled }
}

export function useBodyOverflow(isActive: boolean) {
  useEffect(() => {
    const className = 'overflow-hidden'
    if (isActive) {
      document.body.classList.add(className)
    } else {
      document.body.classList.remove(className)
    }

    return () => {
      document.body.classList.remove(className)
    }
  }, [isActive])
}

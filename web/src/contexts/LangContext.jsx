import { createContext, useContext, useState } from 'react'

const LangContext = createContext({ lang: 'es', toggleLang: () => {} })

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('portfolio_lang') || 'es' } catch { return 'es' }
  })

  function toggleLang() {
    const next = lang === 'es' ? 'en' : 'es'
    setLang(next)
    try { localStorage.setItem('portfolio_lang', next) } catch {}
  }

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}

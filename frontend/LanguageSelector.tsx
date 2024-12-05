export default function LanguageSelector({ 
  currentLanguage, 
  onLanguageChange 
}: { 
  currentLanguage: string, 
  onLanguageChange: (lang: string) => void 
}) {
  const languages = [
    { code: 'ml', name: 'Malayalam' },
    { code: 'en', name: 'English' }
  ]

  return (
    <div className="mb-4">
      <select 
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="p-2 border rounded"
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  )
}

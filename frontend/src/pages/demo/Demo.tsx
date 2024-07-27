import { ChangeEvent, useEffect, useState } from "react"
import { list } from "../../services/words";
import { Word } from "../../interfaces/word.interface";
import Navbar from "../../components/Navbar";
import "./Demo.css"

function Demo() {
  const [words, setWords] = useState<Word[] | []>([])
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'fr' | 'de' | 'es'>('en');

  const fetchWords = async () => {
    const token = localStorage.getItem("token")
    if (token) {
      const data = await list(token)
      if (data) setWords(data.data)
    }
  }

  useEffect(() => {
    fetchWords()
  }, []);

  const capitalize = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value as 'en' | 'fr' | 'de' | 'es');
  };

  const addSpace = (word: string) => {
    const sentence = ` ${capitalize(word)}`
    return sentence
  }
  return (
    <div className="demo-container">
      <Navbar />
      <div className="language-selector">
        <select id="language" value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="es">Spanish</option>
        </select>
      </div>
      <div className="words-list">

      {words.map((word, index) => {
        return (
          <p key={index} className="word-item">{addSpace(word.translations[selectedLanguage]!)}</p>
        )
      })}
      </div>
    </div>
  )
}

export default Demo
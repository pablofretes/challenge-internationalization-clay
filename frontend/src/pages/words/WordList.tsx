import { useEffect, useState } from "react"
import { list } from "../../services/words";
import { Word as WordInterface } from "../../interfaces/word.interface";
import "./WordList.css"
import "../demo/Demo.css"
import { useNavigate } from "react-router-dom";
import Word from "../../components/word/Word";
import CreateWord from "../../components/word/CreateWord";
import Navbar from "../../components/shared/Navbar";

function Dashboard() {
  const [words, setWords] = useState<WordInterface[] | []>([])
  const navigate = useNavigate()

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const capitalize = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const addSpace = (word: string) => {
    const sentence = ` ${capitalize(word)}`
    return sentence
  }

  return (
    <div>
      <Navbar />
      <div className="word-list-container">
        <h1 className="word-list-title">Words</h1>
        <ul className="word-list">
          {words.map((word) => <Word word={word} fetchWords={fetchWords} key={word.uuid} />)}
        </ul>
        <div className="word-list-buttons">
          <button className="logout" onClick={handleLogout}>Logout</button>
        </div>
        <CreateWord fetchWords={fetchWords} />
      </div>
      <div className="words-demo-container">
        <p className="words-list word-item">Update default language to change a word's value</p>
        <div className="words-list">
          {words.map((word, index) => {
            return (
              <p key={index} className="word-item">{addSpace(word.translations[word.defaultLanguage]!)}</p>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
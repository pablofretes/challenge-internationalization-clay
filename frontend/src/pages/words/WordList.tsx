import { useEffect, useState } from "react"
import { list } from "../../services/words";
import { Word as WordInterface } from "../../interfaces/word.interface";
import "./WordList.css"
import { useNavigate } from "react-router-dom";
import Word from "../../components/Word";
import CreateWord from "../../components/CreateWord";
import Navbar from "../../components/Navbar";

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
    </div>
  )
}

export default Dashboard
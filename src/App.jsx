import { useEffect, useState } from 'react'
import FeedbackPerson from './Feedbacks/FeedbackPerson'
import ChoisingsUpdate from './Choisings/ChoisingsUpdate'
import './Styles/style.css'
import Plugins from './PluginsTriton/Plugins'

function App() {
  const [feedbacks, setFeedback] = useState([])
  useEffect(() => {
    const url = 'https://localhost:7183/feedbackGet'

    fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((result) => {
        setFeedback(result)
      })
  }, [])

  const [choisings, setChoisings] = useState([])
  useEffect(() => {
    const url = 'https://localhost:7183/getChoising'

    fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((result) => {
        setChoisings(result)
      })
  }, [])

  const [plugins, setPlugins] = useState([])
  useEffect(() => {
    const url = 'https://localhost:7183/getPlugin'

    fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((result) => {
        //console.log(result)
        setPlugins(result)
      })
  }, [])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const toggleShowCreateForm = () => {
    setShowCreateForm(!showCreateForm)
  }

  const [titlePlugin, setTitlePlugin] = useState('')
  const [shortInfoPlugin, setShortInfoPlugin] = useState('')

  const toggleCreatePlugin = (e) => {
    e.preventDefault()

    const newPlugin = {
      title: titlePlugin,
      shortInfo: shortInfoPlugin,
    }

    const url = 'https://localhost:7183/createPlugin'

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlugin),
    })
      .then((response) => response.json())
      .then((result) => console.log(result))

    toggleShowCreateForm()
  }

  return (
    <div className="App">
      <section className="feedbacks">
        <div className="feedbacks__title">
          <h1>Заявки</h1>
        </div>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Фамилия</th>
              <th>Имя</th>
              <th>Email</th>
              <th>Вопросы</th>
            </tr>
            {feedbacks.map((f) => (
              <FeedbackPerson {...f} key={f.id} />
            ))}
          </tbody>
        </table>
      </section>

      <section className="choisings">
        <div className="choisings__title">
          <h1>Почему нас выбирают</h1>
        </div>

        <div className="choisings__header">
          <ul>
            <li>ID</li>
            <li>Заголовок</li>
            <li>Описание</li>
            <li>Действие</li>
          </ul>
        </div>
        {choisings.map((choise) => (
          <ChoisingsUpdate {...choise} key={choise.id} />
        ))}
      </section>

      <section className="plugin">
        <h1 className="plugin__title">Все виды плагинов</h1>
        <div className="plugin__body">
          <div className="create__form__plugin">
            {showCreateForm && (
              <form onSubmit={toggleCreatePlugin}>
                <input
                  type="text"
                  value={titlePlugin}
                  onChange={(e) => setTitlePlugin(e.target.value)}
                />
                <input
                  type="text"
                  value={shortInfoPlugin}
                  onChange={(e) => setShortInfoPlugin(e.target.value)}
                />

                <button type="submit">Создать</button>
              </form>
            )}
          </div>
          <button onClick={toggleShowCreateForm}>Создать новый плагин</button>
          <div className="choisings__header">
            <ul>
              <li>ID</li>
              <li>Заголовок</li>
              <li>Короткая информация</li>
            </ul>
          </div>
          {plugins.map((plugin) => (
            <Plugins {...plugin} key={plugin.id} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default App

import { useState } from 'react'

const ChoisingsUpdate = (props) => {
  const { id, title, text } = props
  const [showUpdateForm, setShowUpdateForm] = useState(true)
  const [titleInput, setTitle] = useState(title)
  const [textInput, setText] = useState(text)

  const toggleShowUpdateForm = () => {
    setShowUpdateForm(!showUpdateForm)
  }

  const toggleUpdateChoising = (e) => {
    e.preventDefault()
    const updateChoising = {
      id: id,
      title: titleInput,
      text: textInput,
    }

    const url = `https://localhost:7183/updateChoising/${id}`

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(updateChoising),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
        alert(error)
      })

    toggleShowUpdateForm()
  }

  return (
    <div className="choising__item__body">
      {showUpdateForm ? (
        <>
          {' '}
          <div className="chosising__item__id">{id}</div>
          <div className="chosising__item__title">{title}</div>
          <div className="chosising__item__text">{text}</div>
          <button onClick={toggleShowUpdateForm}>Обновить</button>{' '}
        </>
      ) : (
        <form onSubmit={toggleUpdateChoising}>
          <input
            type="text"
            value={titleInput}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            value={textInput}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Сохранить</button>
          <button onClick={toggleShowUpdateForm}>Отменить</button>
        </form>
      )}
    </div>
  )
}

export default ChoisingsUpdate

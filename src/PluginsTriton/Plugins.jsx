import { useState } from 'react'
const Plugins = (props) => {
  const { title, shortInfo, id } = props
  const [showUpdateForm, setShowUpdateForm] = useState(true)
  const [titleUpdate, setTitleUpdate] = useState(title)
  const [shortInfoUpdate, setShortInfoUpdate] = useState(shortInfo)

  const toggleShowUpdatePlugin = () => {
    setShowUpdateForm(!showUpdateForm)
  }

  const toggleUpdatePlugin = (e) => {
    e.preventDefault()

    const updatePlugin = {
      title: titleUpdate,
      shortInfo: shortInfoUpdate,
    }

    const url = `https://localhost:7183/updatePlugin/${id}`

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(updatePlugin),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
        alert(error)
      })
  }

  const toggleDeletePlugin = (id) => {
    const url = `https://localhost:7183/deletePlugin/${id}`

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
  }

  return (
    <>
      {showUpdateForm ? (
        <div className="plugin__item">
          <div className="plugin__item__id">{id}</div>
          <div className="plugin__item__title">{title}</div>
          <div className="plugin__item__shortInfo">{shortInfo}</div>
          <button
            onClick={() => {
              if (
                window.confirm(
                  `Вы действительно хотите удалить плагин "${title}" ?`
                )
              )
                toggleDeletePlugin(id)
            }}
          >
            Удалить
          </button>
          <button onClick={toggleShowUpdatePlugin}>Обновить</button>
        </div>
      ) : (
        <form onSubmit={toggleUpdatePlugin}>
          <input
            type="text"
            value={titleUpdate}
            onChange={(e) => setTitleUpdate(e.target.value)}
          />
          <input
            type="text"
            value={shortInfoUpdate}
            onChange={(e) => setShortInfoUpdate(e.target.value)}
          />
          <button type="submit">Сохранить</button>
          <button onClick={toggleShowUpdatePlugin}>Отменить</button>
        </form>
      )}
    </>
  )
}

export default Plugins

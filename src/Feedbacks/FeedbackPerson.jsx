const FeedbackPerson = (props) => {
  const { id, surname, name, email, questions } = props

  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{surname}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{questions}</td>
    </tr>
  )
}

export default FeedbackPerson

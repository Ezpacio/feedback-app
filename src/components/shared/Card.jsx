
function Card({ children, reverse, editMode }) {
  return (
    <div className={`card ${reverse && 'reverse'}`}>{children}</div>
  )
}

export default Card;
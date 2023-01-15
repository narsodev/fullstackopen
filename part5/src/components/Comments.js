export default function Comments ({ comments = [] }) {
  return (
    <section>
      <h3>Comments</h3>
      {comments.length === 0 && <p>No comments yet</p>}
      <ul>
        {comments.map((comment, index) => <li key={index}>{comment}</li>)}
      </ul>
    </section>
  )
}
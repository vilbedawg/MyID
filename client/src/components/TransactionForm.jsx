
export default function TransactionForm({data}) {
  return (
    <div>
      <form>
        <div className="form-group">
          {Object.keys(data).map((item, i) => (
            <div key={i}>
              <h1>{item}</h1>
            </div>
          ))}
        </div>
      </form>
    </div>
  )
}

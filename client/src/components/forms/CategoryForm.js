export default function CategoryForm({
  value,
  setValue,
  handleSubmit,
  buttonUpdateText = "Submit",
  handleDelete,
}) {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control p-3"
          placeholder="Enter Category name..."
          value={value}
          autoFocus
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />

        <div className="d-flex justify-content-between">
          <button className="btn btn-primary mt-3">{buttonUpdateText}</button>
          {handleDelete && (
            <button onClick={handleDelete} className="btn btn-danger mt-3">
              Delete
            </button>
          )}
        </div>
      </form>
    </>
  );
}

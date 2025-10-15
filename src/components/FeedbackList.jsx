const FeedbackList = ({ neighborhoodName, feedback }) => {
  return (
    <div className="feedback-list">
      <header className="feedback-header">
        <h2>{neighborhoodName}</h2>
      </header>
      
      <div className="feedback-container">
        {feedback.length === 0 ? (
          <p className="no-feedback">No hay quejas registradas para este barrio.</p>
        ) : (
          <ul className="feedback-list">
            {feedback.map((complaint) => (
              <li key={complaint.id} className="complaint-item">
                <p className="complaint-content">{complaint.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FeedbackList;
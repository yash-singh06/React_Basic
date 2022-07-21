import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function JobDetails() {
  const jobDetails = useSelector((state) => state.jobDetails);
  const navigate = useNavigate();

  return (
    <>
      <h1>{jobDetails.title} Details</h1>
      <div>
        <span>Title:</span>
        <span>{jobDetails.title}</span>
        <span>Location:</span>
        <span>{jobDetails.location}</span>
        <span>Department:</span>
        <span>{jobDetails.department}</span>
      </div>

      <button onClick={() => navigate("/")}>Go back</button>
    </>
  );
}

export default JobDetails;

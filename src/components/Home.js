import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import ListComponent from "./ListComponent";
import JobDetails from "./JobDetailComponent";
function Home() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ListComponent />} />
          <Route path="/details" element={<JobDetails />} />
          <Route path="*" element={<NoRouteFallBack />} />
        </Routes>
      </Router>
    </>
  );
}

function NoRouteFallBack() {
  return <div>No Route available. Click on back button</div>;
}

export default Home;

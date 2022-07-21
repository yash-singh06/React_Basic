import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function ListComponent() {
  const cityList = ["All", "Bangalore", "Mumbai", "Chennai"];
  const [searchtext, setSearchText] = useState("");
  const navigate = useNavigate();
  let list = useSelector((state) => state.list);
  let filteredList = useSelector((state) => state.filteredList);
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      const response = await fetch(
        "https://us-central1-lapps-in.cloudfunctions.net/getJobs"
      );
      const data = await response.json();
      dispatch({ type: "add", payload: { list: [...data] } });
      console.log(data);
    })();
  }, []);

  const onCityChange = (e) => {
    console.log(e.target.value);
    dispatch({
      type: "filterByCity",
      payload: { location: e.target.value.toLowerCase() }
    });
  };
  const navigateToDetails = (i) => {
    dispatch({
      type: "jobDetails",
      payload: { jobDetails: list[i] }
    });
    navigate("/details");
  };

  const search = () => {
    console.log(searchtext);
    dispatch({
      type: "searchText",
      payload: { searchText: searchtext }
    });
    if (!searchtext) {
      dispatch({
        type: "filterByCity",
        payload: { location: "all" }
      });
    }
  };
  return (
    <>
      <div className="text-left">
        <span>
          <input
            type="search"
            value={searchtext}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Type to search.."
          />
          <button onClick={search}>Search</button>
        </span>
        <span>
          <select onChange={onCityChange}>
            {cityList.map(function (x, i) {
              return (
                <option key={i} value={x}>
                  {x}
                </option>
              );
            })}
          </select>
        </span>
      </div>
      <ul>
        {filteredList.map(function (x, i) {
          return (
            <li key={i}>
              <div>
                <span>{x.title}</span>
                <span>{x.location}</span>
                <span>{x.department}</span>
                <span>
                  <button onClick={() => navigateToDetails(i)}>Details</button>
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ListComponent;

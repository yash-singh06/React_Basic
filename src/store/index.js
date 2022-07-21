import { createStore } from "redux";

const jobsReducer = (
  state = { list: [], filteredList: [], jobDetails: {} },
  action
) => {
  if (action.type === "add") {
    return {
      ...state,
      list: [...action.payload.list],
      filteredList: [...action.payload.list]
    };
  } else if (action.type === "remove") {
    return { ...state, list: [...action.payload.list] };
  } else if (action.type === "filterByCity") {
    let newList = state.list.filter(function (x) {
      return x.location.toLowerCase() === action.payload.location;
    });
    if (action.payload.location === "all") {
      newList = [...state.list];
    }
    return { ...state, filteredList: [...newList] };
  } else if (action.type === "jobDetails") {
    console.log(action);
    return { ...state, jobDetails: { ...action.payload.jobDetails } };
  } else if (action.type === "searchText") {
    let newList = state.list.filter(function (x) {
      return (
        x.location.toLowerCase() === action.payload.searchText ||
        x.title.toLowerCase() === action.payload.searchText ||
        x.department.toLowerCase() === action.payload.searchText
      );
    });
    if (!action.payload.searchText) {
      newList = [...state.list];
    }
    return { ...state, filteredList: [...newList] };
  }

  return state;
};

const store = createStore(jobsReducer);

export default store;

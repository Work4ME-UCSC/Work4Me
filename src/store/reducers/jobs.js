import { JOBS } from "../../data/dummy-data";
import { TOGGLE_FAVOURITE } from "../actions/jobs";

const initialState = {
  availableJobs: JOBS,
  favouriteJobs: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVOURITE:
      const existingIndex = state.favouriteJobs.findIndex(
        (job) => job.jobID === action.jobID
      );

      if (existingIndex >= 0) {
        const updateFavJobs = [...state.favouriteJobs];
        updateFavJobs.splice(existingIndex, 1);
        return { ...state, favouriteJobs: updateFavJobs };
      } else {
        const job = state.availableJobs.find(
          (job) => job.jobID === action.jobID
        );
        return { ...state, favouriteJobs: state.favouriteJobs.concat(job) };
      }

    default:
      return state;
  }
};

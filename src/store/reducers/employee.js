import Job from "../../models/jobs";

import { JOBS } from "../../data/dummy-data";
import {
  TOGGLE_FAVOURITE,
  SET_JOBS,
  SET_APPLIED_JOBS,
  APPLY_FOR_JOB,
} from "../actions/employee";

const initialState = {
  availableJobs: JOBS,
  favouriteJobs: [],
  appliedJobs: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JOBS:
      return {
        ...state,
        availableJobs: action.jobs,
      };

    case SET_APPLIED_JOBS:
      return {
        ...state,
        appliedJobs: action.appliedJobs,
      };

    case APPLY_FOR_JOB:
      return {
        ...state,
        appliedJobs: state.appliedJobs.concat(action.appliedJob),
      };

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

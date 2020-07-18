import Job from "../../models/jobs";

import { JOBS } from "../../data/dummy-data";
import { TOGGLE_FAVOURITE, CREATE_JOB } from "../actions/jobs";

const initialState = {
  availableJobs: JOBS,
  favouriteJobs: [],
  postedJobs: JOBS.filter((job) => job.EmployerID === "emr01"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_JOB:
      const newJob = new Job(
        new Date().toString(),
        action.data.title,
        "",
        action.data.category,
        action.data.description,
        "",
        "",
        action.data.salary,
        "",
        "",
        action.data.address,
        action.data.location,
        new Date(),
        "emr01"
      );

      return { ...state, availableJobs: state.availableJobs.concat(newJob) };

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

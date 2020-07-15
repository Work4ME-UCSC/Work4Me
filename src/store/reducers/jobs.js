import { JOBS } from "../../data/dummy-data";

const initialState = {
  availableJobs: JOBS,
  favouriteJobs: JOBS.filter((jobs) => jobs.EmployerID === "emr01"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

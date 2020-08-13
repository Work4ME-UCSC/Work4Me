import workApi from "../../api/workApi";
import Job from "../../models/jobs";

export const CREATE_JOB = "CREATE_JOB";
export const TOGGLE_FAVOURITE = "TOGGLE_FAVOURITE";
export const SET_JOBS = "SET_JOBS";

export const fetchJobs = () => {
  return async (dispatch) => {
    const response = await workApi.get("/jobs/get");

    const data = response.data;

    const loadedJobs = [];

    for (const key in data) {
      loadedJobs.push(
        new Job(
          data[key]._id,
          data[key].JobTitle,
          "",
          data[key].JobCategory,
          data[key].JobDescribtion,
          "",
          "",
          data[key].Salary,
          "",
          "",
          data[key].JobAddress,
          data[key].JobLocation
        )
      );
    }

    dispatch({ type: SET_JOBS, jobs: loadedJobs });
  };
};

export const toggleFavourite = (jobID) => {
  return { type: TOGGLE_FAVOURITE, jobID };
};

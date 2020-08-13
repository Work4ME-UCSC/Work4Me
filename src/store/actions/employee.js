import workApi from "../../api/workApi";
import Job from "../../models/jobs";
import AppliedJobs from "../../models/appliedJobs";

export const CREATE_JOB = "CREATE_JOB";
export const TOGGLE_FAVOURITE = "TOGGLE_FAVOURITE";
export const SET_JOBS = "SET_JOBS";
export const SET_APPLIED_JOBS = "SET_APPLIED_JOBS";
export const APPLY_FOR_JOB = "APPLY_FOR_JOB";

export const fetchJobs = () => {
  return async (dispatch) => {
    const response = await workApi.get("/jobs/alljobs");

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
          data[key].JobLocation,
          data[key].createdAt,
          data[key].owner
        )
      );
    }

    dispatch({ type: SET_JOBS, jobs: loadedJobs });
  };
};

export const fetchAppliedJobs = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await workApi.get("/employee/apply", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const resData = response.data;

    const loadedJobs = [];

    for (const key in resData) {
      loadedJobs.push(
        new AppliedJobs(
          resData[key]._id,
          resData[key].jobID,
          resData[key].JobTitle,
          "",
          resData[key].owner,
          resData[key].jobStatus,
          resData[key].createdAt
        )
      );
    }

    dispatch({ type: SET_APPLIED_JOBS, appliedJobs: loadedJobs });
  };
};

export const toggleFavourite = (jobID) => {
  return { type: TOGGLE_FAVOURITE, jobID };
};

export const applyForJob = (jobID) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      const response = await workApi.post(
        `/employee/apply/${jobID}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const resData = response.data;

      const appliedJob = new AppliedJobs(
        resData._id,
        resData.jobID,
        "",
        "",
        resData.owner,
        resData.jobStatus,
        resData.createdAt
      );

      console.log(appliedJob);

      dispatch({ type: APPLY_FOR_JOB, appliedJob });
    } catch (e) {
      console.log(e);
    }
  };
};

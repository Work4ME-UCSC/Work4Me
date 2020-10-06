import workApi from "../../api/workApi";
import Job from "../../models/jobs";
import AppliedJobs from "../../models/appliedJobs";

export const CREATE_JOB = "CREATE_JOB";
export const TOGGLE_FAVOURITE = "TOGGLE_FAVOURITE";
export const SET_JOBS = "SET_JOBS";
export const SET_PENDING_JOBS = "SET_PENDING_JOBS";
export const SET_CURRENT_JOBS = "SET_CURRENT_JOBS";
export const APPLY_FOR_JOB = "APPLY_FOR_JOB";
export const CANCEL_JOB_REQUEST = "CANCEL_JOB_REQUEST";
export const JOB_FINISHED = "JOB_FINISHED";
export const SET_PAST_JOBS = "SET_PAST_JOBS";
export const SET_REVIEW = "SET_REVIEW";

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
          data[key].JobImage,
          data[key].JobCategory,
          data[key].JobDescription,
          data[key].JobSalary,
          data[key].JobDate,
          data[key].JobAddress,
          data[key].JobLocation,
          data[key].createdAt,
          data[key].owner,
          "",
          data[key].Sex
        )
      );
    }

    dispatch({ type: SET_JOBS, jobs: loadedJobs });
  };
};

//fetch pending jobs

export const fetchPendingJobs = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await workApi.get("/employee/apply?status=pending", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const resData = response.data;

    const loadedJobs = [];

    for (const key in resData) {
      loadedJobs.push(
        new AppliedJobs(
          resData[key]._id,
          resData[key].jobDetails._id,
          resData[key].jobDetails.JobTitle,
          resData[key].jobDetails.JobImage,
          resData[key].owner,
          resData[key].jobStatus,
          resData[key].createdAt,
          resData[key].jobDetails.JobCategory,
          resData[key].jobDetails.JobDescription,
          resData[key].jobDetails.JobSalary,
          resData[key].jobDetails.JobDate,
          resData[key].jobDetails.JobAddress,
          resData[key].jobDetails.JobLocation,
          resData[key].jobDetails.createdAt,
          resData[key].jobDetails.owner,
          resData[key].jobDetails.Sex
        )
      );
    }

    dispatch({ type: SET_PENDING_JOBS, appliedJobs: loadedJobs });
  };
};

//fetch current jobs

export const fetchCurrentJobs = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await workApi.get("/employee/apply?status=confirmed", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const resData = response.data;

    const loadedJobs = [];

    for (const key in resData) {
      loadedJobs.push(
        new AppliedJobs(
          resData[key]._id,
          resData[key].jobDetails._id,
          resData[key].jobDetails.JobTitle,
          resData[key].jobDetails.JobImage,
          resData[key].owner,
          resData[key].jobStatus,
          resData[key].updatedAt,
          resData[key].jobDetails.JobCategory,
          resData[key].jobDetails.JobDescription,
          resData[key].jobDetails.JobSalary,
          resData[key].jobDetails.JobDate,
          resData[key].jobDetails.JobAddress,
          resData[key].jobDetails.JobLocation,
          resData[key].jobDetails.createdAt,
          resData[key].jobDetails.owner,
          resData[key].jobDetails.Sex
        )
      );
    }

    dispatch({ type: SET_CURRENT_JOBS, currentJobs: loadedJobs });
  };
};

export const toggleFavourite = (jobID) => {
  return { type: TOGGLE_FAVOURITE, jobID };
};

export const applyForJob = (jobID) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const job = getState().employee.availableJobs.find(
      (job) => job.jobID === jobID
    );

    try {
      const response = await workApi.post(
        `/employee/apply/${jobID}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const resData = response.data;

      const appliedJob = new AppliedJobs(
        resData._id,
        jobID,
        job.jobTitle,
        job.jobImage,
        resData.owner,
        resData.jobStatus,
        resData.createdAt
      );

      dispatch({ type: APPLY_FOR_JOB, appliedJob });
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
};

export const cancelJobRequest = (id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      await workApi.delete(`/employee/cancelRequest/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch({ type: CANCEL_JOB_REQUEST, id });
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
};

export const jobFinished = (id, employerID) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      await workApi.patch(
        `/employee/jobFinished/${id}`,
        { employerID },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch({ type: JOB_FINISHED, id });
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
};

export const fetchPastJobs = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await workApi.get("/employee/apply?status=finished", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const resData = response.data;

    const loadedJobs = [];

    for (const key in resData) {
      loadedJobs.push(
        new AppliedJobs(
          resData[key]._id,
          resData[key].jobDetails._id,
          resData[key].jobDetails.JobTitle,
          resData[key].jobDetails.JobImage,
          resData[key].owner,
          resData[key].jobStatus,
          resData[key].updatedAt,
          resData[key].jobDetails.JobCategory,
          resData[key].jobDetails.JobDescription,
          resData[key].jobDetails.JobSalary,
          resData[key].jobDetails.JobDate,
          resData[key].jobDetails.JobAddress,
          resData[key].jobDetails.JobLocation,
          resData[key].jobDetails.createdAt,
          resData[key].jobDetails.owner,
          resData[key].jobDetails.Sex,
          "",
          resData[key].isEmployeeReviewed
        )
      );
    }

    dispatch({ type: SET_PAST_JOBS, pastJobs: loadedJobs });
  };
};

export const addReview = (to, rate, review, jobID, id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      await workApi.post(
        "/review/add",
        { to, rate, review, jobID },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch({ type: SET_REVIEW, id, rate });
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
};

import workApi from "../../api/workApi";
import Job from "../../models/jobs";
import AppliedJobs from "../../models/appliedJobs";

export const CREATE_JOB = "CREATE_JOB";
export const SET_REQUESTS = "SET_REQUESTS";
export const REJECT_REQUEST = "REJECT_REQUEST";
export const ACCEPT_REQUEST = "ACCEPT_REQUEST";
export const SET_CURRENT_JOBS = "SET_CURRENT_JOBS";
export const SET_PAST_JOBS = "SET_PAST_JOBS";

export const fetchJobs = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      const response = await workApi.get("/jobs/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });

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
            data[key].Salary,
            data[key].JobDate,
            data[key].JobAddress,
            data[key].JobLocation,
            data[key].createdAt,
            data[key].owner,
            data[key].applicants
          )
        );
      }

      dispatch({ type: SET_REQUESTS, jobRequests: loadedJobs });
    } catch (e) {
      console.log(e);
    }
  };
};

export const createJob = (
  title,
  description,
  category,
  location,
  address,
  salary,
  date,
  sex,
  image
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await workApi.post(
        "/jobs/add",
        {
          JobTitle: title,
          JobDescription: description,
          JobCategory: category,
          JobLocation: location,
          JobAddress: address,
          JobSalary: salary,
          JobDate: date,
          Sex: sex,
          JobImage: image,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // console.log(response.data);

      dispatch({
        type: CREATE_JOB,
        data: {
          id: response.data._id,
          title,
          description,
          category,
          location,
          address,
          salary,
          date,
          sex,
          jobImage: response.data.JobImage,
          createdDate: response.data.createdAt,
          owner: response.data.owner,
        },
      });
    } catch (err) {
      let message = "Something went wrong";
      console.log(err.response);

      if (err.response.status === 401) message = "Please sign in";
      throw new Error(message);
    }
  };
};

export const acceptRequest = (jobID, userID) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      await workApi.patch(
        `/jobs/confirm/${jobID}/${userID}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch({ type: ACCEPT_REQUEST, jobID });
    } catch (err) {}
  };
};

export const rejectRequest = (jobID, userID) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      await workApi.delete(`/jobs/reject/${jobID}/${userID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch({ type: REJECT_REQUEST, userID, jobID });
    } catch (err) {}
  };
};

export const fetchSelectedJobs = (type) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      const response = await workApi.get(`/jobs/selectedJobs?status=${type}`, {
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
            resData[key].jobDetails.Sex,
            resData[key].isEmployerReviewed
          )
        );
      }

      if (type === "confirmed")
        dispatch({ type: SET_CURRENT_JOBS, jobs: loadedJobs });
      else dispatch({ type: SET_PAST_JOBS, jobs: loadedJobs });
    } catch (e) {
      console.log(e);
    }
  };
};

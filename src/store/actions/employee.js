import workApi from "../../api/workApi";

export const CREATE_JOB = "CREATE_JOB";
export const TOGGLE_FAVOURITE = "TOGGLE_FAVOURITE";
export const SET_JOBS = "SET_JOBS";

import Job from '../../models/jobs';

export const fetchJobs = () => {
  return async dispatch => {
    const response = await fetch(
      "http://eb83c93e8030.ngrok.io/jobs/get",
    );

    const resData =response.json();
    
    console.log(resData);
    // console.log("hry");

    const loadedJobs = [];

    for (const key in resData) {
      loadedJobs.push(new Job(
        key,
        'u1',
        resData[key].jobTitle,
        resData[key].jobDescribtion,
        resData[key].jobLocation,
        resData[key].jobAddress
        )
        );
    };

    dispatch({ type: SET_JOBS, jobs: loadedJobs })
  };
};

export const toggleFavourite = (jobID) => {
  return { type: TOGGLE_FAVOURITE, jobID };
};

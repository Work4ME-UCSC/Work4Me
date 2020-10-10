import Job from "../../models/jobs";

import {
  ACCEPT_REQUEST,
  CREATE_JOB,
  REJECT_REQUEST,
  SET_CURRENT_JOBS,
  SET_PAST_JOBS,
  SET_REQUESTS,
  SET_REVIEW_EMPLOYER,
} from "../actions/employer";

const initialState = {
  postedJobs: [],
  jobRequests: [],
  currentJobs: [],
  pastJobs: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_REQUESTS:
      return {
        ...state,
        jobRequests: action.jobRequests,
      };

    case CREATE_JOB:
      const newJob = new Job(
        action.data.id,
        action.data.title,
        action.data.jobImage,
        action.data.category,
        action.data.description,
        action.data.salary,
        action.data.date,
        action.data.address,
        action.data.location,
        action.data.createdDate,
        action.data.owner,
        []
      );

      return {
        ...state,
        postedJobs: state.postedJobs.concat(newJob),
        jobRequests: state.jobRequests.concat(newJob),
      };

    case ACCEPT_REQUEST:
      const updatedJobRequests = state.jobRequests.filter(
        (job) => job.jobID !== action.jobID
      );
      return {
        ...state,
        jobRequests: updatedJobRequests,
        currentJobs: state.currentJobs.concat(action.newCurrentJob)
      };

    case REJECT_REQUEST:
      const updateJobs = [...state.jobRequests];
      const jobLocalId = state.jobRequests.findIndex(
        (jobs) => jobs.jobID === action.jobID
      );
      const job = state.jobRequests.find((jobs) => jobs.jobID === action.jobID);
      const updatedJobApplicants = job.applicants.filter(
        (applicant) => applicant.applicantID._id !== action.userID
      );

      job.applicants = updatedJobApplicants;

      updateJobs[jobLocalId] = job;

      return {
        ...state,
        jobRequests: updateJobs,
      };

    case SET_CURRENT_JOBS:
      return {
        ...state,
        currentJobs: action.jobs,
      };

    case SET_PAST_JOBS:
      return {
        ...state,
        pastJobs: action.jobs,
      };

    case SET_REVIEW_EMPLOYER:
      const updatedPastJobs = [...state.pastJobs];
      const jobID = state.pastJobs.findIndex((job) => job.id === action.id);
      const updateJob = state.pastJobs.find((job) => job.id === action.id);

      updateJob.isEmployerReviewed = action.rate;

      updatedPastJobs[jobID] = updateJob;
      console.log(updatedPastJobs);

      return {
        ...state,
        pastJobs: updatedPastJobs,
      };

    default:
      return state;
  }
};

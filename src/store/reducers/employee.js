import {
  TOGGLE_FAVOURITE,
  SET_JOBS,
  SET_PENDING_JOBS,
  APPLY_FOR_JOB,
  CANCEL_JOB_REQUEST,
  SET_CURRENT_JOBS,
} from "../actions/employee";

const initialState = {
  availableJobs: [],
  favouriteJobs: [],
  appliedJobs: [],
  currentJobs: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JOBS:
      return {
        ...state,
        availableJobs: action.jobs,
      };

    case SET_PENDING_JOBS:
      return {
        ...state,
        appliedJobs: action.appliedJobs,
      };

    case SET_CURRENT_JOBS:
      return {
        ...state,
        currentJobs: action.currentJobs,
      };

    case APPLY_FOR_JOB:
      return {
        ...state,
        appliedJobs: state.appliedJobs.concat(action.appliedJob),
      };

    case CANCEL_JOB_REQUEST:
      return {
        ...state,
        appliedJobs: state.appliedJobs.filter((job) => job.id !== action.id),
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

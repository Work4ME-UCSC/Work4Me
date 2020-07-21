export const CREATE_JOB = "CREATE_JOB";
export const TOGGLE_FAVOURITE = "TOGGLE_FAVOURITE";

export const createPost = (
  title,
  description,
  category,
  location,
  address,
  salary,
  workDay,
  sex
) => {
  return {
    type: CREATE_JOB,
    data: {
      title,
      description,
      category,
      location,
      address,
      salary,
      workDay,
      sex,
    },
  };
};

export const toggleFavourite = (jobID) => {
  return { type: TOGGLE_FAVOURITE, jobID };
};

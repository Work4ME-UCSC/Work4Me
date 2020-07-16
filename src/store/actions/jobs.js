export const TOGGLE_FAVOURITE = "TOGGLE_FAVOURITE";

export const toggleFavourite = (jobID) => {
  return { type: TOGGLE_FAVOURITE, jobID };
};

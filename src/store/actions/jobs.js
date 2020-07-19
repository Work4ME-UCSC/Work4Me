import workApi from "../../api/workApi";

export const CREATE_JOB = "CREATE_JOB";
export const TOGGLE_FAVOURITE = "TOGGLE_FAVOURITE";

export const createJob = (
  title,
  description,
  category,
  location,
  address,
  salary,
  workDay,
  sex
) => {
  return async (dispathch) => {
    try {
      const reponse = await workApi.post("/jobs/add", {
        JobTitle: title,
        JobDescription: description,
        JobCategory: category,
        JobLocation: location,
        JobAddress: address,
        JobDay: workDay,
        Sex: sex,
      });

      // console.log(reponse.data);

      dispathch({
        type: CREATE_JOB,
        data: {
          id: reponse.data._id,
          title,
          description,
          category,
          location,
          address,
          salary,
          workDay,
          sex,
          createdDate: reponse.data.createdAt,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const toggleFavourite = (jobID) => {
  return { type: TOGGLE_FAVOURITE, jobID };
};

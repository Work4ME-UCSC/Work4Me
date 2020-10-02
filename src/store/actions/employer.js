import workApi from "../../api/workApi";
import Job from "../../models/jobs";

export const CREATE_JOB = "CREATE_JOB";
export const SET_REQUESTS = "SET_REQUESTS";

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
            "",
            "",
            data[key].Salary,
            "",
            "",
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
  workDay,
  sex
) => {
  return async (dispathch, getState) => {
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
          JobDay: workDay,
          Sex: sex,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // console.log(response.data);

      dispathch({
        type: CREATE_JOB,
        data: {
          id: response.data._id,
          title,
          description,
          category,
          location,
          address,
          salary,
          workDay,
          sex,
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

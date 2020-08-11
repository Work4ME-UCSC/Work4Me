import workApi from "../../api/workApi";

export const CREATE_JOB = "CREATE_JOB";

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

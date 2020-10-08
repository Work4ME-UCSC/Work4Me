import workApi from "../../api/workApi";
import Review from "../../models/review";

export const SET_REVIEWS = "SET_REVIEWS";

export const fetchReviews = (id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await workApi.get(`/review/retrieve/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const reviews = [];

      const resData = response.data.review;
      for (const key in resData) {
        reviews.push(
          new Review(
            resData[key]._id,
            resData[key].ReviewByWhom.firstName +
              " " +
              resData[key].ReviewByWhom.lastName,
            resData[key].ReviewByWhom.avatar,
            resData[key].ReviewScore,
            resData[key].ReviewContent
          )
        );
      }

      dispatch({ type: SET_REVIEWS, reviews });
    } catch (e) {
      throw e;
    }
  };
};

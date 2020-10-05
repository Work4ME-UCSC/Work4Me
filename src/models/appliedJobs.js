class AppliedJobs {
  constructor(
    id,
    jobID,
    jobTitle,
    jobImage,
    owner,
    jobStatus,
    createdAt,
    jobCategory,
    jobDescribtion,
    jobSalary,
    jobDate,
    jobAddress,
    jobLocation,
    jobPostedDate,
    employer,
    sex,
    isEmployerReviewed,
    isEmployeeReviewed
  ) {
    this.id = id;
    this.jobID = jobID;
    this.jobTitle = jobTitle;
    this.jobImage = jobImage;
    this.owner = owner;
    this.jobStatus = jobStatus;
    this.createdAt = createdAt;
    this.jobCategory = jobCategory;
    this.jobDescribtion = jobDescribtion;
    this.jobSalary = jobSalary;
    this.jobDate = jobDate;
    this.jobAddress = jobAddress;
    this.jobLocation = jobLocation;
    this.jobPostedDate = jobPostedDate;
    this.employer = employer;
    this.sex = sex;
    this.isEmployerReviewed = isEmployerReviewed;
    this.isEmployeeReviewed = isEmployeeReviewed;
  }
}

export default AppliedJobs;

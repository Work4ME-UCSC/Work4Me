class Job {
  constructor(
    jobID,
    jobTitle,
    jobImage,
    jobCategory,
    jobDescribtion,
    jobDetails,
    jobEmpExpectations,
    jobSalary,
    jobDate,
    jobTime,
    jobAddress,
    jobLocation,
    jobPostedDate,
    employer,
    applicants
  ) {
    this.jobID = jobID;
    this.jobTitle = jobTitle;
    this.jobImage = jobImage;
    this.jobCategory = jobCategory;
    this.jobDescribtion = jobDescribtion;
    this.jobDetails = jobDetails;
    this.jobEmpExpectations = jobEmpExpectations;
    this.jobSalary = jobSalary;
    this.jobDate = jobDate;
    this.jobTime = jobTime;
    this.jobAddress = jobAddress;
    this.jobLocation = jobLocation;
    this.jobPostedDate = jobPostedDate;
    this.employer = employer;
    this.applicants = applicants;
  }
}

export default Job;

class Job {
  constructor(
    jobID,
    jobTitle,
    jobImage,
    jobCategory,
    jobDescribtion,
    jobSalary,
    jobDate,
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
    this.jobSalary = jobSalary;
    this.jobDate = jobDate;
    this.jobAddress = jobAddress;
    this.jobLocation = jobLocation;
    this.jobPostedDate = jobPostedDate;
    this.employer = employer;
    this.applicants = applicants;
  }
}

export default Job;

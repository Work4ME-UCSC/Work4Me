class AppliedJobs {
  constructor(
    id,
    jobID,
    jobTitle,
    jobImage,
    owner,
    jobStatus,
    createdAt,
    employerID
  ) {
    this.id = id;
    this.jobID = jobID;
    this.jobTitle = jobTitle;
    this.jobImage = jobImage;
    this.owner = owner;
    this.jobStatus = jobStatus;
    this.createdAt = createdAt;
    this.employerID = employerID;
  }
}

export default AppliedJobs;

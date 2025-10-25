import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdWork} from 'react-icons/md'
import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    skills: [],
    lifeAtCompany: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedJobDetails = {
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        employmentType: fetchedData.job_details.employment_type,
        id: fetchedData.job_details.id,
        jobDescription: fetchedData.job_details.job_description,
        lifeAtCompany: fetchedData.job_details.life_at_company,
        location: fetchedData.job_details.location,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
        skills: fetchedData.job_details.skills,
        title: fetchedData.job_details.title,
      }
      const updatedSimilarJobs = fetchedData.similar_jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        rating: job.rating,
        title: job.title,
      }))

      this.setState({
        jobDetails: updatedJobDetails,
        skills: updatedJobDetails.skills,
        lifeAtCompany: updatedJobDetails.lifeAtCompany,
        similarJobs: updatedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {jobDetails, skills, lifeAtCompany, similarJobs} = this.state
    return (
      <div className="job-details-success-container">
        <div className="job-details-top-card">
          <img
            src={jobDetails.companyLogoUrl}
            alt="company logo"
            className="company-logo"
            role="img"
          />
          <div>
            <h1>{jobDetails.title}</h1>
            <div className="rating-container">
              <AiFillStar className="star-icon" />
              <p>{jobDetails.rating}</p>
            </div>
          </div>
        </div>
        <div className="job-details-middle-row">
          <div className="location-employment-container">
            <MdLocationOn />
            <p>{jobDetails.location}</p>
            <MdWork />
            <p>{jobDetails.employmentType}</p>
          </div>
          <p className="package">{jobDetails.packagePerAnnum}</p>
        </div>
        <hr />
        <h1>Description</h1>
        <a href={jobDetails.companyWebsiteUrl} target="_blank" rel="noreferrer">
          Visit
        </a>
        <p>{jobDetails.jobDescription}</p>
        <h1>Skills</h1>
        <ul className="skills-list" role="list">
          {skills.map(skill => (
            <li key={skill.name}>
              <img
                src={skill.image_url}
                alt={skill.name}
                className="skill-icon"
              />
              <p>{skill.name}</p>
            </li>
          ))}
        </ul>
        <h1>Life at Company</h1>
        <p>{lifeAtCompany.description}</p>
        <img src={lifeAtCompany.image_url} alt="life at company" />
        <h1>Similar Jobs</h1>
        <ul className="similar-jobs-list" role="list">
          {similarJobs.map(job => (
            <SimilarJobCard key={job.id} jobDetails={job} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="job-details-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-details-failure-image"
        role="img"
      />
      <h1 className="job-details-failure-heading" role="heading">
        Oops! Something Went Wrong
      </h1>
      <p className="job-details-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderViewBasedOnStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-route">
          {this.renderViewBasedOnStatus()}
        </div>
      </>
    )
  }
}

export default JobItemDetails

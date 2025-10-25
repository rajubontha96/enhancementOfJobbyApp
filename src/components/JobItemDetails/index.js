import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdWork} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'
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
        location: fetchedData.job_details.location,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
        title: fetchedData.job_details.title,
      }

      const updatedSkills = fetchedData.job_details.skills.map(skill => ({
        name: skill.name,
        imageUrl: skill.image_url,
      }))

      const updatedLifeAtCompany = {
        description: fetchedData.job_details.life_at_company.description,
        imageUrl: fetchedData.job_details.life_at_company.image_url,
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
        skills: updatedSkills,
        lifeAtCompany: updatedLifeAtCompany,
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
        <div className="job-details-card">
          <div className="job-details-top-card">
            <img
              src={jobDetails.companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="job-title-rating-container">
              <h1 className="job-details-title">{jobDetails.title}</h1>
              <div className="rating-container">
                <AiFillStar className="star-icon" />
                <p className="job-details-rating">{jobDetails.rating}</p>
              </div>
            </div>
          </div>

          <div className="job-details-middle-row">
            <div className="location-employment-container">
              <div className="location-container">
                <MdLocationOn className="location-icon" />
                <p className="location-text">{jobDetails.location}</p>
              </div>
              <div className="employment-container">
                <MdWork className="employment-icon" />
                <p className="employment-text">{jobDetails.employmentType}</p>
              </div>
            </div>
            <p className="package">{jobDetails.packagePerAnnum}</p>
          </div>

          <hr className="separator-line" />

          <div className="description-visit-container">
            <h1 className="description-heading">Description</h1>
            <a
              href={jobDetails.companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="visit-link"
            >
              Visit <BiLinkExternal className="external-link-icon" />
            </a>
          </div>

          <p className="job-details-description">{jobDetails.jobDescription}</p>

          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-list">
            {skills.map(skill => (
              <li key={skill.name} className="skill-item">
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="skill-icon"
                />
                <p className="skill-name">{skill.name}</p>
              </li>
            ))}
          </ul>

          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="life-at-company-description">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>

        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
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
      />
      <h1 className="job-details-failure-heading">
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
      <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
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

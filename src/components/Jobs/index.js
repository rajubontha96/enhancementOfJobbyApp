import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobCard from '../JobCard'
import FiltersGroup from '../FiltersGroup'
import ProfileCard from '../ProfileCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    employmentType: [],
    minimumPackage: '',
    searchInput: '',
    locations: [],
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {employmentType, minimumPackage, searchInput} = this.state
    const employmentQuery = employmentType.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentQuery}&minimum_package=${minimumPackage}&search=${searchInput}`

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(job => ({
        id: job.id,
        title: job.title,
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        location: job.location,
        jobDescription: job.job_description,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  filterJobsByLocation = () => {
    const {jobsList, locations} = this.state

    if (locations.length === 0) {
      return jobsList
    }

    return jobsList.filter(job =>
      locations.some(location =>
        job.location.toLowerCase().includes(location.toLowerCase()),
      ),
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
    </div>
  )

  renderJobsList = () => {
    const filteredJobs = this.filterJobsByLocation()

    if (filteredJobs.length === 0) {
      return (
        <div className="no-jobs-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs-img"
          />
          <h1 className="no-jobs-heading">No Jobs Found</h1>
          <p className="no-jobs-description">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    }

    return (
      <ul className="jobs-list">
        {filteredJobs.map(job => (
          <JobCard key={job.id} jobDetails={job} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getJobs}
        role="button"
      >
        Retry
      </button>
    </div>
  )

  onChangeEmploymentType = id => {
    this.setState(
      prevState => ({
        employmentType: prevState.employmentType.includes(id)
          ? prevState.employmentType.filter(type => type !== id)
          : [...prevState.employmentType, id],
      }),
      this.getJobs,
    )
  }

  onChangeSalaryRange = id => {
    this.setState({minimumPackage: id}, this.getJobs)
  }

  onChangeLocations = id => {
    this.setState(prevState => ({
      locations: prevState.locations.includes(id)
        ? prevState.locations.filter(location => location !== id)
        : [...prevState.locations, id],
    }))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearch = () => {
    this.getJobs()
  }

  onKeyDownSearch = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  render() {
    const {apiStatus, searchInput} = this.state

    return (
      <>
        <Header />
        <div className="jobs-route-container">
          <div className="sidebar-section">
            <ProfileCard />
            <FiltersGroup
              updateEmploymentTypes={this.onChangeEmploymentType}
              updateSalaryRange={this.onChangeSalaryRange}
              updateLocations={this.onChangeLocations}
            />
          </div>
          <div className="jobs-content-section">
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search jobs by title, company, or keyword"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onKeyDownSearch}
              />
              <button
                type="button"
                className="search-button"
                onClick={this.onSearch}
                data-testid="searchButton"
                aria-label="Search"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {apiStatus === apiStatusConstants.inProgress && this.renderLoader()}
            {apiStatus === apiStatusConstants.success && this.renderJobsList()}
            {apiStatus === apiStatusConstants.failure &&
              this.renderFailureView()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs

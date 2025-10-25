import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    id,
    title,
    companyLogoUrl,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="job-link-item">
      <li className="job-card">
        <div className="job-card-header">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="job-company-logo"
            role="img"
          />
          <div className="job-title-rating">
            <h1 className="job-title">{title}</h1>
            <div className="job-rating">
              <AiFillStar className="star-icon" />
              <p className="rating-text">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-details-row">
          <div className="job-details-location-employment">
            <div className="job-detail-item">
              <IoLocationSharp className="job-icon" />
              <p className="job-detail-text">{location}</p>
            </div>
            <div className="job-detail-item">
              <BsBriefcaseFill className="job-icon" />
              <p className="job-detail-text">{employmentType}</p>
            </div>
          </div>
          <p className="job-package">{packagePerAnnum}</p>
        </div>
        <hr className="job-separator" />
        <h1 className="job-description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard

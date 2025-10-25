import {BsFillBriefcaseFill} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const SimilarJobCard = props => {
  const {jobDetails} = props
  const {
    title,
    companyLogoUrl,
    location,
    rating,
    employmentType,
    jobDescription,
  } = jobDetails

  return (
    <li className="similar-job-card">
      <div className="similar-job-header">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-company-logo"
        />
        <div className="similar-title-rating">
          <h1 className="similar-job-title">{title}</h1>
          <div className="similar-rating-container">
            <AiFillStar className="similar-star-icon" />
            <p className="similar-rating">{rating}</p>
          </div>
        </div>
      </div>

      <h1 className="similar-job-description-heading">Description</h1>
      <p className="similar-job-description">{jobDescription}</p>

      <div className="similar-location-employment">
        <div className="similar-location-container">
          <IoLocationSharp className="similar-icon" />
          <p className="similar-location-text">{location}</p>
        </div>
        <div className="similar-employment-container">
          <BsFillBriefcaseFill className="similar-icon" />
          <p className="similar-employment-text">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard

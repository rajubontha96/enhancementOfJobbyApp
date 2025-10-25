import './index.css'

const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

const locationsList = [
  {locationId: 'HYDERABAD', label: 'Hyderabad'},
  {locationId: 'BANGALORE', label: 'Bangalore'},
  {locationId: 'CHENNAI', label: 'Chennai'},
  {locationId: 'DELHI', label: 'Delhi'},
  {locationId: 'MUMBAI', label: 'Mumbai'},
]

const FiltersGroup = props => {
  const {updateEmploymentTypes, updateSalaryRange, updateLocations} = props

  const onChangeEmployment = event => {
    updateEmploymentTypes(event.target.value)
  }

  const onChangeSalary = event => {
    updateSalaryRange(event.target.value)
  }

  const onChangeLocation = event => {
    updateLocations(event.target.value)
  }

  return (
    <div className="filters-group-container">
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filter-list">
        {employmentTypesList.map(each => (
          <li key={each.employmentTypeId} className="filter-item">
            <input
              type="checkbox"
              id={each.employmentTypeId}
              value={each.employmentTypeId}
              onChange={onChangeEmployment}
              className="filter-checkbox"
            />
            <label htmlFor={each.employmentTypeId} className="filter-label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>

      <hr className="filter-separator" />

      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filter-list">
        {salaryRangesList.map(each => (
          <li key={each.salaryRangeId} className="filter-item">
            <input
              type="radio"
              id={each.salaryRangeId}
              name="salary"
              value={each.salaryRangeId}
              onChange={onChangeSalary}
              className="filter-radio"
            />
            <label htmlFor={each.salaryRangeId} className="filter-label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>

      <hr className="filter-separator" />

      <h1 className="filter-heading">Locations</h1>
      <ul className="filter-list">
        {locationsList.map(each => (
          <li key={each.locationId} className="filter-item">
            <input
              type="checkbox"
              id={each.locationId}
              value={each.locationId}
              onChange={onChangeLocation}
              className="filter-checkbox"
            />
            <label htmlFor={each.locationId} className="filter-label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FiltersGroup

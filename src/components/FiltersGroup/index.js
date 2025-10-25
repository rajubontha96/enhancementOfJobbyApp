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

const FiltersGroup = props => {
  const {updateEmploymentTypes, updateSalaryRange} = props

  const onChangeEmployment = event => {
    updateEmploymentTypes(event.target.value)
  }

  const onChangeSalary = event => {
    updateSalaryRange(event.target.value)
  }

  return (
    <div className="filters-group-container">
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filter-list">
        {employmentTypesList.map(each => (
          <li key={each.employmentTypeId}>
            <input
              type="checkbox"
              id={each.employmentTypeId}
              value={each.employmentTypeId}
              onChange={onChangeEmployment}
            />
            <label htmlFor={each.employmentTypeId}>{each.label}</label>
          </li>
        ))}
      </ul>

      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filter-list">
        {salaryRangesList.map(each => (
          <li key={each.salaryRangeId}>
            <input
              type="radio"
              id={each.salaryRangeId}
              name="salary"
              value={each.salaryRangeId}
              onChange={onChangeSalary}
            />
            <label htmlFor={each.salaryRangeId}>{each.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FiltersGroup

// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import VaccinationCoverage from '../VaccinationCoverage/index'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'LOADER',
  initial: 'INITIAL',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiConstants.initial,
    data: null,
  }

  componentDidMount() {
    this.getApi()
  }

  getApi = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(url)
    console.log('==>', response, response.status)

    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = {
        last7DaysVaccination: fetchedData.last_7_days_vaccination.map(each => ({
          vaccineDate: each.vaccine_date,
          dose1: each.dose_1,
          dose2: each.dose_2,
        })),
        vaccinationByAge: fetchedData.vaccination_by_age.map(each => ({
          age: each.age,
          count: each.count,
        })),
        vaccinationByGender: fetchedData.vaccination_by_gender.map(each => ({
          count: each.count,
          gender: each.gender,
        })),
      }
      this.setState({data: updatedData, apiStatus: apiConstants.success})
    }
    if (response.status === 401 || response.status === 404) {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderSuccess = () => {
    const {data} = this.state
    const {last7DaysVaccination, vaccinationByAge, vaccinationByGender} = data
    return (
      <>
        <VaccinationCoverage data={last7DaysVaccination} />
        <VaccinationByGender data={vaccinationByGender} />
        <VaccinationByAge data={vaccinationByAge} />
      </>
    )
  }

  renderFailure = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </>
  )

  renderAny = () => {
    const {apiStatus} = this.state
    console.log('Api: ', apiStatus)

    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccess()
      case apiConstants.failure:
        return this.renderFailure()
      case apiConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg">
        <div className="top">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <h1>Co-WIN</h1>
        </div>
        <h1>CoWIN Vaccination in India</h1>
        <div className="change-bg">{this.renderAny()}</div>
      </div>
    )
  }
}

export default CowinDashboard

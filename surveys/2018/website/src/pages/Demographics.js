import React from 'react'
import PropTypes from 'prop-types'
import TextBlock from '../components/blocks/TextBlock'
import Layout from '../components/common/Layout'
import GenderBreakdownBlock from '../components/blocks/GenderBreakdownBlock'
import { graphql } from 'gatsby'
import SectionHeader from '../components/elements/SectionHeader'
import ParticipationByCountryBlock from '../components/blocks/ParticipationByCountryBlock'
import DemographicsSalaryBlock from '../components/blocks/DemographicsSalaryBlock'
import SalaryPerCountryBlock from '../components/blocks/SalaryPerCountryBlock'
import DemographicsYearsOfExperienceBlock from '../components/blocks/DemographicsYearsOfExperienceBlock'
import DemographicsCompanySizeBlock from '../components/blocks/DemographicsCompanySizeBlock'

const Demographics = ({ data, ...rest }) => {
    const participationData = data.stats.participation.find(s => s.survey === '2018').by_country
    const genderData = data.stats.gender.find(s => s.survey === '2018')

    return (
        <Layout {...rest}>
            <div>
                <SectionHeader />
                <TextBlock text={data.file.childMarkdownRemark.html} />
                <ParticipationByCountryBlock
                    data={participationData}
                    chartId="participation-by-country"
                />
                <DemographicsSalaryBlock data={data.stats.salary} chartId="salaries" />
                <SalaryPerCountryBlock data={data.stats.by_country} chartId="salary-per-country" />
                <DemographicsYearsOfExperienceBlock
                    data={data.stats.years_of_experience}
                    chartId="years-of-experience"
                />
                <DemographicsCompanySizeBlock
                    data={data.stats.company_size}
                    chartId="company-size"
                />
                <GenderBreakdownBlock data={genderData} chartId="gender-breakdown" />
            </div>
        </Layout>
    )
}

Demographics.propTypes = {
    data: PropTypes.shape({
        stats: PropTypes.shape({
            participation: PropTypes.arrayOf(
                PropTypes.shape({
                    survey: PropTypes.string.isRequired,
                    total: PropTypes.number.isRequired,
                    by_country: PropTypes.arrayOf(
                        PropTypes.shape({
                            country: PropTypes.string.isRequired,
                            count: PropTypes.number.isRequired,
                            percentage: PropTypes.number.isRequired
                        })
                    ).isRequired
                })
            ).isRequired,
            gender: PropTypes.arrayOf(
                PropTypes.shape({
                    survey: PropTypes.string.isRequired,
                    total: PropTypes.number.isRequired,
                    by_gender: PropTypes.arrayOf(
                        PropTypes.shape({
                            gender: PropTypes.string.isRequired,
                            count: PropTypes.number.isRequired,
                            percentage: PropTypes.number.isRequired
                        })
                    ).isRequired
                })
            ).isRequired,
            by_country: PropTypes.arrayOf(
                PropTypes.shape({
                    country: PropTypes.string.isRequired,
                    salary: PropTypes.shape({
                        average: PropTypes.number.isRequired
                    }).isRequired
                })
            ).isRequired,
            salary: PropTypes.arrayOf(
                PropTypes.shape({
                    survey: PropTypes.string.isRequired,
                    average: PropTypes.number.isRequired,
                    ranges: PropTypes.arrayOf(
                        PropTypes.shape({
                            range: PropTypes.string.isRequired,
                            count: PropTypes.number.isRequired,
                            percentage: PropTypes.number.isRequired
                        })
                    ).isRequired
                })
            ).isRequired,
            years_of_experience: PropTypes.arrayOf(
                PropTypes.shape({
                    survey: PropTypes.string.isRequired,
                    average: PropTypes.number.isRequired,
                    ranges: PropTypes.arrayOf(
                        PropTypes.shape({
                            range: PropTypes.string.isRequired,
                            count: PropTypes.number.isRequired,
                            percentage: PropTypes.number.isRequired
                        })
                    ).isRequired
                })
            ).isRequired,
            company_size: PropTypes.arrayOf(
                PropTypes.shape({
                    survey: PropTypes.string.isRequired,
                    average: PropTypes.number.isRequired,
                    ranges: PropTypes.arrayOf(
                        PropTypes.shape({
                            range: PropTypes.string.isRequired,
                            count: PropTypes.number.isRequired,
                            percentage: PropTypes.number.isRequired
                        })
                    ).isRequired
                })
            ).isRequired
        }).isRequired
    }).isRequired
}

export default Demographics

export const query = graphql`
    query {
        stats: demographicsYaml {
            participation {
                survey
                total
                by_country {
                    country
                    count
                    percentage
                }
            }
            gender {
                survey
                total
                by_gender {
                    gender
                    count
                    percentage
                }
            }
            by_country {
                country
                total
                salary {
                    average
                }
            }
            salary {
                survey
                average
                ranges {
                    range
                    count
                    percentage
                }
            }
            years_of_experience {
                survey
                average
                ranges {
                    range
                    count
                    percentage
                }
            }
            company_size {
                survey
                average
                ranges {
                    range
                    count
                    percentage
                }
            }
        }
        file(name: { eq: "demographics-introduction" }) {
            childMarkdownRemark {
                html
            }
        }
    }
`

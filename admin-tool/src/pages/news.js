const newsProvider = require('../datasources/news');
import React, { useState, setState } from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
//import News from 'components/News'


const data = newsProvider.getLatestNewsBrief()
            .then( (d) => useState(d) ) // (news) => console.log(news) );

function NewsPage({ location, category }) {
    category = 'bitcoin'
    const pageTitle = location ? location.pathname.replace(/\//g, '') : ''
    //const data = newsProvider.getLatestNewsBrief();

    const [cat, setCategory] = useState(category)
    const [articles, setArticles] = useState(data)


    return (
        <Layout location={location} title={pageTitle}>
            
        </Layout>
    )
}
NewsPage.propTypes = {
    location: PropTypes.object,
}
export default NewsPage

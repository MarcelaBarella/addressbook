const ENVIRONMENT = process.env.NODE_ENV || 'development'
require('dotenv').config({ path: `.env.${ENVIRONMENT}` })

module.exports = () => {
    if( ENVIRONMENT == 'test') {
        return 'test_user'
    } else {
        return 'user'
    }
}
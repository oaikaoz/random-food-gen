
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/random_food/'
    : '/',

    "transpileDependencies": [
      "vuetify"
    ]
}
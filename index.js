const express = require("express")
const app = express()
const axios = require("axios").default
const port = process.env.PORT || 3000

app.get("/testing/:region", (req, res) => {
  let region = req.params.region
  const sendGetRequest = async () => {
    try {
      const regionInfo = await axios.get("https://restcountries.com/v3.1/region/" + region)
      region = regionInfo.data[0].region

      const sum = regionInfo.data.reduce((prev, current) => {
        return prev + current.population
      }, 0)

      const maxNumber = regionInfo.data.reduce((prev, current) => (prev.population > current.population ? prev : current)).population
      const maxName = regionInfo.data.reduce((prev, current) => (prev.population > current.population ? prev : current)).name.common
      const maxEmoji = regionInfo.data.reduce((prev, current) => (prev.population > current.population ? prev : current)).flag

      res.send(`The total sum of population of ${region} is ${sum} people.
      <br><br> The largest amount lives in ${maxEmoji} ${maxName} at ${maxNumber}. 
      <br><br> That's a lot of people.`)
    } catch (err) {
      res.send("Uh oh.")
      console.error(err)
    }
  }

  sendGetRequest()
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

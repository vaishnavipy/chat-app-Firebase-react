import React from "react"
import Footer from "../components/footer"
import Header from "../components/header"
import HomeContent from "../components/homeContent"


function Home(){
    return(
    <div className="main-container">
        <Header />
        <HomeContent />
        <Footer />
      </div>
    )
}
export default Home
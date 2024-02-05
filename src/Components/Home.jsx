import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import axios from 'axios';
 import snowy from './images/snowy1.jpg'
 import sunny from './images/sunny3.webp'
 import hot from './images/hot.jpg'
import './Home.css'

function Home() {
    
        const [location,setLocation]=useState("")
        const [weatherdata,setWeatherdata]=useState("")
        const [wicon,setWicon]=useState(sunny)
        //console.log(location);

 const getWeather=async(e)=>{
    e.preventDefault()
    if(!location){
        alert("Enter Location ")
    }
    else{

        try{
                const apiKey=`0c31d56d2eef6c5f0f90f830da0745d2`;
                const result=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
                console.log(result);
                setWeatherdata(result.data)

                 }
        catch(err){
                alert("Enter Valid Country name ")
                console.log("Unable to fetch data:Enter Valid Country ");
        
                }

    }
    
}
console.log(weatherdata);
const weatherKochi=async()=>{
    try{
        const result=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=kochi&units=metric&appid=0c31d56d2eef6c5f0f90f830da0745d2`)
        console.log(result);
       setWeatherdata(result.data)
        
    }
    catch(err){
       
        console.log("Unable to fetch data ");
       
    }
}
 useEffect(()=>{   
    weatherKochi();

 },[])
 
 const dateBuilder=()=>{
   
    let date = String(new window.Date())
    // console.log(date);
    date = date.slice(0,15)
    return date
}

useEffect(()=>{
    if(!weatherdata) return
    
    
    const temp=weatherdata?.main.temp
    if(temp<=0){
        setWicon(snowy)
    }
    else if(temp>0 && temp<35)
    {
        setWicon(sunny)
    }
    else{
        setWicon(hot)
    }

},[weatherdata])



return (
    <div  >

    <Container className='p-0  mx-auto text-center'  >
        <Row   className='    mx-auto  '  >
            <Col  style={{ backgroundImage:`url(${wicon})`,backgroundPosition:'center',backgroundRepeat:'no-repeat',backgroundSize:'cover' }} className='vh-100 p-2 p-xl-5 col-12 col-sm-12 col-md-12 col-lg-10 col-xl-6 col-xxl-6 mx-auto    d-flex flex-column justify-content-between '   >  
                   <div className='p-2'>
                        <div style={{lineHeight:'2px'}} >
                        <h3 className='text-center font-monospace fw-bold display-3 text-white  '>Weather App</h3><br />
                        <h5 className='text-center font-monospace fw-bold text-white'>{dateBuilder()}</h5>
                        </div>
                    <br />
                        <div className='d-flex flex-row  justify-content-center mt-4'>

                                <input className='me-1 px-2 shadow' style={{border:'none',borderRadius:'20px'}} type="text"  onChange={(e)=>setLocation(e.target.value)} placeholder='Kochi' />
                                <button onClick={getWeather} className='btn btn-white bg-white fw-medium  text-center shadow fs-6 p-1' style={{borderRadius:'50%',width:'30px',textAlign:'center'}} ><i class="fa-solid fa-magnifying-glass"></i></button>

                        </div>
                       
                    </div>
                    
                           <div style={{backgroundColor:'rgba(255,255,255,0.4'}} className='p-1 text-center mt-2 font-monospace shadow rounded-5 text-dark '>                
                              
                                <h1 className='fw-bold display-2 text-center'>{Math.floor(weatherdata.main?.temp)}&deg;<span className='fs-2'>C</span> </h1>
                                <h3 className='text-dark fw-medium text-center fs-2'>{weatherdata.name}</h3>
                               {weatherdata.weather? <h4 className='text-center fs-6'>{weatherdata.weather[0].main}</h4> :null}              
                            
                            </div>

                            <div style={{backgroundColor:'rgba(255,255,255,0.4'}} className='d-flex justify-content-between  align-items-center rounded-5 p-2 '>
                                <div style={{lineHeight:'1px'}}>
                                    <p className='fw-bold text-dark '><i class="fa-solid fa-water"></i> {weatherdata.main?.humidity}%</p> 
                                    <p className='fw-bold text-dark '>humidity </p>
                                </div>
                                <div style={{lineHeight:'2px'}}>
                                    <p className='fw-bold text-dark ' >{Math.floor(weatherdata.main?.feels_like)}&deg;<span className='fs-6'>C</span> </p>
                                    <p className='fw-bold text-dark ' >Feels Like</p>
            
                                </div>
                                <div style={{lineHeight:'1px'}} >
                                    <p className='fw-bold text-dark '><i class="fa-solid fa-wind"></i> {weatherdata.wind?.speed}Km/h</p>
                                    <p className='fw-bold text-dark ' >wind </p>
                                </div>
                            </div>
                
                    
            </Col>
            
        </Row>
    </Container>
    </div>
  )
}

export default Home
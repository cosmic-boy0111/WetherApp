import React,{useState,useEffect} from 'react'
import './css/style.css'
import StreetviewRoundedIcon from '@material-ui/icons/StreetviewRounded';
const Tempapp = () => {

    const [city, setCity] = useState(null)
    const [search, setSearch] = useState( JSON.parse(localStorage.getItem('city'))===null?"Pune":JSON.parse(localStorage.getItem('city')))
    const [weather, setWeather] = useState([{main:'normal'}])

    useEffect(() => {
        
        const fetchApi = async () =>{
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=324274e5b3d15b72f713b73659d0a9d7`
            const res = await fetch(url);
            const resJson = await res.json();
            console.log(resJson.weather);
            setWeather(resJson.weather===undefined?[{main:'normal'}]: resJson.weather)
            setCity(resJson.main)

        }
       
        fetchApi(); 
    },[search])

    return (
        <>
            <div className='box'>
                <div className="inputData">
                    <input 
                    type="search" 
                    className="inputField" 
                    value={search}
                    onChange={(e)=>{
                        setSearch(e.target.value)
                        localStorage.setItem('city',JSON.stringify(e.target.value))
                    }}
                    />
                </div>

            {
                !city?(
                    <p className="errorMsg">No Data Found</p>
                ) :
            
              <>
            <div className="info">
                <h2 className='location'>
                    <span className="street"><StreetviewRoundedIcon className='svg'/></span> {search}
                </h2>
                <h1 className='temp'>
                    {city.temp}°Cel
                </h1>
                <h3 className="tempmin_max">
                    Min : {city.temp_min}°Cel | Max : {city.temp_max}°Cel
                </h3>
                <h3 className="tempmin_max">
                    {weather[0].main}
                </h3>
            </div>
            <div className='wave -one'></div>
            <div className='wave -two'></div>
            <div className='wave -three'></div>
            </>
            }
            </div>  
        </>
    )
}

export default Tempapp

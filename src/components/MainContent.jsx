import ImageOne from "../assets/images/fajr-prayer.png"
import ImageTwo from "../assets/images/dhhr-prayer-mosque.png"
import ImageThree from "../assets/images/asr-prayer-mosque.png"
import ImageFour from "../assets/images/sunset-prayer-mosque.png"
import ImageFive from "../assets/images/night-prayer-mosque.png"
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import Prayer from './Prayer';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import moment from 'moment';
import "moment/dist/locale/ar-dz";

moment.locale("ar");


function MainContent() {
    const [timings, setTimings] = useState({
        Fajr: "1:00",
        Dhuhr: "3:00",
        Asr: "4:00",
        Sunset: "5:00",
        Isha: "7:00"
    });

    const [city, setCity] = useState({
        id: 1,
        displayName: "القاهره",
        apiName: "Cairo"
    });

    const [nextPrayerIndex, setNextPrayerIndex] = useState(0);

    const [today, setToday] = useState("");

    const [remainingTime, setRemainingTime] = useState("");

    const availableCities = [
        {
            id: 1,
            displayName: "القاهرة",
            apiName: "Cairo"
        },
        {
            id: 2,
            displayName: "الاسكندرية",
            apiName: "Alexandria"
        },
        {
            id: 3,
            displayName: "الجيزة",
            apiName: "Giza"
        },
        {
            id: 4,
            displayName: "الدقهلية",
            apiName: "Dakahlia"
        }
    ]

    const prayersArray = [
        { key: "Fajr", displayName: "الفجر" },
        { key: "Dhuhr", displayName: "الظهر" },
        { key: "Asr", displayName: "العصر" },
        { key: "Sunset", displayName: "المغرب" },
        { key: "Isha", displayName: "العشاء" },
    ]


    useEffect(() => {
        fetch(`https://api.aladhan.com/v1/timingsByCity?country=Eg&city=Cairo`)
            .then(response => response.json())
            .then(data => setTimings(data.data.timings));
    }, []);


    useEffect(() => {
        fetch(`https://api.aladhan.com/v1/timingsByCity?country=Eg&city=${city.apiName}`)
            .then(response => response.json())
            .then(data => setTimings(data.data.timings));
    }, [city]);


    const handleChange = (event) => {
        const cityObj = availableCities.find((city) => {
            return city.apiName == event.target.value;
        })
        setCity(cityObj);
    };


    useEffect(() => {
        let timer = moment();
        setToday(timer.format("MMM Do YYYY | hh:mm:ss"));

        setUpCountDownTimer();

        let handeler = setInterval(() => {
            let time = moment();
            setToday(time.format("MMM Do YYYY | hh:mm:ss"));

            setUpCountDownTimer();

        }, 1000);

        return () => {
            clearInterval(handeler);
        }

    }, [timings, city]);



    const setUpCountDownTimer = () => {
        let momentNow = moment();

        let prayerIndex = 0;

        if (momentNow.isAfter(moment(timings.Fajr, "hh:mm")) && momentNow.isBefore(moment(timings.Dhuhr, "hh:mm"))) {
            prayerIndex = 1;
        } else if (momentNow.isAfter(moment(timings.Dhuhr, "hh:mm")) && momentNow.isBefore(moment(timings.Asr, "hh:mm"))) {
            prayerIndex = 2;
        } else if (momentNow.isAfter(moment(timings.Asr, "hh:mm")) && momentNow.isBefore(moment(timings.Sunset, "hh:mm"))) {
            prayerIndex = 3;
        } else if (momentNow.isAfter(moment(timings.Sunset, "hh:mm")) && momentNow.isBefore(moment(timings.Isha, "hh:mm"))) {
            prayerIndex = 4;
        } else {
            prayerIndex = 0;
        }

        setNextPrayerIndex(prayerIndex);



        // Set Timer
        const nextPrayerObject = prayersArray[nextPrayerIndex];
        const nextPrayerTime = timings[nextPrayerObject.key];

        let remainingTime = (moment(nextPrayerTime, "hh:mm").diff(momentNow));

        if (remainingTime < 0) {
            let midNigthDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
            let fajrToMidNigthDiff = moment(nextPrayerTime, "hh:mm:ss").diff(moment("00:00:00", "hh:mm:ss"));

            let totalDiff = midNigthDiff + fajrToMidNigthDiff;
            remainingTime = totalDiff;
        }

        const durationRemaingTime = moment.duration(remainingTime);
        setRemainingTime(`${durationRemaingTime.hours()} : ${durationRemaingTime.minutes()} : ${durationRemaingTime.seconds()}`);
    }

    return (
        <>
            {/* Top Raw */}
            <Grid container style={{ marginTop: "20px" }}>
                <Grid xs={12} md={6}>
                    <div className="app-title">
                        <h3 style={{ direction: "ltr" }}>{today}</h3>
                        <h1 className='title'>{city.displayName}</h1>
                    </div>
                </Grid>
                <Grid xs={12} md={6}>
                    <div className="time">
                        <h3>متبقي حتي صلاه {prayersArray[nextPrayerIndex].displayName}</h3>
                        <h2 className='title' style={{ direction: "ltr" }}>{remainingTime}</h2>
                    </div>
                </Grid>
            </Grid>
            {/* Top Raw */}

            {/* Select Box */}
            <Grid container>
                <Box sx={{ minWidth: 200 }} style={{ margin: "20px auto 30px" }}>
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={city.apiName}
                            value={city.apiName}
                            onChange={handleChange}
                            style={{ direction: 'rtl', fontSize: "22px" }}
                        >
                            {availableCities.map((city) => {
                                return (
                                    <MenuItem key={city.id} value={city.apiName}>
                                        {city.displayName}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
            {/* Select Box */}


            <Divider style={{ borderColor: "white", opacity: "0.1", marginBottom: "30px" }} />


            {/* Cards Section  */}
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} display="flex" justifyContent="center" alignItems="center" style={{ marginBottom: "20px" }}>
                <Prayer img={ImageOne} title="الفجر" time={timings.Fajr} />
                <Prayer img={ImageTwo} title="الظهر" time={timings.Dhuhr} />
                <Prayer img={ImageThree} title="العصر" time={timings.Asr} />
                <Prayer img={ImageFour} title="المغرب" time={timings.Sunset} />
                <Prayer img={ImageFive} title="العشاء" time={timings.Isha} />
            </Grid>
            {/* Cards Section  */}
        </>
    )
}

export default MainContent;
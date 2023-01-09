import {useState} from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Slider from "react-slick";
import {NFTsData} from "../../utils/data";
import {Typography} from "@mui/material";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Carousel() {

    const [sliderRef, setSliderRef] = useState(null)

    return (
        <div className="d-flex align-items-center">
            <ChevronLeftIcon
                color="secondary"
                sx={arrowStyles}
                onClick={sliderRef?.slickPrev}/>
            <Slider style={{width: "94%"}} ref={setSliderRef} {...settings}>
                {NFTsData.map((item) => (
                    <div key={item.id} className="card">
                        <div className="card-top">
                            <img src={item.linkImg} alt={item.title}/>
                        </div>
                        <div className="text-start">
                            <Typography sx={{margin: "10px 0 0 10px"}} variant="h3">
                                {item.title}
                            </Typography>
                            <Typography sx={{marginLeft: "10px"}} variant="subtitle1">
                                {item.price}ETH
                            </Typography>
                        </div>
                    </div>
                ))}
            </Slider>
            <ChevronRightIcon
                color="secondary"
                sx={arrowStyles}
                onClick={sliderRef?.slickNext}/>
        </div>
    )
}

const arrowStyles = {
    width: "3%",
    fontSize: 40,
    cursor: "pointer",
    padding: "2px",
    borderRadius: "20px",
    backgroundColor: "black",
    ":hover": {
        color: "warning.dark"
    }
}

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: <></>,
    prevArrow: <></>,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

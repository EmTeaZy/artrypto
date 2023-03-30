import {useState} from "react";
import {useRouter} from "next/router";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Slider from "react-slick";
import {NFTsData} from "../../utils/data";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NFTCard from "./NFTCard";

export default function Carousel() {

    const [sliderRef, setSliderRef] = useState(null)
    const router = useRouter();

    return (
        <div className="d-flex align-items-center">
            <ChevronLeftIcon
                color="secondary"
                sx={arrowStyles}
                onClick={sliderRef?.slickPrev}/>
            <Slider style={{width: "94%"}} ref={setSliderRef} {...settings}>
                {NFTsData.map(item => <NFTCard item={item}/>)}
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

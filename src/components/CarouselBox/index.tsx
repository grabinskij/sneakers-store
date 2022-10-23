import {Carousel} from "react-bootstrap";
import video1 from "../../assets/adVideo/ad-1.mp4";
import video2 from "../../assets/adVideo/ad-2.mp4";
import video3 from "../../assets/adVideo/ad-3.mp4";
import ReactPlayer from "react-player";
import {Link} from "react-router-dom";

const CarouselBox = () => {
    const videoProperties = [
        {
            id: 1,
            title: "Born Rich",
            src: video1,
            credits: "Video by cottonbro"
        },
        {
            id: 2,
            title: "Zaba",
            src: video2,
            credits: "Video by Kelly"
        },
        {
            id: 3,
            title: "XR-7",
            src: video3,
            credits: "Video by Sergey Makashin"
        }
    ]
    return (
        <Carousel className="carousel" interval={10000}>
            {videoProperties.map((videoObj) => {
                return(
                    <Carousel.Item key={videoObj.id}>
                        <Link key={videoObj.id} to={`/sneakers/${videoObj.id}`}>
                        <div className='player-wrapper'>
                        <ReactPlayer
                            className='react-player'
                            url={videoObj.src}
                            muted={true}
                            loop={true}
                            pip={true}
                            playing={true}
                            width='100%'
                            height='400px'
                            />
                            <Carousel.Caption>
                                <h4>{videoObj.title}</h4>
                                <h5>Take it now</h5>
                                <p>{videoObj.credits}</p>
                            </Carousel.Caption>
                        </div>
                        </Link>
                    </Carousel.Item>
                )
            })}
        </Carousel>
    );
}

export default CarouselBox;
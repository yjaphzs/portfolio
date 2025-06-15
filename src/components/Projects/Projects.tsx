import "./Projects.scss";

import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import RadiisMockup from "../../assets/images/projects/radiis-mockup.png";

function NextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} style={style} className={`arrow ${className}`}>
            <AiOutlineArrowRight
                className="arrows"
                style={{ color: "white", height: "27" }}
            />
        </div>
    );
}

function PrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} style={style} className={`arrow ${className}`}>
            <AiOutlineArrowLeft
                className="arrows"
                style={{ color: "white", height: "27" }}
            />
        </div>
    );
}

function Projects() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div className="projects-wrapper">
            <div className="projects-info">
                <h2 className="projects-title">
                    Recent{" "}
                    <span className="experience yellow-text">Projects</span>
                </h2>
            </div>

            <div className="projects-details-wrapper">
                <p className="projects-details">
                    These are some of the projects I worked on while I was a{" "}
                    <span className="highlight">Full-Stack Developer</span> at{" "}
                    <span className="highlight">
                        Central Luzon State University
                    </span>
                    . As the lone developer, I was in charge of{" "}
                    <span className="highlight">
                        building university-wide systems from scratch
                    </span>{" "}
                    using the{" "}
                    <span className="highlight">Laravel Framework</span>.
                </p>
            </div>

            <div className="projects-slider-wrapper">
                <Slider {...settings}>
                    <div className="project-slide">
                        <div className="project-slide-image">
                            <img src={RadiisMockup} alt="RADIIS Mockup Photo" />
                        </div>
                    </div>
                    <div className="project-slide">
                        <div className="project-slide-image">
                            <img src={RadiisMockup} alt="RADIIS Mockup Photo" />
                        </div>
                    </div>
                    <div className="project-slide">
                        <div className="project-slide-image">
                            <img src={RadiisMockup} alt="RADIIS Mockup Photo" />
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    );
}

export default Projects;

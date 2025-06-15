import "./Projects.scss";

import Slider from "react-slick";

import RadiisMockup from "../../assets/images/projects/radiis-mockup.png";

function Projects() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="projects-wrapper">
            <div className="projects-info">
                <h2 className="projects-title">
                    My <span className="experience yellow-text">Creations</span>
                </h2>
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

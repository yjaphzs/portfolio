import "./Projects.scss";

import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import RadiisScreenshot from "../../assets/images/projects/radiis.png";
import BasisScreenshot from "../../assets/images/projects/basis.png";
import CLSU360Screenshot from "../../assets/images/projects/360.png";

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

    type ProjectItem = {
        title: string;
        homepage: string;
        image: string;
        alt?: string;
        description: string;
    };

    const projectList: ProjectItem[] = [
        {
            title: "RESEARCH AND DEVELOPMENT INTEGRATED INFORMATION SYSTEM",
            homepage: "https://radiis.clsu.edu.ph",
            image: RadiisScreenshot,
            alt: "RADIIS Login Screenshot",
            description:
                "RADIIS (Research and Development Integrated Information System) is a powerful web app that helps Central Luzon State University’s R&D centers manage and organize all their research programs, projects, and studies in one place. By standardizing data and offering built-in analytics, RADIIS makes it easier for CLSU leaders to understand their research landscape and make smart decisions for the university’s future.",
        },
        {
            title: "BUSINESS AFFAIRS STRATEGIC INFORMATION SYSTEM",
            homepage: "https://basis.clsu.edu.ph",
            image: BasisScreenshot,
            alt: "BASIS Login Screenshot",
            description:
                "BASIS (Business Affairs Strategic Integrated System) is a centralized platform developed to modernize and streamline Central Luzon State University’s business operations. It brings together the management of various programs—like poultry, fish, swine, rice, garments, canteen, and more—into one cohesive system, making university business activities more organized and efficient.",
        },
        {
            title: "CLSU VIRTUAL EXPLORER",
            homepage: "https://360.clsu.edu.ph",
            image: CLSU360Screenshot,
            alt: "CLSU Virtual Explorer Screenshot",
            description:
                "CLSU Virtual Explorer is an interactive web app designed to let anyone experience Central Luzon State University’s campuses and facilities through immersive virtual tours. Using 360-degree panoramic images, interactive navigation, and informative overlays, it allows prospective students, parents, alumni, and others to explore CLSU from anywhere in the world. By making campus tours accessible online, CLSU Virtual Explorer supports the university’s commitment to inclusivity, innovation, and global outreach.",
        },
    ];

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
                    These are some of the projects I worked on as a{" "}
                    <span className="highlight">Full-Stack Developer</span> at{" "}
                    <span className="highlight">
                        Central Luzon State University
                    </span>
                    . I handled the development side on my own,{" "}
                    <span className="highlight">
                        building university-wide systems from the ground up
                    </span>{" "}
                    using the <span className="highlight">Laravel</span>.
                </p>
            </div>

            <div className="projects-slider-wrapper">
                <Slider {...settings}>
                    {projectList.map((project, index) => (
                        <div className="project-slide" key={index}>
                            <div className="card-wrapper">
                                <div className="card-image">
                                    <a href={project.homepage} target="_blank">
                                        <img
                                            src={project.image}
                                            alt={project.alt}
                                        />
                                    </a>
                                </div>
                                <div className="card-details">
                                    <a
                                        href={project.homepage}
                                        target="_blank"
                                        className="project-title"
                                    >
                                        {project.title}
                                    </a>
                                    <p>{project.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default Projects;

import "./Work.scss";

import React from "react";

function Work() {
    type WorkItem = {
        company: string;
        companyUrl: string;
        roles: {
            position: string;
            duration: string;
            details: string[];
        }[];
    };

    const workHistory: WorkItem[] = [
        {
            company: "CLSU",
            companyUrl: "https://clsu.edu.ph/",
            roles: [
                {
                    position: "Full-stack Developer",
                    duration: "Aug. 2022 - Jun. 2025",
                    details: [
                        "Built and maintained full-stack web applications using Laravel, Livewire, Bootstrap, JavaScript, SASS, and MySQL to support the university’s research, extension, and administrative processes.",
                        "Worked closely with administrative offices and the MISO team to understand their needs and turn them into practical digital tools that streamlined their workflows.",
                        "Provided regular support and training to faculty and staff, helping them navigate the systems, resolve issues, and confidently use the tools in their daily work.",
                        "Regularly improved and updated system features based on user feedback to ensure alignment with the institution’s research and development initiatives.",
                        "Performed regular system checks and security reviews to protect against threats like Remote Code Execution (RCE) attacks and SEO poisoning, making sure everything stayed safe and reliable.",
                    ],
                },
                {
                    position: "Instructor I",
                    duration: "Aug. 2022 - Jun. 2025",
                    details: [
                        "Delivered lectures and facilitated laboratory classes on programming-related subjects.",
                        "Developed and prepared instructional materials, including PowerPoint presentations and other teaching resources.",
                        "Advised students on Capstone Projects and On-the-Job Training (OJT), providing academic and technical guidance.",
                        "Provided mentorship and support to students beyond official working hours to help them succeed academically and professionally.",
                        'Participated in research and extension activities as a faculty researcher for the project titled "CLSU Virtual Explorer: Embracing CLSU\'s Rich Heritage and Modern Technology through an Interactive Virtual Journey (A Virtual Explorer Web Application)."',
                        "Served as Chair and Panel Critic in multiple Capstone Project defenses.",
                        "Maintained Outstanding Faculty Performance Ratings throughout the entire duration of employment and recognized as the Highest Rated Outstanding IT Faculty by Students for both the 1st and 2nd Semesters of S.Y. 2023–2024.",
                    ],
                },
            ],
        },
        {
            company: "PHILRICE",
            companyUrl: "https://www.philrice.gov.ph/",
            roles: [
                {
                    position: "Information System Analyst I",
                    duration: "Oct. 2021 - Aug. 2022",
                    details: [
                        "Provided IT support for the division, creating and updating training materials (tarpaulins, PowerPoints, infographics) and offering technical assistance.",
                        "Documented activities and training sessions as the photo documentation personnel.",
                        "Edited photos and videos to support training materials and promotional activities.",
                        "Supported online learning and training sessions, including the Training of Trainers on Rice Integrated Crop Management (PalayCheck) for 32 Sri Lankan agricultural workers, backed by DFA-TCCP.",
                    ],
                },
            ],
        },
        {
            company: "WIDEOUT",
            companyUrl: "https://www.aqa.work/",
            roles: [
                {
                    position: "Quality Assurance Specialist",
                    duration: "Nov. 2020 - Sept. 2021",
                    details: [
                        "Ensured that the developed creatives were pixel-perfect based on the instructions and design specifications.",
                        "Followed a standardized process to QA the work of creative developers.",
                        "Tested and debugged creatives also ensured cross-browser compatibility of creative web advertisements.",
                    ],
                },
                {
                    position: "Creative Developer",
                    duration: "Aug. 2020 - Nov. 2020",
                    details: [
                        "Converted designs into pixel-perfect animated and static web ads using HTML, CSS, and vanilla JavaScript.",
                        "Produced multiple banner sizes (160x600, 300x250, 300x600, 728x90, etc.) for creative ads based on initial designs.",
                        "Designed and created storyboards in Adobe Photoshop to illustrate concepts and animations for web ads.",
                        "Tested and debugged creatives, ensuring cross-browser compatibility.",
                    ],
                },
            ],
        },
        {
            company: "CLSU",
            companyUrl: "https://clsu.edu.ph/",
            roles: [
                {
                    position: "Part-time Instructor",
                    duration: "Aug. 2019 - Apr. 2020",
                    details: [
                        "Lecturer for both lecture and laboratory classes on programming subjects.",
                        "Prepare learning materials such as PowerPoint presentations and other instructional resources.",
                        "Serve as Capstone and OJT advisor for IT students to provide guidance and support.",
                    ],
                },
            ],
        },
        {
            company: "TECHNODREAM",
            companyUrl: "https://technodreamoutsourcing.com/",
            roles: [
                {
                    position: "Programmer",
                    duration: "Feb. 2019 - May 2019",
                    details: [
                        "Converted daily web designs into pixel-perfect, responsive static web pages using HTML, CSS, and JavaScript.",
                        "Successfully converted 34+ designs into responsive web pages.",
                        "Assisted in migrating pages from an outdated website to a new WordPress template for Turkey Travel Planner, increasing delivery time by 60% and converting up to 20% of the pages.",
                    ],
                },
            ],
        }
    ];

    return (
        <div className="experience-wrapper">
            <div className="experiences-info">
                <h2 className="experiences-title">
                    Work <span className="experience yellow-text">History</span>
                </h2>
            </div>

            <div className="work-experiences-wrapper">
                <ol className="work-experience-list">
                    {workHistory.map((work, idx) => (
                        <li className="work-experience" key={idx}>
                            {work.roles.length === 1 ? (
                                // If only one role, show company and role in one line
                                <>
                                    <h3>
                                        {work.roles[0].position}{" "}
                                        <span className="company">
                                            @{" "}
                                            <a
                                                href={work.companyUrl}
                                                target="_blank"
                                                rel="noreferrer noopener"
                                            >
                                                {work.company}
                                            </a>
                                        </span>
                                    </h3>
                                    <p className="duration">
                                        {work.roles[0].duration}
                                    </p>
                                    <div className="details">
                                        <ul className="details-list">
                                            {work.roles[0].details.map(
                                                (detail, i) => (
                                                    <li
                                                        className="detail"
                                                        key={i}
                                                    >
                                                        {detail}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </>
                            ) : (
                                // If multiple roles, show company then each role
                                <>
                                    <h3>
                                        <span className="company">
                                            @{" "}
                                            <a
                                                href={work.companyUrl}
                                                target="_blank"
                                                rel="noreferrer noopener"
                                            >
                                                {work.company}
                                            </a>
                                        </span>
                                    </h3>
                                    {work.roles.map((role, rIdx) => (
                                        <React.Fragment key={rIdx}>
                                            <p className="duration">
                                                {role.duration}
                                            </p>
                                            <h3 className="role">
                                                {role.position}
                                            </h3>
                                            <div className="details">
                                                <ul className="details-list">
                                                    {role.details.map(
                                                        (detail, i) => (
                                                            <li
                                                                className="detail"
                                                                key={i}
                                                            >
                                                                {detail}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                            {rIdx !== work.roles.length - 1 && (
                                                <hr />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default Work;

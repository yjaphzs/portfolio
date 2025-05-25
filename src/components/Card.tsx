import React from "react";

interface Props {
    children?: React.ReactNode;
    id?: string;
    className?: string;
    color: string;
}

function Card({ children, id, className, color }: Props) {
    return (
        <div
            {...(id ? { id } : {})}
            className={`fullscreen ${className || ""}`}
        >
            <div className="section" data-color={color}>
                <div className="wrapper">{children}</div>
            </div>
        </div>
    );
}

export default Card;

// @section('content')
//     <div id="portfolio" class="division">
//         <div class="fullscreen">
//             <div class="section" data-color="black">
//                 <div class="wrapper">
//                     <div class="experience-wrapper">
//                         <div class="experiences-info">
//                             <h2 class="experiences-title">Work <span class="experience">History</span></h2>
//                         </div>

//                         <div class="work-experiences-wrapper">
//                             <ol class="work-experience-list">
//                                 <li class="work-experience">
//                                     <h3><span class="company">@ <a href="https://clsu.edu.ph/" target="_blank" rel="noreferrer noopener">CLSU</a></span></h3>
//                                     <p class="duration">Aug. 2022 - Present</p>
//                                     <h3 class="role">Instructor I</h3>
//                                     <div class="details">
//                                         <ul class="details-list">
//                                             <li class="detail">Lecturer for both lecture and laboratory classes on programming subjects.</li>
//                                             <li class="detail">Prepare learning materials such as PowerPoint presentations and other instructional resources.</li>
//                                             <li class="detail">Serve as Capstone and OJT advisor for IT students to provide guidance and support.</li>
//                                         </ul>
//                                     </div>
//                                     <hr>
//                                     <h3 class="role">Full-stack Web Developer</h3>
//                                     <div class="details">
//                                         <ul class="details-list">
//                                             <li class="detail">Develop university-wide Laravel-based web applications (information/management systems) under the Management Information System Office (MISO).</li>
//                                             <li class="detail">Developed and implemented RADIIS, improving R&D management with data analytics and automated reports, reducing administrative workload by 50% and increasing data transparency by 60%.</li>
//                                             <li class="detail">Maintain and upgrade RADIIS based on user feedback and leadership recommendations, ensuring continuous improvements.</li>
//                                             <li class="detail">Provide training and ongoing support for system users.</li>
//                                             <li class="detail">Integrate university-wide systems to optimize data use and eliminate redundancy, improving efficiency and consistency across departments.</li>
//                                         </ul>
//                                     </div>
//                                 </li>

//                                 <li class="work-experience">
//                                     <h3>Information System Analyst I <span class="company">@ <a href="https://www.philrice.gov.ph/" target="_blank" rel="noreferrer noopener">PHILRICE</a></span></h3>
//                                     <p class="duration">Oct. 2021 - Aug. 2022</p>
//                                     <div class="details">
//                                         <ul class="details-list">
//                                             <li class="detail">Provided IT support for the division, creating and updating training materials (tarpaulins, PowerPoints, infographics) and offering technical assistance.</li>
//                                             <li class="detail">Documented activities and training sessions as the photo documentation personnel.</li>
//                                             <li class="detail">Edited photos and videos to support training materials and promotional activities.</li>
//                                             <li class="detail">Supported online learning and training sessions, including the Training of Trainers on Rice Integrated Crop Management (PalayCheck) for 32 Sri Lankan agricultural workers, backed by DFA-TCCP.</li>
//                                         </ul>
//                                     </div>
//                                 </li>

//                                 <li class="work-experience">
//                                     <h3 class="position-bottom"><span class="company">@ <a href="https://www.aqa.work/" target="_blank" rel="noreferrer noopener">WIDEOUT</a></span></h3>
//                                     <h3>Quality Assurance Specialist</h3>
//                                     <p class="duration">Nov. 2020 - Sept. 2021</p>
//                                     <div class="details">
//                                         <ul class="details-list">
//                                             <li class="detail">Ensured that the developed creatives were pixel-perfect base on the instructions and design specifications.</li>
//                                             <li class="detail">Followed a standardized process to QA the work of creative developers.</li>
//                                             <li class="detail">Tested and debugged creatives also ensured cross-browser compatibility of creative web advertisements.</li>
//                                         </ul>
//                                     </div>
//                                     <hr>
//                                     <h3>Creative Developer</h3>
//                                     <p class="duration">Aug. 2020 - Nov. 2020</p>
//                                     <div class="details">
//                                         <ul class="details-list">
//                                             <li class="detail">Converted designs into pixel-perfect animated and static web ads using HTML, CSS, and vanilla JavaScript.</li>
//                                             <li class="detail">Produced multiple banner sizes (160x600, 300x250, 300x600, 728x90, etc.) for creative ads based on initial designs.</li>
//                                             <li class="detail">Designed and created storyboards in Adobe Photoshop to illustrate concepts and animations for web ads.</li>
//                                             <li class="detail">Tested and debugged creatives, ensuring cross-browser compatibility.</li>
//                                         </ul>
//                                     </div>
//                                 </li>

//                                 <li class="work-experience">
//                                     <h3>Part-time Instructor <span class="company">@ <a href="https://clsu.edu.ph/" target="_blank" rel="noreferrer noopener">CLSU</a></span></h3>
//                                     <p class="duration">Aug. 2019 - Apr. 2020</p>
//                                     <div class="details">
//                                         <ul class="details-list">
//                                             <li class="detail">Lecturer for both lecture and laboratory classes on programming subjects.</li>
//                                             <li class="detail">Prepare learning materials such as PowerPoint presentations and other instructional resources.</li>
//                                             <li class="detail">Serve as Capstone and OJT advisor for IT students to provide guidance and support.</li>
//                                         </ul>
//                                     </div>
//                                 </li>

//                                 <li class="work-experience">
//                                     <h3>Programmer <span class="company">@ <a href="https://technodreamoutsourcing.com/" target="_blank" rel="noreferrer noopener">TECHNODREAM</a></span></h3>
//                                     <p class="duration">Feb. 2019 - May 2019</p>
//                                     <div class="details">
//                                         <ul class="details-list">
//                                             <li class="detail">Converted daily web designs into pixel-perfect, responsive static web pages using HTML, CSS, and JavaScript.</li>
//                                             <li class="detail">Successfully converted 34+ designs into responsive web pages.</li>
//                                             <li class="detail">Assisted in migrating pages from an outdated website to a new WordPress template for Turkey Travel Planner, increasing delivery time by 60% and converting up to 20% of the pages.</li>
//                                         </ul>
//                                     </div>
//                                 </li>
//                             </ol>
//                         </div>
//                     </div>
//                     {{-- <div class="spotify">
//                         <div class="spotify-playlist">
//                             <iframe style="border-radius:12px" src="{{ env('SPOTIFY_PLAYLIST_URL') }}" width="100%" height="100%" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
//                         </div>
//                     </div> --}}
//                 </div>
//             </div>
//         </div>

//         <div class="fullscreen">
//             <div class="section" data-color="white">
//                 <div class="wrapper">
//                     <div class="projects-wrapper">
//                         <div class="projects-info">
//                             <h2 class="projects-title">My <span class="experience">Creations</span></h2>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>

//     <div id="contact" class="division">
//         <div class="fullscreen">
//             <div class="section" data-color="white">
//                 <div class="wrapper">
//                     <div class="contact-wrapper">
//                         <div class="contact-info">
//                             <h2 class="contact-title">Let's <span class="connect">Connect!</span></h2>
//                             <p class="contact-details">{{ __('I\'d love to hear from you! Whether you want to discuss a project or just say hi, click the button below to send me an email directly.') }}</p>
//                             <div class="contact-email-wrapper">
//                                 <a class="contact-email" href="mailto:yjaphzs@gmail.com" rel="noopener noreferrer" target="_blank">{{ __('yjaphzs@gmail.com') }}</a>
//                             </div>
//                             <a class="contact-btn" href="mailto:yjaphzs@gmail.com" rel="noopener noreferrer" target="_blank">{{ __('Say Hello') }}</a>
//                         </div>
//                     </div>

//                     {{-- Footer --}}
//                     @include('partials.footer')
//                 </div>
//             </div>
//         </div>
//     </div>
// @endsection

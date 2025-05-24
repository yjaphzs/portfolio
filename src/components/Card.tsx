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
//     <div id="about" class="division">
//         <div class="fullscreen">
//             <div class="section" data-color="white">
//                 <div class="wrapper">
//                     <div class="profile-info">
//                         <h1 class="name"><span class="first-name">Jan</span> Bautista</h1>
//                         <div class="position-wrapper">
//                             <h3 class="position">FULL-STACK <span class="developer">DEVELOPER</span></h3>
//                         </div>
//                         <div class="socials">
//                             <ul class="socials-list">
//                                 <li class="socials-item">
//                                     <a class="socials-link" href="https://github.com/yjaphzs" target="_blank" rel="noreferrer noopener" aria-label="GitHub (opens in a new tab)" title="GitHub">
//                                         <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
//                                             <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
//                                         </svg>
//                                     </a>
//                                 </li>
//                                 <li class="socials-item">
//                                     <a class="socials-link" href="https://www.linkedin.com/in/yjaphzs/" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn (opens in a new tab)" title="LinkedIn">
//                                         <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
//                                             <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
//                                         </svg>
//                                     </a>
//                                 </li>
//                                 <li class="socials-item">
//                                     <a class="socials-link" href="https://www.instagram.com/yjaphzs/" target="_blank" rel="noreferrer noopener" aria-label="Instagram (opens in a new tab)" title="Instagram">
//                                         <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
//                                             <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
//                                         </svg>
//                                     </a>
//                                 </li>
//                             </ul>
//                         </div>
//                         <a class="text-link" href="#">View Resumé <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-arrow-up-right" viewBox="0 0 16 16">
//                             <path fill-rule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"/>
//                         </svg></a>
//                     </div>

//                     <div class="profile-image">
//                         <div class="image-wrapper">
//                             <img src="{{ asset('images/profile-photo.png') }}" alt="">

//                             <div class="circles" id="circles">
//                                 <div class="circle"></div>
//                                 <div class="circle"></div>
//                                 <div class="circle"></div>
//                                 <div class="circle"></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         <div class="fullscreen">
//             <div class="section" data-color="white">
//                 <div class="wrapper">
//                     <div class="about-wrapper">
//                         <div class="about-info">
//                             <h2 class="about-title">About <span class="me">Me!</span></h2>
//                             <div class="about-details-wrapper">
//                                 <p class="about-details">Hello! My name is Jan Bautista, and I love building things for the web. My passion for web development began during college when I discovered the fun of creating applications with the Laravel Framework. The thrill of turning ideas into interactive websites sparked my journey into full-stack development.</p>
//                                 <p class="about-details">Since then, I’ve had the opportunity to work in various roles, from <span class="highlight">teaching IT courses</span> to <span class="highlight">developing university-wide systems</span> and even providing <span class="highlight">IT support</span> for a research institute. My focus these days is on crafting robust web applications that make a difference.</p>
//                                 <p class="about-details">Here are some technologies I’ve been working with recently:</p>
//                                 <div class="technology-wrapper">
//                                     <ul class="technology-list">
//                                         <li class="technology-item">
//                                             <div class="pill">Laravel</div>
//                                         </li>
//                                         <li class="technology-item">
//                                             <div class="pill">Livewire</div>
//                                         </li>
//                                         <li class="technology-item">
//                                             <div class="pill">Spatie Packages</div>
//                                         </li>
//                                         <li class="technology-item">
//                                             <div class="pill">SASS</div>
//                                         </li>
//                                         <li class="technology-item">
//                                             <div class="pill">PHP</div>
//                                         </li>
//                                         <li class="technology-item">
//                                             <div class="pill">HTML & CSS</div>
//                                         </li>
//                                         <li class="technology-item">
//                                             <div class="pill">JavaScript</div>
//                                         </li>
//                                         <li class="technology-item">
//                                             <div class="pill">JQuery</div>
//                                         </li>
//                                         <li class="technology-item">
//                                             <div class="pill">MySQL</div>
//                                         </li>
//                                         <li class="technology-item">
//                                             <div class="pill">Bootstrap</div>
//                                         </li>
//                                         <li class="technology-item">
//                                             <div class="pill">TailwindCSS</div>
//                                         </li>
//                                         <li class="technology-item">
//                                             <div class="pill">C</div>
//                                         </li>
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>

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

import "./Technology.scss";

function Technology() {
    const technologies = [
        "Laravel",
        "Livewire",
        "Spatie Packages",
        "SASS",
        "PHP",
        "HTML & CSS",
        "JavaScript",
        "TypeScript",
        "JQuery",
        "MySQL",
        "Bootstrap",
        "TailwindCSS",
        "C",
    ];

    return (
        <div className="technology-wrapper">
            <ul className="technology-list">
                {technologies.map((tech) => (
                    <li className="technology-item" key={tech}>
                        <div className="pill">{tech}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Technology;

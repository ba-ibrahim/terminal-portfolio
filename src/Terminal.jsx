import { useEffect, useRef, useState } from "react"
import "./terminal.css"

const commands = {
    about: ["I am ibraim, a full-stack developer focused on web and ecommerce solutions"],
    help: [
        "Here are some of my available commands:",
        "- about: About me",
        "- help: List all commands",
        "- tech: List my programming skills",
        "- projects: List my projects",
        "- links: List my project's links :: COMMING SOON ",
        "- contact: Contact me",
        "- clear: Clear all commands",
        `- clear -h: Clear all history`
    ],
    tech: [
            "In most of the times, I imlement the MERN stack,",
            "MongoDB, Express, React and NodeJS, with NextJS",
            "frameworka and Redux for state management.",
    ],
    projects: ["1. E-commerce platform\n2. Medical platform\n3. JUST DO IT todo app"],
    contact: [
        "Email: ibrahimbenamara76@gmail.com",
        "contact: ibrahimba.contact@gmail.com",
        "Phone: +213 561 11 41 27",
        "github: https://github.com/ba-ibrahim",
        "linkedin: https://www.linkedin.com/in/ibrahim-benamara-a2925b251//"

    ],
    
};

const intro = [
    " _ .-') _        ('-.            (`-.                                        .-. .-')    _  .-')      ('-.      ('-. .-.            _   .-')    ",
    "( (  OO) )       _(  OO)         _(OO  )_           ,-.                    \\  ( OO )  ( \\( -O )    ( OO ).-. ( OO )  /           ( '.( OO )_  ",
    " \\     .'_      (,------.   ,--(_/   ,. \\      ,-----.      \\ \\           ,-.-')   ;-----.\\   ,------.    / . --. / ,--. ,--.   ,-.-')   ,--.   ,--.) ",
    " ,`'--..._)      |  .---'    \\   \\   /(__/      '-----'      \\ \\           |  |OO)  | .-.  |   |   /`. '   | \\-.  \\  |  | |  |   |  |OO)  |   `.'   |  ",
    " |  |  \\  '     |  |        \\   \\ /   /                    \\ \\            |  |  \\ | '-' /_)  |  /  | | .-'-'  |  | |   .|  |   |  |  \\  |         |  ",
    " |  |   ' |     (|  '--.      \\   '   /,       ,-----.       / /              |  |(_/  | .-. `.   |  |_.' |  \\| |_.'  | |       |   |  |(_/  |  |'.'|  |  ",
    " |  |   / :      |  .--'       \\     /__)      '-----'      / /              ,|  |_.'  | |  \\  | |  .  '.'   |  .-.  | |  .-.  |  ,|  |_.'  |  |   |  |  ",
    " |  '--'  /      |  `---.       \\   /                      / /              (_|  |     | '--'  /  |  |\\  \\    |  | |  | |  | |  | (_|  |     |  |   |  |  ",
    " `-------'       `------'         `-'                      `-'                 `--'     `------'   `--' '--'   `--' `--' `--' `--'   `--'     `--'   `--'  ",
    '-',
    "Hint: type >> help",
    '-',
];

export default function Terminal() { 
    
    const [Intro, setIntro] = useState(intro)
    const [command, setCommand] = useState("")
    const [output, setOutput] = useState([])
    const [history, setHistory] = useState([])
    const [historyIndex, setHistoryIndex] = useState(-1)

    const reference = useRef()
    useEffect(() => {
        if (reference.current) {
          reference.current.focus(); // Focus the input element
        }
      }, []);

      const handleCommand = (e) => {
        const Command = command.replace(/\s+/g, '').toLowerCase()
        if (e.key === 'Enter') {
            if (Command === "clear") {
                setOutput([]);
                setCommand('');
                setIntro([]); // Clear intro only on the clear command
                setHistory([...history, ["clear", ""]]);
                return;
            }
            
            if (Command === "clear-h") {
                setOutput([]);
                setCommand('');
                setIntro([]); // Clear intro only on the clear-h command
                setHistory([]);
                return;
            }


            // DEBUG: this block of code.
            if (Command === "history") {
                setOutput([...history])
                setHistory([...history, ["history", ""]]);
                setCommand('');
                return;
            }
    
            let newOutput = [...output];
            let newHistory = [...history];
    
            if (commands[command.trim()]) {
                newOutput.push([command, commands[command.trim()]]);
                newHistory.push([command, commands[command.trim()]]);
            } else {
                // For invalid commands, use fallback
                newOutput.push([command.trim(), ["Command not found. Try --help to see valid commands."]]);
                newHistory.push([command.trim(), ["Command not found. Try --help to see valid commands."]]);
            }
    
            setOutput(newOutput)
            setHistory(newHistory)
            setHistoryIndex(-1)            
            setCommand('')
        }
    
        if (e.key === 'ArrowUp') {
            const newIndex = historyIndex + 1 < history.length ? historyIndex + 1 : historyIndex;
            setCommand(history[history.length - newIndex - 1][0] || '');
            setHistoryIndex(newIndex);
        }
    
        if (e.key === 'ArrowDown') {
            const newIndex = historyIndex - 1 >= 0 ? historyIndex - 1 : -1;
            setCommand(newIndex >= 0 ? history[history.length - newIndex - 1][0] : '');
            setHistoryIndex(newIndex);
        }
    };
    

    return (
        <div>
        <div className="terminal">
            <div className="output-area">
            {Intro.map((line, index) => (
                <div key={index}>{line}</div> // Render each line in a separate div
            ))}
                {output.map((element, index) => (
                <div key={index}>
                    <p>web dev :: ibrahim/kal $&gt;&nbsp;<span style={{color: "greenyellow"}}>{element[0]}</span></p>
                    <p style={{color: "red"}}>{
                        element[1].map((line, index) => (
                            <p key={index} style={{color: "red", margin: "3px 0px"}}>&nbsp;{line}<br /></p>
                        ))
    
                }</p>
                </div>
                ))}
            </div>
        <div className="input-area">
            <span>web dev :: ibrahim/kal $&gt;&nbsp;</span>
            <em>
            <input
            ref={reference}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleCommand}
            />
            </em>
        </div>
        </div>
            
        </div>
    )
}
const FileSystem = {
    readFile: function (path) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", path, false);
        xhr.send();
        return xhr.responseText;
    },
};

// Hero header is rendered via CSS — no ASCII art needed

const output = document.getElementById("output");
const input = document.getElementById("command-input");
const prompt = document.getElementById("prompt");

const technologies = [
    ["Java", "MySQL", "Redis", "Kafka"],
    ["REST APIs", "Struts 2", "Bash/Shell", "JWT"],
    ["Git", "Linux", "Figma", "Zoho SalesIQ"],
];

const commands = [
    { name: "help", description: "list all available commands" },
    { name: "ls", description: "list directory contents" },
    { name: "cat [file]", description: "read a file" },
    { name: "pwd", description: "print working directory" },
    { name: "whoami", description: "display current user" },
    { name: "neofetch", description: "system information" },
    { name: "about", description: "introduction about me" },
    { name: "resume", description: "open resume overview with download link" },
    { name: "skills", description: "list of technologies I have worked with" },
    { name: "experience", description: "my work experience at Zoho" },
    { name: "education", description: "my education details" },
    { name: "contact", description: "contact information" },
    { name: "hobbies", description: "things I enjoy outside of work" },
    { name: "links", description: "list all the links" },
    { name: "open [link]", description: "open a link in a new tab" },
    { name: "history", description: "show command history" },
    { name: "date", description: "show current date and time" },
    { name: "echo [text]", description: "print text to terminal" },
    { name: "clear", description: "clear the terminal" },
    { name: "surprise", description: "surprise yourself" },
];

const links = {
    "linkedin": "https://www.linkedin.com/in/naveen-muralikrishnan-2643a11a1/",
    "email": "mailto:naveenmuralikrishnan17@gmail.com",
    "resume-pdf": "Naveen_Resume_1.0.0.pdf",
    "resume-web": "resume.html",
    "salesiq-profiles": "https://help.zoho.com/portal/en/kb/salesiq-2-0/for-administrators/controls/articles/profiles-on-salesiq-define-feature-level-access-and-permissions-for-operators",
    "salesiq-broadcast": "https://help.zoho.com/portal/en/kb/salesiq-2-0/for-administrators/channels/articles/broadcast-messaging-via-whatsapp-salesiq-outbound",
    "salesiq-proactive": "https://help.zoho.com/portal/en/kb/salesiq-2-0/for-administrators/channels/articles/proactive-messages-via-whatsapp-salesiq-outbound",
    "salesiq-vts": "https://help.zoho.com/portal/en/kb/crm/connect-with-customers/visitor-tracking-with-salesiq/articles/visitor-tracking-overview",
};

const commandHistory = [];
let commandHistoryIndex = 0;

function autoCompleteCommand(command) {
    const commandName = command.split(" ")[0];
    const argPart = command.split(" ")[1] || '';

    // Autocomplete link names for 'open'
    const matchedLink = Object.keys(links).find((link) => link.startsWith(argPart));
    // Autocomplete filenames for 'cat'
    const matchedFile = Object.keys(virtualFiles).concat(['README.md']).find((f) => f.startsWith(argPart));

    const commandList = commands.map((cmd) => cmd.name.split(" ")[0]);
    const filteredCommands = commandList.filter((cmd) => cmd.startsWith(commandName));
    let autoCompleteCmd = command;
    if (filteredCommands.length === 1) {
        autoCompleteCmd = filteredCommands[0];
    }
    if (filteredCommands.length === 1 && commandName === 'open' && matchedLink) {
        autoCompleteCmd = autoCompleteCmd + " " + matchedLink;
    }
    if (filteredCommands.length === 1 && commandName === 'cat' && matchedFile) {
        autoCompleteCmd = autoCompleteCmd + " " + matchedFile;
    }
    return autoCompleteCmd;
}

const virtualFiles = {
    'about.txt': 'about',
    'resume.txt': 'resume',
    'skills.txt': 'skills',
    'experience.txt': 'experience',
    'education.txt': 'education',
    'contact.txt': 'contact',
    'hobbies.txt': 'hobbies',
    'links.txt': 'links',
};

const commandFunctions = {
    help: function () {
        let helpText = `<br><span class="text-cyan">Available commands:</span><br><br>`;
        commands.forEach((command) => {
            helpText += `  <span class="text-green">${command.name.padEnd(18)}</span> <span class="text-gray">—</span> ${command.description}<br>`;
        });
        return helpText;
    },
    ls: function () {
        let listing = `<br>`;
        const files = Object.keys(virtualFiles);
        files.forEach((file) => {
            listing += `  <span class="text-cyan">${file}</span><br>`;
        });
        listing += `  <span class="text-pink">README.md</span><br>`;
        listing += `<br><span class="text-gray">Use "cat [filename]" to read a file</span>`;
        return listing;
    },
    cat: function (command) {
        const filename = command.split(" ")[1];
        if (!filename) {
            return `<span class="text-red">Usage: cat [filename]</span><br><span class="text-gray">Try "ls" to see available files</span>`;
        }
        if (filename === 'README.md' || filename === 'readme.md') {
            return `<br><span class="text-green">## Naveen Muralikrishnan</span><br><br>` +
                `Product-minded backend engineer with 3+ years at Zoho.<br>` +
                `Building enterprise messaging, permissions, and reusable platform services.<br><br>` +
                `<span class="text-gray">Run "help" for available commands.</span>`;
        }
        if (virtualFiles[filename]) {
            return commandFunctions[virtualFiles[filename]]();
        }
        return `<span class="text-red">cat: ${filename}: No such file or directory</span>`;
    },
    pwd: function () {
        return `<span class="text-blue">/home/naveen/portfolio</span>`;
    },
    whoami: function () {
        return `<span class="text-green">Naveen Muralikrishnan</span><br>` +
            `<span class="text-gray">Backend/Product Engineer @ Zoho Corporation</span>`;
    },
    neofetch: function () {
        return `<pre class="text-white">` +
            `<span class="text-blue">      ╔══════╗</span>       <span class="text-green">naveen</span><span class="text-white">@</span><span class="text-green">portfolio</span>\n` +
            `<span class="text-blue">      ║  NM  ║</span>       <span class="text-gray">────────────────────</span>\n` +
            `<span class="text-blue">      ╚══════╝</span>       <span class="text-blue">OS:</span>        Backend Engineer v3.4\n` +
            `<span class="text-blue">    ╔══════════╗</span>     <span class="text-blue">Host:</span>      Zoho Corporation\n` +
            `<span class="text-blue">    ║ ┌──────┐ ║</span>     <span class="text-blue">Kernel:</span>    Java / JVM\n` +
            `<span class="text-blue">    ║ │ &gt;_   │ ║</span>     <span class="text-blue">Uptime:</span>    3+ years\n` +
            `<span class="text-blue">    ║ │      │ ║</span>     <span class="text-blue">Shell:</span>     Bash/Shell\n` +
            `<span class="text-blue">    ║ └──────┘ ║</span>     <span class="text-blue">Packages:</span>  Java, MySQL, Redis, Kafka\n` +
            `<span class="text-blue">    ╚══════════╝</span>     <span class="text-blue">Framework:</span> Struts 2, REST APIs\n` +
            `                          <span class="text-blue">Tools:</span>     Git, Linux, Figma\n` +
            `                          <span class="text-blue">Role:</span>      Member Technical Staff\n` +
            `                          <span class="text-blue">Location:</span>  Tenkasi / Chennai, India\n` +
            `                          \n` +
            `                          <span style="color:#6CCFF6">███</span><span style="color:#001011;background:#757780">███</span><span style="color:#757780">███</span><span style="color:#FFFFFC">███</span><span style="color:#98CE00">███</span><span style="color:#E06C75">███</span>\n` +
            `</pre>`;
    },
    history: function () {
        if (commandHistory.length === 0) {
            return `<span class="text-gray">No commands in history yet.</span>`;
        }
        let hist = `<br>`;
        commandHistory.forEach((cmd, i) => {
            hist += `  <span class="text-gray">${String(i + 1).padStart(4)}</span>  ${cmd}<br>`;
        });
        return hist;
    },
    date: function () {
        const now = new Date();
        return `<span class="text-white">${now.toString()}</span>`;
    },
    echo: function (command) {
        const text = command.substring(5);
        if (!text || text.trim() === '') {
            return ``;
        }
        return `${text}`;
    },
    about: function () {
        const aboutText = FileSystem.readFile("commands/about.html");
        return aboutText;
    },
    resume: function () {
        const resumeText = FileSystem.readFile("commands/resume.html");
        return resumeText;
    },
    experience: function () {
        const exp = FileSystem.readFile("commands/experience.html");
        return exp;
    },
    education: function () {
        const edu = FileSystem.readFile("commands/education.html");
        return edu;
    },
    contact: function () {
        const contact = FileSystem.readFile("commands/contact.html");
        return contact;
    },
    skills: function () {
        const { table, maxCellLength } = createTable(technologies);
        const containerWidth = maxCellLength * technologies[0].length * 10 + 40;
        const tableContainer = `<div style="width:${containerWidth}px" class="text-green"><pre>${table}</pre></div>`;
        return tableContainer;
    },
    hobbies: function () {
        return `<br>
        <span class="text-yellow">🏏</span> Cricket — Nothing beats a weekend match<br>
        <span class="text-yellow">🏋️</span> Gym — Consistency over intensity<br>
        <span class="text-yellow">✈️</span> Travel — Exploring new places and food<br>
        <br>`;
    },
    open: function (command) {
        const linkName = command.split(" ")[1];
        if (links[linkName]) {
            window.open(links[linkName], "_blank");
            return `<span class="text-green">Opening ${linkName} in a new tab...</span>`;
        } else {
            return `<span class="text-red">Invalid link name: ${linkName}</span><br><span class="text-gray">Type "links" to see available links.</span>`;
        }
    },
    links: function () {
        let list = `<br><span class="text-cyan">Available links:</span><br><br>`;
        for (const linkName in links) {
            list += `  <span class="text-pink">${linkName}</span><br>`;
        }
        list += `<br><span class="text-gray">Type "open <span class="text-pink">[link-name]</span>" to open in a new tab</span>`;
        return list;
    },
    surprise: function () {
        const surprises = [
            `<pre class="text-yellow">
    ╔══════════════════════════════════════════╗
    ║                                          ║
    ║   "First, solve the problem.             ║
    ║    Then, write the code."                ║
    ║                      — John Johnson      ║
    ║                                          ║
    ╚══════════════════════════════════════════╝
            </pre>`,
            `<pre class="text-green">
    ╔══════════════════════════════════════════╗
    ║                                          ║
    ║   Fun fact: I once fixed a production    ║
    ║   Redis crash caused by excessive reads  ║
    ║   within 2 hours of customer reports     ║
    ║   and shipped a hotfix on the spot! 🔥   ║
    ║                                          ║
    ╚══════════════════════════════════════════╝
            </pre>`,
            `<pre class="text-cyan">
    ╔══════════════════════════════════════════╗
    ║                                          ║
    ║    ☕ Java developer by day              ║
    ║    🏏 Cricket enthusiast by evening      ║
    ║    🏋️ Gym rat by night                   ║
    ║                                          ║
    ╚══════════════════════════════════════════╝
            </pre>`,
            `<pre class="text-pink">
    ╔══════════════════════════════════════════╗
    ║                                          ║
    ║  "Any fool can write code that a         ║
    ║   computer can understand. Good          ║
    ║   programmers write code that humans     ║
    ║   can understand."                       ║
    ║                    — Martin Fowler        ║
    ║                                          ║
    ╚══════════════════════════════════════════╝
            </pre>`,
            `<pre class="text-orange">
    ╔══════════════════════════════════════════╗
    ║                                          ║
    ║   3+ years at Zoho and counting...       ║
    ║   2 modules owned end-to-end             ║
    ║   2 juniors mentored                     ║
    ║   1 production incident resolved in 2h   ║
    ║   ∞ lines of Java written                ║
    ║                                          ║
    ╚══════════════════════════════════════════╝
            </pre>`,
        ];
        return surprises[Math.floor(Math.random() * surprises.length)];
    }
};

output.innerHTML += `<span class="text-gray">Welcome to my terminal portfolio. Type <span class="text-green">help</span> for a list of commands.</span><br><br>`;

input.focus();
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        commandHistory.push(input.value);
        commandHistoryIndex = 0;
        input.value = input.value.toLowerCase().trim();
        const command = input.value.split(" ")[0];
        const commandArgs = input.value.split(" ")[1];
        input.value = "";

        output.innerHTML += `${prompt.innerHTML} ${command} ${commandArgs || ''}<br><br>`;

        if (commandFunctions[command]) {
            const fullInput = `${command} ${commandArgs || ''}`.trim();
            output.innerHTML += commandFunctions[command](fullInput) + "<br>";
        } else if (command === "clear") {
            output.innerHTML = "";
        } else if (command === "") {
            // do nothing for empty input
        } else {
            output.innerHTML += `<span class="text-red">Command not found: ${command}</span><br>Type <span class="text-green">help</span> for a list of commands.`;
        }
        if (command !== "clear") {
            output.innerHTML += "<br><br>";
        }
        scrollToBottom();
    }
    if (event.key === "Tab") {
        event.preventDefault();
        input.value = autoCompleteCommand(input.value);
    }
    if (event.key === "ArrowUp") {
        if (commandHistory.length === 0) return;
        event.preventDefault();
        if (commandHistoryIndex >= commandHistory.length) {
            commandHistoryIndex = 0;
        }
        input.value = commandHistory[commandHistory.length - 1 - commandHistoryIndex];
        commandHistoryIndex++;
    }
    if (event.key === "ArrowDown") {
        event.preventDefault();
        if (commandHistory.length === 0) return;
        if (commandHistoryIndex <= 0) {
            commandHistoryIndex = commandHistory.length;
        }
        commandHistoryIndex--;
        input.value = commandHistory[commandHistory.length - 1 - commandHistoryIndex];
    }
    resizeInput();
});

input.addEventListener("blur", function () {
    input.focus();
});

document.addEventListener("click", function () {
    input.focus();
});

function resizeInput() {
    input.style.width = (input.value.length + 1) + "ch";
}

function scrollToBottom() {
    const shell = document.getElementById("shell");
    shell.scrollTop = output.scrollHeight;
    window.scroll(0, output.scrollHeight);
}

function createTable(data) {
    let maxCellLength = 0;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j].length > maxCellLength) {
                maxCellLength = data[i][j].length;
            }
        }
    }

    const cols = data[0].length;
    let topBorder = "┌";
    for (let c = 0; c < cols; c++) {
        topBorder += "─".repeat(maxCellLength + 2);
        topBorder += c < cols - 1 ? "┬" : "┐";
    }

    let dataRows = "";
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            let cell = data[i][j];
            let padding = " ".repeat(Math.floor((maxCellLength - cell.length) / 2));
            let extraPadding = (cell.length % 2 === maxCellLength % 2) ? "" : " ";
            dataRows += "│ " + padding + cell + padding + extraPadding + " ";
        }
        dataRows += "│\n";
        if (i < data.length - 1) {
            let midBorder = "├";
            for (let c = 0; c < cols; c++) {
                midBorder += "─".repeat(maxCellLength + 2);
                midBorder += c < cols - 1 ? "┼" : "┤";
            }
            dataRows += midBorder + "\n";
        }
    }

    let bottomBorder = "└";
    for (let c = 0; c < cols; c++) {
        bottomBorder += "─".repeat(maxCellLength + 2);
        bottomBorder += c < cols - 1 ? "┴" : "┘";
    }

    let table = topBorder + "\n" + dataRows + bottomBorder;
    return { maxCellLength, table };
}

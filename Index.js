// Packages
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const fileDirectory = path.resolve(__dirname, "dist");
const filePath = path.join(fileDirectory, "index.html");

// Module exports
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const renderHTML = require("./lib/generateHTML");

let employeesArr = [];

// Questions for all team members
const questions = [{
        type: "input",
        name: "name",
        message: "What is the name of this employee?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the ID of this employee?"
    },
    {
        type: "input",
        name: "email",
        message: "What is this employee's email?"
    },
    {
        type: "list",
        name: "role",
        message: "What role does this employee have?",
        choices: ["Engineer", "Intern", "Manager"]
    }
]

// Managers questions
managerQuestions = [{
    type: "input",
    name: "officeNumber",
    message: "What is the manager's office number? (Required)",
    validate: officeNumber => {
        if (officeNumber) {
            return true;
        } else {
            console.log("Please enter an office number!");
            return false;
        }
    }
}]

// Engineers questions
engineerQuestions = [{
    type: "input",
    name: "github",
    message: "What is the engineer's Github Username? (Required)",
    validate: github => {
        if (github) {
            return true;
        } else {
            console.log("Please enter a GitHub username!");
            return false;
        }
    }
}]

// Intern questions
internQuestions = [

    {
        type: "input",
        name: "school",
        message: "What school is the intern from? (Required)",
        validate: school => {
            if (school) {
                return true;
            } else {
                console.log("Please enter a school name!");
                return false;
            }
        }
    }
]

// Initialize application
const init = () => {
    if (fs.existsSync(filePath)) {
        inquirer.prompt({
            type: "confirm",
            message: "It looks like the index.html file in the 'dist' folder already exists. Do you want to overwrite it?",
            name: "overwrite"
        }).then(async(response) => {

            let overwrite = response.overwrite;
            if (await overwrite === true) {
                console.log("Please enter your team information:")
                newEmployee()
            } else if (await overwrite === false) {
                console.log("Your index.html file in the 'dist' folder will not be overwritten. Please move the current index.html file to another folder before restarting.")
            }
        })
    } else {
        console.log("Welcome to the team profile generator. Please enter your team information below:")
        newEmployee()
    }
};

// Function for new employees
const newEmployee = async() => {
    await inquirer.prompt(questions)
        .then((response) => {
            let name = response.name;
            let id = response.id;
            let email = response.email;
            let role = response.role;
            let officeNumber;
            let github;
            let school;

            if (role === "Engineer") {
                inquirer.prompt(engineerQuestions).then((response) => {
                    github = response.github;
                    let employee = new Engineer(name, id, email, github);
                    employeesArr.push(employee);
                    addEmployee(employeesArr);
                });
            } else if (role === "Manager") {
                inquirer.prompt(managerQuestions).then((response) => {
                    officeNumber = response.officeNumber;
                    let employee = new Manager(name, id, email, officeNumber);
                    employeesArr.push(employee);
                    addEmployee(employeesArr);
                });
            } else if (role === "Intern") {
                inquirer.prompt(internQuestions).then((response) => {
                    school = response.school;
                    let employee = new Intern(name, id, email, school);
                    employeesArr.push(employee);
                    addEmployee(employeesArr);
                });
            }

        });

};

// Function used to add more employees when no is selected index file is generated
const addEmployee = async(array) => {
    await inquirer
        .prompt({
            type: "confirm",
            name: "addEmployee",
            message: "Would you like to add an employee? (Required)"

        }).then(async(response) => {
            var createEmployee = response.addEmployee;
            if (await createEmployee === true) {
                newEmployee();
            } else if (await createEmployee === false) {

                if (!fs.existsSync(fileDirectory)) {
                    fs.mkdirSync(fileDirectory)
                }


                fs.writeFile(filePath, renderHTML(array), (err) => {

                    if (err) {
                        return console.log(err);
                    }

                    // Complete
                    console.log("index.html file has been created in the 'dist' folder");
                });

            }
        })
};
// Initialize app
init();
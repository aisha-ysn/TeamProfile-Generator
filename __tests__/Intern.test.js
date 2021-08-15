const Intern = require("../lib/Intern");

test("Ability to set school using constructor function", () => {
    const school = "Aston";
    const employee = new Intern("Aisha", 1, "aishayasin1801@gmail.com", school);
    expect(employee.school).toBe(school);
});

test("getRole() should return Intern as a role", () => {
    const role = "Intern";
    const employee = new Intern("Aisha", 1, "aishayasin1801@gmail.com", "aisha-ysn");
    expect(employee.getRole()).toBe(role);
});
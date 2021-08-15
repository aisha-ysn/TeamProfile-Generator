const Engineer = require("../lib/Engineer");

test("Ability to set GitHub username using constructor function", () => {
    const github = "aisha-ysn";
    const employee = new Engineer("Aisha", 1, "aishayasin1801@gmail.com", github);
    expect(employee.github).toBe(github);
});

test("getRole() should return Engineer as a role", () => {
    const role = "Engineer";
    const employee = new Engineer("Aisha", 1, "aishayasin1801@gmail.com", "aisha-ysn");
    expect(employee.getRole()).toBe(role);
});
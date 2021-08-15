const Manager = require("../lib/Manager");

test("Ability to set office number using constructor function", () => {
    const officeNumber = "1801";
    const employee = new Manager("Aisha", 1, "aishayasin1801@gmail.com", officeNumber);
    expect(employee.officeNumber).toBe(officeNumber);
});

test("getRole() should return Manager as a role", () => {
    const role = "Manager";
    const employee = new Manager("Aisha", 1, "aishayasin1801@gmail.com", "aisha-ysn");
    expect(employee.getRole()).toBe(role);
});
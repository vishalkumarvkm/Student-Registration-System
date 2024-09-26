const studentForm = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
// Load from localStorage or initialize empty array
let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

// add or update a student
studentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const studentClass = document.getElementById("class").value;
    const address = document.getElementById("address").value;
    const contact = document.getElementById("contact").value;

    if (editIndex === -1) {
        students.push({ name, studentClass, address, contact });
    } else {
        students[editIndex] = { name, studentClass, address, contact };
        editIndex = -1;
    }

    //  localStorage
    localStorage.setItem("students", JSON.stringify(students));

    studentForm.reset();
    displayStudents();
});

// display students in the table
function displayStudents() {
    studentList.innerHTML = "";
    students.forEach((student, index) => {
        const row = `
            <tr>
                <td>${student.name}</td>
                <td>${student.studentClass}</td>
                <td>${student.address}</td>
                <td>${student.contact}</td>
                <td class="actions">
                    <button onclick="editStudent(${index})">Edit</button>
                    <button class="delete" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
        studentList.innerHTML += row;
    });
}

// to edit 
function editStudent(index) {
    const student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("class").value = student.studentClass;
    document.getElementById("address").value = student.address;
    document.getElementById("contact").value = student.contact;

    editIndex = index;
}

// to delete 
function deleteStudent(index) {
    students.splice(index, 1);

    // Update localStorage after deleting a student
    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
}

displayStudents();

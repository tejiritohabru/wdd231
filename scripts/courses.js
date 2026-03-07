const courses = [
{code:"WDD130", credits:2, subject:"WDD", completed:true},
{code:"WDD131", credits:2, subject:"WDD", completed:true},
{code:"WDD231", credits:2, subject:"WDD", completed:false},
{code:"CSE110", credits:2, subject:"CSE", completed:true},
{code:"CSE111", credits:2, subject:"CSE", completed:false}
];

const container = document.querySelector("#course-container");
const credits = document.querySelector("#credits");

function displayCourses(list){

container.innerHTML="";

list.forEach(course=>{

const div=document.createElement("div");
div.textContent=course.code;
div.classList.add("course");

if(course.completed){
div.classList.add("completed");
}

container.appendChild(div);

});

let total=list.reduce((sum,c)=>sum+c.credits,0);
credits.textContent=total;
}

displayCourses(courses);

document.querySelector("#all").addEventListener("click",()=>{
displayCourses(courses);
});

document.querySelector("#wdd").addEventListener("click",()=>{
displayCourses(courses.filter(c=>c.subject==="WDD"));
});

document.querySelector("#cse").addEventListener("click",()=>{
displayCourses(courses.filter(c=>c.subject==="CSE"));
});
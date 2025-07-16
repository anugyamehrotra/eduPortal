/*!
 * eduPortal - All Rights Reserved
 * Copyright 2025 Anugya Mehrotra • eduPortal
 *
 * This software is proprietary and may not be copied, modified, or distributed
 * without express written permission. For reference only.
 * https://eduportalhost.neocities.org/eduPortal_main_page
 */



// DECLARE VARIABLES & CONSTANTS
var mainSearchBarS;
var studentTitle;
var studentDescription;
var studentCatagory;
var studentClub;
var studentTeacherType;
var studentGrade9;
var studentGrade10;
var studentGrade11;
var studentGrade12;
var studentDate1;
var studentDate2;

// SEARCH DATA FUNCTION & STORAGE
function getStudentSearchData(searchAnnForm) {
    mainSearchBarS = searchAnnForm.mainSearchBarS.value.trim();
    studentTitle = searchAnnForm.titleS.value.trim();
    studentDescription = searchAnnForm.descriptionS.value.trim();
    studentCatagory = searchAnnForm.catagoryS.value;
    studentClub = searchAnnForm.clubS.value;
    studentTeacherType = searchAnnForm.teacherTypeS.value;

    studentGrade9 = searchAnnForm.grade9S.checked;
    studentGrade10 = searchAnnForm.grade10S.checked;
    studentGrade11 = searchAnnForm.grade11S.checked;
    studentGrade12 = searchAnnForm.grade12S.checked;

    studentDate1 = searchAnnForm.date1S.value;
    studentDate2 = searchAnnForm.date2S.value;

    localStorage.setItem("mainSearchBarSKey", mainSearchBarS);
    localStorage.setItem("studentTitleKey", studentTitle);
    localStorage.setItem("studentDescriptionKey", studentDescription);
    localStorage.setItem("studentCatagoryKey", studentCatagory);
    localStorage.setItem("studentClubKey", studentClub);
    localStorage.setItem("studentTeacherTypeKey", studentTeacherType);
    localStorage.setItem("studentGrade9Key", studentGrade9);
    localStorage.setItem("studentGrade10Key", studentGrade10);
    localStorage.setItem("studentGrade11Key", studentGrade11);
    localStorage.setItem("studentGrade12Key", studentGrade12);
    localStorage.setItem("studentDate1Key", studentDate1);
    localStorage.setItem("studentDate2Key", studentDate2);

    displayFinalResults();
}

// DISPLAY FINAL RESULTS FUNCTION
function displayFinalResults() {
    const loggedInTeacher = localStorage.getItem("loggedInTeacherKey");

    const teacherTitle = JSON.parse(localStorage.getItem("teacherTitleKey")) || [];
    const teacherDescription = JSON.parse(localStorage.getItem("teacherDescriptionKey")) || [];
    const teacherDate = JSON.parse(localStorage.getItem("teacherDateKey")) || [];
    const teacherCatagory = JSON.parse(localStorage.getItem("teacherCatagoryKey")) || [];
    const teacherClub = JSON.parse(localStorage.getItem("teacherClubKey")) || [];
    const teacherType = JSON.parse(localStorage.getItem("teacherTypeKey")) || [];

    const teacherGrade9T = JSON.parse(localStorage.getItem("grade9Key")) || [];
    const teacherGrade10T = JSON.parse(localStorage.getItem("grade10Key")) || [];
    const teacherGrade11T = JSON.parse(localStorage.getItem("grade11Key")) || [];
    const teacherGrade12T = JSON.parse(localStorage.getItem("grade12Key")) || [];

    const teacherImages = JSON.parse(localStorage.getItem("teacherImagesKey")) || [];

    mainSearchBarS = localStorage.getItem("mainSearchBarSKey") || "";
    studentTitle = localStorage.getItem("studentTitleKey") || "";
    studentDescription = localStorage.getItem("studentDescriptionKey") || "";
    studentCatagory = localStorage.getItem("studentCatagoryKey") || "";
    studentTeacherType = localStorage.getItem("studentTeacherTypeKey") || "";
    studentClub = localStorage.getItem("studentClubKey") || "";
    studentDate1 = localStorage.getItem("studentDate1Key") || "";
    studentDate2 = localStorage.getItem("studentDate2Key") || "";

    studentGrade9 = localStorage.getItem("studentGrade9Key") === 'true';
    studentGrade10 = localStorage.getItem("studentGrade10Key") === 'true';
    studentGrade11 = localStorage.getItem("studentGrade11Key") === 'true';
    studentGrade12 = localStorage.getItem("studentGrade12Key") === 'true';

    const dateFrom = studentDate1 ? new Date(studentDate1) : null;
    const dateTo = studentDate2 ? new Date(studentDate2) : null;

    let matchFound = false;
    let resultsHTML = "";

    if (!teacherTitle.length) {
        document.getElementById("searchResultContainerView").innerHTML = `<h2>No announcements found.</h2>`;
        return;
    }

    // KEYWORD SEARCH (INCL. STUDENT TITLE, STUDENT DESCRIPTION, CATAGORY & CLUB, AND TOP MAIN SEARCH BAR)
        // TERN OPERARY OPERATOR TO CHECK IF THE TEACHER TITLE & DESCRIPTION ARE NULL OR NOT (syntax: if teacher title key words = teachertitle is true, then conv. to lowercase and split into individual words, else return empty string into an array (for both teacher title and student search for comparison)

    const searchQuery = [mainSearchBarS, studentTitle, studentDescription, studentCatagory, studentClub, studentTeacherType].filter(q => q); // FILTER FUNCTION ONLY RETAINS VALUES THAT ARE TRUE/TRUTHY / SELETCED BY STUDENT (NULL VALUES ARE CONSIDERED FALSE)

    // LOGS SEARCH KEY WORDS INTO AN ARRAY WHICH IS PUSHED IN LOWERCASE > THIS IS MEANT TO ACCESS THE STUDENT TITLE, CATAGORY AND CLUB
    for (let i = 0; i < teacherTitle.length; i++) {
        let hasSearchQueryMatch = false;

        for (const splitOfQuery of searchQuery) {
            const baseWords = splitOfQuery.toLowerCase();

            if ((teacherTitle[i] && teacherTitle[i].toLowerCase().includes(baseWords)) || (teacherDescription[i] && teacherDescription[i].toLowerCase().includes(baseWords)) || (teacherCatagory[i] && teacherCatagory[i].toLowerCase().includes(baseWords)) || (teacherClub[i] && teacherClub[i].toLowerCase().includes(baseWords)) || (teacherType[i] && teacherType[i].toLowerCase().includes(baseWords))) {
                hasSearchQueryMatch = true; // IF ANY OF THE TEACHER POST TITLES, DESCRIPTIONS, CATAGORIES OR CLUBS MATCH THE STUDENT SEARCH QUERY, THEN HAS SEARCH QUERY MATCH IS TRUE
                break;
            }
        }


        // SETTING GRADE MATCH TO BE EQUAL TO THE STUDENT GRADE 9 & TEACHER VALUES FOR EACH POST (OR FALSY); CHECK IF STUDENT SELECTED GRADE = TO TEACHER GRADE
        const hasGradeMatch = (studentGrade9 && teacherGrade9T[i]) || (studentGrade10 && teacherGrade10T[i]) || (studentGrade11 && teacherGrade11T[i]) || (studentGrade12 && teacherGrade12T[i]) || (!studentGrade9 && !studentGrade10 && !studentGrade11 && !studentGrade12);

        let teacherPostDate = teacherDate[i] ? new Date(teacherDate[i]) : null; // IF TEACHER DATE IS CHANGED, THEN SET TO NEW DATE, ELSE NULL
        let hasDateMatch = false;

        // DATE SEARCH CONFIRMATION
            // FUNCTION: SETS DATE TRUE IF THERE IS NO DATE FOUND (AVOID ANY TRUTHY/FALSY ERRORS)
        if (!dateFrom && !dateTo) {
            hasDateMatch = true;
        } else if (teacherPostDate) { // IF TEACHER POST DATE IS TRUE, CHECK IF DATE FROM & DATE TO WORK
            if (dateFrom && dateTo) {
                hasDateMatch = teacherPostDate >= dateFrom && teacherPostDate <= dateTo; // SETS RANGE OF DATE FROM AND DATE TO
            } else if (dateFrom) {
                hasDateMatch = teacherPostDate >= dateFrom; // IF ONLY DATE FROM EXISTS, TEACHER DATE IS SET TO THE RANGE OF DATE FROM
            } else if (dateTo) {
                hasDateMatch = teacherPostDate <= dateTo; // IF ONLY DATE TO EXISTS, TEACHER DATE IS SET TO RANGE OF DATE TO 
            }
        }


        // LOG IMAGE VIEWABLE AS TRUE FOR POSTS
        const hasImageViewable = true;

        if ((searchQuery.length === 0 || hasSearchQueryMatch) && hasGradeMatch && hasDateMatch && hasImageViewable) {
            matchFound = true;

            // PUSHING ALL TEACHER GRADE CHECKBOX VALUES INTO AN ARRAY

            let gradeDisplay = [];
            if (teacherGrade9T[i]) gradeDisplay.push("Grade 9");
            if (teacherGrade10T[i]) gradeDisplay.push("Grade 10");
            if (teacherGrade11T[i]) gradeDisplay.push("Grade 11");
            if (teacherGrade12T[i]) gradeDisplay.push("Grade 12");

            const editButton = loggedInTeacher ? `<button onclick="editPost(${i})">Edit Post</button>` : ""; // IF LOGGED IN AS TEACHER, DISPLAY EDIT BUTTON

            const deleteButton = loggedInTeacher ? `<button onclick="deletePost(${i})">Delete Post</button>` : ""; // IF LOGGED IN AS TEACHER, DISPLAY DELETE BUTTON


            // DISPLAY TEACHER POST DYNAMICALLY
            resultsHTML += `
                <div class="post"><br>
                    <h4>${teacherTitle[i] || ""}</h4>
                    <img src="${teacherImages[i] || ""}" alt="Post Image" style="max-width: 717px; height: 388px;">
                    <p>Date: ${teacherDate[i] || ""}</p>
                    <p>Posted by: ${teacherType[i] || ""}</p>
                    <p>Description: ${teacherDescription[i] || ""}</p>
                    <p>Category: ${teacherCatagory[i] || ""}</p>
                    <p>Club: ${teacherClub[i] || ""}</p>
                    <p>Grades: ${gradeDisplay.join(", ")}</p><br>
                    ${editButton}
                    ${deleteButton}<br><br>
                    <hr>
                </div>
            `;
        }
    }

    const searchResults = document.getElementById("searchResultContainerView");

    if (matchFound) {
        searchResults.innerHTML = `<h2>Search Results</h2>${resultsHTML}`;
    } else {
        searchResults.innerHTML = `<h2>Search Results</h2><p>No announcements could be located per your search query. Please double-check your search input or try again.</p>`;
    }

    displayAdditionalCheck();
}



// DELETE POST FUNCTION
function deletePost(index) {

    // RECALL ALL TEACHER VARIABLES FROM LOCAL STORAGE TO HANDLE DELETION OF ANNOUNCEMENTS (SET INTO ARRAY OR EMPTY ARRAY > CONVERT STRING VALUES TO OBJECT VALUES)
    const teacherTitle = JSON.parse(localStorage.getItem("teacherTitleKey")) || [];
    const teacherDescription = JSON.parse(localStorage.getItem("teacherDescriptionKey")) || [];
    const teacherDate = JSON.parse(localStorage.getItem("teacherDateKey")) || [];
    const teacherCatagory = JSON.parse(localStorage.getItem("teacherCatagoryKey")) || [];
    const teacherClub = JSON.parse(localStorage.getItem("teacherClubKey")) || [];
    const teacherType = JSON.parse(localStorage.getItem("teacherTypeKey")) || [];

    const teacherGrade9T = JSON.parse(localStorage.getItem("grade9Key")) || [];
    const teacherGrade10T = JSON.parse(localStorage.getItem("grade10Key")) || [];
    const teacherGrade11T = JSON.parse(localStorage.getItem("grade11Key")) || [];
    const teacherGrade12T = JSON.parse(localStorage.getItem("grade12Key")) || [];

    // SPLICE THE TEACHER VARIABLES TO REMOVE THE POST AT THE SPECIFIED INDEX (REFER TO STACK OVERFLOW SOURCE)
    teacherTitle.splice(index, 1);
    teacherDescription.splice(index, 1);
    teacherDate.splice(index, 1);
    teacherCatagory.splice(index, 1);
    teacherClub.splice(index, 1);
    teacherType.splice(index, 1);

    teacherGrade9T.splice(index, 1);
    teacherGrade10T.splice(index, 1);
    teacherGrade11T.splice(index, 1);
    teacherGrade12T.splice(index, 1);

    // SAVE THE UPDATED DATA BACK TO LOCAL STORAGE
    localStorage.setItem("teacherTitleKey", JSON.stringify(teacherTitle));
    localStorage.setItem("teacherDescriptionKey", JSON.stringify(teacherDescription));
    localStorage.setItem("teacherDateKey", JSON.stringify(teacherDate));
    localStorage.setItem("teacherCatagoryKey", JSON.stringify(teacherCatagory));
    localStorage.setItem("teacherClubKey", JSON.stringify(teacherClub));
    localStorage.setItem("teacherTypeKey", JSON.stringify(teacherType));

    localStorage.setItem("grade9Key", JSON.stringify(teacherGrade9T));
    localStorage.setItem("grade10Key", JSON.stringify(teacherGrade10T));
    localStorage.setItem("grade11Key", JSON.stringify(teacherGrade11T));
    localStorage.setItem("grade12Key", JSON.stringify(teacherGrade12T));

    
    alert("Post deleted successfully!"); // ALERT USER OF SUCCESSFUL DELETION
    location.reload(); // RELOAD THE PAGE TO REFLECT THE DELETION
    
}

// EDIT POST FUNCTION
function editPost(index) {
    
    localStorage.setItem("editPostIndex", index);
    window.location.href = "edit_teacher_post_SearchPage.html"; 
}

// CLEAR ALL DATA IN SEARCH TAB FUNCTION
function clearData(searchAnnForm) {
    if (searchAnnForm) {
        searchAnnForm.reset();
        alert("Search data cleared!");
    }
}

function logOut() {
    localStorage.removeItem("loggedInTeacherKey"); // REMOVE THE LOGGED IN TEACHER KEY FROM LOCAL STORAGE
    alert("You have been logged out successfully!"); // ALERT USER OF SUCCESSFUL LOGOUT
    window.location.href = "eduPortal_main_page.html"; // REDIRECT TO MAIN PAGE
}

// DISPLAY ADDITIONAL CHECK FUNCTION ()
    function displayAdditionalCheck(){

    // LOGGING ALL VARIABLES TO CONSOLE FOR ADDITIONAL CHECKS & ENSURING ALL VALUES ARE VALID (CONSOLE LOG --> ADDT. CHECK)

    //LOGGING OF MAIN SEARCHES (TITLE, DESCRIPTION, KEYWORD)
    console.log("mainSearchBarSKey:", mainSearchBarS);
    console.log("studentTitleKey:", studentTitle);
    console.log("studentDescriptionKey:", studentDescription);

    //LOGGING OF GRADES
    console.log("Grade 9 selected:", studentGrade9);
    console.log("Grade 10 selected:", studentGrade10);
    console.log("Grade 11 selected:", studentGrade11);
    console.log("Grade 12 selected:", studentGrade12);

    console.log("Teacher 9T selected:", teacherGrade9T);
    console.log("Teacher 10T selected:", teacherGrade10T);
    console.log("Teacher 11T selected:", teacherGrade11T);
    console.log("Teacher 12T selected:", teacherGrade12T);

    //LOGGING OF STUDENT CLUB + CATAGORY
    console.log("studentCatagoryKey:", studentCatagory);
    console.log("studentClubKey:", studentClub);  

    //LOGGING OF DATES/TIME SEARCHES
    console.log("studentDate1Key:", studentDate1);
    console.log("studentDate2Key:", studentDate2);
    }



/* SOURCES:

- LOCALSTORAGE: https://www.linkedin.com/pulse/how-use-localstorage-store-data-javascript-react-otto-joash

- JSON.PARSE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse

- REGEX FUNCTIONS: /\s+/ ---> THE "/\s+/" REGEX SPLITS THE STRING INTO AN ARRAY BASED ON SPACES, TABS, OR NEWLINES SO THAT THEY CAN EASILY BE COMPARED TO KEY WORDS SEARCHES USING THE SEARCH BAR WITHOUT HAVING TO INPUT THE EXACT TITLES
    // e.g const teacherTitleWords = teacherTitle ? teacherTitle.toLowerCase().split(/\s+/) : ["  "]; // const studentTitleWords = studentTitle ? studentTitle.toLowerCase(/\s+/).split() : ["  "]; --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions

- DATEVALUE: https://support.microsoft.com/en-us/office/datevalue-function-df8b07d4-7761-4a93-bc33-b7471bbff252 (CONVERT HTML DATE TO SERIAL DATES)
    - SERIAL DATES: TO CONVERT ALL HTML DATE VALUES TO SERIAL VALUES (i.e =DATEVALUE("1/1/2008") returns 39448) IN NUMERICAL OUTPUT FOR EASY COMPARISON

- ARROW FUNCTION =>: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions --> SHORTENED FUNCTION DECLARATION


.trim() ---> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
.includes ---> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes --> THIS FUNCTION CHECKS FOR WHETHER THE TEACHER POST INCLUDES ANY SEARCH QUERIES THAT ARE RELATED TO A USER SEARCH/INPUT, ENABLING FOR hasSearchQueryMatch TO BE DECLARED AS TRUE UPON THE CONDIITON ABOVE BEING FULFILLED. 
.forEach ---> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
.split ---> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
.filter --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    // .filter(falseQueries => falseQueries) > REMOVES ALL VALUES FROM NEWLINE ARRAY SPLITS THAT ARE NULL, IRRELEVANT, OR FALSY (i.e. "", null, undef. falsy/false)

.splice --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice --> USED TO REMOVE ITEMS FROM AN ARRAY (I.E. TEACHER POSTS) AT A SPECIFIC INDEX (I.E. POST 3, INDEX 2)

// CAPTURING IMAGE & HOLDING: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/capture
    // https://stackoverflow.com/questions/5802580/html-input-type-file-get-the-image-before-submitting-the-form#:~:text=0-,URL.,This%20code%20works%20for%20me.
    // https://stackoverflow.com/questions/13405129/how-to-get-the-image-file-from-input-type-file-in-javascript


*/





    

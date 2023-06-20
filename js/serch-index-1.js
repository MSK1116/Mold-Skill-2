function performSearch() {
  var query = document.getElementById("searchInput").value.trim();

  if (query === "") {
    displayErrorMessage("Please provide at least one word");
    return;
  }

  try {
    var results = searchFunction(query);
    displayResults(results);
  } catch (error) {
    displayErrorMessage("An error occurred while performing the search.");
    console.error(error);
  }
}

function displayErrorMessage(message) {
  var resultContainer = document.getElementById("searchResults");
  resultContainer.innerHTML = "";

  var errorElement = document.createElement("p");
  errorElement.classList.add("error-message");
  errorElement.textContent = message;
  resultContainer.appendChild(errorElement);
}

function searchFunction(query) {
  var data = [
    // books
    {title: "Concept of Physics-2", url: "Physics Book/Concept of Phy 2.html"},
    {title: "Concept of Physics-1", url: "Physics Book/Concepts Of Phy 1.html"},
    {title: "For the Love of Physics", url: "Physics Book/For the Love of Physics.html"},
    {title: "Introduction to Electrodynamic.", url: "Physics Book/Introduction to Electrodynamics.html"},
    {title: "NCERT Physics-1", url: "Physics Book/NCERT Physics-1.html"},
    {title: "NCERT Physics-2", url: "Physics Book/NCERT Physics-2.html"},
    {title: "Physics Books for grade xi & xii", url: "Physics Book/phy-book.html"},
    {title: "University Physics solution", url: "Physics Book/University Physics solution.html"},
    {title: "University Physics 13 edition", url: "Physics Book/University-Physics-13edt.html"},
    // lab file of grade xi
    {title: "Chemistry Lab file for class 11", url: "1.CHEMISTRY/Grade XI lab file/chm-lab-xi.html"},
    {title: "To separate the volatile and non-volatile substance from mixture of sand and camphor by sublimation.", url: "1.CHEMISTRY/Grade XI lab file/Exp No-1.html"},
    {title: "To seperate the sand and salt from the mixture by filteration.", url: "1.CHEMISTRY/Grade XI lab file/Exp No-2.html"},
    {title: "To seperate the mixture of insoluble solid.", url: "1.CHEMISTRY/Grade XI lab file/Exp No-3.html"},
    {title: "To prepare a saturated solution of impure salt and obtain the pure salt by crystallization.", url: "1.CHEMISTRY/Grade XI lab file/Exp No-4.html"},
    {title: "To neutralize sodium hydroxide with hydrochloric acid and recover crystal of sodium chloride", url: "1.CHEMISTRY/Grade XI lab file/Exp No-5.html"},
    {title: "To test the ferrous ion in the aq solution and oxidize it to ferric ion by redox reaction.", url: "1.CHEMISTRY/Grade XI lab file/Exp No-6.html"},
    {title: "To obtain the pure water from given sampe of impure water by the process of distillation.", url: "1.CHEMISTRY/Grade XI lab file/Exp No-7.html"},
    {title: "To detect the radical present in salt sample by dry & wet test. (a1)", url: "1.CHEMISTRY/Grade XI lab file/Exp No-8.html"},
    {title: "To detect the radical present in salt sample by dry & wet test. (a2)", url: "1.CHEMISTRY/Grade XI lab file/Exp No-9.html"},
    {title: "To detect the radical present in salt sample by dry & wet test. (a3)", url: "1.CHEMISTRY/Grade XI lab file/Exp No-10.html"},
    {title: "To detect the basic radical in the given salt sample by dry & wet test (b1)", url: "1.CHEMISTRY/Grade XI lab file/Exp No-11.html"},
    {title: "To detect the basic radical in the given salt sample by dry & wet test (b2)", url: "1.CHEMISTRY/Grade XI lab file/Exp No-12.html"},
    {title: "To detect the basic radical in the given salt sample by dry & wet test (b3)", url: "1.CHEMISTRY/Grade XI lab file/Exp No-13.html"},
    {title: "To prepare hydrogen gas and study it's properties.", url: "1.CHEMISTRY/Grade XI lab file/Exp No-14.html"},
    {title: "To prepare Ammonia NH3 gas and study it's properties.", url: "1.CHEMISTRY/Grade XI lab file/Exp No-15.html"},
    // practise question of chm-xi
    {title: "Practise Question from states of matter with Numerical for class XI", url: "1.CHEMISTRY/practise question XI/bc-00-chm-1.5.html"},
    {title: "Practise Question from Non-Metal & Metallurgy with Numerical for class XI", url: "1.CHEMISTRY/practise question XI/bc-00-chm-2.6.html"},
    {title: "Practise Question from Periodic Table for class XI", url: "1.CHEMISTRY/practise question XI/bc-00-chm-3.7.html"},
    {title: "Practise Question from Organic Chemistry for class XI", url: "1.CHEMISTRY/practise question XI/bc-00-chm-4.8.html"},
    {title: "HISSAN 2080 chemistry Physics question paper of XI", url: "1.CHEMISTRY/practise question XI/HISSAN-75-chm-xi.html"},
    {title: "Chemistry practise set for class 11.", url: "1.CHEMISTRY/practise question XI/practise-que-chm-xi.html"},
    {title: "Practise set 3 of chemistry [FM:75] based on 1st terminal.", url: "1.CHEMISTRY/practise question XI/tm-75-chm-1.2.html"},
    {title: "Practise set 3 of chemistry [FM:75] based on 2nd terminal.", url: "1.CHEMISTRY/practise question XI/tm-75-chm-2.3.html"},
    {title: "Practise set 1 of chemistry [FM:40] based on class test.", url: "1.CHEMISTRY/practise question XI/wk-40-chm-1.1.html"},
    {title: "Practise set 2 of chemistry [FM:40] based on class test.", url: "1.CHEMISTRY/practise question XI/wk-40-chm-2.4.html"},
    // practise question of mat-xi
    {title: "Math practise set for class 11.", url: "3.MATH/Practise-que-mat-xi/practise-que-mat-xi.html"},
    {title: "HISSAN 2080 math question paper of XI", url: "../../3.MATH/Practise-que-mat-xi/HISSAN-mat-xi.html"},
    {title: "Practise set 3 of math for class-11 by mold skill", url: "3.MATH/Practise-que-mat-xi/st-00-mat-1.3.html"},
    {title: "Practise set 4 of math for class-11 by mold skill", url: "3.MATH/Practise-que-mat-xi/st-00-mat-2.4.html"},
    {title: "Practise set 5 of math for class-11 by mold skill", url: "3.MATH/Practise-que-mat-xi/st-00-mat-3.5.html"},
    {title: "Practise set 1 of math [FM:75] based on 1st terminal.", url: "3.MATH/Practise-que-mat-xi/tm-75-mat-1.1.html"},
    {title: "Practise set 2 of math [FM:75] based on 2nd terminal.", url: "3.MATH/Practise-que-mat-xi/tm-75-mat-2.2.html"},
    // phyics practise question-xi
    {title: "Practise Question from Dimension & Heat with Numerical for class XI", url: "7.PHYSICS/Practise Question XI/bc-00-phy-1.html"},
    {title: "Practise Question from Dimension & Elasticity with Numerical for class XI", url: "7.PHYSICS/Practise Question XI/bc-00-phy-2.html"},
    {title: "Practise Question from heat with Numerical for class XI", url: "7.PHYSICS/Practise Question XI/bc-00-phy-3.html"},
    {title: "Practise Question from vector with Numerical for class XI", url: "7.PHYSICS/Practise Question XI/bc-00-phy-4.html"},
    {title: "Practise Question from optics & electrostatics with Numerical for class XI", url: "7.PHYSICS/Practise Question XI/bc-00-phy-5.html"},
    {title: "Practise Question from projectile with Numerical for class XI", url: "7.PHYSICS/Practise Question XI/bc-00-phy-6.html"},
    {title: "Practise Question from Electric field & potential with Numerical for class XI", url: "7.PHYSICS/Practise Question XI/bc-00-phy-7.html"},
    {title: "Practise Question from Heat with Numerical for class XI", url: "7.PHYSICS/Practise Question XI/bc-00-phy-8.html"},
    {title: "Practise Question from circular motion with Numerical for class XI", url: "7.PHYSICS/Practise Question XI/bc-00-phy-9.html"},
    {title: "HISSAN 2080 question paper of XI", url: "7.PHYSICS/Practise Question XI/HISSAN-75-phy-2.html"},
    {title: "Physics practise set for class 11.", url: "7.PHYSICS/Practise Question XI/Practise-Que-xi.html"},
    {title: "Practise set 3 of physics [FM:75] based on 1st-terminal of grade XI.", url: "7.PHYSICS/Practise Question XI/tm-75-phy-1.html"},
    {title: "Practise set 4 of physics [FM:75] based on 2nd-terminal of grade XI.", url: "7.PHYSICS/Practise Question XI/tm-75-phy-2.html"},
    {title: "Practise set 1 of physics [FM:40] based on class test.", url: "7.PHYSICS/Practise Question XI/wk-40-phy-1.html"},
    {title: "Practise set 2 of physics [FM:40] based on class test.", url: "7.PHYSICS/Practise Question XI/wk-40-phy-2.html"},
    // English & Nepali
    {title: "HISSAN 2080 english question paper of class 11", url: "8.English & Nepali que/English practise que-xi/HISSAN-75-eng-xi.html"},
    {title: "English practise set for class 11.", url: "8.English & Nepali que/English practise que-xi/practise-que-eng-xi.html"},
    {title: "Practise set 2 of english [FM:75] based on terminal exam", url: "8.English & Nepali que/English practise que-xi/tm-75-eng-1.1.html"},
    {title: "Practise set 1 of english [FM:40] based on class test.", url: "8.English & Nepali que/English practise que-xi/wk-40-eng-1.1.html"},
    {title: "HISSAN 2080 nepali question paper for class 11", url: "8.English & Nepali que/Nepali Practise que-xi/HISSAN-75-nep-xi.html"},
    {title: "Nepali practise set for class 11.", url: "8.English & Nepali que/Nepali Practise que-xi/practise-que-nep-xi.html"},
    {title: "Practise set 2 of nepali [FM:75] based on terminal exam", url: "8.English & Nepali que/Nepali Practise que-xi/tm-75-nep-1.1.html"},
    {title: "Practise set 3 of nepali [FM:75] based on terminal exam", url: "8.English & Nepali que/Nepali Practise que-xi/tm-75-nep-2.3.html"},
    {title: "Practise set 1 of nepali [FM:40] based on class test.", url: "8.English & Nepali que/Nepali Practise que-xi/wk-40-nep-1.2.html"},
    {title: "", url: ""},
    // Computer
    {title: "HISSAN 2080 computer question paper for class 11", url: "4.COMPUTER/practise-que-comp-xi/HISSAN-50-comp-xi.html"},
    {title: "Computer practise set for class 11.", url: "4.COMPUTER/practise-que-comp-xi/practise-que-comp-xi.html"},
    {title: "Practise set 2 of computer [FM:50] based on terminal exam", url: "4.COMPUTER/practise-que-comp-xi/tm-50-comp-1.2.html"},
    {title: "Practise set 3 of computer [FM:50] based on terminal exam", url: "4.COMPUTER/practise-que-comp-xi/tm-50-comp-2.3.html"},
    {title: "computer set 1 of computer [FM:40] based on class test.", url: "4.COMPUTER/practise-que-comp-xi/wk-40-comp-1.1.html"},
    {title: "", url: ""},
  ];

  var words = query
    .toLowerCase()
    .split(" ")
    .filter(function (word) {
      return word.length > 0; // Filter out empty words
    });

  var filteredResults = data.filter(function (item) {
    var title = item.title.toLowerCase();

    // Check if all words are present in the title
    return words.every(function (word) {
      return title.includes(word);
    });
  });

  return filteredResults;
}

function displayResults(results) {
  var resultContainer = document.getElementById("searchResults");
  resultContainer.innerHTML = "";

  if (results.length === 0) {
    resultContainer.innerHTML = "No results found. You may refresh the page!";
    return;
  }

  for (var i = 0; i < results.length; i++) {
    var result = results[i];
    var link = document.createElement("a");
    link.href = "../../" + result.url; // Add "../../" before the URL
    link.textContent = result.title;
    link.target = "_blank"; // Open link in a new tab
    resultContainer.appendChild(link);
    resultContainer.appendChild(document.createElement("br"));
    resultContainer.appendChild(document.createElement("br"));
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  var searchForm = document.getElementById("searchForm");
  var searchInput = document.getElementById("searchInput");

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    performSearch();
  });

  searchInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      performSearch();
    }
  });

  var searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    performSearch();
  });
});

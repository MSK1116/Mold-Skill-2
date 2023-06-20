function performSearch() {
  var query = document.getElementById("searchInput").value;
  var results = searchFunction(query);
  displayResults(results);
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
    // lab file
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
  ];

  var filteredResults = data.filter(function (item) {
    return item.title.toLowerCase().includes(query.toLowerCase());
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
    link.href = result.url;
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

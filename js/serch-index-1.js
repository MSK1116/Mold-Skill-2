function performSearch() {
  var query = document.getElementById("searchInput").value;
  var results = searchFunction(query);
  displayResults(results);
}

function searchFunction(query) {
  // books
  var data = [
    {title: "Concept of Physics-2", url: "../../Physics Book/Concept of Phy 2.html"},
    {title: "Concept of Physics-1", url: "../../Physics Book/Concepts Of Phy 1.html"},
    {title: "For the Love of Physics", url: "../../Physics Book/For the Love of Physics.html"},
    {title: "Introduction to Electrodynamic.", url: "../../Physics Book/Introduction to Electrodynamics.html"},
    {title: "NCERT Physics-1", url: "../../Physics Book/NCERT Physics-1.html"},
    {title: "NCERT Physics-2", url: "../../Physics Book/NCERT Physics-2.html"},
    {title: "Physics Books for grade xi & xii", url: "../../Physics Book/phy-book.html"},
    {title: "University Physics solution", url: "../../Physics Book/University Physics solution.html"},
    {title: "University Physics 13 edition", url: "../../Physics Book/University-Physics-13edt.html"},
    // ... more data
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
  var searchForm = document.querySelector(".navbar-search");
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

  var searchButton = document.getElementById("searchDropdown-");
  searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    performSearch();
  });
});

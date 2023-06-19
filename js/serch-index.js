function performSearch() {
  var query = document.getElementById("searchInput").value;
  var results = searchFunction(query);
  displayResults(results);
}

function searchFunction(query) {
  var data = [
    {title: "about Us", url: "about_us.html"},
    {title: "Result 2", url: "https://example.com/result2"},
    {title: "Result 3", url: "https://example.com/result3"},
    {title: "Result 3", url: "https://example.com/result3"},
    {title: "Result 3", url: "https://example.com/result3"},
    {title: "Result 3", url: "https://example.com/result3"},
    {title: "Result 3", url: "https://example.com/result3"},
    {title: "Result 3", url: "https://example.com/result3"},
    {title: "Result 3", url: "https://example.com/result3"},
    {title: "Result 3", url: "https://example.com/result3"},
    {title: "Result 3", url: "https://example.com/result3"},
    {title: "Result 3", url: "https://example.com/result3"},
    {title: "Result 3", url: "https://example.com/result3"},
  ];

  var filteredResults = data.filter(function (item) {
    return item.title.toLowerCase().includes(query.toLowerCase());
  });

  return filteredResults;
}

function displayResults(results) {
  var resultContainer = document.getElementById("searchResults", "searchResultsDropdown");
  resultContainer.innerHTML = "";

  if (results.length === 0) {
    resultContainer.innerHTML = "No results found.";
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
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  document.getElementById("searchInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      performSearch();
    }
  });
});

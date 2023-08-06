var totalPages = 0;
var currentPage = 1;
var pdfInstance = null;
var isLoadingPage = false;
var isScrollEnabled = true;
var batchSize = 9;
var renderedPages = {};
var loadedPages = new Set();

async function renderPDF() {
  const loadingIndicator = document.getElementById("loadingIndicator");
  loadingIndicator.style.display = "block";
  try {
    const loadingTask = pdfjsLib.getDocument(pdfFileURL);
    pdfInstance = await loadingTask.promise;
    totalPages = pdfInstance.numPages;
    document.getElementById("currentPageIndicator").textContent = `Page ${currentPage} of ${totalPages}`;

    // Initialize virtual scrolling by rendering the initial batch of pages
    await renderBatch(currentPage, batchSize);

    // After rendering the initial batch of pages, update the page number input and enable the navigation buttons.
    document.getElementById("pageNumberInput").max = totalPages;
    document.getElementById("nextPageBtn").disabled = false;

    updateToolbarButtons(currentPage, totalPages);
  } catch (error) {
    console.error("Error rendering PDF:", error);
  }
  loadingIndicator.style.display = "none";
}

async function renderBatch(startPage, batchSize) {
  // Show the loading indicator while rendering pages
  const loadingIndicator = document.getElementById("loadingIndicator");
  loadingIndicator.style.display = "block";

  const endPage = Math.min(startPage + batchSize - 1, totalPages);
  for (let i = startPage; i <= endPage; i++) {
    if (!loadedPages.has(i)) {
      if (!renderedPages[i]) {
        await renderPage(i);
      }
      loadedPages.add(i); // Mark the page as loaded
    }
  }

  // If the pages are rendered for the first time, update the current page number and page indicator
  if (Object.keys(renderedPages).length === 0) {
    currentPage = startPage;
    updatePageIndicator();
  }

  // Update the page number input value as well
  const pageNumberInput = document.getElementById("pageNumberInput");
  pageNumberInput.value = currentPage;

  // Hide the loading indicator after rendering pages
  loadingIndicator.style.display = "none";
}

async function renderPage(pageNumber) {
  if (!pdfInstance) {
    return;
  }

  try {
    const page = await pdfInstance.getPage(pageNumber);
    const pdfViewer = document.getElementById("pdfViewer");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const viewport = page.getViewport({scale: 1});
    const scaledViewport = page.getViewport({scale: pdfViewer.offsetWidth / viewport.width});
    canvas.height = scaledViewport.height;
    canvas.width = scaledViewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: scaledViewport,
    };
    await page.render(renderContext).promise;

    canvas.setAttribute("id", `page_${pageNumber}`);
    canvas.style.cursor = "pointer"; // Add a pointer cursor to indicate clickability
    pdfViewer.appendChild(canvas);

    // Store the rendered page in the dictionary for future reference
    renderedPages[pageNumber] = canvas;

    // Add a click event listener to the canvas element to view the page in a popup
    canvas.addEventListener("click", function () {
      viewPageInPopup(pageNumber);
    });
  } catch (error) {
    console.error("Error rendering page:", error);
  }
}

async function viewPageInPopup(pageNumber) {
  if (!pdfInstance) {
    return;
  }

  const canvas = renderedPages[pageNumber];
  const originalViewport = canvas.pageOriginalViewport || (await pdfInstance.getPage(pageNumber)).getViewport({scale: 1});

  const modal = document.getElementById("pdfModal");
  const modalCanvas = document.getElementById("modalCanvas");
  modalCanvas.height = originalViewport.height;
  modalCanvas.width = originalViewport.width;

  const context = modalCanvas.getContext("2d");
  const renderContext = {
    canvasContext: context,
    viewport: originalViewport,
  };
  canvas.pageOriginalViewport = originalViewport; // Store the original viewport to avoid repeated rendering
  await (await pdfInstance.getPage(pageNumber)).render(renderContext).promise;

  modal.style.display = "block";
  modal.addEventListener("click", closeModal);
}

function closeModal() {
  const modal = document.getElementById("pdfModal");
  modal.style.display = "none";
  modal.removeEventListener("click", closeModal);
}

function updateCurrentPageFromScroll(pdfViewer) {
  // Update the current page number only if virtual scrolling is enabled
  if (isScrollEnabled) {
    const pageHeight = pdfViewer.firstElementChild.offsetHeight;
    const scrollPage = Math.ceil(pdfViewer.scrollTop / pageHeight) + 1;

    // Check if the scrollPage is within the valid range
    if (scrollPage >= 1 && scrollPage <= totalPages) {
      currentPage = scrollPage;
      updatePageIndicator();
    }
  }
}

function updatePageIndicator() {
  document.getElementById("currentPageIndicator").textContent = `Page ${currentPage} of ${totalPages}`;
}

function updateToolbarButtons(pageNumber, totalPages) {
  const prevPageBtn = document.getElementById("prevPageBtn");
  const nextPageBtn = document.getElementById("nextPageBtn");

  nextPageBtn.disabled = pageNumber >= totalPages;
}

async function goToPrevPage() {
  if (currentPage > 1) {
    currentPage--;
    updatePageIndicator();
    const pdfViewer = document.getElementById("pdfViewer");
    pdfViewer.scrollTo(0, pdfViewer.firstElementChild.offsetHeight * (currentPage - 1));
    await renderBatch(currentPage, batchSize);
  }
}

async function goToNextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    updatePageIndicator();
    const pdfViewer = document.getElementById("pdfViewer");
    pdfViewer.scrollTo(0, pdfViewer.firstElementChild.offsetHeight * (currentPage - 1));
    await renderBatch(currentPage + 1, batchSize);
  }
}

async function goToPage() {
  const pageNumberInput = document.getElementById("pageNumberInput");
  const pageNumber = parseInt(pageNumberInput.value);

  if (pageNumber >= 1 && pageNumber <= totalPages) {
    currentPage = pageNumber;
    updatePageIndicator();

    // Check if the page is already rendered, if not, render it first
    if (!renderedPages[currentPage]) {
      await renderPage(currentPage);
    }

    // Scroll to the selected page after rendering it
    const pdfViewer = document.getElementById("pdfViewer");
    pdfViewer.scrollTo(0, pdfViewer.firstElementChild.offsetHeight * (currentPage - 1));
  }
}

function unloadPages(startPage, endPage) {
  for (let i = startPage; i <= endPage; i++) {
    if (!loadedPages.has(i)) {
      if (renderedPages[i]) {
        const pdfViewer = document.getElementById("pdfViewer");
        pdfViewer.removeChild(renderedPages[i]);
        delete renderedPages[i];
      }
    }
  }
}

document.getElementById("prevPageBtn").addEventListener("click", goToPrevPage);
document.getElementById("nextPageBtn").addEventListener("click", goToNextPage);
document.getElementById("pageNumberInput").addEventListener("change", goToPage);
const pdfViewer = document.getElementById("pdfViewer");
pdfViewer.addEventListener("scroll", function () {
  if (!isScrollEnabled) {
    return; // Skip scroll handling if scrolling is disabled
  }

  const scrollPos = pdfViewer.scrollTop + pdfViewer.offsetHeight;
  const totalHeight = pdfViewer.scrollHeight;

  // Check if the page is already being loaded to prevent triggering the function again
  if (!isLoadingPage && scrollPos >= totalHeight) {
    goToNextPage();
  }

  // Update the current page number based on the scroll position
  updateCurrentPageFromScroll(pdfViewer);
});

// Render the initial PDF when the window is loaded
window.addEventListener("load", function () {
  renderPDF();
});

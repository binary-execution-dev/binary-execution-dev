function generateBinaryForViewport() {
  const lineHeight = 20; // in pixels
  const textWidth = 8.5; // in pixels

  const height = window.innerHeight;
  const width = window.innerWidth;

  console.log(`Viewport size: ${width}px x ${height}px`);

  const cols = Math.floor(width / textWidth);
  const rows = Math.floor(height / lineHeight);

  console.log(`Generating binary for ${cols} cols and ${rows} rows`);

  let output = "";

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      output += Math.random() > 0.5 ? "1" : "0";
    }
  }

  return output;
}

function generateBinary() {
  return generateBinaryForViewport();
}

function updateBinary() {
  const binaryContent = generateBinary();
  document.documentElement.style.setProperty("--binary", `"${binaryContent}"`);
}

updateBinary();
window.addEventListener("resize", () => {
  updateBinary();
});

const dialog = document.getElementById("userTypeDialog");
const mainContainer = document.getElementById("main-container");
const servicesContainer = document.getElementById("services");

window.addEventListener("load", () => {
  const storedUserType = localStorage.getItem("userType");

  if (storedUserType) {
    mainContainer.style.filter = "none";
    loadServices(storedUserType);
  } else {
    dialog.showModal();
  }
});

dialog.querySelectorAll(".dialog-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    console.log(e.target.dataset.type);
    const userType = e.target.dataset.type;
    localStorage.setItem("userType", userType);

    dialog.close();

    mainContainer.style.filter = "none";
    loadServices(userType);
  });
});

// Load services based on user type
function loadServices(type) {
  const services = type === "developer" ? developerServices : businessServices;

  servicesContainer.innerHTML = services
    .map(
      (service) => `
      <a 
        href="mailto:binary.execution.dev?subject=${encodeURIComponent(service.subject)}&body=${encodeURIComponent(service.description)}" 
        class="service-btn"
      >
        ${service.title}
      </a>
    `,
    )
    .join("");
}

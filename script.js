function getEmSize() {
  const el = document.createElement("div");
  el.style.width = "1em";
  el.style.position = "absolute";
  el.style.visibility = "hidden";
  document.body.appendChild(el);
  const em = el.offsetWidth;
  el.remove();
  return em * 0.5;
}

function generateBinaryForViewport() {
  const em = getEmSize();
  const lineHeight = em * 1.2;

  const cols = Math.floor(window.innerWidth / em);
  const rows = Math.floor(window.innerHeight / lineHeight);

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
  //   console.log(binaryContent);
  document.documentElement.style.setProperty("--binary", `"${binaryContent}"`);
}

updateBinary();

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
        href="mailto:binary.execution.dev@gmail.com?subject=${encodeURIComponent(service.subject)}&body=${encodeURIComponent(service.description)}" 
        class="service-btn"
      >
        ${service.title}
      </a>
    `,
    )
    .join("");
}

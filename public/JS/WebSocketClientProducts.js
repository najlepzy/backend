const socket = io("http://localhost:8081");

socket.emit("on_connect", "Client online");

socket.on("message", (data) => {
  console.log(data);
});
socket.on("create_ok", (response) => {
  let productList = document.getElementById("productList");
  productList.innerHTML += `<li class="productItem" key="${response.product.id}" >${response.product.title}
      <img class="Products" alt="img-product" />
    </li>`;
});
const form = document.getElementById("add");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const textInput = document.getElementById("text").value;
  console.log(textInput);
  /* create */
  socket.emit("create_product", { title: textInput });
  /* create */
  form.reset();
});
/* delete */
const remove = document.getElementById("remove");
remove.addEventListener("submit", function (event) {
  event.preventDefault();
  const textInput = document.getElementById("removeField").value;
  console.log(textInput);
  socket.emit("delete_product", { product: parseInt(textInput) });
  remove.reset();
  console.log("removed");
  let elementProducts = document.getElementsByClassName("productItem");
  const elementsArray = Array.prototype.slice.call(elementProducts);
  let foundProduct = elementsArray.find(
    (e) => e.attributes.key.value == textInput
  );
  console.log(foundProduct);
  foundProduct.remove();
});
/* delete */

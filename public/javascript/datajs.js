
  const updateButtons = document.querySelectorAll(".update-btn");
  const updateModal = document.getElementById("updateModal");
  const closeUpdateModal = document.getElementById("closeUpdateModal");

  updateButtons.forEach(button => {
    button.addEventListener("click", () => {
      document.getElementById("updateId").value = button.dataset.id;
      document.getElementById("updateName").value = button.dataset.name;
      document.getElementById("updateEmail").value = button.dataset.email;
      document.getElementById("updatePhone").value = button.dataset.phone;
      document.getElementById("updateAddress").value = button.dataset.address;
      document.getElementById("updateFood").value = button.dataset.food;
      document.getElementById("updateType").value = button.dataset.type;
      document.getElementById("updateQuantity").value = button.dataset.quantity;
      document.getElementById('updateDelivery').value = button.dataset.delivery;
      document.getElementById("updateStatus").value = button.dataset.status;

      updateModal.classList.remove("hidden");
    });
  });

  closeUpdateModal.addEventListener("click", () => {
    updateModal.classList.add("hidden");
  });

  // AJAX Form Submit
  document.getElementById("updateForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("updateId").value;

    const data = {
      donorName: document.getElementById("updateName").value,
      email: document.getElementById("updateEmail").value,
      phone: document.getElementById("updatePhone").value,
      address: document.getElementById("updateAddress").value,
      foodName: document.getElementById("updateFood").value,
      foodType: document.getElementById("updateType").value,
      quantity: document.getElementById("updateQuantity").value,
      status: document.getElementById("updateStatus").value,
      deliverystatus:document.getElementById("updateDelivery").value
    };

    const res = await fetch(`/donate/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if (result.success) {
      alert("Donation updated successfully!");
      location.reload();
    } else {
      alert("Update failed: " + result.message);
    }
  });



  const deleteButtons = document.querySelectorAll('.delete-btn');

  deleteButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const confirmDelete = confirm("Are you sure you want to delete this donation?");
      if (!confirmDelete) return;

      const id = button.dataset.id;

      try {
        const res = await fetch(`/donate/delete/${id}`, {
          method: 'DELETE'
        });

        const result = await res.json();

        if (result.success) {
          alert("Donation deleted successfully!");
          button.closest('tr').remove(); // Remove the row from table
        } else {
          alert("Failed to delete: " + result.message);
        }
      } catch (err) {
        alert("Error occurred while deleting.");
        console.error(err);
      }
    });
  });


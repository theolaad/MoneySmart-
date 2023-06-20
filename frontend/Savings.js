// Get the modal element
var modal = document.getElementById("modal-container");

// Get the button that opens the modal
var btn = document.getElementsByTagName("button")[0];

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

const saveBtn = document.getElementById("save-btn");

const savingsTable = document.getElementById("savings-table")

// When the user clicks on the button, open the modal
function openModal() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function closeModal() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      closeModal();
    }
  }
  
  
  
  // function to add expense to the table
  function addSavingsToTable(date, category, description, amount) {
      const newRow = savingsTable.insertRow();
    
      const dateCell = newRow.insertCell();
      dateCell.innerText = date;
    
      const categoryCell = newRow.insertCell();
      categoryCell.innerText = category;
    
      const descriptionCell = newRow.insertCell();
      descriptionCell.innerText = description;
    
      const amountCell = newRow.insertCell();
      amountCell.innerText = amount;
    }
  
    // Add naira sign to amount in modal
    const amountInput = document.getElementById("amount");
    const formattedAmount = "₦" + amountInput.value;
    amountInput.value = formattedAmount;
  
    // Add naira sign to amount in table
    const amountCells = document.querySelectorAll("#savings-table td:nth-child(4)");
  amountCells.forEach(cell => {
    const amount = cell.textContent;
    const formattedAmount = "₦" + amount;
    cell.textContent = formattedAmount;
  });
  
    // event listener for save button
    saveBtn.addEventListener("click", function(event) {
      event.preventDefault(); // prevent form submission
    
      const date = document.getElementById("date").value;
      const category = document.getElementById("category").value;
      const description = document.getElementById("description").value;
      const amount = document.getElementById("amount").value;
    
      // add expense to the table
      addSavingsToTable(date, category, description, amount);
  
      
    
      // close the modal
      closeModal();
    });
    
    // function to close the modal
    function closeModal() {
      modal.style.display = "none";
    }
  
  const filterDropdown = document.querySelector('.filter-dropdown');
  filterDropdown.addEventListener('change', filterTable);
  
  function filterTable() {
      const dateRange = document.getElementById('date-range').value;
      const savingsCategory = document.getElementById('savings-category').value;
      const searchBar = document.getElementById('search-bar').value.toLowerCase();
    
      const rows = document.querySelectorAll('#savings-table tbody tr');
    
      rows.forEach(row => {
        const date = row.querySelector('td:nth-child(1)').textContent;
        const category = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const description = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
        const amount = row.querySelector('td:nth-child(4)').textContent;
    
        if ((dateInRange(date, dateRange) || dateRange === 'all') &&
            (savingsCategory === 'all' || category.includes(savingsCategory)) &&
            (description.includes(searchBar) || searchBar === '')) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    }
  
    window.addEventListener('load', filterTable);
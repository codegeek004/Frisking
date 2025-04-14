
// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  
  // Set current year in footer
  document.querySelectorAll('#currentYear').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
  
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('show');
    });
  }
  
  // Scroll to features section when "Learn More" is clicked
  const learnMoreBtn = document.getElementById('learnMoreBtn');
  const featuresSection = document.getElementById('features');
  
  if (learnMoreBtn && featuresSection) {
    learnMoreBtn.addEventListener('click', () => {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
  
  // Toggle login/logout state
  const loginBtns = document.querySelectorAll('#loginBtn, #mobileLoginBtn');
  
  loginBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isLoggedIn = btn.textContent.trim() === 'Logout';
      
      loginBtns.forEach(button => {
        button.textContent = isLoggedIn ? 'Login' : 'Logout';
      });
    });
  });
  
  // Tab functionality for demo page
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      
      // Update active tab button
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Update active tab pane
      tabPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === tabId) {
          pane.classList.add('active');
        }
      });
    });
  });
  
  // File upload functionality
  setupFileUpload('object-frisking', true);
  setupFileUpload('gender-detection', false);
  setupFileUpload('sign-recognition', false);
  
  function setupFileUpload(id, isVideo) {
    const uploadArea = document.getElementById(`${id}-upload`);
    const fileInput = document.getElementById(`${id}-input`);
    const preview = document.getElementById(`${id}-preview`);
    const filename = document.getElementById(`${id}-filename`);
    const uploadPrompt = uploadArea?.querySelector('.upload-prompt');
    const uploadPreview = uploadArea?.querySelector('.upload-preview');
    const processBtn = uploadArea?.querySelector('.process-btn');
    const resultContainer = document.getElementById(`${id}-result`);
    const clearBtn = uploadArea?.querySelector('.clear-file-btn');
    
    if (!uploadArea || !fileInput || !preview || !filename || !uploadPrompt || !uploadPreview || !processBtn || !resultContainer || !clearBtn) return;
    
    // Handle click on upload area
    uploadArea.addEventListener('click', (e) => {
      if (uploadPrompt.contains(e.target) || e.target === uploadArea) {
        fileInput.click();
      }
    });
    
    // Handle file selection
    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files[0]) {
        handleFile(fileInput.files[0]);
      }
    });
    
    // Handle drag and drop
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('dragging');
    });
    
    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('dragging');
    });
    
    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('dragging');
      
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    });
    
    // Handle file selection and preview
    function handleFile(file) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (isVideo) {
          preview.src = e.target.result;
        } else {
          preview.src = e.target.result;
        }
        
        filename.textContent = file.name;
        uploadPrompt.classList.add('hidden');
        uploadPreview.classList.remove('hidden');
        resultContainer.classList.add('hidden');
      };
      
      reader.readAsDataURL(file);
    }
    
    // Handle process button click (simulated processing)
    processBtn.addEventListener('click', () => {
      processBtn.textContent = 'Processing...';
      processBtn.disabled = true;
      
      // Simulate processing delay
      setTimeout(() => {
        processBtn.textContent = isVideo ? 'Process Video' : 'Process Image';
        processBtn.disabled = false;
        resultContainer.classList.remove('hidden');
      }, 2000);
    });
    
    // Handle clear button click
    clearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      
      preview.src = '';
      filename.textContent = '';
      uploadPrompt.classList.remove('hidden');
      uploadPreview.classList.add('hidden');
      resultContainer.classList.add('hidden');
      fileInput.value = '';
    });
  }
});

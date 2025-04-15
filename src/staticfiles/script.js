// Main JavaScript for AI Security Vista

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather Icons if available
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // Feature card click functionality
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', () => {
            const feature = card.getAttribute('data-feature');
            toggleFeatureDetails(feature);
        });
    });

    // Helper function to toggle feature details visibility
    function toggleFeatureDetails(featureId) {
        const allFeatures = ['gender', 'sign'];
        const clickedFeature = document.getElementById(`${featureId}-feature`);
        
        if (!clickedFeature) return;

        const isHidden = clickedFeature.classList.contains('hidden');
        
        // Hide all features first
        allFeatures.forEach(feature => {
            const element = document.getElementById(`${feature}-feature`);
            if (element) {
                element.classList.add('hidden');
            }
        });

        // Show clicked feature if it was hidden
        if (isHidden) {
            clickedFeature.classList.remove('hidden');
            // Add a nice entrance animation
            clickedFeature.classList.add('fade-in');
            // Scroll to the feature details
            clickedFeature.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Handle form submissions with basic validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            // Prevent actual form submission in this demo
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredInputs = form.querySelectorAll('[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('border-red-500');
                } else {
                    input.classList.remove('border-red-500');
                }
            });

            if (isValid) {
                // Show a success message or redirect in a real application
                console.log('Form submitted successfully');
            }
        });
    });
});

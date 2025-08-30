// Main verification page JavaScript functionality

let currentProductCode = '';

// Initialize the verification page
document.addEventListener('DOMContentLoaded', function() {
    // Get product code from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    currentProductCode = (urlParams.get('c') || '').trim();
    const autoVerify = (urlParams.get('auto') || '') === '1';

    // Display the product code
    const codeEl = document.getElementById('productCodeDisplay');
    if (codeEl) codeEl.textContent = currentProductCode || '';

    // Add loading animation to verify button (supports both layouts)
    const verifyBtns = document.querySelectorAll('.verify-btn, .authbutton');
    if (verifyBtns && verifyBtns.length) {
        verifyBtns.forEach((btn) => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                this.style.opacity = '0.7';
                this.textContent = 'VERIFYING...';
                verifyProduct();
            });
        });
    }

    // Shop Now and Learn More buttons now open in new tabs - no modal needed

    // Auto-verify only when explicitly requested via ?auto=1
    if (currentProductCode && autoVerify) {
        // Simulate button state if present
        const firstBtn = document.querySelector('.verify-btn, .authbutton');
        if (firstBtn) {
            firstBtn.style.opacity = '0.7';
            firstBtn.textContent = 'VERIFYING...';
        }
        verifyProduct();
    }
});

// Inline render container
function renderInlineContainer() {
    const section = document.getElementById('authresponse');
    if (!section) return null;
    section.style.display = 'block';
    return section;
}

function renderInlineSuccess(product) {
    const section = renderInlineContainer();
    if (!section) return;
    const productName = (product && product.name) || 'GAT Sport product';
    const imageUrl = product && product.imageUrl;

    const circleContent = imageUrl
        ? `<img id="guillocheImage" src="${imageUrl}" alt="Guilloche" style="width:260px;height:260px;border-radius:50%;object-fit:cover;box-shadow:0 0 0 6px #000 inset;">`
        : `<div id="guillochePattern" style="width:260px;height:260px;border-radius:50%;box-shadow:0 0 0 2px #eee inset;"></div>`;

    section.innerHTML = `
<input id="ResultCode" name="ResultCode" type="hidden" value="${currentProductCode}">
<div class="container">
  <div class="row">
    <div id="authoutcome" class="validcontainer" data-result="valid" data-product="${productName}" style="display:block;">
      <div class="col-xs-12">
        <h2 class="page-header text-center margin-top-20" style="margin-top:34px;margin-bottom:6px;">Result for '${currentProductCode}'</h2>
        <h2 class="text-center" style="color:#296829">✓</h2>
        <h2 class="text-center" style="color:#296829"><strong>YOUR PRODUCT IS AUTHENTIC</strong></h2>
        <p class="text-center"><span style="font-size:18px">Thank you for your purchase of a genuine GAT Sport product</span></p>
        <p class="text-center" style="color:rgba(31,53,90,1)"><span style="font-size:24px"><strong>THIS CODE IS ASSOCIATED WITH A GUILLOCHE IMAGE</strong></span></p>
        <p class="text-center"><span style="font-size:16px"><strong>PLEASE SCROLL DOWN TO COMPARE THE IMAGE ON YOUR PHONE WITH THE ONE ON THE PRODUCT</strong></span></p>
      </div>
      <div class="col-sm-12"><hr></div>
      <div class="col-sm-12">
        <h2 class="page-header text-center" style="margin-top:10px;margin-bottom:18px;"><span>Product Details</span></h2>
      </div>
      <div class="col-sm-12 text-center" style="margin-bottom:16px;">
        <a href="https://gatsport.com/collections/essentials" target="_blank" id="moreInfoBtn" class="btn btn-primary">More product information</a>
      </div>
      <div class="col-sm-12"><hr></div>
      <div class="row" style="margin-top:28px;">
        <div class="col-md-6" style="padding-right:22px;">
          <h2 class="page-header text-center"><span>This code is associated with a Guilloche image</span></h2>
          <p>As an additional step, please check that your Guilloche image is a match on your bottle to authenticate your GAT Sport product.</p>
          <p>Thank you for verifying your purchase.</p>
        </div>
        <div class="col-md-6 padding-10" style="display:flex;align-items:center;justify-content:center;">${circleContent}</div>
      </div>
    </div>
  </div>
</div>`;

    if (!imageUrl) {
        generateGuillochePattern(currentProductCode);
    }

    // More Product Information button now opens in new tab - no modal needed
}

function renderInlineError(message) {
    const section = renderInlineContainer();
    if (!section) return;
    section.innerHTML = `
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <h2 class="page-header text-center margin-top-20">Result for '${currentProductCode}'</h2>
      <h2 class="text-center" style="color:#dc3545">✗</h2>
      <h2 class="text-center" style="color:#dc3545"><strong>INVALID PRODUCT CODE</strong></h2>
      <p class="text-center">${message || 'Please check the code and try again.'}</p>
    </div>
  </div>
</div>`;
}

// Verify the product
async function verifyProduct() {
    const verifyBtn = document.querySelector('.verify-btn, .authbutton');
    try {
        if (!currentProductCode) {
            if (verifyBtn) {
                verifyBtn.style.opacity = '1';
                verifyBtn.textContent = 'VERIFY MY PRODUCT';
            }
            renderInlineError('No code provided. Please scan the QR code on your product.');
            return;
        }
        const response = await fetch('/api/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: currentProductCode })
        });
        const data = await response.json();

        if (verifyBtn) {
            verifyBtn.style.opacity = '1';
            verifyBtn.textContent = 'VERIFY MY PRODUCT';
        }

        if (data && data.success) {
            renderInlineSuccess(data.product || {});
            // Reveal GAT Gear section after successful verification
            const gearSection = document.getElementById('section_utility1');
            if (gearSection) gearSection.style.display = 'block';
            const aboutSection = document.getElementById('section_utility2');
            if (aboutSection) aboutSection.style.display = 'block';
        } else {
            renderInlineError((data && data.message) || 'Invalid product code.');
        }
    } catch (error) {
        console.error('Error verifying product:', error);
        if (verifyBtn) {
            verifyBtn.style.opacity = '1';
            verifyBtn.textContent = 'VERIFY MY PRODUCT';
        }
        renderInlineError('Network error. Please try again.');
    }
}

// Legacy modal helpers (fallback)
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (!modal) return;
    modal.style.display = 'flex';
    generateGuillochePattern(currentProductCode);
    setTimeout(() => {
        const mc = modal.querySelector('.modal-content');
        if (mc) {
            mc.style.transform = 'scale(1)';
            mc.style.opacity = '1';
        }
    }, 10);
}

function showErrorModal(message) {
    const modal = document.getElementById('errorModal');
    if (!modal) return;
    const errorMessage = modal.querySelector('.error-message');
    if (errorMessage) errorMessage.textContent = message || 'Error';
    modal.style.display = 'flex';
    setTimeout(() => {
        const mc = modal.querySelector('.modal-content');
        if (mc) {
            mc.style.transform = 'scale(1)';
            mc.style.opacity = '1';
        }
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (!modal) return;
    const mc = modal.querySelector('.modal-content');
    if (mc) {
        mc.style.transform = 'scale(0.8)';
        mc.style.opacity = '0';
    }
    setTimeout(() => { modal.style.display = 'none'; }, 300);
}

function closeErrorModal() {
    const modal = document.getElementById('errorModal');
    if (!modal) return;
    const mc = modal.querySelector('.modal-content');
    if (mc) {
        mc.style.transform = 'scale(0.8)';
        mc.style.opacity = '0';
    }
    setTimeout(() => { modal.style.display = 'none'; }, 300);
}

// Generate unique guilloche pattern based on product code
function generateGuillochePattern(code) {
    const pattern = document.getElementById('guillochePattern');
    if (!pattern) return;

    // Create a hash from the product code to generate consistent colors
    let hash = 0;
    for (let i = 0; i < code.length; i++) {
        const char = code.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }

    // Generate colors based on hash
    const absHash = Math.abs(hash);
    const colors = [
        `hsl(${absHash % 360}, 70%, 60%)`,
        `hsl(${(absHash + 60) % 360}, 70%, 60%)`,
        `hsl(${(absHash + 120) % 360}, 70%, 60%)`,
        `hsl(${(absHash + 180) % 360}, 70%, 60%)`,
        `hsl(${(absHash + 240) % 360}, 70%, 60%)`,
        `hsl(${(absHash + 300) % 360}, 70%, 60%)`
    ];

    // Apply colors to pattern
    pattern.style.background = `conic-gradient(from 0deg, ${colors.join(', ')})`;
    const speed = 10 + (absHash % 10);
    pattern.style.animation = `rotate ${speed}s linear infinite`;
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const successModal = document.getElementById('successModal');
    const errorModal = document.getElementById('errorModal');
    if (successModal && event.target === successModal) closeModal();
    if (errorModal && event.target === errorModal) closeErrorModal();
});

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
        closeErrorModal();
    }
});



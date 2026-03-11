// Aguarda o carregamento
document.addEventListener('DOMContentLoaded', () => {
    if (typeof UIBuilder !== 'undefined') {
        UIBuilder.buildApp();
    }
    nav('home'); // Inicia na tela inicial
});

// --- ROTEADOR SPA ---
window.nav = function(viewId) {
    document.querySelectorAll('.page-view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(n => { 
        n.classList.remove('bg-gray-800', 'text-white', 'border-accent'); 
        if(!n.classList.contains('pl-10')) {
            n.classList.add('border-transparent'); 
        }
    });
    
    const targetView = document.getElementById('view-' + viewId);
    if(targetView) targetView.classList.add('active');
    
    let link = document.getElementById('nav-' + viewId);
    if(link) { 
        link.classList.add('text-white'); 
        if(!link.classList.contains('pl-10')){ 
            link.classList.add('bg-gray-800', 'border-accent'); 
            link.classList.remove('border-transparent'); 
        } else { 
            link.style.borderColor = "var(--accent)"; 
        } 
    }
    document.getElementById('main-scroll').scrollTop = 0;
};

// --- CONTROLE DE ABAS ---
window.tab = function(aulaId, tabName) {
    document.querySelectorAll(`[id^="pane-${aulaId}"]`).forEach(c => c.classList.remove('active'));
    document.querySelectorAll(`[id^="btn-${aulaId}"]`).forEach(b => { 
        b.classList.remove('active'); 
    });
    
    document.getElementById(`pane-${aulaId}-${tabName}`).classList.add('active');
    
    let activeBtn = document.getElementById(`btn-${aulaId}-${tabName}`);
    if(activeBtn) {
        activeBtn.classList.add('active');
        if(document.getElementById(`view-${aulaId}`)) {
            activeBtn.style.borderColor = "var(--accent)";
        }
    }
};

// --- ÁREA DE TRANSFERÊNCIA & TOAST ---
window.copyC = function(btn) {
    let codeBlock = btn.parentElement.querySelector('pre code') || btn.parentElement.querySelector('pre');
    navigator.clipboard.writeText(codeBlock.innerText).then(() => { 
        showToast('Código copiado com sucesso!');
        let orig = btn.innerText; 
        btn.innerText = 'Copiado!'; 
        btn.style.background = '#28a745'; 
        btn.style.borderColor = '#28a745';
        setTimeout(() => { 
            btn.innerText = orig; 
            btn.style.background = ''; 
            btn.style.borderColor = ''; 
        }, 2000); 
    });
};

function showToast(message) {
    let container = document.getElementById('toast-container');
    if(!container) return; // Fail-safe
    
    let toast = document.createElement('div');
    toast.className = 'bg-gray-900 text-white px-6 py-3 rounded-lg shadow-xl border-l-4 border-accent flex items-center gap-3 transform translate-x-full transition-transform duration-300';
    toast.innerHTML = `
        <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        <span class="font-semibold text-sm">${message}</span>
    `;
    container.appendChild(toast);
    
    requestAnimationFrame(() => {
        toast.classList.remove('translate-x-full');
        toast.classList.add('translate-x-0');
    });

    setTimeout(() => {
        toast.classList.remove('translate-x-0');
        toast.classList.add('translate-x-full');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- ACORDEÃO ---
window.toggleA = function(btn) {
    let panel = btn.nextElementSibling; 
    let allPanels = document.querySelectorAll('.acc-content');
    
    if (panel.style.maxHeight) { 
        panel.style.maxHeight = null; 
        btn.querySelector('span').innerText = '+'; 
        btn.classList.remove('active'); 
    } else { 
        allPanels.forEach(a => { 
            a.style.maxHeight = null; 
            a.previousElementSibling.querySelector('span').innerText = '+'; 
            a.previousElementSibling.classList.remove('active'); 
        }); 
        panel.style.maxHeight = panel.scrollHeight + "px"; 
        btn.querySelector('span').innerText = '-'; 
        btn.classList.add('active'); 
    }
};

// --- MOTOR DE AVALIAÇÃO (QUIZZES) ---
window.evalQ = function(formId, resultId) {
    let form = document.getElementById(formId); 
    let questions = form.querySelectorAll('.quiz-question'); 
    let acertos = 0; 
    let total = questions.length;

    questions.forEach(q => {
        let labels = q.querySelectorAll('label'); 
        let radios = q.querySelectorAll('input[type="radio"]'); 
        let respondida = false;
        
        labels.forEach(l => l.classList.remove('correct-answer', 'wrong-answer'));

        radios.forEach((radio, i) => {
            if(radio.checked) { 
                respondida = true; 
                if(radio.value === 'correct') { 
                    acertos++; 
                    labels[i].classList.add('correct-answer'); 
                } else { 
                    labels[i].classList.add('wrong-answer'); 
                    radios.forEach((rx, j) => { 
                        if(rx.value === 'correct') labels[j].classList.add('correct-answer'); 
                    }); 
                } 
            }
        });
        
        if(!respondida) {
            radios.forEach((rx, j) => { 
                if(rx.value === 'correct') labels[j].classList.add('correct-answer'); 
            });
        }
    });

    let resDiv = document.getElementById(resultId); 
    resDiv.classList.remove('hidden'); 
    let pct = (acertos / total) * 100;
    
    if(pct === 100) { 
        resDiv.className = "mt-6 p-5 rounded-lg text-center bg-green-100 text-green-800 border border-green-300 flex flex-col items-center gap-2 shadow-sm"; 
        resDiv.innerHTML = `<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg> <span class="font-bold text-lg">Excelente! Certificação Aprovada: ${acertos}/${total} acertos.</span>`; 
    } else { 
        resDiv.className = "mt-6 p-5 rounded-lg text-center bg-red-50 text-red-800 border border-red-200 flex flex-col items-center gap-2 shadow-sm"; 
        resDiv.innerHTML = `<svg class="w-10 h-10 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg> <span class="font-bold text-lg">Revise o conteúdo. Você acertou ${acertos} de ${total} (${pct}%).</span>`; 
    }
};

// --- MOTOR 3D FLASHCARDS ---
window.flipC = function(faceElement) { 
    // Procura para cima quem é o container real que gira (.card-inner)
    let card = faceElement.closest('.fc-card');
    if (card) {
        let inner = card.querySelector('.card-inner');
        if (inner) {
            inner.classList.add('rotate-y-180');
        }
    }
};

window.closeC = function(event, btnElement) { 
    event.stopPropagation(); 
    let card = btnElement.closest('.fc-card');
    if (card) {
        let inner = card.querySelector('.card-inner');
        if (inner) {
            inner.classList.remove('rotate-y-180');
            
            // Reseta o carrossel no verso, garantindo que volte pro slide 1 silenciosamente
            setTimeout(() => {
                let track = inner.querySelector('.carousel-track'); 
                if(track) {
                    track.dataset.current = "0"; 
                    track.style.transform = `translateX(0%)`;
                    const slidesCount = track.querySelectorAll('.slide').length;
                    
                    let ind = inner.querySelector('.slide-indicator');
                    if (ind) ind.innerText = `1 / ${slidesCount}`;
                    
                    let bPrev = inner.querySelector('.btn-prev');
                    let bNext = inner.querySelector('.btn-next');
                    if (bPrev) bPrev.disabled = true; 
                    if (bNext) bNext.disabled = false;
                }
            }, 700);
        }
    }
};

// --- MOTOR DO CARROSSEL ---
window.moveSlide = function(btnElement, direction) {
    let cardBack = btnElement.closest('.fc-back'); 
    if (!cardBack) return;
    
    let track = cardBack.querySelector('.carousel-track'); 
    let slides = track.querySelectorAll('.slide');
    let indicator = cardBack.querySelector('.slide-indicator'); 
    let btnPrev = cardBack.querySelector('.btn-prev'); 
    let btnNext = cardBack.querySelector('.btn-next');
    
    let currentIndex = parseInt(track.dataset.current || 0); 
    currentIndex += direction;
    
    if (currentIndex < 0) currentIndex = 0; 
    if (currentIndex >= slides.length) currentIndex = slides.length - 1;

    track.dataset.current = currentIndex; 
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    if(indicator) indicator.innerText = `${currentIndex + 1} / ${slides.length}`; 
    if(btnPrev) btnPrev.disabled = currentIndex === 0; 
    if(btnNext) btnNext.disabled = currentIndex === slides.length - 1;
};
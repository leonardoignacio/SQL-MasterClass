// Aguarda o carregamento do DOM para iniciar a fábrica de componentes
document.addEventListener('DOMContentLoaded', () => {
    if (typeof UIBuilder !== 'undefined') {
        UIBuilder.buildApp();
    }
    nav('home'); // Inicia a SPA na tela inicial
});

// --- ROTEADOR SPA ---
window.nav = function(viewId) {
    // Esconde todas as views
    document.querySelectorAll('.page-view').forEach(v => v.classList.remove('active'));
    
    // Reseta o visual dos links do menu lateral
    document.querySelectorAll('.nav-link').forEach(n => { 
        n.classList.remove('bg-gray-800', 'text-white', 'border-accent'); 
        if(!n.classList.contains('pl-10')) {
            n.classList.add('border-transparent'); 
        }
    });
    
    // Mostra a view alvo com animação
    const targetView = document.getElementById('view-' + viewId);
    if(targetView) targetView.classList.add('active');
    
    // Marca o link ativo no menu lateral
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
    
    // Scrolla para o topo da página suavemente
    document.getElementById('main-scroll').scrollTop = 0;
};

// --- CONTROLE DE ABAS PRINCIPAIS ---
window.tab = function(aulaId, tabName) {
    // Esconde os painéis daquela aula específica
    document.querySelectorAll(`[id^="pane-${aulaId}"]`).forEach(c => c.classList.remove('active'));
    
    // Tira o estilo ativo dos botões
    document.querySelectorAll(`[id^="btn-${aulaId}"]`).forEach(b => { 
        b.classList.remove('active'); 
    });
    
    // Ativa o conteúdo alvo
    let targetPane = document.getElementById(`pane-${aulaId}-${tabName}`);
    if(targetPane) targetPane.classList.add('active');
    
    // Aplica o estilo de ativo no botão clicado
    let activeBtn = document.getElementById(`btn-${aulaId}-${tabName}`);
    if(activeBtn) {
        activeBtn.classList.add('active');
        if(document.getElementById(`view-${aulaId}`)) {
            activeBtn.style.borderColor = "var(--accent)";
        }
    }
};

// --- CONTROLE DE SUB-ABAS DE CÓDIGO (SGBDs / AVISOS) ---
window.switchInnerTab = function(groupId, tabIdx, tabType) {
    // Esconde todos os conteúdos de código daquele grupo específico
    document.querySelectorAll(`[id^="content-${groupId}-"]`).forEach(c => c.classList.remove('active'));
    
    // Reseta botões limpando cores de alerta (red) e normais (accent)
    document.querySelectorAll(`[id^="btn-${groupId}-"]`).forEach(b => {
        b.classList.remove('active', 'text-accent', 'border-accent', 'text-red-400', 'border-red-400');
        b.classList.add('text-gray-400', 'border-transparent');
    });
    
    // Ativa o conteúdo do código alvo
    let targetContent = document.getElementById(`content-${groupId}-${tabIdx}`);
    if(targetContent) targetContent.classList.add('active');

    // Ativa o botão da linguagem clicada
    let targetBtn = document.getElementById(`btn-${groupId}-${tabIdx}`);
    if(targetBtn) {
        targetBtn.classList.remove('text-gray-400', 'border-transparent');
        targetBtn.classList.add('active');
        
        // Aplica o alerta vermelho caso a Dri e o Léo tenham classificado como 'is-obs'
        if (tabType === 'is-obs') {
            targetBtn.classList.add('text-red-400', 'border-red-400');
        } else {
            targetBtn.classList.add('text-accent', 'border-accent');
        }
    }
};

// --- ÁREA DE TRANSFERÊNCIA (COPY) & TOAST NOTIFICATION ---
window.copyC = function(btn) {
    let codeBlock = btn.parentElement.querySelector('pre code') || btn.parentElement.querySelector('pre');
    
    if(!codeBlock) return;
    
    navigator.clipboard.writeText(codeBlock.innerText).then(() => { 
        showToast('Código copiado com sucesso!');
        let origText = btn.innerText; 
        
        btn.innerText = 'Copiado!'; 
        btn.style.background = '#28a745'; 
        btn.style.borderColor = '#28a745';
        
        setTimeout(() => { 
            btn.innerText = origText; 
            btn.style.background = ''; 
            btn.style.borderColor = ''; 
        }, 2000); 
    });
};

function showToast(message) {
    let container = document.getElementById('toast-container');
    if(!container) return; 
    
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

// --- ACORDEÃO (FAQ / RETROSPECTIVAS) ---
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
            if(a.previousElementSibling && a.previousElementSibling.querySelector('span')) {
                a.previousElementSibling.querySelector('span').innerText = '+'; 
                a.previousElementSibling.classList.remove('active'); 
            }
        }); 
        panel.style.maxHeight = panel.scrollHeight + "px"; 
        btn.querySelector('span').innerText = '-'; 
        btn.classList.add('active'); 
    }
};

// --- MOTOR DE AVALIAÇÃO (QUIZZES) ---
window.evalQ = function(formId, resultId) {
    let form = document.getElementById(formId); 
    if(!form) return;

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
    if(!resDiv) return;

    resDiv.classList.remove('hidden'); 
    let pct = (acertos / total) * 100;
    
    if(pct === 100) { 
        resDiv.className = "mt-6 p-5 rounded-lg text-center bg-green-100 text-green-800 border border-green-300 flex flex-col items-center gap-2 shadow-sm"; 
        resDiv.innerHTML = `<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg> <span class="font-bold text-lg">Excelente! Certificação Aprovada: ${acertos}/${total} acertos.</span>`; 
    } else { 
        resDiv.className = "mt-6 p-5 rounded-lg text-center bg-red-50 text-red-800 border border-red-200 flex flex-col items-center gap-2 shadow-sm"; 
        resDiv.innerHTML = `<svg class="w-10 h-10 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg> <span class="font-bold text-lg">Revise o conteúdo. Você acertou ${acertos} de ${total} (${pct}%).</span>`; 
    }
};

// --- MOTOR 3D FLASHCARDS BÍBLIA (FORÇA BRUTA INLINE) ---
window.flipC = function(faceElement) { 
    // Procura o contêiner raiz do cartão
    let card = faceElement.closest('.fc-card');
    if (card) {
        // Encontra a engrenagem que roda
        let inner = card.querySelector('.card-inner');
        if (inner) {
            // APLICAÇÃO DE FORÇA BRUTA: Ignora classes CSS e injeta a transformação direto no estilo do HTML
            inner.style.transform = 'rotateY(180deg)';
        }
    }
};

window.closeC = function(event, btnElement) { 
    event.stopPropagation(); 
    
    let card = btnElement.closest('.fc-card');
    if (card) {
        let inner = card.querySelector('.card-inner');
        if (inner) {
            // Reverte a força bruta visual
            inner.style.transform = 'rotateY(0deg)';
            
            // Aguarda o término da animação CSS (700ms definidos no style.css) para resetar o carrossel calado
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

// --- MOTOR DO CARROSSEL DOS FLASHCARDS ---
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
    
    // Travas de segurança do limite do Array
    if (currentIndex < 0) currentIndex = 0; 
    if (currentIndex >= slides.length) currentIndex = slides.length - 1;

    // Atualiza o rastreador de estado e translada a tela X% pra esquerda
    track.dataset.current = currentIndex; 
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Atualiza o texto do visualizador
    if(indicator) indicator.innerText = `${currentIndex + 1} / ${slides.length}`; 
    // Tranca os botões se bater no começo ou no fim
    if(btnPrev) btnPrev.disabled = currentIndex === 0; 
    if(btnNext) btnNext.disabled = currentIndex === slides.length - 1;
};
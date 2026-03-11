class UIBuilder {
    // Aglutinador Sênior: Pega os dados fatiados dos arquivos externos e unifica para o construtor UI
    static getAulas() {
        return [
            typeof aula1 !== 'undefined' ? aula1 : null,
            typeof aula2 !== 'undefined' ? aula2 : null,
            typeof aula3 !== 'undefined' ? aula3 : null,
            typeof aula4 !== 'undefined' ? aula4 : null
        ].filter(a => a !== null);
    }

    static getBiblia() {
        return typeof appDataBiblia !== 'undefined' ? appDataBiblia : [];
    }

    static buildApp() {
        this.buildSidebar();
        this.buildViews();
    }

    static buildSidebar() {
        const nav = document.getElementById('sidebar-nav');
        let html = `
            <a href="#" onclick="nav('home')" id="nav-home" class="nav-link block px-8 py-3 text-white bg-gray-800 border-l-4 border-accent transition-colors flex items-center gap-3 font-semibold">
                <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
                Visão Geral (DER)
            </a>
            <div class="px-8 py-2 text-[10px] text-gray-500 uppercase font-bold mt-6 mb-2 tracking-widest">A Jornada</div>
        `;

        this.getAulas().forEach((aula, idx) => {
            html += `<a href="#" onclick="nav('${aula.id}')" id="nav-${aula.id}" class="nav-link block pl-10 pr-6 py-3 text-sm text-gray-400 hover:text-white hover:bg-gray-800 border-l-4 border-transparent hover:border-sys-${aula.theme} transition-colors">${idx + 1}. ${aula.title.split(':')[1].trim()}</a>`;
        });

        html += `
            <div class="px-8 py-2 text-[10px] text-gray-500 uppercase font-bold mt-6 mb-2 tracking-widest">Recursos Sênior</div>
            <a href="#" onclick="nav('biblia')" id="nav-biblia" class="nav-link block pl-10 pr-6 py-3 text-sm text-gray-400 hover:text-white hover:bg-gray-800 border-l-4 border-transparent hover:border-accent transition-colors flex items-center gap-2">
                <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253"></path></svg>
                A Bíblia SQL (3D)
            </a>
        `;
        nav.innerHTML = html;
    }

    static buildViews() {
        const root = document.getElementById('app-root');
        let html = '';

        // 1. HOME VIEW
        html += `
        <section id="view-home" class="page-view active">
            <div class="bg-brand text-white p-8 md:p-12 rounded-xl md:rounded-2xl shadow-xl mb-8 md:mb-10 text-center relative overflow-hidden">
                <div class="relative z-10">
                    <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight leading-tight">SQL MasterClass</h1>
                    <p class="text-base md:text-lg lg:text-xl opacity-90 max-w-3xl mx-auto font-light leading-relaxed">Bem-vindo à MasterClass Definitiva. Este portal contém 100% da arquitetura validada: Módulos completos, missões reais de análise de dados, certificações rigorosas e a Bíblia multi-SGBD no guia de bolso.</p>
                </div>
            </div>
            <div class="box-panel">
                <h2 class="text-xl md:text-2xl font-bold text-gray-800 mb-2">Ecossistema: Banco \`GestaoEscolar\`</h2>
                <p class="text-gray-500 mb-4 md:mb-6 text-xs md:text-sm">Estude rigorosamente as Chaves Primárias (PK) e Estrangeiras (FK) do DER abaixo.</p>
                <div class="w-full overflow-x-auto bg-[#f8f9fa] rounded-lg p-4 md:p-6 border shadow-inner flex justify-center">
                    <img src="der.svg" alt="Diagrama DER" class="w-full max-w-[850px]" style="min-width: 600px;">
                </div>
            </div>
        </section>`;

        // 2. AULAS VIEWS
        this.getAulas().forEach((aula, index) => {
            let num = index + 1;
            let bgClass = `bg-sys-${aula.theme}`;
            let textClass = `text-sys-${aula.theme}`;
            let borderClass = `border-sys-${aula.theme}`;

            html += `
            <section id="view-${aula.id}" class="page-view">
                <div class="mb-6 md:mb-8">
                    <span class="${bgClass} text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Módulo ${num}</span>
                    <h2 class="text-2xl md:text-4xl font-bold text-gray-900 mt-3 leading-tight">${aula.title.split(':')[1].trim()}</h2>
                </div>
                
                <div class="flex gap-4 md:gap-8 border-b border-gray-200 mb-6 md:mb-8 overflow-x-auto no-scrollbar pb-1">
                    <button onclick="tab('${aula.id}', 'teoria')" id="btn-${aula.id}-teoria" class="tab-btn active shrink-0">🎯 O Desafio</button>
                    ${aula.praticaSetup ? `<button onclick="tab('${aula.id}', 'setup')" id="btn-${aula.id}-setup" class="tab-btn shrink-0">⚙️ Setup</button>` : ''}
                    <button onclick="tab('${aula.id}', 'pratica')" id="btn-${aula.id}-pratica" class="tab-btn shrink-0">💻 Mão na Massa</button>
                    <button onclick="tab('${aula.id}', 'retro')" id="btn-${aula.id}-retro" class="tab-btn shrink-0">🧠 Retrospectiva</button>
                    <button onclick="tab('${aula.id}', 'quiz')" id="btn-${aula.id}-quiz" class="tab-btn shrink-0">📝 Certificação</button>
                </div>

                <div id="pane-${aula.id}-teoria" class="tab-pane active space-y-4 md:space-y-6">
                    <div class="box-panel border-l-4 ${borderClass} bg-blue-50 bg-opacity-30">
                        <p class="text-lg md:text-xl font-bold ${textClass} mb-2">A Missão (Sprint ${num})</p>
                        <p class="text-sm md:text-base text-gray-700 leading-relaxed">${aula.teoria.desafio}</p>
                    </div>
                    <div class="box-panel">
                        <p class="text-base md:text-lg font-bold mb-4">Inglês Técnico (CLIL)</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                            ${aula.teoria.clil.map(c => `
                                <div class="p-3 md:p-4 bg-gray-50 rounded border">
                                    <span class="en text-sm md:text-base ${textClass}">${c.term}</span>
                                    <p class="text-xs md:text-sm mt-1 text-gray-600 leading-relaxed">${c.desc}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>`;

            // Aba: Setup Especial
            if (aula.praticaSetup) {
                html += `
                <div id="pane-${aula.id}-setup" class="tab-pane space-y-4 md:space-y-6">
                    <div class="box-panel">
                        <p class="text-lg md:text-xl font-bold text-gray-800 mb-2">${aula.praticaSetup.title}</p>
                        <p class="text-xs md:text-sm text-gray-500 mb-4 leading-relaxed">${aula.praticaSetup.desc}</p>
                        <div class="code-module border rounded-lg overflow-hidden border-gray-300">
                            <div class="inner-tab-header">
                                ${aula.praticaSetup.codes ? aula.praticaSetup.codes.map((c, cIdx) => {
                                    let isObs = c.label.toLowerCase().includes('aviso') || c.label.toLowerCase().includes('observação');
                                    let btnColor = isObs ? 'text-red-500 border-red-500' : 'text-accent border-accent';
                                    let hoverClass = isObs ? 'hover:text-red-400' : 'hover:text-gray-200';
                                    let dataType = isObs ? 'is-obs' : 'is-normal';
                                    return `<button onclick="switchInnerTab('${aula.id}_setup', ${cIdx}, '${dataType}')" id="btn-${aula.id}_setup-${cIdx}" class="inner-tab-btn ${hoverClass} ${cIdx === 0 ? 'active '+btnColor : 'text-gray-400 border-transparent'}" data-type="${dataType}">${c.label}</button>`;
                                }).join('') : ''}
                            </div>
                            <div class="inner-tab-content-wrapper relative bg-[#1e1e1e]">
                                ${aula.praticaSetup.codes ? aula.praticaSetup.codes.map((c, cIdx) => `
                                    <div id="content-${aula.id}_setup-${cIdx}" class="inner-tab-content ${cIdx === 0 ? 'active' : ''}">
                                        <button class="btn-copy" onclick="copyC(this)">Copiar</button>
                                        <pre class="!border-l-0 !rounded-none !m-0"><code>${c.content}</code></pre>
                                    </div>
                                `).join('') : ''}
                            </div>
                        </div>
                    </div>
                </div>`;
            }

            // Aba: Prática
            html += `<div id="pane-${aula.id}-pratica" class="tab-pane space-y-4 md:space-y-6">`;
            aula.pratica.forEach((p, pIdx) => {
                html += `
                    <div class="box-panel">
                        <p class="text-lg md:text-xl font-bold ${textClass} mb-2 leading-tight">${p.title}</p>
                        ${p.desc ? `<p class="text-xs md:text-sm text-gray-600 mb-4 leading-relaxed">${p.desc}</p>` : ''}
                        
                        <div class="code-module border rounded-lg overflow-hidden border-gray-300">
                            <div class="inner-tab-header">
                                ${p.codes ? p.codes.map((c, cIdx) => {
                                    let isObs = c.label.toLowerCase().includes('aviso') || c.label.toLowerCase().includes('observação');
                                    let btnColor = isObs ? 'text-red-500 border-red-500' : 'text-accent border-accent';
                                    let hoverClass = isObs ? 'hover:text-red-400' : 'hover:text-gray-200';
                                    let dataType = isObs ? 'is-obs' : 'is-normal';
                                    return `<button onclick="switchInnerTab('${aula.id}_p${pIdx}', ${cIdx}, '${dataType}')" id="btn-${aula.id}_p${pIdx}-${cIdx}" class="inner-tab-btn ${hoverClass} ${cIdx === 0 ? 'active '+btnColor : 'text-gray-400 border-transparent'}" data-type="${dataType}">${c.label}</button>`;
                                }).join('') : `<button class="inner-tab-btn active text-accent border-accent">${p.label}</button>`}
                            </div>
                            <div class="inner-tab-content-wrapper relative bg-[#1e1e1e]">
                                ${p.codes ? p.codes.map((c, cIdx) => `
                                    <div id="content-${aula.id}_p${pIdx}-${cIdx}" class="inner-tab-content ${cIdx === 0 ? 'active' : ''}">
                                        <button class="btn-copy" onclick="copyC(this)">Copiar</button>
                                        <pre class="!border-l-0 !rounded-none !m-0"><code>${c.content}</code></pre>
                                    </div>
                                `).join('') : `
                                    <div class="inner-tab-content active">
                                        <button class="btn-copy" onclick="copyC(this)">Copiar</button>
                                        <pre class="!border-l-0 !rounded-none !m-0"><code>${p.code}</code></pre>
                                    </div>
                                `}
                            </div>
                        </div>
                    </div>
                `;
            });
            html += `</div>`;

            // Aba: Retrospectiva
            html += `
                <div id="pane-${aula.id}-retro" class="tab-pane">
                    <div class="box-panel">
                        <h3 class="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-brand">Revisão de Arquitetura</h3>
                        ${aula.retro.map((r, i) => `
                            <button class="acc-btn" onclick="toggleA(this)">
                                <span class="pr-4 text-left">${i+1}. ${r.q}</span> 
                                <span class="font-bold text-lg shrink-0">+</span>
                            </button>
                            <div class="acc-content"><p>${r.a}</p></div>
                        `).join('')}
                    </div>
                </div>`;

            // Aba: Quiz
            html += `
                <div id="pane-${aula.id}-quiz" class="tab-pane">
                    <div class="box-panel">
                        <h3 class="text-lg md:text-xl font-bold mb-4 md:mb-6 text-gray-800">Avaliação Nível ${num}</h3>
                        <form id="form-${aula.id}">
                            ${aula.quiz.map((q, qIndex) => `
                                <div class="quiz-question">
                                    <p class="q-text">${qIndex + 1}. ${q.q}</p>
                                    ${q.opts.map((opt, optIndex) => `
                                        <label class="q-opt">
                                            <input type="radio" name="q_${aula.id}_${qIndex}" value="${opt.c ? 'correct' : 'wrong'}">
                                            <span class="flex-1">${opt.t}</span>
                                        </label>
                                    `).join('')}
                                </div>
                            `).join('')}
                            <button type="button" onclick="evalQ('form-${aula.id}', 'res-${aula.id}')" class="bg-brand text-white px-6 md:px-8 py-3 rounded-lg font-bold hover:bg-brand-dark transition-colors w-full shadow-md mt-4 text-sm md:text-base">Corrigir Teste</button>
                            <div id="res-${aula.id}" class="mt-4 hidden p-4 rounded text-center"></div>
                        </form>
                    </div>
                </div>
            </section>`;
        });

        // 3. BÍBLIA VIEW
        html += `
        <section id="view-biblia" class="page-view bg-gray-900 min-h-full">
            <div class="text-center mb-10 md:mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-accent mb-3 md:mb-4">A Bíblia do SQL (Flashcards 3D)</h2>
                <p class="text-sm md:text-base text-gray-400 max-w-3xl mx-auto px-4 md:px-0">A documentação técnica final de todas as sublinguagens e as variações SQL Server, PostgreSQL, MySQL e Oracle.</p>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 pb-24 px-4 max-w-6xl mx-auto">
        `;

        this.getBiblia().forEach(fc => {
            html += `
                <div class="perspective-1500 h-[450px] md:h-[500px] fc-card">
                    <div class="relative w-full h-full transform-3d card-inner shadow-lg">
                        
                        <div class="fc-face fc-front ${fc.colorClass} bg-gradient-to-br from-gray-800 to-gray-900" onclick="flipC(this)">
                            <div class="bg-gray-900 p-4 md:p-5 rounded-full mb-4 shadow-lg border border-gray-700">
                                <svg class="w-10 h-10 md:w-12 md:h-12 ${fc.textClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${fc.iconPath}"></path></svg>
                            </div>
                            <h3 class="text-2xl md:text-3xl font-mono font-bold tracking-wider mb-2 text-center text-white px-2">${fc.title}</h3>
                            <div class="${fc.bgClass} h-1 w-12 md:w-16 mb-4 rounded"></div>
                            <p class="text-gray-400 text-xs md:text-sm uppercase tracking-[0.2em] animate-pulse">Clique para Explorar ⤵</p>
                        </div>
                        
                        <div class="fc-face fc-back flex flex-col">
                            <div class="p-3 md:p-4 border-b bg-gray-50 flex justify-between items-center shadow-sm">
                                <span class="font-bold ${fc.textClass} tracking-wider text-xs md:text-sm truncate pr-2">${fc.title}</span>
                                <button onclick="closeC(event, this)" class="text-gray-400 hover:text-red-600 transition-colors p-1 bg-white rounded shadow-sm border border-gray-200 shrink-0">
                                    <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>
                            
                            <div class="flex-1 overflow-hidden relative carousel-container">
                                <div class="carousel-track" data-current="0">
            `;
            
            fc.slides.forEach(slide => {
                html += `
                                    <div class="slide">
                                        <h4 class="text-xs md:text-sm text-gray-500 font-bold uppercase mb-3 md:mb-4 tracking-wide">${slide.title}</h4>
                                        ${slide.html}
                                    </div>
                `;
            });

            html += `
                                </div>
                            </div>
                            
                            <div class="flex justify-between items-center p-3 md:p-4 border-t bg-gray-50 rounded-b-xl">
                                <button onclick="moveSlide(this,-1)" class="btn-prev text-brand font-bold disabled:opacity-30 flex items-center gap-1 hover:bg-blue-50 px-2 py-1 md:px-3 md:py-2 rounded transition text-sm md:text-base" disabled><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg> Ant</button>
                                <span class="slide-indicator text-xs md:text-sm font-bold text-gray-500 bg-gray-200 px-3 py-1 rounded-full">1 / ${fc.slides.length}</span>
                                <button onclick="moveSlide(this,1)" class="btn-next text-brand font-bold flex items-center gap-1 hover:bg-blue-50 px-2 py-1 md:px-3 md:py-2 rounded transition text-sm md:text-base">Próx <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `</div></section>`;
        root.innerHTML = html;
    }
}
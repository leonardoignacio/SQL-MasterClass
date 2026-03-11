const aula2 = {
    id: "aula2", title: "Módulo 2: Operação em Produção (DML/DTL)", theme: "dml",
    teoria: {
        desafio: "<strong>Situação-Problema:</strong> Parabéns, você sobreviveu à Sprint 1 e a arquitetura foi aprovada! A plataforma da FutureTech entrou em Produção (Go-Live). O marketing investiu pesado, os usuários acessaram a Landing Page e os formulários de cadastro começaram a disparar dados para o seu banco. Sua missão agora virou 100% Operacional (DML): Você vai injetar dados, carregar planilhas em massa, e aplicar correções cirúrgicas de sobrenomes com UPDATE.<br><br><strong>Atenção ao Trauma:</strong> Um desenvolvedor sênior da sua equipe executou uma atualização no banco ontem de madrugada sem o cinto de segurança (cláusula WHERE) e arruinou as notas de 5 mil alunos. A empresa vai falir? Não se você dominar o uso da 'Máquina do Tempo' do banco de dados (As Transações DTL).",
        clil: [
            { term: "INSERT INTO", desc: "Ato de Inserir. Cadastra uma nova linha (tupla) palpável no disco da tabela." },
            { term: "UPDATE / SET", desc: "Ato de Atualizar. Mutaciona os valores orgânicos vivos de uma linha já existente." },
            { term: "DELETE FROM", desc: "Ato de Apagar. Remove sumariamente registros textuais do disco (Exige uso da trava WHERE)." },
            { term: "BEGIN TRAN / COMMIT / ROLLBACK", desc: "A infraestrutura de Controle Transacional atômico de segurança na RAM (A Máquina do Tempo)." }
        ]
    },
    praticaSetup: null,
    pratica: [
        { 
            title: "Passo 1: O Primeiro Cliente (Inserção Singular nas Tabelas Pais)", 
            desc: "A página web disparou as APIs. Omitimos propositalmente a menção à coluna 'id' no código T-SQL, delegando ao banco a obrigação de gerar o número autoincremental matematicamente.", 
            codes: [
                { label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `INSERT INTO ALUNO (matricula, nome, data_nascimento) VALUES ('2026-001', 'Joaquim Silva', '2005-04-12');\nINSERT INTO DOCENTE (registro, nome, especialidade) VALUES ('DOC-101', 'Alan Turing', 'Algoritmos');\nINSERT INTO CURSO (nome, descricao, carga_horaria) VALUES ('Informática', 'Lógica e TI', 1200);` }
            ]
        },
        { 
            title: "Passo 2: O Escudo da Integração (Erro de Inserção Induzido)", 
            desc: "Testando a armadura que você criou na Sprint 1! O Front-end mandou um JSON com um bug, tentando matricular o Joaquim num Curso de ID 999 que não existe no catálogo. Tente rodar isso e veja a Integridade Referencial te salvar do desastre.", 
            codes: [
                { label: "Aviso: Bloqueio Letal de FK", content: `-- A API Node.js enviou lixo para a base:\nINSERT INTO TURMA (ano_semestre, curso_id, docente_id) \nVALUES ('2026.1', 999, 1);\n\n-- RESULTADO CIBERNÉTICO NA TELA:\n-- O motor aborta instantaneamente o pacote: "The INSERT statement conflicted with the FOREIGN KEY constraint". O dado fantasma jamais entra no banco.` }
            ]
        },
        { 
            title: "Passo 3: A Matrícula Perfeita (Tabelas Filhas)", 
            desc: "Sabendo que os primeiros cadastros do Passo 1 geraram o valor absoluto de ID = 1 para o Joaquim, Alan e para Informática, vamos executar o preenchimento correto das tabelas dependentes cruzando as pontes relacionais.", 
            codes: [
                { label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `INSERT INTO TURMA (ano_semestre, curso_id, docente_id) VALUES ('2026.1', 1, 1);\nINSERT INTO ALUNO_TURMA (aluno_id, turma_id, nota, faltas) VALUES (1, 1, 8.5, 0);` }
            ]
        },
        { 
            title: "Passo 4: O Fator Humano (Update Singular Seguro)", 
            desc: "O Joaquim mandou ticket pro Suporte reclamando que seu nome estava incompleto. A equipe acionou você para arrumar. Operação cirúrgica exigida: O UPDATE é uma arma nuclear. A Cláusula WHERE atua como o seu cinto de segurança para evitar que a escola inteira mude de nome.", 
            codes: [
                { label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `UPDATE ALUNO \nSET nome = 'Joaquim da Silva Júnior' \nWHERE id = 1;\n\nUPDATE DOCENTE \nSET especialidade = 'Engenharia de Dados e Lógica Avançada' \nWHERE id = 1;` }
            ]
        },
        { 
            title: "Passo 5: A Armadilha Clássica da FK (Erro de Deleção Abortada)", 
            desc: "O diretor mandou fechar o curso de Informática e pediu que você desse um <code>DELETE FROM CURSO WHERE id=1</code> rápido na base. Execute isso e contemple o terror de tentar apagar um Pai que ainda possui Filhos (Turmas) ativos e dependentes atrelados a ele na escola.", 
            codes: [
                { label: "Aviso: A Proteção Contra Órfãos", content: `-- O comando descuidado ordenado pela chefia:\nDELETE FROM CURSO WHERE id = 1;\n\n-- RESULTADO DO SISTEMA:\n-- Erro Severo. O banco protege a própria vida impedindo que as turmas e os alunos de Informática fiquem flutuando como fantasmas na nuvem ("Reference constraint violation").` }
            ]
        },
        { 
            title: "Passo 6: A Hierarquia da Exclusão Correta", 
            desc: "A forma ética de atuar. Para deletar o teto, tem que quebrar as paredes antes. A exclusão de ecossistemas segue sempre o sentido inverso: De Baixo (Matrículas) Para Cima (Curso Mãe).", 
            codes: [
                { label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `DELETE FROM ALUNO_TURMA WHERE turma_id = 1;\nDELETE FROM TURMA WHERE id = 1;\nDELETE FROM CURSO WHERE id = 1;` }
            ]
        },
        { 
            title: "Passo 7: O Motor de Desempenho (Bulk Insert)", 
            desc: "O time de dados enviou 5.000 planilhas do MEC para subir hoje. Você não fará 5.000 chamadas e conexões TCP lentas atirando INSERTs individuais na rede. Agrupe dezenas de instâncias num único comando otimizado. Atenção: O gigante Oracle tem frescuras com esse padrão ANSI da indústria.", 
            codes: [
                { label: "SQL Server + PostgreSQL + MySQL", content: `INSERT INTO CURSO (nome, descricao, carga_horaria) VALUES\n('Redes de Computadores', 'Infraestrutura Lógica', 1000), \n('Engenharia de Software', 'Arquitetura Sistêmica', 3200), \n('Ciência de Dados em Nuvem', 'Python e M.L', 2800);` },
                { label: "Oracle", content: `-- O Oracle não assimila a vírgula múltipla no escopo. \nINSERT ALL \n  INTO CURSO (nome, descricao, carga_horaria) VALUES ('Redes', 'Infraestrutura', 1000)\n  INTO CURSO (nome, descricao, carga_horaria) VALUES ('Software', 'Arquitetura', 3200)\n  INTO CURSO (nome, descricao, carga_horaria) VALUES ('Dados', 'Python e ML', 2800)\nSELECT 1 FROM DUAL;` }
            ]
        },
        { 
            title: "Passo 8: A Matemática de Negócios no Disco", 
            desc: "O conselho de Educação exigiu que todos os cursos considerados 'rápidos' (com menos de 2.000 horas letivas) recebessem na marra um acréscimo dinâmico de 100 horas complementares no sistema. Não use o backend para fazer as contas.", 
            codes: [
                { label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `UPDATE CURSO \nSET carga_horaria = carga_horaria + 100 \nWHERE carga_horaria < 2000;` }
            ]
        },
        { 
            title: "Passo 9: A Infraestrutura da Bolha (BEGIN TRAN)", 
            desc: "Você está de plantão na madrugada e fará atualizações sensíveis de notas (O Pesadelo). O bom engenheiro liga a chave de segurança da memória RAM que previne commits acidentais no HDD físico.", 
            codes: [
                { label: "SQL Server", content: `BEGIN TRAN;` },
                { label: "PostgreSQL + MySQL + Oracle", content: `START TRANSACTION;` }
            ]
        },
        { 
            title: "Passo 10: O Sangue Frio (O Erro Fatal)", 
            desc: "O Cansaço bateu e o Analista disparou o UPDATE solto, sem a trava obrigatória do WHERE. A água correu livre e alagou as tabelas.", 
            codes: [
                { label: "Aviso: Desastre Operacional em Andamento", content: `UPDATE ALUNO_TURMA SET faltas = 0;` }
            ]
        },
        { 
            title: "Passo 11: Constatando a Tragédia Visualmente", 
            desc: "Ele atira um SELECT na tela para verificar apenas o trabalho dele e entra em pânico total: Percebe que no visor todos os alunos da instituição letiva acabaram de perder absolutamente todo o histórico de faltas do ano.", 
            codes: [
                { label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `SELECT aluno_id, faltas FROM ALUNO_TURMA;` }
            ]
        },
        { 
            title: "Passo 12: O Resgate (A Máquina do Tempo ROLLBACK)", 
            desc: "Como a operação ainda flutuava dentro da instabilidade segura criada pelo BEGIN TRAN na memória viva do cache, a equipe aciona a alavanca mágica de desfazer os males. A RAM vai pro lixo e o banco volta no milissegundo exato anterior ao passo 9.", 
            codes: [
                { label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `ROLLBACK;` }
            ]
        },
        { 
            title: "Passo 13: A Redenção e o Salve Definitivo", 
            desc: "Com as mãos suando, o Analista volta a criar a bolha do 0, reescreve a Query limitando e enjaulando ferozmente o alvo no WHERE (aluno_id = 5) e crava com o COMMIT magnético, chancelando a obra perfeita na nuvem.", 
            codes: [
                { label: "SQL Server", content: `BEGIN TRAN;\n    UPDATE ALUNO_TURMA SET faltas = 0 WHERE aluno_id = 5;\nCOMMIT;` },
                { label: "PostgreSQL + MySQL + Oracle", content: `START TRANSACTION;\n    UPDATE ALUNO_TURMA SET faltas = 0 WHERE aluno_id = 5;\nCOMMIT;` }
            ]
        }
    ],
    retro: [
        { q: "Por que a comunidade de dados afirma veementemente que a cláusula WHERE é o cinto de segurança da DML?", a: "Pelo perigo estrutural da linguagem SQL. Por padrão letal, se você não usar filtros, os comandos cruciais UPDATE e DELETE agem varrendo e corrompendo ABSOLUTAMENTE TODAS as linhas da tabela simultaneamente num pulso elétrico. A única e frágil barreira que isola a mutação e impede que o banco inteiro da empresa seja destruído é o desenvolvedor travar o alvo usando a cláusula WHERE apontada para uma PK sólida." },
        { q: "Qual a real economia em tempo e dinheiro de servidores que a execução do Bulk Insert garante?", a: "Uma redução brutal de Latência e Requisições TCP na Rede da Cloud. Enviar 50 conexões assíncronas separadas e longas da sua API chamando o banco trava os processadores. Enviar 1 comando com 50 blocos de parênteses paralelos permite à AWS empacotar a memória em 1 microssegundo e descarregar no Disco em um único pulso perfeito e massivo de I/O." },
        { q: "Descreva a essência mecânica técnica oposta que separa a finalização COMMIT de um aborte ROLLBACK.", a: "Ambos desfazem a bolha protetora iniciada pelo BEGIN TRAN na RAM. O 'COMMIT' chancela a autorização master, converte a transação volátil flutuante da rede em um código definitivo que é queimado nas agulhas do Disco Rígido da empresa eternamente. O 'ROLLBACK' é o botão ejetor: Joga todo o lixo do cache fora e força o OS a reverter e espelhar as tabelas ao idêntico estado milimétrico de segundos do passado, salvando o dia." }
    ],
    quiz: [
        { q: "Qual é a regra de ouro irrefutável inegociável de um Engenheiro de Banco de Dados ao submeter um comando letal de UPDATE ou DELETE ao ambiente?", opts: [ {t:"Assegurar o uso de tabelas em letras maiúsculas.", c:false}, {t:"Jamais e em hipótese alguma executar essas instruções sem atrelar perfeitamente uma cláusula WHERE cirúrgica para enjaular o alvo da ação.", c:true}, {t:"Fazer deploy usando as chaves FROM integradas do projeto local.", c:false} ] },
        { q: "O Diretor quer excluir um ecossistema amarrado. Qual a ordem lógica sistêmica para deletar informações blindadas por regras da Integridade (FK)?", opts: [ {t:"Ataque de cima para baixo (Primeiro apaga os Pais, depois processa os Filhos logados).", c:false}, {t:"Invasão reversa de baixo para cima (Extinga as Matrículas Filhas primeiro, libertando o Pai orgânico de amarras para só então deletá-lo sem crash).", c:true}, {t:"Submissão paralela através de ordem cronológica e alfabética reversa.", c:false} ] },
        { q: "O que a instrução de código engenhosa 'UPDATE CURSO SET carga = carga + 100 WHERE carga < 2000' efetua na prática dentro da memória do processador?", opts: [ {t:"Insere brutalmente no catálogo 100 cursos inéditos de engenharia pesada com foco ágil.", c:false}, {t:"Encontra e localiza na lupa os cursos de porte curto, apagando-os do disco e recriando linhas de 100 horas mortas.", c:false}, {t:"Faz uma varredura atômica isolando só os cursos menores que 2000, somando de forma transparente e flexível mais 100 horas complementares por cima dos valores base orgânicos reais já existentes.", c:true} ] },
        { q: "Do escopo e tática pura de Arquitetura Transacional Crítica Ágil, o comando BEGIN TRAN inicializa qual comportamento sistêmico nas nuvens?", opts: [ {t:"Eleva os privilégios e estica a parede criando um escudo, um bloco envolto de segurança isolado puro dentro da Memória Cache e RAM; as queries lançadas após não furam para o HDD até a checagem magna humana da tela frontal.", c:true}, {t:"Inicia transferência autônoma do Data Lake para o armazenamento frio externo S3.", c:false}, {t:"Gatilho global para disparar travas que encerram leituras sujas nos dashboards do site externo de vendas atômico paralelo.", c:false} ] },
        { q: "Você suou, verificou e validou os dados contidos visualmente na transação solta. O diretor bateu o martelo. Qual o comando absoluto chancelador que sela e carimba o trabalho ativamente no Disco da Microsoft?", opts: [ {t:"SAVE SYSTEM DATA LOCAL END POINT.", c:false}, {t:"O imbatível pulso eletromagnético COMMIT.", c:true}, {t:"END SYSTEM TRANSACTION CLOSE LOOP.", c:false} ] },
        { q: "Sirenes e apitos de alerta! Um Júnior rodou na fábrica e subiu um script fatal DML sem WHERE em pleno go-live. Felizmente, um sênior exigiu e abriu Transação antes da tragédia. Qual o botão ejetor salvador de resgate atômico para limpar e jogar isso no ralo?", opts: [ {t:"Atire o imortal ROLLBACK no terminal Shell da rede isolada da interface.", c:true}, {t:"Aperte a tecla flutuante universal de CTRL+Z com ímpeto direto no grid virtual logado em tela do IDE do sistema relacional paralelo.", c:false}, {t:"Escreva UNDO MASSIVE UPDATES na raiz para rebobinar matriz.", c:false} ] },
        { q: "O escopo de instruções SQL desenhado e fabricado e codificado exclusivamente focado e desenhado no cenário focado para garantir o manuseio constante, diário e ágil operacional (Inserts diários rotineiros e Drops textuais)?", opts: [ {t:"O subconjunto estrutural Data Definition Language (DDL).", c:false}, {t:"A camada flutuante volátil da Data Manipulation Language (DML).", c:true}, {t:"A hierarquia lógica superior chamada Data Control Language (DCL).", c:false} ] },
        { q: "Para injetar uma carga atômica de forma saudável nos nós, ignorando repetições e minimizando as interações I/O pesadas, a sintaxe real performática de mercado (Bulk Insert base MySQL Server padrão) atua em que viés relacional?", opts: [ {t:"Evocando a declaração fechada isolada BULK_INSERT nativa engolindo strings em C+ e Python JSON em loop de for arrays engessados cruzados lentos puros em blocos soltos.", c:false}, {t:"Declarar na frente e de forma magistral 1 um único 'INSERT INTO TABLE VALUES', colando subsequentemente nas suas costas imensos, vários e orgânicos blocos densos isolados repletos de valores contidos por parênteses, estritamente amarrados e separados unicamente pela vírgula externa do array.", c:true}, {t:"Rodando Múltiplas linhas soltas atiradas no servidor simultâneas via Async de requisições web e requests paralelas da arquitetura front do framework do celular.", c:false} ] },
        { q: "Seja lúdico mas estritamente técnico: O que efetivamente ocorrerá solto na base virtual de matriz e processador limpo do sistema relacional se você arriscar forçar perigosamente o apagamento de um Cadastro Pai (Um Curso) que abriga, acolhe e detém debaixo e vinculado as vidas ativas vitais de dezenas de Alunos matriculados e Filhos dependentes na Tabela de Turmas?", opts: [ {t:"O SGBD sentirá a ameaça de gerar as chamadas falhas lógicas e de corromper o histórico, abortando imediatamente e sem negociação o expurgo da matriz acusando forte ERRO CRÍTICO vermelho violento por rompimento e Violação Da Tranca de Chave Estrangeira (FK).", c:true}, {t:"Ele contornará o erro engolindo um sapo computacional rodando o 'delete nativo letal invisível em cascata' forçadamente atirando fora sumariamente todos os dados vitais para evitar bloqueio nos terminais do board logado.", c:false}, {t:"Apaga e extingue unicamente o Curso com a faca afiada na linha mas cruamente ignora sumário preservando vivas na infraestrutura pesada todas as fileiras das turmas flutuando no hiperespaço soltas, ocas, inúteis e sem conexão com o nada do plano das malhas e painéis.", c:false} ] },
        { q: "As chaves primárias numéricas base estrutural de um Cadastro são de responsabilidade severa. Na vida do desenvolvedor, ao injetar num endpoint local de cadastro, como ele trabalha processualmente e insere a coluna raiz estrutural de Primary Key IDENTITY (1,1)?", opts: [ {t:"Ele constrói paralelamente o peso arquitetural lento cruzado na API do Python mandando ele mesmo pesquisar na memória e espelhar o MAX local ID isolado fazendo a conta +1 para devolver livre e submeter no pacote em seguida no tráfego.", c:false}, {t:"Basta pular as validações forçadas do sistema e preencher orgânico e de forma nua no pacote cru injetado a tag oculta solta do NULL e forçar o parser cru do SGBD a resolver as pontas fracas sem crash e quebra de blocos no painel principal local ativo em tela pura.", c:false}, {t:"A glória cibernética exata da autossuficiência da engine e motor interno do BD. O engenheiro no Front omite limpo inteiramente o envio de chamadas ou da existência textual da coluna alvo do seu insert relacional na aplicação e o servidor assumirá livre e internamente a lógica pura e progressiva da sequência dos numéricos lidos da RAM local da nuvem.", c:true} ] }
    ]
};
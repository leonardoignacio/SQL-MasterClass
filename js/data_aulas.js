const appDataAulas = [
    {
        id: "aula1", title: "Módulo 1: Arquitetura Física (DDL)", theme: "ddl",
        teoria: {
            desafio: "O seu papel como DBA é construir fisicamente os alicerces no servidor utilizando a linguagem DDL. Você criará o Banco de Dados (Sandbox) e erguerá as tabelas. Regra de Ouro: Tabelas 'Pais' nascem antes das tabelas 'Filhas'.",
            clil: [
                { term: "CREATE", desc: "Criar. Constrói algo novo do zero no disco." },
                { term: "ALTER", desc: "Alterar. Modifica uma estrutura já existente ativa." },
                { term: "DROP", desc: "Derrubar. Destrói completamente o arquivo e os dados." },
                { term: "PRIMARY KEY / FOREIGN KEY", desc: "Identidade Única (PK) e Vínculo Relacional (FK)." }
            ]
        },
        praticaSetup: null,
        pratica: [
            { 
                title: "Passo 0: A Sandbox", desc: "Crie o terreno e aponte o cursor. No Oracle, criamos um Schema atrelado a um User.", 
                codes: [
                    { label: "SQL Server + MySQL", content: `CREATE DATABASE GestaoEscolar;\nGO\nUSE GestaoEscolar;\nGO` },
                    { label: "PostgreSQL", content: `CREATE DATABASE GestaoEscolar;\n\\c GestaoEscolar;` },
                    { label: "Oracle", content: `-- Oracle cria o Schema atrelado ao User\nCREATE USER GestaoEscolar IDENTIFIED BY Senha123;\nGRANT DBA TO GestaoEscolar;\nALTER SESSION SET CURRENT_SCHEMA = GestaoEscolar;` }
                ]
            },
            { 
                title: "Passo 1: Entidades Fortes (Pais)", desc: "Tabelas independentes sem FKs. Note a diferença fundamental nas chaves auto-incrementais de cada SGBD.", 
                codes: [
                    { label: "SQL Server", content: `CREATE TABLE ALUNO (\n    id INT IDENTITY(1,1) PRIMARY KEY,\n    matricula NVARCHAR(20) UNIQUE NOT NULL,\n    nome NVARCHAR(100) NOT NULL,\n    data_nascimento DATE NOT NULL\n);\n\nCREATE TABLE DOCENTE (\n    id INT IDENTITY(1,1) PRIMARY KEY,\n    registro NVARCHAR(20) UNIQUE NOT NULL,\n    nome NVARCHAR(100) NOT NULL,\n    especialidade NVARCHAR(100) NOT NULL\n);\n\nCREATE TABLE CURSO (\n    id INT IDENTITY(1,1) PRIMARY KEY,\n    nome NVARCHAR(100) NOT NULL,\n    descricao NVARCHAR(MAX) NULL,\n    carga_horaria INT NOT NULL\n);` },
                    { label: "PostgreSQL", content: `CREATE TABLE ALUNO (\n    id SERIAL PRIMARY KEY,\n    matricula VARCHAR(20) UNIQUE NOT NULL,\n    nome VARCHAR(100) NOT NULL,\n    data_nascimento DATE NOT NULL\n);\n\nCREATE TABLE DOCENTE (\n    id SERIAL PRIMARY KEY,\n    registro VARCHAR(20) UNIQUE NOT NULL,\n    nome VARCHAR(100) NOT NULL,\n    especialidade VARCHAR(100) NOT NULL\n);\n\nCREATE TABLE CURSO (\n    id SERIAL PRIMARY KEY,\n    nome VARCHAR(100) NOT NULL,\n    descricao TEXT NULL,\n    carga_horaria INT NOT NULL\n);` },
                    { label: "MySQL", content: `CREATE TABLE ALUNO (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    matricula VARCHAR(20) UNIQUE NOT NULL,\n    nome VARCHAR(100) NOT NULL,\n    data_nascimento DATE NOT NULL\n);\n\nCREATE TABLE DOCENTE (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    registro VARCHAR(20) UNIQUE NOT NULL,\n    nome VARCHAR(100) NOT NULL,\n    especialidade VARCHAR(100) NOT NULL\n);\n\nCREATE TABLE CURSO (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    nome VARCHAR(100) NOT NULL,\n    descricao TEXT NULL,\n    carga_horaria INT NOT NULL\n);` },
                    { label: "Oracle", content: `CREATE TABLE ALUNO (\n    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    matricula VARCHAR2(20) UNIQUE NOT NULL,\n    nome VARCHAR2(100) NOT NULL,\n    data_nascimento DATE NOT NULL\n);\n\nCREATE TABLE DOCENTE (\n    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    registro VARCHAR2(20) UNIQUE NOT NULL,\n    nome VARCHAR2(100) NOT NULL,\n    especialidade VARCHAR2(100) NOT NULL\n);\n\nCREATE TABLE CURSO (\n    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    nome VARCHAR2(100) NOT NULL,\n    descricao CLOB NULL,\n    carga_horaria NUMBER NOT NULL\n);` }
                ]
            },
            { 
                title: "Passo 2: Entidades Dependentes (Filhas)", desc: "Garantindo a Integridade Referencial. A data padrão (DEFAULT) varia levemente por SGBD.", 
                codes: [
                    { label: "SQL Server", content: `CREATE TABLE TURMA (\n    id INT IDENTITY(1,1) PRIMARY KEY,\n    ano_semestre NVARCHAR(10) NOT NULL,\n    curso_id INT NOT NULL,\n    docente_id INT NOT NULL,\n    CONSTRAINT FK_TURMA_CURSO FOREIGN KEY (curso_id) REFERENCES CURSO(id),\n    CONSTRAINT FK_TURMA_DOCENTE FOREIGN KEY (docente_id) REFERENCES DOCENTE(id)\n);\n\nCREATE TABLE ALUNO_TURMA (\n    aluno_id INT NOT NULL,\n    turma_id INT NOT NULL,\n    data_matricula DATE DEFAULT GETDATE(),\n    nota DECIMAL(5,2) NULL, \n    faltas INT DEFAULT 0,\n    CONSTRAINT PK_ALUNO_TURMA PRIMARY KEY (aluno_id, turma_id),\n    CONSTRAINT FK_ALUNO_TURMA_ALUNO FOREIGN KEY (aluno_id) REFERENCES ALUNO(id),\n    CONSTRAINT FK_ALUNO_TURMA_TURMA FOREIGN KEY (turma_id) REFERENCES TURMA(id)\n);` },
                    { label: "PostgreSQL + MySQL", content: `CREATE TABLE TURMA (\n    id SERIAL PRIMARY KEY, /* Se MySQL use: INT AUTO_INCREMENT */\n    ano_semestre VARCHAR(10) NOT NULL,\n    curso_id INT NOT NULL,\n    docente_id INT NOT NULL,\n    CONSTRAINT FK_TURMA_CURSO FOREIGN KEY (curso_id) REFERENCES CURSO(id),\n    CONSTRAINT FK_TURMA_DOCENTE FOREIGN KEY (docente_id) REFERENCES DOCENTE(id)\n);\n\nCREATE TABLE ALUNO_TURMA (\n    aluno_id INT NOT NULL,\n    turma_id INT NOT NULL,\n    data_matricula DATE DEFAULT CURRENT_DATE,\n    nota DECIMAL(5,2) NULL, \n    faltas INT DEFAULT 0,\n    CONSTRAINT PK_ALUNO_TURMA PRIMARY KEY (aluno_id, turma_id),\n    CONSTRAINT FK_ALUNO_TURMA_ALUNO FOREIGN KEY (aluno_id) REFERENCES ALUNO(id),\n    CONSTRAINT FK_ALUNO_TURMA_TURMA FOREIGN KEY (turma_id) REFERENCES TURMA(id)\n);` },
                    { label: "Oracle", content: `CREATE TABLE TURMA (\n    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    ano_semestre VARCHAR2(10) NOT NULL,\n    curso_id NUMBER NOT NULL,\n    docente_id NUMBER NOT NULL,\n    CONSTRAINT FK_TURMA_CURSO FOREIGN KEY (curso_id) REFERENCES CURSO(id),\n    CONSTRAINT FK_TURMA_DOCENTE FOREIGN KEY (docente_id) REFERENCES DOCENTE(id)\n);\n\nCREATE TABLE ALUNO_TURMA (\n    aluno_id NUMBER NOT NULL,\n    turma_id NUMBER NOT NULL,\n    data_matricula DATE DEFAULT SYSDATE,\n    nota NUMBER(5,2) NULL, \n    faltas NUMBER DEFAULT 0,\n    CONSTRAINT PK_ALUNO_TURMA PRIMARY KEY (aluno_id, turma_id),\n    CONSTRAINT FK_ALUNO_TURMA_ALUNO FOREIGN KEY (aluno_id) REFERENCES ALUNO(id),\n    CONSTRAINT FK_ALUNO_TURMA_TURMA FOREIGN KEY (turma_id) REFERENCES TURMA(id)\n);` }
                ]
            }
        ],
        retro: [
            { q: "Por que somos obrigados a criar as tabelas Pais antes das Filhas?", a: "A Tabela Turma (Filha) possui chaves estrangeiras (FK) que apontam para Curso e Docente (Pais). O motor do banco verifica a existência do destino em tempo real. Ele dará erro fatal se o Curso não estiver salvo no disco." },
            { q: "Qual a diferença técnica entre DROP e DELETE?", a: "DROP (DDL) apaga o arquivo físico do disco rígido destruindo colunas e dados. DELETE (DML) apaga apenas as linhas de texto, mantendo a estrutura da tabela intacta e vazia." },
            { q: "Para que serve a palavra CONSTRAINT?", a: "Serve para 'batizar' a regra com um nome explícito (ex: FK_TURMA_CURSO). O log de erro mostrará o nome que você deu, facilitando o troubleshooting." }
        ],
        quiz: [
            { q: "Qual linguagem (subconjunto SQL) utilizamos para criar estruturas lógicas e físicas?", opts: [ {t:"DML", c:false}, {t:"DDL", c:true}, {t:"DCL", c:false} ] },
            { q: "O que o comando IDENTITY(1,1) faz especificamente no SQL Server?", opts: [ {t:"Garante nomes não duplicados.", c:false}, {t:"É a Chave Estrangeira.", c:false}, {t:"Gera o ID numérico de forma automática, somando 1 a cada novo registro.", c:true} ] },
            { q: "Em quais cenários arquiteturais aplicamos VARCHAR ou NVARCHAR?", opts: [ {t:"Em colunas financeiras.", c:false}, {t:"Em colunas que armazenarão textos/strings.", c:true}, {t:"Em campos numéricos.", c:false} ] },
            { q: "Por qual motivo um DBA aplica a restrição NOT NULL na coluna Nome?", opts: [ {t:"Para permitir cadastros vazios.", c:false}, {t:"Para forçar o sistema a rejeitar tentativas de cadastro sem nome.", c:true}, {t:"Para criptografar a senha.", c:false} ] },
            { q: "Qual comando DDL destrói a tabela inteira e sua estrutura do disco?", opts: [ {t:"DROP TABLE", c:true}, {t:"DELETE TABLE", c:false}, {t:"TRUNCATE TABLE", c:false} ] },
            { q: "O que define uma Primary Key (PK)?", opts: [ {t:"Regra de ordenação.", c:false}, {t:"Conexão cloud.", c:false}, {t:"Identificador único, inalterável e exclusivo para cada linha.", c:true} ] },
            { q: "O que define uma Foreign Key (FK)?", opts: [ {t:"Garante a Integridade Referencial, apontando para a PK de outra tabela.", c:true}, {t:"Senha do app.", c:false}, {t:"Chave de API.", c:false} ] },
            { q: "Como adicionar uma nova coluna em uma tabela que já está em produção?", opts: [ {t:"ALTER TABLE ... ADD", c:true}, {t:"CREATE COLUMN", c:false}, {t:"UPDATE TABLE", c:false} ] },
            { q: "A tabela ALUNO_TURMA resolve qual problema de cardinalidade?", opts: [ {t:"N:M (Muitos para Muitos).", c:true}, {t:"1:1", c:false}, {t:"1:N", c:false} ] },
            { q: "Qual a utilidade prática do DEFAULT GETDATE()?", opts: [ {t:"Formatar a data em PT-BR.", c:false}, {t:"Preencher a coluna com o milissegundo atual do servidor caso a API web envie vazio.", c:true}, {t:"Bloquear aos finais de semana.", c:false} ] }
        ]
    },
    {
        id: "aula2", title: "Módulo 2: Operação (DML/DTL)", theme: "dml",
        teoria: {
            desafio: "A EdTech lançou a plataforma! O banco estruturado precisa ser alimentado. Você executará os 12 passos da manipulação: Inserções singulares, Cargas em Massa (Bulk), Updates precisos, Armadilhas de Exclusão (FK) e a Máquina do Tempo das Transações para reverter acidentes.",
            clil: [
                { term: "INSERT INTO", desc: "Inserir nova linha na tabela." },
                { term: "UPDATE / SET", desc: "Atualizar os dados de uma linha." },
                { term: "DELETE FROM", desc: "Apagar registros do disco." },
                { term: "BEGIN TRAN / COMMIT / ROLLBACK", desc: "Controle atômico de transação em RAM." }
            ]
        },
        praticaSetup: null,
        pratica: [
            { 
                title: "Passo 1: Inserção Singular (Pais)", desc: "Adicionamos primeiro os pais, omitindo a coluna ID do código para o banco gerá-la.", 
                codes: [ { label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `INSERT INTO ALUNO (matricula, nome, data_nascimento) VALUES ('2026-001', 'Joaquim Silva', '2005-04-12');\nINSERT INTO DOCENTE (registro, nome, especialidade) VALUES ('DOC-101', 'Alan Turing', 'Algoritmos');\nINSERT INTO CURSO (nome, descricao, carga_horaria) VALUES ('Informática', 'Lógica e TI', 1200);` } ]
            },
            { 
                title: "Passo 2: Inserção Singular (Filhas)", desc: "Sabendo os IDs matemáticos gerados (=1), matriculamos.", 
                codes: [ { label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `INSERT INTO TURMA (ano_semestre, curso_id, docente_id) VALUES ('2026.1', 1, 1);\nINSERT INTO ALUNO_TURMA (aluno_id, turma_id, nota, faltas) VALUES (1, 1, 8.5, 0);` } ]
            },
            { 
                title: "Passo 3: Correções Pontuais (Update Singular)", desc: "A Cláusula WHERE é o cinto de segurança!", 
                codes: [ { label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `UPDATE ALUNO \nSET nome = 'Joaquim da Silva Júnior' \nWHERE id = 1;\n\nUPDATE DOCENTE \nSET especialidade = 'Engenharia de Dados e Algoritmos' \nWHERE id = 1;` } ]
            },
            { 
                title: "Passo 4: A Armadilha da FK (Erro Letal)", desc: "Tentar apagar um pai que tem filhos (Turmas) lança erro de violação.", 
                codes: [ { label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `-- O SGBD impedirá a deleção para não gerar "Turmas Órfãs" flutuando\nDELETE FROM CURSO WHERE id = 1;` } ]
            },
            { 
                title: "Passo 5: A Exclusão Correta", desc: "Apagamos de baixo para cima (Matrícula > Turma > Curso).", 
                codes: [ { label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `DELETE FROM ALUNO_TURMA WHERE turma_id = 1;\nDELETE FROM TURMA WHERE id = 1;\nDELETE FROM CURSO WHERE id = 1;` } ]
            },
            { 
                title: "Passo 6: Carga em Massa (Bulk Insert)", desc: "Múltiplos VALUES num único pulso de rede. O Oracle possui sintaxe diferente.", 
                codes: [
                    { label: "SQL Server + PostgreSQL + MySQL", content: `INSERT INTO CURSO (nome, descricao, carga_horaria) VALUES\n('Redes', 'Infraestrutura', 1000), \n('Engenharia de Software', 'Arquitetura', 3200), \n('Ciência de Dados', 'Python e ML', 2800);` },
                    { label: "Oracle", content: `INSERT ALL \n  INTO CURSO (nome, descricao, carga_horaria) VALUES ('Redes', 'Infraestrutura', 1000)\n  INTO CURSO (nome, descricao, carga_horaria) VALUES ('Engenharia de Software', 'Arquitetura', 3200)\n  INTO CURSO (nome, descricao, carga_horaria) VALUES ('Ciência de Dados', 'Python e ML', 2800)\nSELECT 1 FROM DUAL;` }
                ]
            },
            { 
                title: "Passo 7: Update Matemático", desc: "Somando dinamicamente apenas nas horas curtas.", 
                codes: [ { label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `UPDATE CURSO \nSET carga_horaria = carga_horaria + 100 \nWHERE carga_horaria < 2000;` } ]
            },
            { 
                title: "Passo 8: Abertura da Transação", desc: "Inicia a bolha de segurança isolada na memória RAM.", 
                codes: [
                    { label: "SQL Server", content: `BEGIN TRAN;` },
                    { label: "PostgreSQL + MySQL + Oracle", content: `START TRANSACTION;` }
                ]
            },
            { 
                title: "Passo 9: O Erro Fatal (Sem WHERE)", desc: "O Analista Júnior atualizou todas as notas do banco inteiro.", 
                codes: [ { label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `UPDATE ALUNO_TURMA SET faltas = 0;` } ]
            },
            { 
                title: "Passo 10: Constatando a Falha", desc: "O SELECT revela que todos os alunos da escola zeraram a falta.", 
                codes: [ { label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `SELECT * FROM ALUNO_TURMA;` } ]
            },
            { 
                title: "Passo 11: O Botão do Pânico", desc: "Reverte a máquina do tempo da RAM.", 
                codes: [ { label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `ROLLBACK;` } ]
            },
            { 
                title: "Passo 12: Execução Certa e Confirmação", desc: "Gravando ativamente no disco.", 
                codes: [
                    { label: "SQL Server", content: `BEGIN TRAN;\n    UPDATE ALUNO_TURMA SET faltas = 0 WHERE aluno_id = 5;\nCOMMIT;` },
                    { label: "PostgreSQL + MySQL + Oracle", content: `START TRANSACTION;\n    UPDATE ALUNO_TURMA SET faltas = 0 WHERE aluno_id = 5;\nCOMMIT;` }
                ]
            }
        ],
        retro: [
            { q: "Por que WHERE é o cinto de segurança?", a: "Por padrão, UPDATE e DELETE agem em TODAS as linhas simultaneamente. A única barreira que impede que o banco inteiro seja destruído é a cláusula WHERE isolando o alvo." },
            { q: "Qual a vantagem absoluta do Bulk Insert?", a: "Performance. Enviar 50 conexões TCP separadas trava a rede. Enviar 1 comando com 50 parênteses permite ao servidor gravar tudo num único pulso no Disco." },
            { q: "COMMIT vs ROLLBACK?", a: "Ambos finalizam a Transação. COMMIT salva a memória volátil no Disco de forma permanente. ROLLBACK joga a memória fora e devolve o banco ao estado anterior." }
        ],
        quiz: [
            { q: "Qual a regra inegociável ao submeter UPDATE ou DELETE?", opts: [ {t:"Usar tabelas maiúsculas.", c:false}, {t:"Jamais executar sem utilizar uma cláusula WHERE para isolar o alvo.", c:true}, {t:"Usar a cláusula FROM.", c:false} ] },
            { q: "Ao deletar uma cadeia amarrada por Integridade (FK), qual a ordem?", opts: [ {t:"De cima para baixo (Pais depois Filhos).", c:false}, {t:"De baixo para cima (Filhos, livrando o Pai de amarras para apagá-lo).", c:true}, {t:"Ordem alfabética.", c:false} ] },
            { q: "O que 'UPDATE CURSO SET carga = carga + 100 WHERE carga < 2000' faz?", opts: [ {t:"Insere 100 cursos novos.", c:false}, {t:"Apaga os cursos.", c:false}, {t:"Varredura filtrando cursos menores que 2000, adicionando 100 horas aos valores existentes.", c:true} ] },
            { q: "O que BEGIN TRAN inicia?", opts: [ {t:"Um bloco de segurança isolado na RAM, não afetando o HD imediatamente.", c:true}, {t:"Transferência para nuvem.", c:false}, {t:"Bloqueio web.", c:false} ] },
            { q: "Você validou os dados na transação. Qual comando sela o trabalho no disco?", opts: [ {t:"SAVE DATA", c:false}, {t:"COMMIT", c:true}, {t:"END", c:false} ] },
            { q: "Qual o botão do pânico na transação?", opts: [ {t:"ROLLBACK", c:true}, {t:"CTRL+Z", c:false}, {t:"UNDO", c:false} ] },
            { q: "Sublinguagem de manipulação diária?", opts: [ {t:"DDL", c:false}, {t:"DML", c:true}, {t:"DCL", c:false} ] },
            { q: "Sintaxe exata do Bulk Insert (Exceto Oracle)?", opts: [ {t:"BULK_INSERT", c:false}, {t:"Um único INSERT INTO VALUES seguido de vários blocos de parênteses separados por vírgula.", c:true}, {t:"Múltiplos INSERTS aninhados.", c:false} ] },
            { q: "Tentar apagar Curso que possui Turmas amarradas?", opts: [ {t:"O SGBD abortará a operação, bloqueando com erro de Violação de Chave Estrangeira.", c:true}, {t:"Apaga em cascata.", c:false}, {t:"Apaga e deixa órfãs.", c:false} ] },
            { q: "Como lidar com campo IDENTITY no INSERT?", opts: [ {t:"Omite a coluna; o Servidor SQL assume a matemática da sequência.", c:true}, {t:"Query MAX+1.", c:false}, {t:"Escreve NULL.", c:false} ] }
        ]
    },
    {
        id: "aula3", title: "Módulo 3: Inteligência (DQL)", theme: "dql",
        teoria: {
            desafio: "Transforme os dados brutos em Business Intelligence. Extraia a visão com as 20 missões.",
            clil: [
                { term: "SELECT / FROM / WHERE", desc: "Projeção, Origem, Filtro bruto." },
                { term: "INNER / LEFT JOIN", desc: "Intersecção Perfeita / Prioridade na Esquerda." },
                { term: "GROUP BY / HAVING", desc: "Amassar em blocos / Filtro pós-soma matemática." }
            ]
        },
        praticaSetup: {
            title: "Setup de Laboratório: Carga Massiva",
            desc: "Rode o bloco no seu respectivo SGBD para injetar 50 cursos, docentes e alunos com matrículas randômicas.",
            codes: [
                { label: "SQL Server (T-SQL)", content: `USE GestaoEscolar;\nGO\nBEGIN TRAN;\n    -- 1. Inserindo 50 Cursos\n    INSERT INTO CURSO (nome, descricao, carga_horaria) VALUES\n    ('Gestão de TI', 'Governança', 1200), ('Análise de Sistemas', 'UML', 1500), ('BD Avançado', 'Tuning', 800), ('Cloud Computing', 'AWS', 1000), ('Cyber Security', 'Defesa', 1800), ('DevOps Eng', 'Docker', 1200), ('Machine Learning', 'Preditivo', 1600), ('Deep Learning', 'Neural', 1400), ('Business Intel', 'DW', 1000), ('Big Data', 'Hadoop', 2000), ('Frontend React', 'Web', 600), ('Backend Node', 'API', 800), ('Python Dados', 'Pandas', 600), ('Java EE', 'Spring', 1200), ('C# .NET', 'Core', 1000), ('Mobile App', 'Flutter', 1400), ('UX Design', 'Figma', 800), ('Design Think', 'Inovação', 400), ('Agile Scrum', 'Agil', 300), ('Gestão Proj', 'PMBOK', 900), ('Arq Software', 'Microserv', 1500), ('QA Testes', 'Auto', 800), ('Redes CCNA', 'Cisco', 1200), ('Linux Server', 'Admin', 900), ('Windows Serv', 'AD', 900), ('Hacking', 'Pentest', 1500), ('Blockchain', 'Crypto', 600), ('IoT Sensores', 'Arduino', 1000), ('Robótica', 'CLP', 1800), ('Embarcados', 'C', 1200), ('Financeira', 'Corp', 800), ('Contábil', 'DRE', 600), ('Marketing', 'Copy', 400), ('SEO', 'Buscas', 500), ('E-commerce', 'Lojas', 800), ('Logística', 'Supply', 900), ('Direito Dig', 'LGPD', 600), ('Startups', 'Pitch', 500), ('Matemática', 'Cálculo', 1200), ('Estatística', 'Prob', 800), ('Inglês Tech', 'Leitura', 400), ('Espanhol Básico', 'Com', 400), ('Libras', 'Sinais', 300), ('Soft Skills', 'Com', 200), ('Liderança', 'Team', 600), ('IA Fundamentos', 'LLM', 1000), ('Comp Gráfica', '3D', 1500), ('Edição Vídeo', 'Adobe', 800), ('Fotografia', 'Digital', 600), ('Prompt Eng', 'GPT', 400);\n\n    -- 2. Recrutando 50 Docentes\n    INSERT INTO DOCENTE (registro, nome, especialidade) VALUES\n    ('D-01', 'Grace Hopper', 'Compiladores'), ('D-02', 'John Neumann', 'Arq'), ('D-03', 'Claude Shannon', 'Teoria Info'), ('D-04', 'Dennis Ritchie', 'SO'), ('D-05', 'Ken Thompson', 'Unix'), ('D-06', 'Bjarne Stroustrup', 'C++'), ('D-07', 'James Gosling', 'Java'), ('D-08', 'Guido Rossum', 'Python'), ('D-09', 'Brendan Eich', 'JS'), ('D-10', 'Rasmus Lerdorf', 'PHP'), ('D-11', 'Yukihiro Matsu', 'Ruby'), ('D-12', 'Anders Hejlsberg', 'C#'), ('D-13', 'Vint Cerf', 'Redes'), ('D-14', 'Bob Kahn', 'TCP'), ('D-15', 'Radia Perlman', 'STP'), ('D-16', 'Don Knuth', 'Alg'), ('D-17', 'Edsger Dijkstra', 'Grafos'), ('D-18', 'Tony Hoare', 'Sort'), ('D-19', 'Edgar Codd', 'Relacional'), ('D-20', 'Mike Stonebraker', 'PG'), ('D-21', 'Ralph Kimball', 'DW'), ('D-22', 'Bill Inmon', 'Model'), ('D-23', 'Martin Fowler', 'Patterns'), ('D-24', 'Uncle Bob', 'Clean'), ('D-25', 'Kent Beck', 'XP'), ('D-26', 'Eric Evans', 'DDD'), ('D-27', 'Jeff Sutherland', 'Scrum'), ('D-28', 'Ken Schwaber', 'Agile'), ('D-29', 'Gene Kim', 'DevOps'), ('D-30', 'Jez Humble', 'CD'), ('D-31', 'Andrew Ng', 'ML'), ('D-32', 'Yann LeCun', 'Deep'), ('D-33', 'Geoff Hinton', 'NN'), ('D-34', 'Yoshua Bengio', 'IA'), ('D-35', 'Fei-Fei Li', 'CV'), ('D-36', 'Ian Goodfellow', 'GAN'), ('D-37', 'Bruce Schneier', 'Cripto'), ('D-38', 'Kevin Mitnick', 'Sec'), ('D-39', 'Whit Diffie', 'Crypto'), ('D-40', 'Martin Hellman', 'RSA'), ('D-41', 'Jakob Nielsen', 'UX'), ('D-42', 'Don Norman', 'UI'), ('D-43', 'Steve Krug', 'Web'), ('D-44', 'Jeff Bezos', 'E-com'), ('D-45', 'Sheryl Sand', 'Ops'), ('D-46', 'Satya Nadella', 'Cloud'), ('D-47', 'Sundar Pichai', 'Prod'), ('D-48', 'Lisa Su', 'HW'), ('D-49', 'Jensen Huang', 'GPU'), ('D-50', 'Demis Hassabis', 'AGI');\n\n    -- 3. Matriculando 50 Alunos\n    INSERT INTO ALUNO (matricula, nome, data_nascimento) VALUES\n    ('A-01', 'Alice', '2004-03-12'), ('A-02', 'Breno', '2005-07-22'), ('A-03', 'Carla', '2003-11-05'), ('A-04', 'Diego', '2006-01-30'), ('A-05', 'Elisa', '2004-09-15'), ('A-06', 'Fábio', '2005-04-10'), ('A-07', 'Gabi', '2003-08-08'), ('A-08', 'Heitor', '2006-02-25'), ('A-09', 'Isis', '2004-12-01'), ('A-10', 'João', '2005-05-18'), ('A-11', 'Karen', '2003-10-10'), ('A-12', 'Léo', '2006-06-20'), ('A-13', 'Mel', '2004-01-14'), ('A-14', 'Nico', '2005-08-30'), ('A-15', 'Olivia', '2003-02-17'), ('A-16', 'Paulo', '2006-11-05'), ('A-17', 'Quinn', '2004-07-09'), ('A-18', 'Raissa', '2005-03-25'), ('A-19', 'Sam', '2003-06-12'), ('A-20', 'Tati', '2006-09-18'), ('A-21', 'Ubirajara', '2004-10-22'), ('A-22', 'Val', '2005-12-05'), ('A-23', 'Wagner', '2003-04-19'), ('A-24', 'Xuxa', '2006-07-11'), ('A-25', 'Yuri', '2004-05-02'), ('A-26', 'Zélia', '2005-01-28'), ('A-27', 'Artur', '2003-09-04'), ('A-28', 'Bruna', '2006-03-16'), ('A-29', 'Caio', '2004-11-08'), ('A-30', 'Dandara', '2005-06-14'), ('A-31', 'Enzo', '2003-12-29'), ('A-32', 'Fátima', '2006-08-03'), ('A-33', 'Gil', '2004-02-11'), ('A-34', 'Helena', '2005-10-07'), ('A-35', 'Ícaro', '2003-05-24'), ('A-36', 'Ju', '2006-04-01'), ('A-37', 'Kauan', '2004-08-12'), ('A-38', 'Lázaro', '2005-11-20'), ('A-39', 'Marina', '2003-01-05'), ('A-40', 'Neymar', '2006-02-09'), ('A-41', 'Otávio', '2004-06-25'), ('A-42', 'Paolla', '2005-09-02'), ('A-43', 'Quitéria', '2003-07-15'), ('A-44', 'Rodrigo', '2006-12-19'), ('A-45', 'Sabrina', '2004-04-08'), ('A-46', 'Tatá', '2005-05-30'), ('A-47', 'Ugo', '2003-03-03'), ('A-48', 'Vera', '2006-10-14'), ('A-49', 'Wesley', '2004-01-22'), ('A-50', 'Xamã', '2005-08-11');\n\n    -- 4. Laços T-SQL\n    DECLARE @c INT = (SELECT MAX(id) - 49 FROM CURSO); DECLARE @maxc INT = (SELECT MAX(id) FROM CURSO);\n    WHILE @c <= @maxc BEGIN INSERT INTO TURMA (ano_semestre, curso_id, docente_id) VALUES ('2027.1', @c, @c); SET @c = @c + 1; END\n\n    DECLARE @a INT = (SELECT MAX(id) - 49 FROM ALUNO); DECLARE @maxa INT = (SELECT MAX(id) FROM ALUNO); DECLARE @t INT = (SELECT MAX(id) - 49 FROM TURMA);\n    WHILE @a <= @maxa BEGIN INSERT INTO ALUNO_TURMA (aluno_id, turma_id, data_matricula, nota, faltas) VALUES (@a, @t, GETDATE(), (RAND()*10), CAST((RAND()*5) AS INT)); SET @a=@a+1; SET @t=@t+1; END\nCOMMIT;\nGO` },
                { label: "PostgreSQL (PL/pgSQL)", content: `START TRANSACTION;\n    -- Insira o mesmo bloco padrão de INSERTs de Cursos, Docentes e Alunos aqui...\n\n    -- Laço PL/pgSQL Integrado\n    DO $$\n    DECLARE \n        c INT := (SELECT MAX(id) - 49 FROM CURSO);\n        maxc INT := (SELECT MAX(id) FROM CURSO);\n        a INT := (SELECT MAX(id) - 49 FROM ALUNO);\n        maxa INT := (SELECT MAX(id) FROM ALUNO);\n        t INT := (SELECT MAX(id) - 49 FROM TURMA);\n    BEGIN\n        WHILE c <= maxc LOOP\n            INSERT INTO TURMA (ano_semestre, curso_id, docente_id) VALUES ('2027.1', c, c);\n            c := c + 1;\n        END LOOP;\n\n        WHILE a <= maxa LOOP\n            INSERT INTO ALUNO_TURMA (aluno_id, turma_id, data_matricula, nota, faltas)\n            VALUES (a, t, CURRENT_DATE, (random() * 10), CAST((random() * 5) AS INT));\n            a := a + 1;\n            t := t + 1;\n        END LOOP;\n    END $$;\nCOMMIT;` }
            ]
        },
        pratica: [
            { title: "Missão 1: A Projeção Pura", desc: "Nome e carga horária (Evite SELECT *).", codes: [{ label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `SELECT nome, carga_horaria \nFROM CURSO;` }] },
            { title: "Missão 2: O Uso de Alias (AS)", desc: "Renomeando a exibição para Codigo_Professor.", codes: [{ label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `SELECT registro AS Codigo_Professor, nome AS Nome_Professor \nFROM DOCENTE;` }] },
            { title: "Missão 3: O WHERE Básico", desc: "Cursos com carga > 1000.", codes: [{ label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `SELECT nome, carga_horaria \nFROM CURSO \nWHERE carga_horaria > 1000;` }] },
            { title: "Missão 4: A Busca Exata", desc: "Aluno com matrícula exata 'A-05'.", codes: [{ label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `SELECT id, matricula, nome \nFROM ALUNO \nWHERE matricula = 'A-05';` }] },
            { title: "Missão 5: O Range Flexível (BETWEEN)", desc: "Cursos entre 800 e 1200 horas.", codes: [{ label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `SELECT nome, carga_horaria \nFROM CURSO \nWHERE carga_horaria BETWEEN 800 AND 1200;` }] },
            { title: "Missão 6: Filtro SARGable (AND)", desc: "Alunos nascidos em 2005.", codes: [{ label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `SELECT matricula, nome \nFROM ALUNO \nWHERE data_nascimento >= '2005-01-01' AND data_nascimento <= '2005-12-31';` }] },
            { title: "Missão 7: Múltipla Escolha Exata (IN)", desc: "Professores focados em 'Redes' ou 'Java'.", codes: [{ label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `SELECT nome, especialidade \nFROM DOCENTE \nWHERE especialidade IN ('Redes', 'Java');` }] },
            { title: "Missão 8: Operador Condicional (OR)", desc: "Matrículas de risco: Faltas > 5 OU nota < 5.0.", codes: [{ label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `SELECT aluno_id, nota, faltas \nFROM ALUNO_TURMA \nWHERE faltas > 5 OR nota < 5.0;` }] },
            { title: "Missão 9: Pesquisa de Prefixo (LIKE)", desc: "Professor cujo nome começa com 'G'.", codes: [{ label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `SELECT nome, especialidade \nFROM DOCENTE \nWHERE nome LIKE 'G%';` }] },
            { title: "Missão 10: Busca de Fragmento (LIKE)", desc: "Pesquisar 'Data' no nome OU descrição.", codes: [{ label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `SELECT nome, descricao \nFROM CURSO \nWHERE nome LIKE '%Data%' OR descricao LIKE '%Data%';` }] },
            { title: "Missão 11: A Ordenação Crescente (ASC)", desc: "Chamada em ordem alfabética.", codes: [{ label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `SELECT matricula, nome \nFROM ALUNO \nORDER BY nome ASC;` }] },
            { title: "Missão 12: Múltipla Ordenação Combinada", desc: "Carga horária decrescente. Desempate alfabético.", codes: [{ label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `SELECT nome, carga_horaria \nFROM CURSO \nORDER BY carga_horaria DESC, nome ASC;` }] },
            { title: "Missão 13: Volume de Base (COUNT)", desc: "Quantos alunos absolutos possuímos?", codes: [{ label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `SELECT COUNT(id) AS Total_Alunos \nFROM ALUNO;` }] },
            { title: "Missão 14: A Média Analítica (AVG)", desc: "Qual a média exata de carga horária dos cursos?", codes: [{ label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `SELECT AVG(carga_horaria) AS Media_Tempo_Cursos \nFROM CURSO;` }] },
            { title: "Missão 15: O Cubo OLAP (GROUP BY)", desc: "Quantas turmas geradas por semestre?", codes: [{ label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `SELECT ano_semestre, COUNT(id) AS Rendimento \nFROM TURMA \nGROUP BY ano_semestre;` }] },
            { title: "Missão 16: O Filtro da Soma (HAVING)", desc: "Semestres que bateram mais de 10 turmas.", codes: [{ label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `SELECT ano_semestre, COUNT(id) AS Rendimento \nFROM TURMA \nGROUP BY ano_semestre \nHAVING COUNT(id) > 10;` }] },
            { title: "Missão 17: Boletim Primário (INNER JOIN)", desc: "Cruzar Tabela Associativa com Aluno para trazer o Nome.", codes: [{ label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `SELECT A.nome AS Aluno, M.nota\nFROM ALUNO_TURMA M\nINNER JOIN ALUNO A ON M.aluno_id = A.id;` }] },
            { title: "Missão 18: Intersecção Simples", desc: "Qual professor leciona em qual semestre?", codes: [{ label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `SELECT T.ano_semestre, D.nome AS Professor\nFROM TURMA T\nINNER JOIN DOCENTE D ON T.docente_id = D.id;` }] },
            { title: "Missão 19: O Boss Final (3 JOINs)", desc: "Relatório amarrando Turma, Curso e Docente.", codes: [{ label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `SELECT \n    T.ano_semestre, \n    C.nome AS Nome_Curso, \n    C.carga_horaria AS Carga,\n    D.nome AS Prof_Responsavel\nFROM TURMA T\nINNER JOIN CURSO C ON T.curso_id = C.id\nINNER JOIN DOCENTE D ON T.docente_id = D.id;` }] },
            { title: "Missão 20: Auditoria (LEFT JOIN)", desc: "Cursos órfãos sem turmas.", codes: [{ label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `SELECT C.nome AS Curso_Ocioso, T.id AS Turma_Fantasma\nFROM CURSO C\nLEFT JOIN TURMA T ON C.id = T.curso_id\nWHERE T.id IS NULL;` }] }
        ],
        retro: [
            { q: "Por que o SELECT * derruba o servidor?", a: "Ele varre absolutamente todas as colunas. Trazer biografia e senhas num relatório que só precisava do 'Nome' causa Full Table Scan e esgota a memória RAM da API." },
            { q: "Como o banco diferencia WHERE e HAVING?", a: "O WHERE atua na linha isolada ANTES da matemática. O HAVING só atua em cima das 'Bolhas Matemáticas' DEPOIS que elas foram agrupadas pelo GROUP BY." },
            { q: "O que caracteriza o INNER JOIN?", a: "A 'Intersecção Perfeita'. Para a linha ser impressa, a chave (ID) tem que existir com paridade em AMBAS as tabelas. Se faltar de um lado, a linha some do relatório." }
        ],
        quiz: [
            { q: "O que significa a sigla DQL?", opts: [ {t:"Data Quality Logic.", c:false}, {t:"Data Control Language.", c:false}, {t:"Data Query Language (Consulta).", c:true} ] },
            { q: "Em 'SELECT X FROM Y WHERE Z', qual cláusula processa primeiro?", opts: [ {t:"SELECT", c:false}, {t:"WHERE", c:false}, {t:"FROM (Achar a tabela física).", c:true} ] },
            { q: "Como buscar nomes terminados com 'A'?", opts: [ {t:"LIKE 'A%'", c:false}, {t:"LIKE '%A'", c:true}, {t:"= 'A'", c:false} ] },
            { q: "Para organizar carga horária Crescente:", opts: [ {t:"ORDER BY carga DESC", c:false}, {t:"ORDER BY carga ASC", c:true}, {t:"GROUP BY carga UP", c:false} ] },
            { q: "A função AVG(x) faz o quê no BI?", opts: [ {t:"Soma os valores.", c:false}, {t:"Retorna a média matemática.", c:true}, {t:"Acha o maior.", c:false} ] },
            { q: "Cláusula obrigatória ao usar colunas textuais junto com SUM()?", opts: [ {t:"GROUP BY (Amassar a categoria).", c:true}, {t:"ORDER BY", c:false}, {t:"INNER CONCAT", c:false} ] },
            { q: "O INNER JOIN exige o quê?", opts: [ {t:"Traz a tabela esquerda inteira.", c:false}, {t:"Duplica as tabelas.", c:false}, {t:"Correspondência exata da chave em ambas as tabelas.", c:true} ] },
            { q: "Estratégia para achar Cursos Órfãos?", opts: [ {t:"LEFT JOIN com WHERE filha.id IS NULL.", c:true}, {t:"INNER JOIN.", c:false}, {t:"RIGHT OUTER CONNECT.", c:false} ] },
            { q: "O comando 'IN ('Py', 'Java')' equivale a:", opts: [ {t:"WHERE esp = 'Py' AND esp = 'Java'", c:false}, {t:"LIKE", c:false}, {t:"WHERE esp = 'Py' OR esp = 'Java'", c:true} ] },
            { q: "Qual a função do AS em 'SELECT id AS Mat'?", opts: [ {t:"Muda a estrutura física.", c:false}, {t:"Fornece um Apelido visual temporário.", c:true}, {t:"Apaga dados.", c:false} ] }
        ]
    },
    {
        id: "aula4", title: "Módulo 4: Segurança & DBA (DCL)", theme: "dcl",
        teoria: {
            desafio: "Você é o Arquiteto. Usar usuário 'Root' na API expõe a empresa a hackers. Crie funções (DQL Dinâmica), estabeleça a muralha de Permissões (DCL) e aplique o protocolo puro de Backup/Restore.",
            clil: [
                { term: "DATEDIFF / SUBSTRING", desc: "Funções Escalares (Processamento linha a linha)." },
                { term: "GRANT / REVOKE / DENY (DCL)", desc: "RBAC corporativo: Dar, Remover e Negar permanentemente." },
                { term: "BACKUP / RESTORE", desc: "Empacota e Ressuscita o banco corrompido." }
            ]
        },
        praticaSetup: null,
        pratica: [
            { 
                title: "Missão 1: Idade Real (Função Escalar)", 
                desc: "A matemática temporal baseada no relógio da CPU.", 
                codes: [
                    { label: "SQL Server", content: `SELECT nome, DATEDIFF(YEAR, data_nascimento, GETDATE()) AS Idade FROM ALUNO;` },
                    { label: "PostgreSQL", content: `SELECT nome, EXTRACT(YEAR FROM AGE(CURRENT_DATE, data_nascimento)) AS Idade FROM ALUNO;` },
                    { label: "MySQL", content: `SELECT nome, TIMESTAMPDIFF(YEAR, data_nascimento, CURDATE()) AS Idade FROM ALUNO;` },
                    { label: "Oracle", content: `SELECT nome, TRUNC(MONTHS_BETWEEN(SYSDATE, data_nascimento) / 12) AS Idade FROM ALUNO;` }
                ]
            },
            { 
                title: "Missão 2: Recorte Textual (Primeiro Nome)", 
                desc: "Fatiando string com base na posição do primeiro espaço em branco.", 
                codes: [
                    { label: "SQL Server", content: `SELECT SUBSTRING(nome, 1, CHARINDEX(' ', nome + ' ') - 1) AS P_Nome FROM ALUNO;` },
                    { label: "PostgreSQL", content: `SELECT SUBSTRING(nome FROM 1 FOR POSITION(' ' IN nome || ' ') - 1) AS P_Nome FROM ALUNO;` },
                    { label: "MySQL", content: `SELECT SUBSTRING(nome, 1, LOCATE(' ', CONCAT(nome, ' ')) - 1) AS P_Nome FROM ALUNO;` },
                    { label: "Oracle", content: `SELECT SUBSTR(nome, 1, INSTR(nome || ' ', ' ') - 1) AS P_Nome FROM ALUNO;` }
                ]
            },
            { 
                title: "Missão 3: Produtividade (Group e Filtro)", 
                desc: "Quantas turmas fechadas os professores assumiram no ano de '2027'?", 
                codes: [
                    { label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `SELECT D.nome AS Prof, COUNT(T.id) AS Qtd_Turmas\nFROM DOCENTE D INNER JOIN TURMA T ON D.id = T.docente_id\nWHERE T.ano_semestre LIKE '2027%'\nGROUP BY D.nome;` }
                ]
            },
            { 
                title: "Missão 4: Somando Carga Horária Aprovada", 
                desc: "Engenharia de DQL pura. 4 JOINs e filtro ANTES de somar.", 
                codes: [
                    { label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `SELECT A.nome, SUM(C.carga_horaria) AS Hrs_Aprovadas\nFROM ALUNO A\nINNER JOIN ALUNO_TURMA M ON A.id = M.aluno_id\nINNER JOIN TURMA T ON M.turma_id = T.id\nINNER JOIN CURSO C ON T.curso_id = C.id\nWHERE M.nota >= 7.0 \nGROUP BY A.nome ORDER BY Hrs_Aprovadas DESC;` }
                ]
            },
            { 
                title: "Missão 5: Criar Login e Identidade", 
                desc: "A chave de fora e a permissão interna.", 
                codes: [
                    { label: "SQL Server", content: `USE master; \nCREATE LOGIN api_web WITH PASSWORD = 'SenhaComplexa123!';\nGO\n\nUSE GestaoEscolar; \nCREATE USER usr_api FOR LOGIN api_web;\nGO` },
                    { label: "PostgreSQL + MySQL", content: `CREATE USER usr_api WITH PASSWORD 'SenhaComplexa123!';` },
                    { label: "Oracle", content: `CREATE USER usr_api IDENTIFIED BY SenhaComplexa123!;` }
                ]
            },
            { 
                title: "Missão 6: Concessão de Poder (GRANT)", 
                desc: "A API pode ler/escrever Alunos, mas SÓ LÊ os Cursos.", 
                codes: [
                    { label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `GRANT SELECT, INSERT, UPDATE ON ALUNO TO usr_api;\nGRANT SELECT, INSERT, UPDATE ON ALUNO_TURMA TO usr_api;\nGRANT SELECT ON CURSO TO usr_api;` }
                ]
            },
            { 
                title: "Missão 7: Alerta! Revogando Acessos", 
                desc: "Bug na web detectado. Tire o poder de update.", 
                codes: [
                    { label: "SQL Server + PostgreSQL + MySQL + Oracle", content: `REVOKE UPDATE ON ALUNO FROM usr_api;` }
                ]
            },
            { 
                title: "Missão 8: A Muralha Física de Segurança", 
                desc: "O bloqueio total e intransponível contra exclusões via web.", 
                codes: [
                    { label: "SQL Server", content: `-- A muralha Microsoft absoluta que vence até grupos Admin\nDENY DELETE ON ALUNO TO usr_api;` },
                    { label: "Aviso Não Suportado", content: `-- Em PostgreSQL, MySQL e Oracle, o comando 'DENY' não existe nativamente.\n-- A filosofia de segurança deles é estritamente aditiva.\n-- Para bloquear alguém, você DEVE usar o REVOKE na ROLE (grupo) primária.\nREVOKE DELETE ON ALUNO FROM usr_api;` }
                ]
            },
            { 
                title: "Missão 9: Backup Físico", 
                desc: "O seguro de vida da corporação. Salva a DDL e DML.", 
                codes: [
                    { label: "SQL Server", content: `BACKUP DATABASE GestaoEscolar TO DISK = 'C:\\bkp_mestre.bak' WITH INIT;` },
                    { label: "Observação Terminal", content: `-- Estes SGBDs não possuem comando interno DDL para Backup Full.\n-- O DBA atua no BASH/CMD do SO:\npg_dump -U postgres GestaoEscolar > bkp.sql\n\n-- MySQL:\nmysqldump -u root -p GestaoEscolar > bkp.sql` },
                    { label: "Aviso Enterprise Oracle", content: `-- Confia-se o Backup Full ao RMAN:\n-- RMAN> BACKUP DATABASE PLUS ARCHIVELOG;` }
                ]
            },
            { 
                title: "Missão 10: O Restore Emergencial", 
                desc: "O servidor corrompeu. Derrube conexões e reconstrua o mundo.", 
                codes: [
                    { label: "SQL Server", content: `USE master;\n-- Derruba sessões presas:\nALTER DATABASE GestaoEscolar SET SINGLE_USER WITH ROLLBACK IMMEDIATE;\n\n-- Sobrescreve:\nRESTORE DATABASE GestaoEscolar FROM DISK = 'C:\\bkp_mestre.bak' WITH REPLACE;\n\nALTER DATABASE GestaoEscolar SET MULTI_USER;` },
                    { label: "Observação CLI", content: `-- A restauração requer injeção via shell OS:\npsql -U postgres GestaoEscolar_Limpo < bkp_mestre.sql\n\n-- MySQL:\nmysql -u root -p GestaoEscolar_Limpo < bkp_mestre.sql` },
                    { label: "Observação Oracle", content: `-- Terminal RMAN:\n-- RMAN> SHUTDOWN IMMEDIATE;\n-- RMAN> STARTUP MOUNT;\n-- RMAN> RESTORE DATABASE;\n-- RMAN> RECOVER DATABASE;\n-- RMAN> ALTER DATABASE OPEN;` }
                ]
            },
            { 
                title: "Missão 11: Exportação Schema-Only (LGPD)", 
                desc: "Esqueleto DDL puro para Devs sem vazar dados.", 
                codes: [
                    { label: "Interface GUI (SSMS)", content: `1. Clique Direito em GestaoEscolar > Tasks > Generate Scripts\n2. Na tela Advanced > "Types of data to script".\n3. Selecione "Schema Only".\n4. O arquivo gerado será apenas de CREATE TABLEs vazios sem risco de vazar CPFs.` }
                ]
            }
        ],
        retro: [
            { q: "Escalar vs Agregação?", a: "Agregação (SUM) esmaga 1000 linhas gerando 1 bloco final. Escalar (DATEDIFF) processa 'Linha por Linha', devolvendo o cálculo individual sem esmagar o relatório." },
            { q: "A fenda técnica entre REVOKE e DENY?", a: "REVOKE tira o acesso prévio, mas heranças o trazem de volta. DENY é a parede absoluta (SQL Server): Bloqueia incondicionalmente, sobrepondo administradores." },
            { q: "Por que SINGLE_USER no RESTORE?", a: "O OS trava o arquivo MDF se houver conexões ativas. O SINGLE_USER corta a rede, destrava o arquivo com ROLLBACK IMMEDIATE e permite a substituição pelo .BAK." }
        ],
        quiz: [
            { q: "Função que atua individualmente linha por linha (Ex: DATEDIFF)?", opts: [ {t:"Agregadas.", c:false}, {t:"Escalares (Nativas em RAM).", c:true}, {t:"Triggers.", c:false} ] },
            { q: "O comando DATEDIFF entregou:", opts: [ {t:"Soma dos dias.", c:false}, {t:"Idade fiel em tempo real baseada na CPU.", c:true}, {t:"Conversão.", c:false} ] },
            { q: "Diferença entre SUM e COUNT?", opts: [ {t:"SUM é matemática literal; COUNT foca na quantidade material de linhas.", c:true}, {t:"SUM mescla textos.", c:false}, {t:"Idênticas.", c:false} ] },
            { q: "Em CHARINDEX(' ', nome), o que acha?", opts: [ {t:"Letra inicial.", c:false}, {t:"Posição do primeiro Vácuo/Espaço em branco.", c:true}, {t:"Apaga caracteres.", c:false} ] },
            { q: "O Subconjunto DCL ampara que missão?", opts: [ {t:"DDL base.", c:false}, {t:"Carga ETL.", c:false}, {t:"Gerenciar as matrizes de acessos e permissões (RBAC).", c:true} ] },
            { q: "Extensão gerada num Backup Full no SQL Server?", opts: [ {t:".sql", c:false}, {t:".db", c:false}, {t:".bak", c:true} ] },
            { q: "Exportação Schema-Only gera:", opts: [ {t:"Zip pesado.", c:false}, {t:"Arquivo DDL vazios, protegendo clientes (LGPD).", c:true}, {t:"O .bak.", c:false} ] },
            { q: "Ao rodar RESTORE, WITH REPLACE faz o quê?", opts: [ {t:"Mescla linhas.", c:false}, {t:"Obriga que o motor destrua a base corrompida, sobrepondo-a.", c:true}, {t:"Renomeia.", c:false} ] },
            { q: "O comando DENY atua como?", opts: [ {t:"Remove acesso temporário.", c:false}, {t:"Restringe SELECT.", c:false}, {t:"A Muralha. Esmaga e bloqueia irrevogavelmente.", c:true} ] },
            { q: "Sobrevivência 1 do DBA corporativo?", opts: [ {t:"Passar root para Devs.", c:false}, {t:"Jamais operar sem ter Backups Full garantidos e testados em simulações.", c:true}, {t:"Evitar Joins.", c:false} ] }
        ]
    }
];
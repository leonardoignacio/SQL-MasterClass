const appData = {
    aulas: [
        {
            id: "aula1", title: "Módulo 1: Arquitetura Física (DDL)", theme: "ddl",
            teoria: {
                desafio: "A equipe de arquitetura entregou o DER de papel. O seu papel como DBA é construir fisicamente os alicerces no servidor utilizando a linguagem DDL. Você criará o Banco de Dados (Sandbox) e erguerá as tabelas. Regra de Ouro: Tabelas 'Pais' nascem antes das tabelas 'Filhas'.",
                clil: [
                    { term: "CREATE", desc: "Criar. Constrói algo novo do zero." },
                    { term: "ALTER", desc: "Alterar. Modifica uma estrutura já existente." },
                    { term: "DROP", desc: "Derrubar. Destrói completamente o arquivo e os dados." },
                    { term: "PRIMARY KEY / FOREIGN KEY", desc: "Identidade Única (PK) e Vínculo Relacional (FK)." }
                ]
            },
            praticaSetup: null,
            pratica: [
                { title: "Passo 0: A Sandbox", desc: "Crie o terreno e aponte o cursor.", label: "SQL Server", color: "bg-ddl", code: `CREATE DATABASE GestaoEscolar;\nGO\nUSE GestaoEscolar;\nGO` },
                { title: "Passo 1: Entidades Fortes (Pais)", desc: "Tabelas independentes sem FKs.", label: "SQL Server", color: "bg-ddl", code: `CREATE TABLE ALUNO (\n    id INT IDENTITY(1,1) PRIMARY KEY,\n    matricula NVARCHAR(20) UNIQUE NOT NULL,\n    nome NVARCHAR(100) NOT NULL,\n    data_nascimento DATE NOT NULL\n);\n\nCREATE TABLE DOCENTE (\n    id INT IDENTITY(1,1) PRIMARY KEY,\n    registro NVARCHAR(20) UNIQUE NOT NULL,\n    nome NVARCHAR(100) NOT NULL,\n    especialidade NVARCHAR(100) NOT NULL\n);\n\nCREATE TABLE CURSO (\n    id INT IDENTITY(1,1) PRIMARY KEY,\n    nome NVARCHAR(100) NOT NULL,\n    descricao NVARCHAR(MAX) NULL,\n    carga_horaria INT NOT NULL\n);` },
                { title: "Passo 2: Entidades Dependentes (Filhas)", desc: "Garantindo a Integridade Referencial.", label: "SQL Server", color: "bg-ddl", code: `CREATE TABLE TURMA (\n    id INT IDENTITY(1,1) PRIMARY KEY,\n    ano_semestre NVARCHAR(10) NOT NULL,\n    curso_id INT NOT NULL,\n    docente_id INT NOT NULL,\n    CONSTRAINT FK_TURMA_CURSO FOREIGN KEY (curso_id) REFERENCES CURSO(id),\n    CONSTRAINT FK_TURMA_DOCENTE FOREIGN KEY (docente_id) REFERENCES DOCENTE(id)\n);\n\nCREATE TABLE ALUNO_TURMA (\n    aluno_id INT NOT NULL,\n    turma_id INT NOT NULL,\n    data_matricula DATE DEFAULT GETDATE(),\n    nota DECIMAL(5,2) NULL, \n    faltas INT DEFAULT 0,\n    CONSTRAINT PK_ALUNO_TURMA PRIMARY KEY (aluno_id, turma_id),\n    CONSTRAINT FK_ALUNO_TURMA_ALUNO FOREIGN KEY (aluno_id) REFERENCES ALUNO(id),\n    CONSTRAINT FK_ALUNO_TURMA_TURMA FOREIGN KEY (turma_id) REFERENCES TURMA(id)\n);` }
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
                { title: "Passo 1: Inserção Singular (Pais)", desc: "Adicionamos primeiro os pais, omitindo o ID.", label: "SQL Server", color: "bg-dml", code: `INSERT INTO ALUNO (matricula, nome, data_nascimento) VALUES ('2026-001', 'Joaquim Silva', '2005-04-12');\nINSERT INTO DOCENTE (registro, nome, especialidade) VALUES ('DOC-101', 'Alan Turing', 'Algoritmos');\nINSERT INTO CURSO (nome, descricao, carga_horaria) VALUES ('Informática', 'Lógica e TI', 1200);` },
                { title: "Passo 2: Inserção Singular (Filhas)", desc: "Sabendo os IDs matemáticos (=1), matriculamos.", label: "SQL Server", color: "bg-dml", code: `INSERT INTO TURMA (ano_semestre, curso_id, docente_id) VALUES ('2026.1', 1, 1);\nINSERT INTO ALUNO_TURMA (aluno_id, turma_id, nota, faltas) VALUES (1, 1, 8.5, 0);` },
                { title: "Passo 3: Correções Pontuais (Update)", desc: "A Cláusula WHERE é o cinto de segurança!", label: "SQL Server", color: "bg-dml", code: `UPDATE ALUNO \nSET nome = 'Joaquim da Silva Júnior' \nWHERE id = 1;\n\nUPDATE DOCENTE \nSET especialidade = 'Engenharia de Dados e Algoritmos' \nWHERE id = 1;` },
                { title: "Passo 4: A Armadilha da FK", desc: "Tentar apagar um pai que tem filhos (Turmas) dá erro letal.", label: "SQL Server", color: "bg-dcl", code: `-- O banco o protegerá de deixar "Turmas Órfãs"\nDELETE FROM CURSO WHERE id = 1;` },
                { title: "Passo 5: A Exclusão Correta", desc: "Apagamos de baixo para cima.", label: "SQL Server", color: "bg-dml", code: `DELETE FROM ALUNO_TURMA WHERE turma_id = 1;\nDELETE FROM TURMA WHERE id = 1;\nDELETE FROM CURSO WHERE id = 1;` },
                { title: "Passo 6: Carga em Massa (Bulk Insert)", desc: "Múltiplos VALUES num único pulso de rede.", label: "SQL Server", color: "bg-dml", code: `INSERT INTO CURSO (nome, descricao, carga_horaria) VALUES\n('Redes', 'Infraestrutura', 1000), \n('Engenharia de Software', 'Arquitetura', 3200), \n('Ciência de Dados', 'Python e ML', 2800);` },
                { title: "Passo 7: Update Matemático", desc: "Somando apenas nas horas curtas.", label: "SQL Server", color: "bg-dml", code: `UPDATE CURSO \nSET carga_horaria = carga_horaria + 100 \nWHERE carga_horaria < 2000;` },
                { title: "Passo 8: Abertura da Transação", desc: "Inicia a bolha de segurança isolada na memória RAM.", label: "SQL Server", color: "bg-dtl", code: `BEGIN TRAN;` },
                { title: "Passo 9: O Erro Fatal do Estagiário", desc: "Atualizou tudo e esqueceu do WHERE.", label: "SQL Server", color: "bg-dcl", code: `UPDATE ALUNO_TURMA SET faltas = 0;` },
                { title: "Passo 10: Constatando a Falha", desc: "O SELECT revela que todos zeraram a falta.", label: "SQL Server", color: "bg-dql", code: `SELECT * FROM ALUNO_TURMA;` },
                { title: "Passo 11: O Botão do Pânico", desc: "Reverte a máquina do tempo no servidor.", label: "SQL Server", color: "bg-dtl", code: `ROLLBACK;` },
                { title: "Passo 12: Execução Certa e Confirmação", desc: "Respirou fundo e gravou no disco.", label: "SQL Server", color: "bg-dtl", code: `BEGIN TRAN;\n    UPDATE ALUNO_TURMA SET faltas = 0 WHERE aluno_id = 5;\nCOMMIT;` }
            ],
            retro: [
                { q: "Por que WHERE é o cinto de segurança?", a: "Por padrão, UPDATE e DELETE agem em TODAS as linhas da tabela simultaneamente. A única forma de não destruir os dados da empresa inteira é colocar a trava do WHERE indicando o ID exato." },
                { q: "Qual a vantagem absoluta do Bulk Insert?", a: "Performance. Enviar 50 conexões TCP separadas para inserir alunos trava a rede. Enviar 1 comando com 50 parênteses permite ao servidor gravar tudo num único pulso no Disco." },
                { q: "COMMIT vs ROLLBACK?", a: "Ambos finalizam a Transação. COMMIT salva a memória volátil no Disco de forma permanente. ROLLBACK joga a memória fora e devolve o banco ao passado idêntico." }
            ],
            quiz: [
                { q: "Qual a regra inegociável ao submeter UPDATE ou DELETE?", opts: [ {t:"Usar tabelas maiúsculas.", c:false}, {t:"Jamais executar sem utilizar uma cláusula WHERE para isolar o alvo.", c:true}, {t:"Usar a cláusula FROM.", c:false} ] },
                { q: "Ao deletar uma cadeia amarrada por Integridade (FK), qual a ordem?", opts: [ {t:"De cima para baixo (Pais depois Filhos).", c:false}, {t:"De baixo para cima (Filhos, livrando o Pai de amarras para apagá-lo).", c:true}, {t:"Ordem alfabética.", c:false} ] },
                { q: "O que 'UPDATE CURSO SET carga = carga + 100 WHERE carga < 2000' faz?", opts: [ {t:"Insere 100 cursos novos.", c:false}, {t:"Apaga os cursos.", c:false}, {t:"Varredura filtrando cursos menores que 2000, adicionando 100 horas aos valores existentes.", c:true} ] },
                { q: "O que BEGIN TRAN inicia?", opts: [ {t:"Um bloco de segurança isolado na RAM, não afetando o HD imediatamente.", c:true}, {t:"Transferência para nuvem.", c:false}, {t:"Bloqueio web.", c:false} ] },
                { q: "Você validou os dados na transação. Qual comando sela o trabalho no disco?", opts: [ {t:"SAVE DATA", c:false}, {t:"COMMIT", c:true}, {t:"END", c:false} ] },
                { q: "Qual o botão do pânico na transação?", opts: [ {t:"ROLLBACK", c:true}, {t:"CTRL+Z", c:false}, {t:"UNDO", c:false} ] },
                { q: "Sublinguagem de manipulação diária?", opts: [ {t:"DDL", c:false}, {t:"DML", c:true}, {t:"DCL", c:false} ] },
                { q: "Sintaxe exata do Bulk Insert?", opts: [ {t:"BULK_INSERT", c:false}, {t:"Um único INSERT INTO VALUES seguido de vários blocos de parênteses separados por vírgula.", c:true}, {t:"Múltiplos INSERTS aninhados.", c:false} ] },
                { q: "Tentar apagar Curso que possui Turmas amarradas?", opts: [ {t:"O SGBD abortará a operação, bloqueando com erro de Violação de Chave Estrangeira.", c:true}, {t:"Apaga em cascata.", c:false}, {t:"Apaga e deixa órfãs.", c:false} ] },
                { q: "Como lidar com campo IDENTITY no INSERT?", opts: [ {t:"Omite a coluna; o Servidor SQL assume a matemática da sequência.", c:true}, {t:"Query MAX+1.", c:false}, {t:"Escreve NULL.", c:false} ] }
            ]
        },
        {
            id: "aula3", title: "Módulo 3: Inteligência (DQL)", theme: "dql",
            teoria: {
                desafio: "A Diretoria não entende tabelas soltas. Ela quer gráficos, métricas e cruzamentos. Transforme os dados brutos e normalizados em Business Intelligence.",
                clil: [
                    { term: "SELECT / FROM / WHERE", desc: "Projeção, Origem, Filtro bruto." },
                    { term: "INNER / LEFT JOIN", desc: "Intersecção Perfeita / Prioridade na Esquerda." },
                    { term: "GROUP BY / HAVING", desc: "Amassar em blocos / Filtro pós-soma matemática." }
                ]
            },
            praticaSetup: {
                title: "Setup de Laboratório: Carga Massiva Inteligente (T-SQL)",
                desc: "Para treinar consultas, precisamos do volume ideal. Execute o bloco atômico do Léo que atira 50 Cursos, 50 Docentes e 50 Alunos e os matricula dinamicamente.",
                label: "SQL Server Native", labelColor: "bg-univ",
                code: `USE GestaoEscolar;\nGO\nBEGIN TRAN;\n    -- 1. Inserindo 50 Cursos\n    INSERT INTO CURSO (nome, descricao, carga_horaria) VALUES\n    ('Gestão de TI', 'Governança', 1200), ('Análise de Sistemas', 'UML', 1500), ('BD Avançado', 'Tuning', 800), ('Cloud Computing', 'AWS', 1000), ('Cyber Security', 'Defesa', 1800), ('DevOps Eng', 'Docker', 1200), ('Machine Learning', 'Preditivo', 1600), ('Deep Learning', 'Neural', 1400), ('Business Intel', 'DW', 1000), ('Big Data', 'Hadoop', 2000), ('Frontend React', 'Web', 600), ('Backend Node', 'API', 800), ('Python Dados', 'Pandas', 600), ('Java EE', 'Spring', 1200), ('C# .NET', 'Core', 1000), ('Mobile App', 'Flutter', 1400), ('UX Design', 'Figma', 800), ('Design Think', 'Inovação', 400), ('Agile Scrum', 'Agil', 300), ('Gestão Proj', 'PMBOK', 900), ('Arq Software', 'Microserv', 1500), ('QA Testes', 'Auto', 800), ('Redes CCNA', 'Cisco', 1200), ('Linux Server', 'Admin', 900), ('Windows Serv', 'AD', 900), ('Hacking', 'Pentest', 1500), ('Blockchain', 'Crypto', 600), ('IoT Sensores', 'Arduino', 1000), ('Robótica', 'CLP', 1800), ('Embarcados', 'C', 1200), ('Financeira', 'Corp', 800), ('Contábil', 'DRE', 600), ('Marketing', 'Copy', 400), ('SEO', 'Buscas', 500), ('E-commerce', 'Lojas', 800), ('Logística', 'Supply', 900), ('Direito Dig', 'LGPD', 600), ('Startups', 'Pitch', 500), ('Matemática', 'Cálculo', 1200), ('Estatística', 'Prob', 800), ('Inglês Tech', 'Leitura', 400), ('Espanhol Básico', 'Com', 400), ('Libras', 'Sinais', 300), ('Soft Skills', 'Com', 200), ('Liderança', 'Team', 600), ('IA Fundamentos', 'LLM', 1000), ('Comp Gráfica', '3D', 1500), ('Edição Vídeo', 'Adobe', 800), ('Fotografia', 'Digital', 600), ('Prompt Eng', 'GPT', 400);\n\n    -- 2. Recrutando 50 Docentes\n    INSERT INTO DOCENTE (registro, nome, especialidade) VALUES\n    ('D-01', 'Grace Hopper', 'Compiladores'), ('D-02', 'John Neumann', 'Arq'), ('D-03', 'Claude Shannon', 'Teoria Info'), ('D-04', 'Dennis Ritchie', 'SO'), ('D-05', 'Ken Thompson', 'Unix'), ('D-06', 'Bjarne Stroustrup', 'C++'), ('D-07', 'James Gosling', 'Java'), ('D-08', 'Guido Rossum', 'Python'), ('D-09', 'Brendan Eich', 'JS'), ('D-10', 'Rasmus Lerdorf', 'PHP'), ('D-11', 'Yukihiro Matsu', 'Ruby'), ('D-12', 'Anders Hejlsberg', 'C#'), ('D-13', 'Vint Cerf', 'Redes'), ('D-14', 'Bob Kahn', 'TCP'), ('D-15', 'Radia Perlman', 'STP'), ('D-16', 'Don Knuth', 'Alg'), ('D-17', 'Edsger Dijkstra', 'Grafos'), ('D-18', 'Tony Hoare', 'Sort'), ('D-19', 'Edgar Codd', 'Relacional'), ('D-20', 'Mike Stonebraker', 'PG'), ('D-21', 'Ralph Kimball', 'DW'), ('D-22', 'Bill Inmon', 'Model'), ('D-23', 'Martin Fowler', 'Patterns'), ('D-24', 'Uncle Bob', 'Clean'), ('D-25', 'Kent Beck', 'XP'), ('D-26', 'Eric Evans', 'DDD'), ('D-27', 'Jeff Sutherland', 'Scrum'), ('D-28', 'Ken Schwaber', 'Agile'), ('D-29', 'Gene Kim', 'DevOps'), ('D-30', 'Jez Humble', 'CD'), ('D-31', 'Andrew Ng', 'ML'), ('D-32', 'Yann LeCun', 'Deep'), ('D-33', 'Geoff Hinton', 'NN'), ('D-34', 'Yoshua Bengio', 'IA'), ('D-35', 'Fei-Fei Li', 'CV'), ('D-36', 'Ian Goodfellow', 'GAN'), ('D-37', 'Bruce Schneier', 'Cripto'), ('D-38', 'Kevin Mitnick', 'Sec'), ('D-39', 'Whit Diffie', 'Crypto'), ('D-40', 'Martin Hellman', 'RSA'), ('D-41', 'Jakob Nielsen', 'UX'), ('D-42', 'Don Norman', 'UI'), ('D-43', 'Steve Krug', 'Web'), ('D-44', 'Jeff Bezos', 'E-com'), ('D-45', 'Sheryl Sand', 'Ops'), ('D-46', 'Satya Nadella', 'Cloud'), ('D-47', 'Sundar Pichai', 'Prod'), ('D-48', 'Lisa Su', 'HW'), ('D-49', 'Jensen Huang', 'GPU'), ('D-50', 'Demis Hassabis', 'AGI');\n\n    -- 3. Matriculando 50 Alunos\n    INSERT INTO ALUNO (matricula, nome, data_nascimento) VALUES\n    ('A-01', 'Alice', '2004-03-12'), ('A-02', 'Breno', '2005-07-22'), ('A-03', 'Carla', '2003-11-05'), ('A-04', 'Diego', '2006-01-30'), ('A-05', 'Elisa', '2004-09-15'), ('A-06', 'Fábio', '2005-04-10'), ('A-07', 'Gabi', '2003-08-08'), ('A-08', 'Heitor', '2006-02-25'), ('A-09', 'Isis', '2004-12-01'), ('A-10', 'João', '2005-05-18'), ('A-11', 'Karen', '2003-10-10'), ('A-12', 'Léo', '2006-06-20'), ('A-13', 'Mel', '2004-01-14'), ('A-14', 'Nico', '2005-08-30'), ('A-15', 'Olivia', '2003-02-17'), ('A-16', 'Paulo', '2006-11-05'), ('A-17', 'Quinn', '2004-07-09'), ('A-18', 'Raissa', '2005-03-25'), ('A-19', 'Sam', '2003-06-12'), ('A-20', 'Tati', '2006-09-18'), ('A-21', 'Ubirajara', '2004-10-22'), ('A-22', 'Val', '2005-12-05'), ('A-23', 'Wagner', '2003-04-19'), ('A-24', 'Xuxa', '2006-07-11'), ('A-25', 'Yuri', '2004-05-02'), ('A-26', 'Zélia', '2005-01-28'), ('A-27', 'Artur', '2003-09-04'), ('A-28', 'Bruna', '2006-03-16'), ('A-29', 'Caio', '2004-11-08'), ('A-30', 'Dandara', '2005-06-14'), ('A-31', 'Enzo', '2003-12-29'), ('A-32', 'Fátima', '2006-08-03'), ('A-33', 'Gil', '2004-02-11'), ('A-34', 'Helena', '2005-10-07'), ('A-35', 'Ícaro', '2003-05-24'), ('A-36', 'Ju', '2006-04-01'), ('A-37', 'Kauan', '2004-08-12'), ('A-38', 'Lázaro', '2005-11-20'), ('A-39', 'Marina', '2003-01-05'), ('A-40', 'Neymar', '2006-02-09'), ('A-41', 'Otávio', '2004-06-25'), ('A-42', 'Paolla', '2005-09-02'), ('A-43', 'Quitéria', '2003-07-15'), ('A-44', 'Rodrigo', '2006-12-19'), ('A-45', 'Sabrina', '2004-04-08'), ('A-46', 'Tatá', '2005-05-30'), ('A-47', 'Ugo', '2003-03-03'), ('A-48', 'Vera', '2006-10-14'), ('A-49', 'Wesley', '2004-01-22'), ('A-50', 'Xamã', '2005-08-11');\n\n    -- 4. Laço Inteligente (Abre as Turmas)\n    DECLARE @c INT = (SELECT MAX(id) - 49 FROM CURSO); DECLARE @maxc INT = (SELECT MAX(id) FROM CURSO);\n    WHILE @c <= @maxc BEGIN \n        INSERT INTO TURMA (ano_semestre, curso_id, docente_id) VALUES ('2027.1', @c, @c); \n        SET @c = @c + 1; \n    END\n\n    -- 5. Laço Matemático (Matricula os alunos nas turmas com randômicos)\n    DECLARE @a INT = (SELECT MAX(id) - 49 FROM ALUNO); DECLARE @maxa INT = (SELECT MAX(id) FROM ALUNO);\n    DECLARE @t INT = (SELECT MAX(id) - 49 FROM TURMA);\n    WHILE @a <= @maxa BEGIN\n        INSERT INTO ALUNO_TURMA (aluno_id, turma_id, data_matricula, nota, faltas)\n        VALUES (@a, @t, GETDATE(), (RAND() * 10), CAST((RAND() * 5) AS INT));\n        SET @a = @a + 1; SET @t = @t + 1;\n    END\nCOMMIT;\nGO`
            },
            pratica: [
                { title: "Missão 1: A Projeção Pura", desc: "A secretaria precisa da lista contendo apenas o nome e carga horária (Evite SELECT *).", label: "DQL", color: "bg-dql", code: `SELECT nome, carga_horaria \nFROM CURSO;` },
                { title: "Missão 2: O Uso de Alias (AS)", desc: "O RH quer a lista renomeando as colunas no relatório para Codigo_Professor.", label: "DQL", color: "bg-dql", code: `SELECT registro AS Codigo_Professor, nome AS Nome_Professor \nFROM DOCENTE;` },
                { title: "Missão 3: O WHERE Básico", desc: "Ver todos os cursos com carga estritamente maior que 1000.", label: "DQL", color: "bg-dql", code: `SELECT nome, carga_horaria \nFROM CURSO \nWHERE carga_horaria > 1000;` },
                { title: "Missão 4: A Busca Exata", desc: "Identificar apenas o aluno de matrícula 'A-05'.", label: "DQL", color: "bg-dql", code: `SELECT id, matricula, nome \nFROM ALUNO \nWHERE matricula = 'A-05';` },
                { title: "Missão 5: O Range Flexível (BETWEEN)", desc: "Cursos que se encaixam entre 800 e 1200 horas.", label: "DQL", color: "bg-dql", code: `SELECT nome, carga_horaria \nFROM CURSO \nWHERE carga_horaria BETWEEN 800 AND 1200;` },
                { title: "Missão 6: Filtro SARGable de Data (AND)", desc: "Alunos nascidos estritamente no ano de 2005.", label: "DQL", color: "bg-dql", code: `SELECT matricula, nome \nFROM ALUNO \nWHERE data_nascimento >= '2005-01-01' AND data_nascimento <= '2005-12-31';` },
                { title: "Missão 7: Múltipla Escolha Rápida (IN)", desc: "Professores que focam em 'Redes' ou 'Java'.", label: "DQL", color: "bg-dql", code: `SELECT nome, especialidade \nFROM DOCENTE \nWHERE especialidade IN ('Redes', 'Java');` },
                { title: "Missão 8: Operador Condicional Lógico (OR)", desc: "Matrículas com risco: Faltas > 5 OU nota < 5.0.", label: "DQL", color: "bg-dql", code: `SELECT aluno_id, nota, faltas \nFROM ALUNO_TURMA \nWHERE faltas > 5 OR nota < 5.0;` },
                { title: "Missão 9: Pesquisa de Prefixo (LIKE)", desc: "Achar o professor cujo nome começa com 'G'.", label: "DQL", color: "bg-dql", code: `SELECT nome, especialidade \nFROM DOCENTE \nWHERE nome LIKE 'G%';` },
                { title: "Missão 10: Busca de Fragmento (LIKE)", desc: "Pesquisar 'Data' no nome OU na descrição do curso.", label: "DQL", color: "bg-dql", code: `SELECT nome, descricao \nFROM CURSO \nWHERE nome LIKE '%Data%' OR descricao LIKE '%Data%';` },
                { title: "Missão 11: A Ordenação Crescente (ASC)", desc: "Lista de chamada bruta em ordem alfabética.", label: "DQL", color: "bg-dql", code: `SELECT matricula, nome \nFROM ALUNO \nORDER BY nome ASC;` },
                { title: "Missão 12: Múltipla Ordenação Combinada", desc: "Carga horária do maior para o menor. Empates: Alfabeto.", label: "DQL", color: "bg-dql", code: `SELECT nome, carga_horaria \nFROM CURSO \nORDER BY carga_horaria DESC, nome ASC;` },
                { title: "Missão 13: Volume de Base (COUNT)", desc: "Quantos alunos absolutos possuímos?", label: "DQL", color: "bg-dql", code: `SELECT COUNT(id) AS Total_Alunos \nFROM ALUNO;` },
                { title: "Missão 14: A Média Analítica (AVG)", desc: "Qual a média exata de carga horária dos cursos?", label: "DQL", color: "bg-dql", code: `SELECT AVG(carga_horaria) AS Media_Tempo_Cursos \nFROM CURSO;` },
                { title: "Missão 15: O Cubo OLAP Raiz (GROUP BY)", desc: "Contar quantas turmas foram geradas por cada semestre.", label: "DQL", color: "bg-dql", code: `SELECT ano_semestre, COUNT(id) AS Rendimento \nFROM TURMA \nGROUP BY ano_semestre;` },
                { title: "Missão 16: O Filtro da Soma (HAVING)", desc: "Exibir a conta acima APENAS se o semestre bateu 10 turmas.", label: "DQL", color: "bg-dql", code: `SELECT ano_semestre, COUNT(id) AS Rendimento \nFROM TURMA \nGROUP BY ano_semestre \nHAVING COUNT(id) > 10;` },
                { title: "Missão 17: Boletim Primário (INNER JOIN)", desc: "Cruzar Tabela Associativa com a Base do Aluno para pegar o Nome.", label: "DQL", color: "bg-brand", code: `SELECT A.nome AS Aluno, M.nota\nFROM ALUNO_TURMA M\nINNER JOIN ALUNO A ON M.aluno_id = A.id;` },
                { title: "Missão 18: Intersecção Simples", desc: "Qual professor leciona em qual semestre?", label: "DQL", color: "bg-brand", code: `SELECT T.ano_semestre, D.nome AS Professor\nFROM TURMA T\nINNER JOIN DOCENTE D ON T.docente_id = D.id;` },
                { title: "Missão 19: O Boss Final (3 JOINs)", desc: "O Relatório definitivo amarrando Turma, Curso e Docente na mesma extração.", label: "DQL", color: "bg-brand", code: `SELECT \n    T.ano_semestre, \n    C.nome AS Nome_Curso, \n    C.carga_horaria AS Carga,\n    D.nome AS Prof_Responsavel\nFROM TURMA T\nINNER JOIN CURSO C ON T.curso_id = C.id\nINNER JOIN DOCENTE D ON T.docente_id = D.id;` },
                { title: "Missão 20: Auditoria Fria (LEFT JOIN)", desc: "Quais cursos cadastrados estão órfãos (sem turmas abertas)?", label: "DQL", color: "bg-accent", code: `-- LEFT prioriza Cursos. WHERE IS NULL acha o vazio.\nSELECT C.nome AS Curso_Ocioso, T.id AS Turma_Fantasma\nFROM CURSO C\nLEFT JOIN TURMA T ON C.id = T.curso_id\nWHERE T.id IS NULL;` }
            ],
            retro: [
                { q: "Por que o SELECT * na API Web causa quedas na Amazon?", a: "Ele varre e trafega absolutamente todas as colunas. Trazer biografia, fotos e senhas num relatório que só precisava do 'Nome' causa Full Table Scan, esgota a memória RAM e trava o servidor Node.js." },
                { q: "Como o banco diferencia WHERE e HAVING na matemática?", a: "O WHERE atua na linha isolada lida do disco ANTES de qualquer soma. O HAVING só consegue atuar em cima das 'Bolhas Matemáticas' DEPOIS que elas já foram agrupadas pelo GROUP BY." },
                { q: "O que caracteriza o mecanismo do INNER JOIN?", a: "A 'Intersecção Perfeita' (Venn). A ligação é exigente: para a linha ser impressa, a chave (ID) tem que existir com paridade em AMBAS as tabelas. Se faltar de um lado, a linha é omitida." }
            ],
            quiz: [
                { q: "O que significa a sigla vital DQL?", opts: [ {t:"Data Quality Logic.", c:false}, {t:"Data Control Language.", c:false}, {t:"Data Query Language (Linguagem de Consulta).", c:true} ] },
                { q: "Em 'SELECT X FROM Y WHERE Z', qual cláusula o processador SQL executa primeiro?", opts: [ {t:"SELECT", c:false}, {t:"WHERE", c:false}, {t:"FROM (Saber de onde extrair fisicamente).", c:true} ] },
                { q: "Como buscar nomes que terminam obrigatoriamente com 'A'?", opts: [ {t:"LIKE 'A%'", c:false}, {t:"LIKE '%A'", c:true}, {t:"= 'A'", c:false} ] },
                { q: "Para organizar da menor carga horária para a maior (Crescente):", opts: [ {t:"ORDER BY carga DESC", c:false}, {t:"ORDER BY carga ASC", c:true}, {t:"GROUP BY carga UP", c:false} ] },
                { q: "A função AVG(mensalidade) faz o quê no BI?", opts: [ {t:"Calcula a soma de todos.", c:false}, {t:"Retorna a média matemática pura dos valores processados.", c:true}, {t:"Acha o maior.", c:false} ] },
                { q: "Qual a cláusula unificadora exigida quando usamos colunas textuais junto com SUM()?", opts: [ {t:"GROUP BY (Para amassar a categoria).", c:true}, {t:"ORDER BY", c:false}, {t:"INNER CONCAT", c:false} ] },
                { q: "O INNER JOIN exige o quê no relatório?", opts: [ {t:"Traz a tabela esquerda inteira.", c:false}, {t:"Apenas duplica as tabelas.", c:false}, {t:"Correspondência exata da chave em ambas as tabelas (Intersecção estrita).", c:true} ] },
                { q: "Qual a estratégia DQL para achar Cursos 'Órfãos' (Sem Turmas vinculadas)?", opts: [ {t:"LEFT JOIN com WHERE filha.id IS NULL.", c:true}, {t:"INNER JOIN.", c:false}, {t:"RIGHT OUTER CONNECT.", c:false} ] },
                { q: "O comando 'IN ('Py', 'Java')' equivale a qual lógica extensa?", opts: [ {t:"WHERE esp = 'Py' AND esp = 'Java'.", c:false}, {t:"A pesquisa LIKE combinada.", c:false}, {t:"A junção condicional OR: WHERE esp = 'Py' OR esp = 'Java'.", c:true} ] },
                { q: "Qual a função real do AS em 'SELECT id AS Matricula'?", opts: [ {t:"Muda a estrutura física do disco.", c:false}, {t:"Fornece apenas um Apelido visual temporário pro relatório.", c:true}, {t:"Apaga dados velhos.", c:false} ] }
            ]
        },
        {
            id: "aula4", title: "Módulo 4: Segurança & DBA (DCL)", theme: "dcl",
            teoria: {
                desafio: "Você chegou à chefia de infraestrutura. A aplicação web exige acesso ao banco. Usar usuário Root expõe a empresa a hackers. Crie funções na RAM, estabeleça a muralha de Permissões (DCL) e aplique o protocolo puro de Recuperação de Desastres (Backup e Restore).",
                clil: [
                    { term: "DATEDIFF / CHARINDEX", desc: "Funções Escalares (Processamento linha por linha)." },
                    { term: "GRANT / REVOKE / DENY (DCL)", desc: "O RBAC. Dar acesso, Remover o que deu e Negar de forma Suprema." },
                    { term: "BACKUP / RESTORE / SINGLE_USER", desc: "Empacota e Derruba sessões fantasmas para Ressuscitar o banco corrompido." }
                ]
            },
            praticaSetup: null,
            pratica: [
                { title: "Missão 1: Idade Real (Função Escalar)", desc: "Calculando a diferença na CPU sem gravar estático.", label: "SQL Avançado", color: "bg-dql", code: `SELECT nome, \n       DATEDIFF(YEAR, data_nascimento, GETDATE()) AS Idade \nFROM ALUNO;` },
                { title: "Missão 2: Recorte Textual", desc: "O Marketing quer mandar e-mail usando APENAS o primeiro nome.", label: "SQL Avançado", color: "bg-dql", code: `SELECT SUBSTRING(nome, 1, CHARINDEX(' ', nome + ' ') - 1) AS P_Nome \nFROM ALUNO;` },
                { title: "Missão 3: Produtividade (Group e Filtro)", desc: "Quantas turmas fechadas os professores assumiram no ano de '2027'?", label: "SQL Avançado", color: "bg-dql", code: `SELECT D.nome AS Prof, COUNT(T.id) AS Qtd_Turmas\nFROM DOCENTE D INNER JOIN TURMA T ON D.id = T.docente_id\nWHERE T.ano_semestre LIKE '2027%'\nGROUP BY D.nome;` },
                { title: "Missão 4: Somando Carga Horária Aprovada", desc: "Engenharia de DQL pura. 4 JOINs e filtro ANTES de somar.", label: "SQL Avançado", color: "bg-dql", code: `SELECT A.nome, SUM(C.carga_horaria) AS Hrs_Aprovadas\nFROM ALUNO A\nINNER JOIN ALUNO_TURMA M ON A.id = M.aluno_id\nINNER JOIN TURMA T ON M.turma_id = T.id\nINNER JOIN CURSO C ON T.curso_id = C.id\nWHERE M.nota >= 7.0 \nGROUP BY A.nome ORDER BY Hrs_Aprovadas DESC;` },
                { title: "Missão 5: Identidade e Mapeamento", desc: "A Chave do servidor e o acesso do Banco de Dados local.", label: "DCL Server", color: "bg-dcl", code: `USE master; \nCREATE LOGIN api_web WITH PASSWORD = 'SenhaComplexa123!';\nGO\n\nUSE GestaoEscolar; \nCREATE USER usr_api FOR LOGIN api_web;\nGO` },
                { title: "Missão 6: Concessão de Poder (GRANT)", desc: "A API pode ler/escrever Alunos, mas SÓ LÊ os Cursos.", label: "DCL Server", color: "bg-dcl", code: `GRANT SELECT, INSERT, UPDATE ON ALUNO TO usr_api;\nGRANT SELECT, INSERT, UPDATE ON ALUNO_TURMA TO usr_api;\nGRANT SELECT ON CURSO TO usr_api;` },
                { title: "Missão 7: Alerta! Cortando Acessos", desc: "Bug na web detectado. Tire o poder de update e BLINDE o delete.", label: "DCL Server", color: "bg-dcl", code: `-- Apaga o Grant antigo\nREVOKE UPDATE ON ALUNO_TURMA FROM usr_api;\n\n-- A muralha de concreto invencível:\nDENY DELETE ON ALUNO TO usr_api;` },
                { title: "Missão 8: Backup Físico (.bak)", desc: "O arquivo binário com toda a DDL e DML salvador de empresas.", label: "Admin Console", color: "bg-dtl", code: `BACKUP DATABASE GestaoEscolar\nTO DISK = 'C:\\bkp_mestre.bak'\nWITH FORMAT, INIT;` },
                { title: "Missão 9: O Restore Emergencial", desc: "As API travam o arquivo. Use Single User para matá-las e sobrescrever.", label: "Admin Console", color: "bg-dtl", code: `USE master;\n-- Derruba impiedosamente os fantasmas pendurados no Windows:\nALTER DATABASE GestaoEscolar SET SINGLE_USER WITH ROLLBACK IMMEDIATE;\n\n-- Sobrescreve e joga fora o corrompido:\nRESTORE DATABASE GestaoEscolar FROM DISK = 'C:\\bkp_mestre.bak' WITH REPLACE;\n\n-- Abre pro mundo novamente:\nALTER DATABASE GestaoEscolar SET MULTI_USER;` },
                { title: "Missão 10: Schema-Only (LGPD)", desc: "Criando o esqueleto sem vazar as strings da tabela de clientes.", label: "SSMS GUI", color: "bg-ddl", code: `1. Clique Direito em GestaoEscolar > Tasks > Generate Scripts\n2. Na tela Advanced > "Types of data to script".\n3. Selecione "Schema Only".\n4. O arquivo gerado será apenas de CREATE TABLEs vazios sem risco de vazar CPFs.` }
            ],
            retro: [
                { q: "Escalar vs Agregação?", a: "Agregação (SUM) esmaga 1000 linhas gerando apenas 1 bloco financeiro final. Escalar (DATEDIFF) processa 'Linha por Linha', devolvendo o cálculo individual de cada cliente sem destruir e comprimir o painel da lista textual final." },
                { q: "A fenda técnica entre REVOKE e DENY?", a: "O REVOKE é um apagador brando: apenas tira a permissão dada; se o usuário entrar num grupo Admin amanhã, o poder volta. DENY é barreira de concreto armada: Nega para a eternidade, vencendo inclusive os privilégios máximos dos grupos corporativos." },
                { q: "Qual a necessidade física vital do SINGLE_USER no RESTORE?", a: "O SGBD mantêm o arquivo MDF travado se houver conexões. A mera presença ociosa fantasma logada de uma aba web aberta impede a formatação. O SINGLE_USER corta a rede, destrava as blindagens matando tudo e permite que o arquivo corrompido seja sobrescrito limpo pelo .BAK." }
            ],
            quiz: [
                { q: "Qual o formato de função que atua individualmente linha por linha (Ex: DATEDIFF)?", opts: [ {t:"Funções Agregadas.", c:false}, {t:"Processos DCL.", c:false}, {t:"Funções Escalares (Nativas).", c:true} ] },
                { q: "O comando DATEDIFF(YEAR, nascimento, GETDATE()) entregou qual métrica vital?", opts: [ {t:"Conversão de disco.", c:false}, {t:"O cálculo limpo e em tempo real da IDADE DO ALUNO medida entre o seu nascimento e o relógio da CPU.", c:true}, {t:"A soma dos dias letivos.", c:false} ] },
                { q: "Diferença arquitetural entre SUM e COUNT?", opts: [ {t:"SUM é matemática literal dos valores puros; COUNT é focado na quantidade limpa material de linhas.", c:true}, {t:"SUM mescla linhas em vetores.", c:false}, {t:"COUNT lê valores grandes.", c:false} ] },
                { q: "Em CHARINDEX(' ', nome), o que o motor de caracteres acha?", opts: [ {t:"Letra inicial.", c:false}, {t:"Posição matemática indexada do primeiro Vácuo/Espaço em branco (para corte).", c:true}, {t:"Apaga caracteres sujos.", c:false} ] },
                { q: "O Subconjunto DCL (GRANT, REVOKE, DENY) ampara que missão?", opts: [ {t:"Operar DDL base.", c:false}, {t:"Carga ETL massiva.", c:false}, {t:"Estabelecer as barreiras de matriz RBAC, gerenciando permissões limitantes de firewalls.", c:true} ] },
                { q: "A extensão oficial gerada num Backup Full no SQL Server é?", opts: [ {t:".sql", c:false}, {t:".db", c:false}, {t:".bak", c:true} ] },
                { q: "O que o painel SSMS entrega ao selecionarmos exportação Schema-Only?", opts: [ {t:"Um zip pesado.", c:false}, {t:"Um arquivo textual DDL com tabelas puras e vazias, sem vazar linhas de dados reais de alunos sensíveis.", c:true}, {t:"O .bak original cifrado.", c:false} ] },
                { q: "Ao rodar RESTORE, a obrigatória flag WITH REPLACE faz o quê?", opts: [ {t:"Mescla a linha corrompida com as limpas antigas.", c:false}, {t:"Obriga violentamente que o motor destrua a base corrompida logada, sobrepondo fisicamente no setor as cópias originais perfeitas salvas.", c:true}, {t:"Renomeia esquemas.", c:false} ] },
                { q: "A brutalidade do comando DENY atua como?", opts: [ {t:"Remove acesso brando temporário.", c:false}, {t:"Funciona restritivamente para SELECTS visuais.", c:false}, {t:"A Muralha. Esmaga e ignora qualquer concessão Root e grupo gerencial ativo, bloqueando irrevogavelmente.", c:true} ] },
                { q: "A Sobrevivência 1, lei irrefutável do DBA de Operações corporativo?", opts: [ {t:"Passar root para Devs ágeis.", c:false}, {t:"Apenas ative o GO-LIVE do banco em produção após assegurar e testar rigidamente Backups Físicos Full (.bak) simulando Disaster Recovery.", c:true}, {t:"Evitar o uso de Joins.", c:false} ] }
            ]
        }
    ],
    biblia: [
        {
            title: "CREATE TABLE", iconPath: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10", colorClass: "border-sys-ddl", textClass: "text-sys-ddl", bgClass: "bg-sys-ddl",
            slides: [
                { title: "Sintaxe: SQL Server", html: `<span class="code-label bg-sys-ddl">Identity</span><pre class="mb-2 text-xs">CREATE TABLE A (id INT IDENTITY(1,1) PRIMARY KEY);</pre>` },
                { title: "Sintaxe: PostgreSQL", html: `<span class="code-label bg-univ">Serial</span><pre class="mb-2 text-xs">CREATE TABLE A (id SERIAL PRIMARY KEY);</pre>` },
                { title: "Sintaxe: MySQL", html: `<span class="code-label bg-univ">Auto Increment</span><pre class="mb-2 text-xs">CREATE TABLE A (id INT AUTO_INCREMENT PRIMARY KEY);</pre>` },
                { title: "Sintaxe: Oracle", html: `<span class="code-label bg-red-700">12c+ Identity</span><pre class="mb-2 text-xs">CREATE TABLE A (id NUMBER GENERATED ALWAYS AS IDENTITY PK);</pre>` },
                { title: "Conceito (CLIL)", html: `<p class="font-mono text-sm text-sys-ddl font-bold bg-purple-50 p-2 rounded mb-2">CREATE = Criar / Construir</p><p class="text-gray-700 text-sm">O motor que aloca blocos cruciais no Disco Rígido. O abismo é o Autoincremento que muda muito na indústria.</p>` },
                { title: "Uso Prático", html: `<p class="text-gray-700 text-sm">Ponto Zero do App. Quando a Feature pede dados de "Pagamento", o DBA ergue as paredes antes da API atirar o JSON via HTTP para a base de dados.</p>` }
            ]
        },
        {
            title: "ALTER TABLE", iconPath: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z", colorClass: "border-sys-ddl", textClass: "text-sys-ddl", bgClass: "bg-sys-ddl",
            slides: [
                { title: "Sintaxe: Universal", html: `<span class="code-label bg-univ">Add + Drop Column</span><pre class="mb-2 text-xs">ALTER TABLE A ADD cpf VARCHAR(15);\nALTER TABLE A DROP COLUMN cpf;</pre>` },
                { title: "Sintaxe: SQL Server + PostgreSQL", html: `<span class="code-label bg-sys-ddl">Modificar Tipo (Type/Column)</span><pre class="mb-2 text-xs">ALTER TABLE A ALTER COLUMN nome VARCHAR(200);</pre>` },
                { title: "Sintaxe: MySQL + Oracle", html: `<span class="code-label bg-univ">Modificar Tipo Padrão</span><pre class="mb-2 text-xs">ALTER TABLE A MODIFY nome VARCHAR(200);</pre>` },
                { title: "Conceito (CLIL)", html: `<p class="font-mono text-sm text-sys-ddl font-bold bg-purple-50 p-2 rounded mb-2">ALTER = Modificar Arquitetura</p><p class="text-gray-700 text-sm">Transmuta paredes do Banco nativo em produção <strong>sem apagar 1 único bit</strong> das milhares de linhas que residem ativamente na base.</p>` },
                { title: "Uso Prático", html: `<p class="text-gray-700 text-sm">Adequação à LGPD rápida. <code>ALTER TABLE Clientes ADD Hash_Data DATE</code> é atirado ao disco sem causar interrupções pesadas no portal do e-commerce em funcionamento.</p>` }
            ]
        },
        {
            title: "DROP / TRUNCATE", iconPath: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16", colorClass: "border-sys-ddl", textClass: "text-sys-ddl", bgClass: "bg-sys-ddl",
            slides: [
                { title: "Sintaxe: Universal", html: `<span class="code-label bg-univ">A Destruição DDL</span><pre class="mb-2 text-xs">DROP TABLE Aluno; -- O arquivo base some completamente.\n\nTRUNCATE TABLE Aluno; -- Tabela continua viva, vazia e com ID zerado.</pre>` },
                { title: "Sintaxe: PostgreSQL", html: `<span class="code-label bg-univ">Força Cascata Especial</span><pre class="mb-2 text-xs">DROP TABLE Aluno CASCADE; -- Quebra relações ativas na marra.</pre>` },
                { title: "Conceito", html: `<p class="font-mono text-sm text-sys-ddl font-bold bg-purple-50 p-2 rounded mb-2">DROP = Pulverizar <br>TRUNCATE = Esvaziar Absolutamente</p><p class="text-gray-700 text-sm">O Truncate não roda varredura logando exclusões linha a linha (não gera I/O lento). Ele esvazia a lixeira num piscar de olhos e reinicia o ponteiro de ID.</p>` },
                { title: "Uso Prático", html: `<p class="text-gray-700 text-sm">Os testes em Homologação injetaram 5 milhões de cadastros lixo 'Teste_1'. O DBA atira TRUNCATE para resetar e limpar o ambiente em milissegundos para o Deploy Limpo Oficial.</p>` }
            ]
        },
        {
            title: "INSERT INTO", iconPath: "M12 4v16m8-8H4", colorClass: "border-sys-dml", textClass: "text-sys-dml", bgClass: "bg-sys-dml",
            slides: [
                { title: "Sintaxe: SQL Server + PostgreSQL + MySQL", html: `<span class="code-label bg-univ">Inserção Singular e Bulk Insert</span><pre class="mb-2 text-xs">INSERT INTO A (nome) VALUES ('X');\n\n-- Bulk de alta performance\nINSERT INTO A (nome) VALUES ('Léo'), ('Gui'), ('Dri');</pre>` },
                { title: "Sintaxe: Oracle", html: `<span class="code-label bg-red-700">Formato Restritivo Corporativo</span><pre class="mb-2 text-xs">INSERT ALL \n INTO A(n) VALUES('Léo') \n INTO A(n) VALUES('Gui') \nSELECT 1 FROM DUAL;</pre>` },
                { title: "Conceito", html: `<p class="font-mono text-sm text-sys-dml font-bold bg-green-50 p-2 rounded mb-2">INSERT = Inserir</p><p class="text-gray-700 text-sm">Cria os bytes reais. Omitir colunas configuradas no DDL como 'NOT NULL' acionará travamentos pesados na engine lançando código de erro HTTP 500 para o backend.</p>` },
                { title: "Uso Prático", html: `<p class="text-gray-700 text-sm">Você clica em 'Criar Conta'. O React dispara as Strings via POST. O Node.js empacota o JSON em comandos T-SQL INSERT. O Banco engole e guarda o novo cliente nas entranhas.</p>` }
            ]
        },
        {
            title: "UPDATE / DELETE", iconPath: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z", colorClass: "border-sys-dml", textClass: "text-sys-dml", bgClass: "bg-sys-dml",
            slides: [
                { title: "Sintaxe: Universal", html: `<span class="code-label bg-univ">A Obrigação Divina da Cláusula Onde</span><pre class="mb-2 text-xs">UPDATE Aluno SET nota = 10, faltas = 0 \nWHERE id = 1;</pre><pre class="mb-2 text-xs">DELETE FROM Aluno \nWHERE id = 1;</pre>` },
                { title: "Conceito", html: `<p class="font-mono text-sm text-sys-dml font-bold bg-green-50 p-2 rounded mb-2">UPDATE = Substituir / Modificar <br>DELETE = Arrancar as linhas</p><p class="text-gray-700 text-sm text-red-600 font-bold">O Perigo Absoluto: Ambos agem na tabela inteira por natureza. Se esquecer a trava do WHERE, seu update destruirá ou alterará o banco inteiro de uma vez.</p>` },
                { title: "Uso Prático", html: `<p class="text-gray-700 text-sm">Edição de Perfil do Insta. Quando o usuário troca a foto e salva, o código roda update apontado estritamente à PK ou Token Session ativo dele naquele momento isolado.</p>` }
            ]
        },
        {
            title: "MERGE (UPSERT)", iconPath: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4", colorClass: "border-sys-dml", textClass: "text-sys-dml", bgClass: "bg-sys-dml",
            slides: [
                { title: "Sintaxe: SQL Server + Oracle", html: `<span class="code-label bg-sys-ddl">Padrão MERGE Universal</span><pre class="mb-2 text-xs">MERGE INTO A USING (SELECT 1 id, 5 q) S \nON A.id=S.id WHEN MATCHED THEN UPDATE SET q=q+5\nWHEN NOT MATCHED THEN INSERT (id, q) VALUES (S.id, S.q);</pre>` },
                { title: "Sintaxe: PostgreSQL", html: `<span class="code-label bg-univ">A Exceção de Conflito Ativa</span><pre class="mb-2 text-xs">INSERT INTO A (id, q) VALUES (1,5)\nON CONFLICT (id) DO UPDATE SET q=A.q+5;</pre>` },
                { title: "Sintaxe: MySQL", html: `<span class="code-label bg-univ">Chave Duplicada Lógica</span><pre class="mb-2 text-xs">INSERT INTO A (id, q) VALUES (1,5)\nON DUPLICATE KEY UPDATE q=q+5;</pre>` },
                { title: "Conceito", html: `<p class="font-mono text-sm text-sys-dml font-bold bg-green-50 p-2 rounded mb-2">MERGE = Unir / Atualizar-ou-Inserir</p><p class="text-gray-700 text-sm">A "Fusão". Analisa a chave no disco ativamente. PK existente? Faz Update. Não existe? Faz Insert liso de alta performance na raiz do hardware.</p>` },
                { title: "Uso Prático", html: `<p class="text-gray-700 text-sm">ETL de logística gigante cruzando produtos que chegam no contêiner. Se é reposição da camisa velha, soma estoque (Update). Se for calça nova, injeta na prateleira na raiz (Insert).</p>` }
            ]
        },
        {
            title: "SELECT / WHERE", iconPath: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", colorClass: "border-sys-dql", textClass: "text-sys-dql", bgClass: "bg-sys-dql",
            slides: [
                { title: "Sintaxe: Padrão Universal ANSI", html: `<span class="code-label bg-univ">A Base DQL Operacional de Busca</span><pre class="mb-2 text-xs">SELECT DISTINCT nome, vl_mensal \nFROM TABELA\nWHERE status = 'ATIVO' \n  AND vl_mensal BETWEEN 10 AND 50 \n  AND nome LIKE '%Engenharia%'\nORDER BY vl_mensal DESC, nome ASC;</pre>` },
                { title: "Conceito", html: `<p class="font-mono text-sm text-sys-dql font-bold bg-blue-50 p-2 rounded mb-2">SELECT = Projetar / Mostrar. <br>WHERE = Filtragem crua.</p><p class="text-gray-700 text-sm">DISTINCT retira as duplicações textuais soltas lidas no Array de resposta para a Web (limpa poluição de painéis).</p>` },
                { title: "Uso Prático", html: `<p class="text-gray-700 text-sm">Tela financeira extraindo os "Contratos Fechados Hoje". Toda plataforma web usa a flexibilidade do 'LIKE' ou do 'BETWEEN' em seus endpoints de busca (Searches) em Python.</p>` }
            ]
        },
        {
            title: "JOINs", iconPath: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1", colorClass: "border-sys-dql", textClass: "text-sys-dql", bgClass: "bg-sys-dql",
            slides: [
                { title: "Sintaxe: INNER JOIN", html: `<span class="code-label bg-univ">Paridade Estrita e Perfeita (Match Exato)</span><pre class="mb-2 text-xs">SELECT A.x FROM T1 A INNER JOIN T2 B ON A.id=B.id;</pre>` },
                { title: "Sintaxe: LEFT JOIN", html: `<span class="code-label bg-univ">A Base Completa e Auditoria</span><pre class="mb-2 text-xs">-- Traz a T1 inteira + NULL nas falhas da tabela Direita\nSELECT A.x FROM T1 A LEFT JOIN T2 B ON A.id=B.id;\n\n-- Acha Cursos Sem Turmas (Órfãos Auditáveis)\nSELECT A.x FROM T1 A LEFT JOIN T2 B ON A.id=B.id WHERE B.id IS NULL;</pre>` },
                { title: "Conceito", html: `<p class="font-mono text-sm text-sys-dql font-bold bg-blue-50 p-2 rounded mb-2">JOIN = Juntar / Colar lado a lado. <br>ON = Vínculo Referencial.</p><p class="text-gray-700 text-sm">Quebra prateleiras isoladas (tabelas) e funde as colunas utilizando a inteligência exata e a igualdade da Chave Estrangeira com a Chave Primária ativas.</p>` },
                { title: "Uso Prático", html: `<p class="text-gray-700 text-sm">O banco não salva Nomes imensos no boleto, salva "ID=9". O JOIN roda na impressão para buscar o texto cru do "ID=9" e preencher a Nota Fiscal Visual na tela do caixa no shopping.</p>` }
            ]
        },
        {
            title: "GROUP BY / HAVING", iconPath: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z", colorClass: "border-sys-dql", textClass: "text-sys-dql", bgClass: "bg-sys-dql",
            slides: [
                { title: "Sintaxe: Padrão Universal", html: `<span class="code-label bg-univ">Engenharia de Métricas de BI OLAP</span><pre class="mb-2 text-xs">SELECT cat, \n  SUM(valor) AS Total, \n  COUNT(id) AS Vols\nFROM Vendas\nWHERE ano = 2026 -- Atua nas linhas soltas puras primeiro\nGROUP BY cat -- Amassa tudo em blocos lógicos rígidos\nHAVING SUM(valor) > 100; -- Filtra apenas APÓS o cálculo central!</pre>` },
                { title: "Conceito", html: `<p class="font-mono text-sm text-sys-dql font-bold bg-blue-50 p-2 rounded mb-2">GROUP BY = Esmagar em pacotes. <br>HAVING = Cortar o agrupamento.</p><p class="text-gray-700 text-sm">O HAVING é o 'WHERE' dos dados matematicamente unidos. O banco dará erro de compilação lógico irreversível se você escrever 'WHERE SUM(valor) > 10'.</p>` },
                { title: "Uso Prático", html: `<p class="text-gray-700 text-sm">Dashboards de Gráficos de Pizza ou Colunas em PowerBI e Tableau leem e rodam exatamente essa arquitetura nativa para compactar e renderizar de forma rápida 5 milhões de linhas.</p>` }
            ]
        },
        {
            title: "LIMIT / TOP", iconPath: "M4 6h16M4 10h16M4 14h16M4 18h16", colorClass: "border-sys-dql", textClass: "text-sys-dql", bgClass: "bg-sys-dql",
            slides: [
                { title: "Sintaxe: SQL Server", html: `<span class="code-label bg-sys-ddl">O Topo Base Antigo e o Paginador Nativo Moderno</span><pre class="mb-2 text-xs">SELECT TOP 10 * FROM A ORDER BY v DESC;\n\n-- Paginador Web Moderno Oficial (Com pulos paramétricos):\nSELECT * FROM A ORDER BY v OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY;</pre>` },
                { title: "Sintaxe: PostgreSQL + MySQL", html: `<span class="code-label bg-univ">Framework Aberto e Direto (Limit offset)</span><pre class="mb-2 text-xs">SELECT * FROM A ORDER BY v LIMIT 10 OFFSET 10;</pre>` },
                { title: "Sintaxe: Oracle", html: `<span class="code-label bg-red-700">Comando Restrito 12c</span><pre class="mb-2 text-xs">SELECT * FROM A FETCH FIRST 10 ROWS ONLY;</pre>` },
                { title: "Conceito (CLIL)", html: `<p class="font-mono text-sm text-sys-dql font-bold bg-blue-50 p-2 rounded mb-2">LIMIT / TOP = Poda Brutal de Exibição <br>OFFSET = Pulo/Ignorar saltos passados.</p><p class="text-gray-700 text-sm">A ferramenta com a maior confusão de sintaxe mundial. Corta o tráfego absurdo pela rede.</p>` },
                { title: "Uso Prático", html: `<p class="text-gray-700 text-sm">A consulta na Cloud traz e injeta "LIMIT 20" num carrinho online. Quando o cliente clica em "Ver Próxima Página", o React roda "OFFSET 20 LIMIT 20", poupando 99% da memória RAM do aparelho.</p>` }
            ]
        },
        {
            title: "UNION / EXCEPT", iconPath: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z", colorClass: "border-sys-dql", textClass: "text-sys-dql", bgClass: "bg-sys-dql",
            slides: [
                { title: "Sintaxe: Padrão Universal (UNION)", html: `<span class="code-label bg-univ">Empilhamento Absoluto Base Vertical</span><pre class="mb-2 text-xs">-- Empilha e esmaga ativamente as duplicatas sujas\nSELECT em FROM Lista_BR \nUNION\nSELECT em FROM Lista_US;\n\n-- Empilha rápido, cru e cego, ignorando os repetidos:\nSELECT em FROM Lista_BR UNION ALL SELECT em FROM Lista_US;</pre>` },
                { title: "Sintaxe: SQL Server + PostgreSQL + MySQL", html: `<span class="code-label bg-univ">Corte Lógico Exclusivo (EXCEPT)</span><pre class="mb-2 text-xs">-- Acha quem está na Lista A, mas arranca e omite quem está na B \nSELECT em FROM Vips EXCEPT SELECT em FROM Banned;</pre>` },
                { title: "Sintaxe: Oracle", html: `<span class="code-label bg-red-700">Subtração Diferenciada Oracle (MINUS)</span><pre class="mb-2 text-xs">SELECT em FROM Vips MINUS SELECT em FROM Banned;</pre>` },
                { title: "Conceito", html: `<p class="font-mono text-sm text-sys-dql font-bold bg-blue-50 p-2 rounded mb-2">UNION = Juntar em Altura Y. <br>EXCEPT = Cortar Exceção Material.</p><p class="text-gray-700 text-sm">Contrário ao relacional lateral dos JOINs, aqui colamos linhas embaixo das outras. Regra Letal: As colunas cruzadas das duas queries precisam ser idênticas matematicamente!</p>` },
                { title: "Uso Prático", html: `<p class="text-gray-700 text-sm">Gerar mala direta universal do C-Level. Ele funde a Tabela_Insta com a Tabela_X. O UNION mata automaticamente quem logou duplicado salvando o Python de fazer loops e arranjos chatos de exclusão de Array.</p>` }
            ]
        },
        {
            title: "WINDOW FUNCS", iconPath: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", colorClass: "border-sys-dql", textClass: "text-sys-dql", bgClass: "bg-sys-dql",
            slides: [
                { title: "Sintaxe: Padrão Moderno ANSI", html: `<span class="code-label bg-univ">O Santo Graal da Senioridade de Dados</span><pre class="mb-2 text-xs">-- WITH (CTE) cria a variavel limpa sem subquery suja\nWITH BaseRel AS (\n  SELECT nome, turma_id, nota,\n  -- Janela Lógica (Sem esmagar matriz base real):\n  ROW_NUMBER() OVER(\n    PARTITION BY turma_id ORDER BY nota DESC\n  ) AS Rank_Turma_Interno\n  FROM Avaliacoes\n)\nSELECT * FROM BaseRel WHERE Rank_Turma_Interno <= 3;</pre>` },
                { title: "Conceito", html: `<p class="font-mono text-sm text-sys-dql font-bold bg-blue-50 p-2 rounded mb-2">OVER = Sobre o bloco isolado. <br>PARTITION = Fatiar o bloco</p><p class="text-gray-700 text-sm">Faz a matemática analítica densa do Group By (Médias, Rankings, Somas correntes) mas PRESERVA as milhões de linhas originais sem esmagamento letal na tabela real exibida.</p>` },
                { title: "Uso Prático", html: `<p class="text-gray-700 text-sm">A diretoria quer o Ranking do "Top 3 de Cada Setor Isolado". O GROUP BY falha miseravelmente nisso. A Função de Janela fatia a tabela crua em 'Janelas Setoriais' e numera o ranking interno isolado 1,2,3.</p>` }
            ]
        },
        {
            title: "GRANT / DENY", iconPath: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", colorClass: "border-sys-dcl", textClass: "text-sys-dcl", bgClass: "bg-sys-dcl",
            slides: [
                { title: "Sintaxe: Segurança Universal", html: `<span class="code-label bg-univ">Concessão e Remoção Dinâmica Plena</span><pre class="mb-2 text-xs">GRANT SELECT, UPDATE ON Aluno TO usr_api;\nREVOKE UPDATE ON Aluno FROM usr_api;</pre>` },
                { title: "Sintaxe: SQL Server (Muralha)", html: `<span class="code-label bg-sys-ddl">O Bloqueio Absoluto do Motor Microsoft (Não Permite Brechas)</span><pre class="mb-2 text-xs">-- O DENY se sobrepõe cruamente e rigorosamente a todos os demais grants e poderes do usuário ativo.\nDENY DELETE ON Aluno TO usr_api;</pre>` },
                { title: "Conceito", html: `<p class="font-mono text-sm text-sys-dcl font-bold bg-red-50 p-2 rounded mb-2">GRANT = Autorizar a Chave. <br>DENY = Bloqueio Letal Supremo de Hardwall.</p><p class="text-gray-700 text-sm">A Matrix do RBAC. Nenhuma aplicação usa ROOT no sistema vivo. Privilégios lógicos são fatiados em instâncias atômicas.</p>` },
                { title: "Uso Prático", html: `<p class="text-gray-700 text-sm">Se um atacante invasor PHP rodar <code>DROP TABLE Alunos</code> na requisição mascarada externa solta da API... o Kernel físico cego da máquina barra o erro e cospe <code>Permissão Negada por DCL</code> e salva a empresa global.</p>` }
            ]
        },
        {
            title: "TRANSACTIONS", iconPath: "M13 10V3L4 14h7v7l9-11h-7z", colorClass: "border-sys-dtl", textClass: "text-sys-dtl", bgClass: "bg-sys-dtl",
            slides: [
                { title: "Sintaxe: SQL Server", html: `<span class="code-label bg-sys-dtl">MS SQL Padrão Crítico Sênior</span><pre class="mb-2 text-xs">BEGIN TRAN;\n  UPDATE Contas SET v = v - 100 WHERE c = 1;\n  -- SAVE TRAN Bkp1; (Ponto de break de restauração local solta)\n  UPDATE Contas SET v = v + 100 WHERE c = 2;\nCOMMIT; -- Ou o Botão do Pânico Absoluto: ROLLBACK;</pre>` },
                { title: "Sintaxe: PostgreSQL + MySQL", html: `<span class="code-label bg-univ">Bancos Open Source (Mundo Linux/Unix)</span><pre class="mb-2 text-xs">START TRANSACTION; -- Opcionalmente inicia com START\n  UPDATE ...\nCOMMIT;</pre>` },
                { title: "Conceito", html: `<p class="font-mono text-sm text-sys-dtl font-bold bg-orange-50 p-2 rounded mb-2">A Bolha Atômica (Arquitetura ACID Pura)</p><p class="text-gray-700 text-sm">Envolve operações críticas em uma camada de memória RAM flutuante. Ou tudo ocorre 100% (Commit), ou a engine atira o trabalho e a RAM lixo fora (Rollback) sem gerar tabelas vazias soltas físicas reais.</p>` },
                { title: "Uso Prático", html: `<p class="text-gray-700 text-sm">O PIX. Tira valor do João (Update 1). Adiciona valor no saldo de Maria (Update 2). Se a energia falhar antes do Update 2 finalizar... o Rollback cancela tudo, impedindo que o João perca grana limpa à toa na rede do servidor bancário.</p>` }
            ]
        },
        {
            title: "BACKUPS / DB", iconPath: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4", colorClass: "border-sys-dcl", textClass: "text-sys-dcl", bgClass: "bg-sys-dcl",
            slides: [
                { title: "Sintaxe: SQL Server", html: `<span class="code-label bg-sys-dtl">T-SQL Físico Interno da Engine</span><pre class="mb-2 text-xs">BACKUP DATABASE BD_Matriz TO DISK='C:\\base_full.bak' WITH INIT;\n\n-- Restore impiedoso com expulsão ativa do Single User e Destruição via Replace atômico:\nALTER DATABASE BD_Matriz SET SINGLE_USER WITH ROLLBACK IMMEDIATE;\nRESTORE DATABASE BD_Matriz FROM DISK='C:\\base.bak' WITH REPLACE;\nALTER DATABASE BD_Matriz SET MULTI_USER;</pre>` },
                { title: "Sintaxe: PostgreSQL + MySQL", html: `<span class="code-label bg-univ">Terminal Externo (BASH Linux Padrão Global)</span><pre class="mb-2 text-xs"># Fora do Banco, pelo terminal prompt de CMD:\npg_dump -U admin_usr BD_Matriz > bkp.sql\nmysqldump -u root -p BD_Matriz > bkp.sql\n\n# O Restore exige injeção na raiz solta ativa da linha de prompt cmd terminal:\npsql -U admin_usr BD_Limpo < bkp.sql</pre>` },
                { title: "Conceito", html: `<p class="font-mono text-sm text-sys-dcl font-bold bg-red-50 p-2 rounded mb-2">BACKUP = A Cópia Mestre Física. <br>RESTORE = Resgate</p><p class="text-gray-700 text-sm">Bancos proprietários injetam a máquina de backup crua no próprio código puro visual do SQL. O mundo Linux open source exige os utilitários do Kernel BASH para operar a injeção via Shell Textual Orgânico Solto.</p>` },
                { title: "Uso Prático", html: `<p class="text-gray-700 text-sm">O desastre cruzado solto atômico local do ransomware infectou toda as máquinas cruas. O DBA expulsa de uma vez todo mundo (Single User), e usa o REPLACE bruto e severo para matar o arquivo infectado e destruir na hora a corrupção solta com uma sobreposição perfeita da imagem de Backup .bak gerada lindamente de forma fiel ontem as 03:00 da madrugada local.</p>` }
            ]
        }
    ]
};
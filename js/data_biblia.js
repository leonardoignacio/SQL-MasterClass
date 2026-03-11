const appDataBiblia = [
    {
        title: "CREATE TABLE", iconPath: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10", colorClass: "border-sys-ddl", textClass: "text-sys-ddl", bgClass: "bg-sys-ddl",
        slides: [
            { title: "Sintaxe: SQL Server", html: `<span class="code-label bg-sys-ddl">SQL Server</span><pre class="mb-2 text-xs">CREATE TABLE A (\n  id INT IDENTITY(1,1) PRIMARY KEY,\n  nome VARCHAR(100) NOT NULL\n);</pre>` },
            { title: "Sintaxe: PostgreSQL", html: `<span class="code-label bg-univ">PostgreSQL</span><pre class="mb-2 text-xs">CREATE TABLE A (\n  id SERIAL PRIMARY KEY,\n  nome VARCHAR(100) NOT NULL\n);</pre>` },
            { title: "Sintaxe: MySQL", html: `<span class="code-label bg-univ">MySQL</span><pre class="mb-2 text-xs">CREATE TABLE A (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  nome VARCHAR(100) NOT NULL\n);</pre>` },
            { title: "Sintaxe: Oracle", html: `<span class="code-label bg-red-700">Oracle</span><pre class="mb-2 text-xs">CREATE TABLE A (\n  id NUMBER GENERATED ALWAYS AS IDENTITY PK,\n  nome VARCHAR2(100) NOT NULL\n);</pre>` },
            { title: "Conceito (CLIL)", html: `<p class="font-mono text-sm text-sys-ddl font-bold bg-purple-50 p-2 rounded mb-2">CREATE = Criar / Construir</p><p class="text-gray-700 text-sm">O motor estrutural base que aloca blocos e setores vazios cruciais diretamente no Disco Rígido. O maior abismo de concorrência e quebra de código no mercado corporativo atual é a declaração de Autoincrementos (IDENTITY x SERIAL x AUTO_INCREMENT).</p>` },
            { title: "Uso Prático (Mundo Real)", html: `<p class="text-gray-700 text-sm">Ponto Zero e fundação absoluta de qualquer aplicação. Quando o time de desenvolvimento Front-end lança a feature nova de "Carrinho de Compras", o DBA precisa necessariamente rodar este comando para construir o recipiente no disco antes que o Node.js comece a atirar os JSONs de transações da web.</p>` }
        ]
    },
    {
        title: "ALTER TABLE", iconPath: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z", colorClass: "border-sys-ddl", textClass: "text-sys-ddl", bgClass: "bg-sys-ddl",
        slides: [
            { title: "Sintaxe: Add/Drop Column", html: `<span class="code-label bg-univ">SQL Server + PostgreSQL + MySQL + Oracle</span><pre class="mb-2 text-xs">ALTER TABLE A ADD cpf VARCHAR(15);\nALTER TABLE A DROP COLUMN cpf;</pre>` },
            { title: "Sintaxe: Modificar Tipo", html: `<span class="code-label bg-sys-ddl">SQL Server + PostgreSQL</span><pre class="mb-2 text-xs">ALTER TABLE A ALTER COLUMN nome VARCHAR(200);</pre>` },
            { title: "Sintaxe: Modificar Tipo Padrão", html: `<span class="code-label bg-univ">MySQL + Oracle</span><pre class="mb-2 text-xs">ALTER TABLE A MODIFY nome VARCHAR(200);</pre>` },
            { title: "Conceito (CLIL)", html: `<p class="font-mono text-sm text-sys-ddl font-bold bg-purple-50 p-2 rounded mb-2">ALTER = Modificar Arquitetura</p><p class="text-gray-700 text-sm">Comando DDL cirúrgico de alto nível. Transmuta as paredes do Banco nativo em produção sem apagar 1 único bit das milhares de linhas e cadastros que já residem ativamente na base de dados.</p>` },
            { title: "Uso Prático (Mundo Real)", html: `<p class="text-gray-700 text-sm">Adequação à LGPD rápida. A lei exigiu Data de Aceite. Você não deleta o banco. O código <code>ALTER TABLE Clientes ADD Hash_Data DATE</code> é atirado ao disco acoplando a coluna e salvando o negócio sem causar interrupções pesadas ou downtime no portal de e-commerce.</p>` }
        ]
    },
    {
        title: "DROP / TRUNCATE", iconPath: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16", colorClass: "border-sys-ddl", textClass: "text-sys-ddl", bgClass: "bg-sys-ddl",
        slides: [
            { title: "Sintaxe: A Destruição DDL", html: `<span class="code-label bg-univ">SQL Server + PostgreSQL + MySQL + Oracle</span><pre class="mb-2 text-xs">DROP TABLE Aluno; -- O arquivo base some completamente.\n\nTRUNCATE TABLE Aluno; -- Tabela continua viva e em pé, porém vazia e com ID zerado.</pre>` },
            { title: "Sintaxe: Força Cascata Especial", html: `<span class="code-label bg-univ">PostgreSQL</span><pre class="mb-2 text-xs">DROP TABLE Aluno CASCADE; -- Quebra relações ativas na marra ignorando a proteção.</pre>` },
            { title: "Conceito (CLIL)", html: `<p class="font-mono text-sm text-sys-ddl font-bold bg-purple-50 p-2 rounded mb-2">DROP = Pulverizar <br>TRUNCATE = Esvaziar Absolutamente</p><p class="text-gray-700 text-sm">O Truncate é veloz porque não roda a varredura logando exclusões linha a linha na memória (não gera I/O lento de DML). Ele apenas reseta os ponteiros físicos do disco e esvazia a lixeira num piscar de olhos.</p>` },
            { title: "Uso Prático (Mundo Real)", html: `<p class="text-gray-700 text-sm">Os robôs de testes em Homologação injetaram 5 milhões de cadastros lixo 'Teste_1' e travaram a máquina. Um 'DELETE' comum demoraria 2 horas para apagar. O DBA atira um <code>TRUNCATE</code> e limpa o ambiente em 1 milissegundo exato.</p>` }
        ]
    },
    {
        title: "INSERT INTO", iconPath: "M12 4v16m8-8H4", colorClass: "border-sys-dml", textClass: "text-sys-dml", bgClass: "bg-sys-dml",
        slides: [
            { title: "Sintaxe: Inserção Bulk", html: `<span class="code-label bg-univ">SQL Server + PostgreSQL + MySQL</span><pre class="mb-2 text-xs">-- Bulk Insert (Múltiplo Desempenho Elevado)\nINSERT INTO A (nome) VALUES ('Léo'), ('Gui'), ('Dri');</pre>` },
            { title: "Sintaxe: Formato Restrito", html: `<span class="code-label bg-red-700">Oracle</span><pre class="mb-2 text-xs">-- Oracle System Clássico exige uso da tabela genérica DUAL\nINSERT ALL \n INTO A(n) VALUES('Léo') \n INTO A(n) VALUES('Dri') \nSELECT 1 FROM DUAL;</pre>` },
            { title: "Conceito (CLIL)", html: `<p class="font-mono text-sm text-sys-dml font-bold bg-green-50 p-2 rounded mb-2">INSERT INTO = Inserir / Adicionar</p><p class="text-gray-700 text-sm">Cria e acopla as folhas de bytes reais atômicos no fim das gavetas ativas. O banco exige compatibilidade de DataTypes rigorosa, se mandar String no campo Int a query colapsa.</p>` },
            { title: "Uso Prático (Mundo Real)", html: `<p class="text-gray-700 text-sm">Você clica no botão verde 'Criar Conta'. O React dispara as Strings. O Node.js mapeia e empacota o JSON num comando T-SQL <code>INSERT INTO</code>. O Banco engole a instrução e grava definitivamente o novo cliente nas entranhas da máquina.</p>` }
        ]
    },
    {
        title: "UPDATE / DELETE", iconPath: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z", colorClass: "border-sys-dml", textClass: "text-sys-dml", bgClass: "bg-sys-dml",
        slides: [
            { title: "Sintaxe: A Obrigação do WHERE", html: `<span class="code-label bg-univ">SQL Server + PostgreSQL + MySQL + Oracle</span><pre class="mb-2 text-xs">UPDATE Aluno SET nota = 10, status = 'Ok' \nWHERE id_matricula = 1;\n\nDELETE FROM Aluno \nWHERE id_matricula = 1;</pre>` },
            { title: "Conceito (CLIL)", html: `<p class="font-mono text-sm text-sys-dml font-bold bg-green-50 p-2 rounded mb-2">UPDATE = Substituir / Modificar <br>DELETE = Arrancar as linhas ativas</p><p class="text-gray-700 text-sm text-red-600 font-bold">O Perigo Absoluto e a Regra do DBA: Ambos agem varrendo a tabela inteira. Se você esquecer a trava WHERE para isolar a chave, seu update matará os saldos de todas as contas da API.</p>` },
            { title: "Uso Prático (Mundo Real)", html: `<p class="text-gray-700 text-sm">A tela de 'Edição de Perfil' do usuário logado. Quando ele troca o E-mail e aperta Salvar, o código no Backend roda um UPDATE apontado estritamente e exclusivamente para a String do Token Session ativo dele, preservando o resto da plataforma.</p>` }
        ]
    },
    {
        title: "MERGE (UPSERT)", iconPath: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4", colorClass: "border-sys-dml", textClass: "text-sys-dml", bgClass: "bg-sys-dml",
        slides: [
            { title: "Sintaxe: MERGE Nativo", html: `<span class="code-label bg-sys-ddl">SQL Server + Oracle</span><pre class="mb-2 text-xs">MERGE INTO A USING (SELECT 1 id, 5 q) S \nON A.id=S.id \nWHEN MATCHED THEN UPDATE SET q=q+5\nWHEN NOT MATCHED THEN INSERT (id,q) VALUES (S.id,S.q);</pre>` },
            { title: "Sintaxe: Exceção de Conflito", html: `<span class="code-label bg-univ">PostgreSQL</span><pre class="mb-2 text-xs">INSERT INTO A (id, q) VALUES (1,5)\nON CONFLICT (id) DO UPDATE SET q=A.q+5;</pre>` },
            { title: "Sintaxe: Chave Duplicada Lógica", html: `<span class="code-label bg-univ">MySQL</span><pre class="mb-2 text-xs">INSERT INTO A (id, q) VALUES (1,5)\nON DUPLICATE KEY UPDATE q=q+5;</pre>` },
            { title: "Conceito (CLIL)", html: `<p class="font-mono text-sm text-sys-dml font-bold bg-green-50 p-2 rounded mb-2">MERGE / UPSERT = Unir e Mesclar as origens</p><p class="text-gray-700 text-sm">A 'Fusão Atômica'. Uma inteligência brutal. Analisa a chave no disco ativamente: Se a PK existe na base, faz Update seguro. Se não existe, faz um Insert liso de alta performance.</p>` },
            { title: "Uso Prático (Mundo Real)", html: `<p class="text-gray-700 text-sm">ETL de logística gigantesco importando containers. O robô atira o arquivo. Se a TV já estava cadastrada, o comando soma o estoque (Update). Se é um modelo novo recém chegado, injeta o produto na prateleira na raiz (Insert).</p>` }
        ]
    },
    {
        title: "SELECT / WHERE", iconPath: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", colorClass: "border-sys-dql", textClass: "text-sys-dql", bgClass: "bg-sys-dql",
        slides: [
            { title: "Sintaxe: A Base DQL Operacional", html: `<span class="code-label bg-univ">SQL Server + PostgreSQL + MySQL + Oracle</span><pre class="mb-2 text-xs">SELECT DISTINCT curso_nome, vl_mensal \nFROM TABELA\nWHERE status = 'ATIVO' \n  AND vl_mensal BETWEEN 10 AND 50 \n  AND nome LIKE '%Data%'\nORDER BY vl_mensal DESC;</pre>` },
            { title: "Conceito (CLIL)", html: `<p class="font-mono text-sm text-sys-dql font-bold bg-blue-50 p-2 rounded mb-2">SELECT = Projetar / Mostrar na tela. <br>WHERE = Filtro Condicional Bruto.</p><p class="text-gray-700 text-sm">O DISTINCT esmaga duplicações textuais soltas e repetidas, limpando poluição no Array de resposta. A DQL é a pedra angular da operação visual de relatórios.</p>` },
            { title: "Uso Prático (Mundo Real)", html: `<p class="text-gray-700 text-sm">Toda a tela financeira de relatórios ou endpoints de pesquisa no celular extraindo os 'Contratos Fechados Hoje' roda em cima de um bloco Select estruturado pelo Arquiteto de Software e empacotado no Backend.</p>` }
        ]
    },
    {
        title: "JOINs", iconPath: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1", colorClass: "border-sys-dql", textClass: "text-sys-dql", bgClass: "bg-sys-dql",
        slides: [
            { title: "Sintaxe: Paridade Estrita", html: `<span class="code-label bg-univ">SQL Server + PostgreSQL + MySQL + Oracle</span><pre class="mb-2 text-xs">SELECT A.x FROM T1 A INNER JOIN T2 B ON A.id = B.id;</pre>` },
            { title: "Sintaxe: Prioridade à Esquerda", html: `<span class="code-label bg-univ">SQL Server + PostgreSQL + MySQL + Oracle</span><pre class="mb-2 text-xs">SELECT A.x FROM T1 A LEFT JOIN T2 B ON A.id = B.id;\n\n-- Isolando órfãos (buracos via NULL)\nSELECT A.x FROM T1 A LEFT JOIN T2 B ON A.id = B.id WHERE B.id IS NULL;</pre>` },
            { title: "Conceito (CLIL)", html: `<p class="font-mono text-sm text-sys-dql font-bold bg-blue-50 p-2 rounded mb-2">JOIN = Juntar as paredes laterais. <br>ON = Vínculo Lógico e Físico de Chaves.</p><p class="text-gray-700 text-sm">Funde colunas utilizando a inteligência exata da igualdade da Chave Estrangeira. O INNER exige casamento rígido, enquanto o LEFT permite vazios lógicos preenchidos com NULL.</p>` },
            { title: "Uso Prático (Mundo Real)", html: `<p class="text-gray-700 text-sm">O banco não salva Nomes imensos na Tabela de Vendas pra poupar HD, ele salva apenas 'ID=9'. O comando JOIN vai ativamente na tabela Pai buscar a String (O texto do nome) do 'ID=9' e exibe legível no PDF da fatura.</p>` }
        ]
    },
    {
        title: "GROUP BY / HAVING", iconPath: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z", colorClass: "border-sys-dql", textClass: "text-sys-dql", bgClass: "bg-sys-dql",
        slides: [
            { title: "Sintaxe: Métricas OLAP", html: `<span class="code-label bg-univ">SQL Server + PostgreSQL + MySQL + Oracle</span><pre class="mb-2 text-xs">SELECT cat, SUM(val) AS Soma \nFROM Vendas\nWHERE ano = 2026 -- Onde atua cru nas linhas puras\nGROUP BY cat -- Amassa tudo em blocos coesos orgânicos\nHAVING SUM(val) > 100; -- Filtra e ceifa blocos apenas APÓS o cálculo!</pre>` },
            { title: "Conceito (CLIL)", html: `<p class="font-mono text-sm text-sys-dql font-bold bg-blue-50 p-2 rounded mb-2">GROUP BY = Esmagar em categorias. <br>HAVING = O WHERE das matrizes agregadas.</p><p class="text-gray-700 text-sm">O HAVING atua em cima da bolha matemática pronta. O banco dará um erro de compilação irreversível se você tentar forçar um 'WHERE SUM(valor) > 10' no motor DQL.</p>` },
            { title: "Uso Prático (Mundo Real)", html: `<p class="text-gray-700 text-sm">A engrenagem do BI Operacional. Painéis e Dashboards de Gráficos de Pizza do PowerBI do Diretor bebem exclusivamente desta arquitetura nativa para compactar e renderizar de forma fluida 5 milhões de compras.</p>` }
        ]
    },
    {
        title: "LIMIT / TOP", iconPath: "M4 6h16M4 10h16M4 14h16M4 18h16", colorClass: "border-sys-dql", textClass: "text-sys-dql", bgClass: "bg-sys-dql",
        slides: [
            { title: "Sintaxe: Topo e Paginador", html: `<span class="code-label bg-sys-ddl">SQL Server</span><pre class="mb-2 text-xs">SELECT TOP 10 * FROM A ORDER BY v DESC;\n\n-- Paginador Web Seguro Moderno:\nSELECT * FROM A ORDER BY v OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY;</pre>` },
            { title: "Sintaxe: Offset / Limit Livre", html: `<span class="code-label bg-univ">PostgreSQL + MySQL</span><pre class="mb-2 text-xs">SELECT * FROM A ORDER BY v LIMIT 10 OFFSET 10;</pre>` },
            { title: "Sintaxe: Fetch 12c", html: `<span class="code-label bg-red-700">Oracle</span><pre class="mb-2 text-xs">SELECT * FROM A FETCH FIRST 10 ROWS ONLY;</pre>` },
            { title: "Conceito (CLIL)", html: `<p class="font-mono text-sm text-sys-dql font-bold bg-blue-50 p-2 rounded mb-2">LIMIT / TOP = Poda Brutal <br>OFFSET = Avanço / Pulo de Matriz.</p><p class="text-gray-700 text-sm">A ferramenta que mais difere na base sintática corporativa mundial. Protege a rede ativamente de tentar empurrar relatórios infinitos e travar o I/O do aparelho logado.</p>` },
            { title: "Uso Prático (Mundo Real)", html: `<p class="text-gray-700 text-sm">Você busca 'Tênis' na Amazon. A API do Node.js atira <code>LIMIT 15</code>. Ao clicar na 'Página 2', ela aciona inteligentemente o <code>OFFSET 15 LIMIT 15</code> poupando agressivamente a memória RAM do seu celular.</p>` }
        ]
    },
    {
        title: "UNION / EXCEPT", iconPath: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z", colorClass: "border-sys-dql", textClass: "text-sys-dql", bgClass: "bg-sys-dql",
        slides: [
            { title: "Sintaxe: Empilhar (UNION)", html: `<span class="code-label bg-univ">SQL Server + PostgreSQL + MySQL + Oracle</span><pre class="mb-2 text-xs">-- Empilha e esmaga as duplicatas\nSELECT email FROM BR UNION SELECT email FROM US;\n\n-- Empilha cru e super rápido ignorando checagem:\nSELECT email FROM BR UNION ALL SELECT email FROM US;</pre>` },
            { title: "Sintaxe: Subtração", html: `<span class="code-label bg-univ">SQL Server + PostgreSQL + MySQL</span><pre class="mb-2 text-xs">SELECT email FROM Geral EXCEPT SELECT email FROM Banned;</pre>` },
            { title: "Sintaxe: Subtração Oracle", html: `<span class="code-label bg-red-700">Oracle</span><pre class="mb-2 text-xs">SELECT email FROM Geral MINUS SELECT email FROM Banned;</pre>` },
            { title: "Conceito (CLIL)", html: `<p class="font-mono text-sm text-sys-dql font-bold bg-blue-50 p-2 rounded mb-2">UNION = Empilhar em Y. <br>EXCEPT = Cortar Exceções.</p><p class="text-gray-700 text-sm">Ao contrário do JOIN, esse comando empilha (cola verticalmente). A regra rígida: As colunas lidas nas duas queries DEVEM possuir o mesmo Tipo e Quantidade matemática.</p>` },
            { title: "Uso Prático (Mundo Real)", html: `<p class="text-gray-700 text-sm">O Diretor de Marketing exigiu fundir a base de Leads do Instagram de 2023 com a base da Feira de 2024. A extração usando UNION esmaga no meio do caminho quem logou repetido nas duas listas, poupando a equipe de criar loops sujos em Javascript.</p>` }
        ]
    },
    {
        title: "WINDOW FUNCS", iconPath: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", colorClass: "border-sys-dql", textClass: "text-sys-dql", bgClass: "bg-sys-dql",
        slides: [
            { title: "Sintaxe: A Variável CTE e Janela", html: `<span class="code-label bg-univ">SQL Server + PostgreSQL + MySQL + Oracle</span><pre class="mb-2 text-xs">-- A CTE (WITH) atua como Variável de Tabela na RAM\nWITH Temp AS (\n  SELECT nome, turma_id, nota,\n  ROW_NUMBER() OVER(PARTITION BY turma_id ORDER BY nota DESC) AS Rank\n  FROM Provas\n)\nSELECT * FROM Temp WHERE Rank <= 3;</pre>` },
            { title: "Conceito (CLIL)", html: `<p class="font-mono text-sm text-sys-dql font-bold bg-blue-50 p-2 rounded mb-2">OVER = Sobre o Bloco. <br>PARTITION = Janela de Fatiamento.</p><p class="text-gray-700 text-sm">A ferramenta Divina do Sênior. Faz a matemática densa (Rankings, Médias em linha) MAS preserva visivelmente os registros originais flutuantes sem esmagar tudo num grupo (Ode ao Group By).</p>` },
            { title: "Uso Prático (Mundo Real)", html: `<p class="text-gray-700 text-sm">O sistema web pede um extrato detalhando os 'Top 3 Alunos de CADA Turma Ativa isolada'. O Partition quebra a tabela em micro-janelas e aplica a ordem de classificação sem perder os textos do Nome na resposta da tela.</p>` }
        ]
    },
    {
        title: "GRANT / DENY", iconPath: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", colorClass: "border-sys-dcl", textClass: "text-sys-dcl", bgClass: "bg-sys-dcl",
        slides: [
            { title: "Sintaxe: Dar e Retirar", html: `<span class="code-label bg-univ">SQL Server + PostgreSQL + MySQL + Oracle</span><pre class="mb-2 text-xs">GRANT SELECT, UPDATE ON Base TO usr_api;\nREVOKE UPDATE ON Base FROM usr_api;</pre>` },
            { title: "Sintaxe: A Barreira Absoluta", html: `<span class="code-label bg-sys-ddl">SQL Server</span><pre class="mb-2 text-xs">DENY DELETE ON Base TO usr_api;</pre>` },
            { title: "Conceito (CLIL)", html: `<p class="font-mono text-sm text-sys-dcl font-bold bg-red-50 p-2 rounded mb-2">GRANT = Autorizar. <br>DENY = A Parede de Bloqueio Letal.</p><p class="text-gray-700 text-sm">O controle cibernético da DCL define que nenhuma aplicação que se preze carrega as credenciais ROOT. Privilégios são controlados no kernel da matriz.</p>` },
            { title: "Uso Prático (Mundo Real)", html: `<p class="text-gray-700 text-sm">A aplicação sofre Injeção SQL de um hacker tentando apagar a tabela. Mas o DBA estruturou o DCL com restrições; a máquina nativa cospe 'Permissão Negada' e as linhas de usuários continuam intactas no hardware.</p>` }
        ]
    },
    {
        title: "TRANSACTIONS", iconPath: "M13 10V3L4 14h7v7l9-11h-7z", colorClass: "border-sys-dtl", textClass: "text-sys-dtl", bgClass: "bg-sys-dtl",
        slides: [
            { title: "Sintaxe: Padrão Sênior", html: `<span class="code-label bg-sys-dtl">SQL Server</span><pre class="mb-2 text-xs">BEGIN TRAN;\n  UPDATE Contas SET val = val - 100 WHERE id=1;\n  -- SAVE TRAN Ponto; (Breakpoint limpo!)\n  UPDATE Contas SET val = val + 100 WHERE id=2;\nCOMMIT; -- Ou ROLLBACK p/ explodir erro</pre>` },
            { title: "Sintaxe: Open Source", html: `<span class="code-label bg-univ">PostgreSQL + MySQL</span><pre class="mb-2 text-xs">START TRANSACTION;\n  UPDATE ...\nCOMMIT;</pre>` },
            { title: "Conceito (CLIL)", html: `<p class="font-mono text-sm text-sys-dtl font-bold bg-orange-50 p-2 rounded mb-2">A Bolha Atômica (ACID)</p><p class="text-gray-700 text-sm">Envolve atualizações sensíveis em uma ramificação paralela de memória RAM. Ou tudo ocorre perfeitamente (Commit), ou a máquina joga tudo fora sem salvar lixo (Rollback).</p>` },
            { title: "Uso Prático (Mundo Real)", html: `<p class="text-gray-700 text-sm">Nas entranhas da transferência bancária de PIX. Tira o montante (Update 1). Atira no destino ativo (Update 2). Se o servidor da nuvem piscar de energia... o Rollback cancela o primeiro expurgo antes do dinheiro sumir.</p>` }
        ]
    },
    {
        title: "BACKUPS / DB", iconPath: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4", colorClass: "border-sys-dcl", textClass: "text-sys-dcl", bgClass: "bg-sys-dcl",
        slides: [
            { title: "Sintaxe: Script Nativo (.bak)", html: `<span class="code-label bg-sys-dtl">SQL Server</span><pre class="mb-2 text-xs">BACKUP DATABASE DB TO DISK='C:\\base.bak' WITH INIT;\n\nALTER DATABASE DB SET SINGLE_USER WITH ROLLBACK IMMEDIATE;\nRESTORE DATABASE DB FROM DISK='C:\\base.bak' WITH REPLACE;\nALTER DATABASE DB SET MULTI_USER;</pre>` },
            { title: "Sintaxe: Terminal Externo BASH", html: `<span class="code-label bg-univ">PostgreSQL + MySQL</span><pre class="mb-2 text-xs">pg_dump -U admin BD > bkp.sql\n\n# Recuperar injetando atômico via Shell:\npsql -U admin BD_Novo < bkp.sql</pre>` },
            { title: "Conceito (CLIL)", html: `<p class="font-mono text-sm text-sys-dcl font-bold bg-red-50 p-2 rounded mb-2">BACKUP = A Cópia Master. <br>RESTORE = Resgate impiedoso</p><p class="text-gray-700 text-sm">Bancos proprietários injetam a máquina de backup no próprio código T-SQL visual. O mundo aberto exige a injeção fria via Shell Textual do sistema operacional.</p>` },
            { title: "Uso Prático (Mundo Real)", html: `<p class="text-gray-700 text-sm">A rotina CRON roda toda a madrugada gravando uma cópia fotográfica blindada na Azure. Se o servidor for atacado ao meio-dia, o DBA destrói a base infectada na força com o REPLACE e sobrepõe a vida salva do dia anterior.</p>` }
        ]
    }
];
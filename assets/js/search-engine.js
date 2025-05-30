<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>07-search-engine.js - Motor de Busca Avançado</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@300;400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
    <style>
        * { font-family: 'Inter', sans-serif; }
        .code-font { font-family: 'Fira Code', monospace; }
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .glass-card { 
            background: rgba(255, 255, 255, 0.95); 
            backdrop-filter: blur(20px); 
            border: 1px solid rgba(255, 255, 255, 0.2); 
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1); 
        }
        .code-block {
            background: #1a1a1a;
            border-radius: 12px;
            padding: 20px;
            overflow-x: auto;
            border-left: 4px solid #667eea;
            margin: 20px 0;
        }
        .syntax-keyword { color: #ff79c6; }
        .syntax-function { color: #50fa7b; }
        .syntax-string { color: #f1fa8c; }
        .syntax-comment { color: #6272a4; font-style: italic; }
        .syntax-number { color: #bd93f9; }
        .syntax-operator { color: #ff79c6; }
        .feature-card {
            transition: all 0.3s ease;
            border-left: 4px solid transparent;
        }
        .feature-card:hover {
            border-left-color: #667eea;
            transform: translateX(5px);
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.2);
        }
        .method-badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
        }
        .method-search { background: #dcfce7; color: #166534; }
        .method-render { background: #dbeafe; color: #1e40af; }
        .method-process { background: #fef3c7; color: #92400e; }
        .method-export { background: #f3e8ff; color: #7c3aed; }
    </style>
</head>
<body class="gradient-bg min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <!-- Header -->
        <div class="glass-card rounded-2xl p-8 mb-8">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold text-gray-800 mb-2">
                        <i class="fas fa-search text-blue-600 mr-3"></i>
                        07-search-engine.js
                    </h1>
                    <p class="text-gray-600">Motor de Busca Avançado - MC Consultoria</p>
                    <div class="flex items-center space-x-4 mt-4">
                        <span class="method-badge method-search">Busca Múltipla</span>
                        <span class="method-badge method-render">Renderização</span>
                        <span class="method-badge method-process">Processamento</span>
                        <span class="method-badge method-export">Exportação</span>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-sm text-gray-500 mb-2">Versão 2.0</div>
                    <div class="text-sm text-gray-500">Sistema Otimizado</div>
                </div>
            </div>
        </div>

        <!-- Features Overview -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="feature-card glass-card rounded-xl p-6">
                <div class="text-center">
                    <i class="fas fa-filter text-3xl text-blue-600 mb-4"></i>
                    <h3 class="font-semibold text-gray-800 mb-2">Filtros Múltiplos</h3>
                    <p class="text-sm text-gray-600">Suporte aos novos campos expandidos</p>
                </div>
            </div>
            <div class="feature-card glass-card rounded-xl p-6">
                <div class="text-center">
                    <i class="fas fa-clock text-3xl text-green-600 mb-4"></i>
                    <h3 class="font-semibold text-gray-800 mb-2">Timeout Control</h3>
                    <p class="text-sm text-gray-600">Controle inteligente de timeouts</p>
                </div>
            </div>
            <div class="feature-card glass-card rounded-xl p-6">
                <div class="text-center">
                    <i class="fas fa-chart-bar text-3xl text-purple-600 mb-4"></i>
                    <h3 class="font-semibold text-gray-800 mb-2">Renderização</h3>
                    <p class="text-sm text-gray-600">Otimizada para grandes datasets</p>
                </div>
            </div>
            <div class="feature-card glass-card rounded-xl p-6">
                <div class="text-center">
                    <i class="fas fa-download text-3xl text-orange-600 mb-4"></i>
                    <h3 class="font-semibold text-gray-800 mb-2">Exportação</h3>
                    <p class="text-sm text-gray-600">CSV, Excel e formatos diversos</p>
                </div>
            </div>
        </div>

        <!-- Main Code -->
        <div class="glass-card rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">
                <i class="fas fa-code text-blue-600 mr-3"></i>
                Código Completo
            </h2>

            <div class="code-block code-font text-sm">
<pre><span class="syntax-comment">// =====================================
// 🔍 MOTOR DE BUSCA AVANÇADO MC CONSULTORIA
// Sistema otimizado para filtros múltiplos e nova estrutura de dados
// =====================================</span>

<span class="syntax-keyword">const</span> <span class="syntax-function">Search</span> = {
    <span class="syntax-comment">// =====================================
    // 🎯 COLETA DE FILTROS EXPANDIDA
    // =====================================</span>
    <span class="syntax-function">getFilters</span>() {
        <span class="syntax-function">Debug</span>.<span class="syntax-function">log</span>(<span class="syntax-string">'🔍 Iniciando coleta de filtros expandidos...'</span>, <span class="syntax-string">'info'</span>);
        
        <span class="syntax-comment">// Sincronizar estado primeiro</span>
        <span class="syntax-function">FilterManager</span>.<span class="syntax-function">syncState</span>();
        
        <span class="syntax-comment">// Validação dupla: checkbox vs estado</span>
        <span class="syntax-keyword">const</span> modalidadeCheckboxes = <span class="syntax-function">document</span>.<span class="syntax-function">querySelectorAll</span>(<span class="syntax-string">'input[name="modalidade"]:checked'</span>);
        <span class="syntax-keyword">const</span> tipologiaCheckboxes = <span class="syntax-function">document</span>.<span class="syntax-function">querySelectorAll</span>(<span class="syntax-string">'input[name="tipologia"]:checked'</span>);
        
        <span class="syntax-keyword">const</span> modalidades = <span class="syntax-function">AppState</span>.activeFilters.modalidades;
        <span class="syntax-keyword">const</span> tipologias = <span class="syntax-function">AppState</span>.activeFilters.tipologias;
        
        <span class="syntax-comment">// Filtros básicos</span>
        <span class="syntax-keyword">const</span> dataInicio = <span class="syntax-function">document</span>.<span class="syntax-function">getElementById</span>(<span class="syntax-string">'dataInicio'</span>)?.<span class="syntax-function">value</span> || <span class="syntax-string">''</span>;
        <span class="syntax-keyword">const</span> dataFim = <span class="syntax-function">document</span>.<span class="syntax-function">getElementById</span>(<span class="syntax-string">'dataFim'</span>)?.<span class="syntax-function">value</span> || <span class="syntax-string">''</span>;
        <span class="syntax-keyword">const</span> valorMinimo = <span class="syntax-function">document</span>.<span class="syntax-function">getElementById</span>(<span class="syntax-string">'valorMinimo'</span>)?.<span class="syntax-function">value</span> || <span class="syntax-string">''</span>;
        <span class="syntax-keyword">const</span> valorMaximo = <span class="syntax-function">document</span>.<span class="syntax-function">getElementById</span>(<span class="syntax-string">'valorMaximo'</span>)?.<span class="syntax-function">value</span> || <span class="syntax-string">''</span>;
        <span class="syntax-keyword">const</span> estado = <span class="syntax-function">document</span>.<span class="syntax-function">getElementById</span>(<span class="syntax-string">'estado'</span>)?.<span class="syntax-function">value</span> || <span class="syntax-string">''</span>;
        
        <span class="syntax-comment">// 🆕 NOVOS FILTROS EXPANDIDOS</span>
        <span class="syntax-keyword">const</span> municipio = <span class="syntax-function">document</span>.<span class="syntax-function">getElementById</span>(<span class="syntax-string">'municipio'</span>)?.<span class="syntax-function">value</span> || <span class="syntax-string">''</span>;
        <span class="syntax-keyword">const</span> modoDisputa = <span class="syntax-function">document</span>.<span class="syntax-function">getElementById</span>(<span class="syntax-string">'modo_disputa'</span>)?.<span class="syntax-function">value</span> || <span class="syntax-string">''</span>;
        <span class="syntax-keyword">const</span> anoCompra = <span class="syntax-function">document</span>.<span class="syntax-function">getElementById</span>(<span class="syntax-string">'ano_compra'</span>)?.<span class="syntax-function">value</span> || <span class="syntax-string">''</span>;
        <span class="syntax-keyword">const</span> controlePncp = <span class="syntax-function">document</span>.<span class="syntax-function">getElementById</span>(<span class="syntax-string">'controle_pncp'</span>)?.<span class="syntax-function">value</span> || <span class="syntax-string">''</span>;
        <span class="syntax-keyword">const</span> numeroCompraOrgao = <span class="syntax-function">document</span>.<span class="syntax-function">getElementById</span>(<span class="syntax-string">'numero_compra_orgao'</span>)?.<span class="syntax-function">value</span> || <span class="syntax-string">''</span>;
        
        <span class="syntax-comment">// Montagem do objeto de filtros expandido</span>
        <span class="syntax-keyword">const</span> filters = {};
        
        <span class="syntax-comment">// Arrays sempre incluídos</span>
        filters.modalidades = modalidades;
        filters.tipologias = tipologias;
        
        <span class="syntax-comment">// Filtros condicionais básicos</span>
        <span class="syntax-keyword">if</span> (dataInicio) filters.dataInicio = dataInicio;
        <span class="syntax-keyword">if</span> (dataFim) filters.dataFim = dataFim;
        <span class="syntax-keyword">if</span> (valorMinimo && !<span class="syntax-function">isNaN</span>(<span class="syntax-function">parseFloat</span>(valorMinimo))) {
            filters.valorMinimo = <span class="syntax-function">parseFloat</span>(valorMinimo);
        }
        <span class="syntax-keyword">if</span> (valorMaximo && !<span class="syntax-function">isNaN</span>(<span class="syntax-function">parseFloat</span>(valorMaximo))) {
            filters.valorMaximo = <span class="syntax-function">parseFloat</span>(valorMaximo);
        }
        <span class="syntax-keyword">if</span> (estado) filters.estado = estado;
        
        <span class="syntax-comment">// 🆕 NOVOS FILTROS CONDICIONAIS</span>
        <span class="syntax-keyword">if</span> (municipio) filters.municipio = municipio;
        <span class="syntax-keyword">if</span> (modoDisputa) filters.modo_disputa = modoDisputa;
        <span class="syntax-keyword">if</span> (anoCompra && !<span class="syntax-function">isNaN</span>(<span class="syntax-function">parseInt</span>(anoCompra))) {
            filters.ano_compra = <span class="syntax-function">parseInt</span>(anoCompra);
        }
        <span class="syntax-keyword">if</span> (controlePncp) filters.controle_pncp = controlePncp;
        <span class="syntax-keyword">if</span> (numeroCompraOrgao) filters.numero_compra_orgao = numeroCompraOrgao;
        
        <span class="syntax-comment">// Log detalhado expandido</span>
        <span class="syntax-function">Debug</span>.<span class="syntax-function">log</span>(<span class="syntax-string">'🎯 FILTROS EXPANDIDOS COLETADOS:'</span>, <span class="syntax-string">'success'</span>, {
            basicos: {
                modalidades: modalidades.length,
                tipologias: tipologias.length,
                dataInicio, dataFim, valorMinimo, valorMaximo, estado
            },
            expandidos: {
                municipio, modoDisputa, anoCompra, controlePncp, numeroCompraOrgao
            },
            objetoFinal: filters
        });
        
        <span class="syntax-keyword">return</span> filters;
    },
    
    <span class="syntax-comment">// =====================================
    // 🚀 EXECUÇÃO DE BUSCA OTIMIZADA
    // =====================================</span>
    <span class="syntax-keyword">async</span> <span class="syntax-function">execute</span>(page = <span class="syntax-number">1</span>) {
        <span class="syntax-keyword">if</span> (<span class="syntax-function">AppState</span>.searchInProgress) {
            <span class="syntax-function">Debug</span>.<span class="syntax-function">log</span>(<span class="syntax-string">'Busca já em andamento, ignorando nova requisição'</span>, <span class="syntax-string">'warning'</span>);
            <span class="syntax-keyword">return</span>;
        }
        
        <span class="syntax-function">AppState</span>.searchInProgress = <span class="syntax-keyword">true</span>;
        <span class="syntax-function">AppState</span>.currentPage = page;
        
        <span class="syntax-function">Performance</span>.<span class="syntax-function">start</span>(<span class="syntax-string">'Busca com Filtros Expandidos'</span>);
        <span class="syntax-function">Debug</span>.<span class="syntax-function">log</span>(<span class="syntax-string">`🚀 Iniciando busca expandida - Página: ${page}`</span>, <span class="syntax-string">'info'</span>);
        
        <span class="syntax-comment">// UI Updates</span>
        <span class="syntax-function">UI</span>.<span class="syntax-function">showLoader</span>(<span class="syntax-string">'searchBtn'</span>);
        <span class="syntax-function">UI</span>.elements.statsSection.<span class="syntax-function">classList</span>.<span class="syntax-function">remove</span>(<span class="syntax-string">'hidden'</span>);
        <span class="syntax-function">UI</span>.elements.chartsSection.<span class="syntax-function">classList</span>.<span class="syntax-function">remove</span>(<span class="syntax-string">'hidden'</span>);
        <span class="syntax-function">UI</span>.elements.resultsSection.<span class="syntax-function">classList</span>.<span class="syntax-function">remove</span>(<span class="syntax-string">'hidden'</span>);
        
        <span class="syntax-keyword">const</span> filters = <span class="syntax-keyword">this</span>.<span class="syntax-function">getFilters</span>();
        <span class="syntax-keyword">const</span> requestBody = {
            filters: filters,
            page: <span class="syntax-function">AppState</span>.currentPage,
            limit: <span class="syntax-function">AppState</span>.pageSize,
            sortBy: <span class="syntax-function">AppState</span>.currentSort.column,
            sortOrder: <span class="syntax-function">AppState</span>.currentSort.order
        };
        
        <span class="syntax-function">Debug</span>.<span class="syntax-function">log</span>(<span class="syntax-string">'📤 ENVIANDO REQUISIÇÃO EXPANDIDA:'</span>, <span class="syntax-string">'info'</span>, requestBody);
        
        <span class="syntax-keyword">try</span> {
            <span class="syntax-keyword">const</span> response = <span class="syntax-keyword">await</span> <span class="syntax-keyword">this</span>.<span class="syntax-function">fetchWithTimeout</span>(<span class="syntax-function">CONFIG</span>.ENDPOINTS.CONSULTA, {
                method: <span class="syntax-string">'POST'</span>,
                headers: { <span class="syntax-string">'Content-Type'</span>: <span class="syntax-string">'application/json'</span> },
                body: <span class="syntax-function">JSON</span>.<span class="syntax-function">stringify</span>(requestBody)
            }, <span class="syntax-function">CONFIG</span>.TIMEOUTS.SEARCH);
            
            <span class="syntax-keyword">const</span> responseText = <span class="syntax-keyword">await</span> response.<span class="syntax-function">text</span>();
            <span class="syntax-function">Debug</span>.<span class="syntax-function">log</span>(<span class="syntax-string">'📥 Resposta recebida'</span>, <span class="syntax-string">'info'</span>, { 
                status: response.status, 
                size: responseText.length 
            });
            
            <span class="syntax-keyword">if</span> (!response.ok) {
                <span class="syntax-keyword">throw</span> <span class="syntax-keyword">new</span> <span class="syntax-function">Error</span>(<span class="syntax-string">`Erro na API: ${response.status}`</span>);
            }
            
            <span class="syntax-keyword">let</span> data;
            <span class="syntax-keyword">try</span> {
                data = <span class="syntax-function">JSON</span>.<span class="syntax-function">parse</span>(responseText);
            } <span class="syntax-keyword">catch</span> (e) {
                <span class="syntax-keyword">throw</span> <span class="syntax-keyword">new</span> <span class="syntax-function">Error</span>(<span class="syntax-string">'Resposta inválida do servidor'</span>);
            }
            
            <span class="syntax-comment">// Processar resposta com nova estrutura</span>
            <span class="syntax-keyword">const</span> results = <span class="syntax-keyword">this</span>.<span class="syntax-function">extractResults</span>(data);
            <span class="syntax-keyword">const</span> stats = <span class="syntax-keyword">this</span>.<span class="syntax-function">extractExpandedStats</span>(data);
            <span class="syntax-keyword">const</span> total = stats.total || <span class="syntax-function">AppState</span>.totalItems;
            
            <span class="syntax-function">AppState</span>.totalItems = total;
            <span class="syntax-function">AppState</span>.allResults = results;
            <span class="syntax-function">AppState</span>.filteredResults = results;
            
            <span class="syntax-comment">// Renderizar dados</span>
            <span class="syntax-keyword">this</span>.<span class="syntax-function">renderExpandedResults</span>(results);
            <span class="syntax-keyword">this</span>.<span class="syntax-function">renderExpandedStats</span>(stats);
            
            <span class="syntax-comment">// Atualizar gráficos</span>
            <span class="syntax-keyword">const</span> distribution = data.distribution || stats.distribution || {};
            <span class="syntax-function">Charts</span>.<span class="syntax-function">update</span>(distribution);
            
            <span class="syntax-keyword">this</span>.<span class="syntax-function">renderPagination</span>();
            
            <span class="syntax-keyword">const</span> duration = <span class="syntax-function">Performance</span>.<span class="syntax-function">end</span>(<span class="syntax-string">'Busca com Filtros Expandidos'</span>);
            <span class="syntax-function">AppState</span>.lastSearchTime = duration;
            
            <span class="syntax-function">UI</span>.<span class="syntax-function">updateQuickStats</span>(total, stats.valorTotal, <span class="syntax-function">Math</span>.<span class="syntax-function">round</span>(duration));
            <span class="syntax-function">UI</span>.<span class="syntax-function">updateLastUpdate</span>();
            
            <span class="syntax-function">Debug</span>.<span class="syntax-function">log</span>(<span class="syntax-string">'🎉 Busca expandida concluída'</span>, <span class="syntax-string">'success'</span>, {
                resultados: results.length,
                total: total,
                tempo: <span class="syntax-string">`${Math.round(duration)}ms`</span>,
                novosFields: {
                    municipios: stats.totalMunicipios,
                    estados: stats.totalEstados,
                    anos: stats.totalAnos
                }
            });
            
        } <span class="syntax-keyword">catch</span> (error) {
            <span class="syntax-function">Performance</span>.<span class="syntax-function">end</span>(<span class="syntax-string">'Busca com Filtros Expandidos'</span>);
            <span class="syntax-function">Debug</span>.<span class="syntax-function">log</span>(<span class="syntax-string">`❌ Erro na busca: ${error.message}`</span>, <span class="syntax-string">'error'</span>);
            <span class="syntax-function">UI</span>.elements.resultsTableBody.innerHTML = <span class="syntax-string">`&lt;tr&gt;&lt;td colspan="8" class="text-center py-10 text-red-500"&gt;❌ Erro: ${error.message}&lt;/td&gt;&lt;/tr&gt;`</span>;
        } <span class="syntax-keyword">finally</span> {
            <span class="syntax-function">UI</span>.<span class="syntax-function">hideLoader</span>(<span class="syntax-string">'searchBtn'</span>);
            <span class="syntax-function">AppState</span>.searchInProgress = <span class="syntax-keyword">false</span>;
        }
    },
    
    <span class="syntax-comment">// =====================================
    // 📊 EXTRAÇÃO DE ESTATÍSTICAS EXPANDIDAS
    // =====================================</span>
    <span class="syntax-function">extractExpandedStats</span>(data) {
        <span class="syntax-keyword">const</span> stats = data.stats || data.estatisticas || {};
        
        <span class="syntax-keyword">return</span> {
            totalLicitacoes: stats.totalLicitacoes || stats.total_licitacoes || <span class="syntax-number">0</span>,
            valorTotal: stats.valorTotal || stats.valor_total || <span class="syntax-number">0</span>,
            valorMedio: stats.valorMedio || stats.valor_medio || <span class="syntax-number">0</span>,
            totalCompradores: stats.totalCompradores || stats.total_compradores || <span class="syntax-number">0</span>,
            
            <span class="syntax-comment">// 🆕 NOVAS ESTATÍSTICAS EXPANDIDAS</span>
            totalMunicipios: stats.totalMunicipios || stats.total_municipios || <span class="syntax-number">0</span>,
            totalEstados: stats.totalEstados || stats.total_estados || <span class="syntax-number">0</span>,
            totalModosDisputa: stats.totalModosDisputa || stats.total_modos_disputa || <span class="syntax-number">0</span>,
            totalAnos: stats.totalAnos || stats.total_anos || <span class="syntax-number">0</span>,
            anoMaisAntigo: stats.anoMaisAntigo || stats.ano_mais_antigo || <span class="syntax-number">0</span>,
            anoMaisRecente: stats.anoMaisRecente || stats.ano_mais_recente || <span class="syntax-number">0</span>,
            
            distribution: stats.distribution || {},
            total: stats.totalLicitacoes || stats.total_licitacoes || <span class="syntax-number">0</span>
        };
    },
    
    <span class="syntax-comment">// =====================================
    // 🎨 RENDERIZAÇÃO DE RESULTADOS EXPANDIDA
    // =====================================</span>
    <span class="syntax-function">renderExpandedResults</span>(results) {
        <span class="syntax-function">UI</span>.elements.resultsTableBody.innerHTML = <span class="syntax-string">''</span>;
        
        <span class="syntax-keyword">if</span> (!results || results.length === <span class="syntax-number">0</span>) {
            <span class="syntax-function">UI</span>.elements.resultsTableBody.innerHTML = <span class="syntax-string">'&lt;tr&gt;&lt;td colspan="8" class="text-center py-10 text-gray-500"&gt;📄 Nenhum resultado encontrado.&lt;/td&gt;&lt;/tr&gt;'</span>;
            <span class="syntax-function">UI</span>.elements.resultsCount.textContent = <span class="syntax-string">'0 resultados'</span>;
            <span class="syntax-keyword">return</span>;
        }
        
        results.<span class="syntax-function">forEach</span>(item =&gt; {
            <span class="syntax-keyword">const</span> row = <span class="syntax-function">document</span>.<span class="syntax-function">createElement</span>(<span class="syntax-string">'tr'</span>);
            row.className = <span class="syntax-string">'table-row border-b border-gray-100 fade-in'</span>;
            
            <span class="syntax-comment">// Campos básicos</span>
            <span class="syntax-keyword">const</span> modalidade = item.modalidade || <span class="syntax-string">'-'</span>;
            <span class="syntax-keyword">const</span> comprador = item.comprador || <span class="syntax-string">'-'</span>;
            <span class="syntax-keyword">const</span> objeto = item.objeto || <span class="syntax-string">'-'</span>;
            <span class="syntax-keyword">const</span> valor = item.valor || <span class="syntax-number">0</span>;
            <span class="syntax-keyword">const</span> abertura = item.abertura || <span class="syntax-string">''</span>;
            <span class="syntax-keyword">const</span> tipologia = item.tipologia_oficial || item.tipologia || <span class="syntax-string">'-'</span>;
            <span class="syntax-keyword">const</span> link = item.link_edital || item.link || <span class="syntax-string">''</span>;
            
            <span class="syntax-comment">// 🆕 NOVOS CAMPOS EXPANDIDOS</span>
            <span class="syntax-keyword">const</span> municipio = item.municipio || <span class="syntax-string">'-'</span>;
            <span class="syntax-keyword">const</span> modoDisputa = item.modo_disputa || <span class="syntax-string">'-'</span>;
            <span class="syntax-keyword">const</span> anoCompra = item.ano_compra || <span class="syntax-string">'-'</span>;
            
            row.innerHTML = <span class="syntax-string">`
                &lt;td class="px-4 py-3 text-sm"&gt;${modalidade}&lt;/td&gt;
                &lt;td class="px-4 py-3 text-sm max-w-xs truncate" title="${comprador}"&gt;${comprador}&lt;/td&gt;
                &lt;td class="px-4 py-3 text-sm max-w-xs truncate" title="${objeto}"&gt;${objeto}&lt;/td&gt;
                &lt;td class="px-4 py-3 text-sm font-medium"&gt;${UI.formatCurrency(valor)}&lt;/td&gt;
                &lt;td class="px-4 py-3 text-sm"&gt;${UI.formatDate(abertura)}&lt;/td&gt;
                &lt;td class="px-4 py-3 text-sm"&gt;${tipologia}&lt;/td&gt;
                &lt;td class="px-4 py-3 text-sm"&gt;${municipio}&lt;/td&gt;
                &lt;td class="px-4 py-3 text-sm"&gt;
                    ${link ? \`&lt;a href="${link}" target="_blank" class="text-blue-600 hover:underline"&gt;🔗 Ver&lt;/a&gt;\` : '-'}
                &lt;/td&gt;
            `</span>;
            <span class="syntax-function">UI</span>.elements.resultsTableBody.<span class="syntax-function">appendChild</span>(row);
        });
        
        <span class="syntax-function">UI</span>.elements.resultsCount.textContent = <span class="syntax-string">`${AppState.totalItems.toLocaleString('pt-BR')} resultado${AppState.totalItems !== 1 ? 's' : ''}`</span>;
    },
    
    <span class="syntax-comment">// =====================================
    // 📈 RENDERIZAÇÃO DE ESTATÍSTICAS EXPANDIDAS
    // =====================================</span>
    <span class="syntax-function">renderExpandedStats</span>(stats) {
        <span class="syntax-comment">// Estatísticas básicas</span>
        <span class="syntax-function">document</span>.<span class="syntax-function">getElementById</span>(<span class="syntax-string">'totalLicitacoes'</span>).textContent = (stats.totalLicitacoes || <span class="syntax-number">0</span>).<span class="syntax-function">toLocaleString</span>(<span class="syntax-string">'pt-BR'</span>);
        <span class="syntax-function">document</span>.<span class="syntax-function">getElementById</span>(<span class="syntax-string">'valorTotal'</span>).textContent = <span class="syntax-function">UI</span>.<span class="syntax-function">formatCurrency</span>(stats.valorTotal || <span class="syntax-number">0</span>);
        <span class="syntax-function">document</span>.<span class="syntax-function">getElementById</span>(<span class="syntax-string">'valorMedio'</span>).textContent = <span class="syntax-function">UI</span>.<span class="syntax-function">formatCurrency</span>(stats.valorMedio || <span class="syntax-number">0</span>);
        <span class="syntax-function">document</span>.<span class="syntax-function">getElementById</span>(<span class="syntax-string">'totalCompradores'</span>).textContent = (stats.totalCompradores || <span class="syntax-number">0</span>).<span class="syntax-function">toLocaleString</span>(<span class="syntax-string">'pt-BR'</span>);
        
        <span class="syntax-comment">// 🆕 NOVAS ESTATÍSTICAS (se elementos existirem)</span>
        <span class="syntax-keyword">const</span> updateIfExists = (id, value) =&gt; {
            <span class="syntax-keyword">const</span> el = <span class="syntax-function">document</span>.<span class="syntax-function">getElementById</span>(id);
            <span class="syntax-keyword">if</span> (el) el.textContent = value.<span class="syntax-function">toLocaleString</span>(<span class="syntax-string">'pt-BR'</span>);
        };
        
        <span class="syntax-function">updateIfExists</span>(<span class="syntax-string">'totalMunicipios'</span>, stats.totalMunicipios || <span class="syntax-number">0</span>);
        <span class="syntax-function">updateIfExists</span>(<span class="syntax-string">'totalEstados'</span>, stats.totalEstados || <span class="syntax-number">0</span>);
        <span class="syntax-function">updateIfExists</span>(<span class="syntax-string">'totalAnos'</span>, stats.totalAnos || <span class="syntax-number">0</span>);
        <span class="syntax-function">updateIfExists</span>(<span class="syntax-string">'anoRange'</span>, <span class="syntax-string">`${stats.anoMaisAntigo || '-'} - ${stats.anoMaisRecente || '-'}`</span>);
    },
    
    <span class="syntax-comment">// =====================================
    // 🔄 FUNÇÕES AUXILIARES
    // =====================================</span>
    <span class="syntax-keyword">async</span> <span class="syntax-function">fetchWithTimeout</span>(url, options, timeout) {
        <span class="syntax-keyword">const</span> controller = <span class="syntax-keyword">new</span> <span class="syntax-function">AbortController</span>();
        <span class="syntax-keyword">const</span> timeoutId = <span class="syntax-function">setTimeout</span>(() =&gt; controller.<span class="syntax-function">abort</span>(), timeout);
        
        <span class="syntax-keyword">try</span> {
            <span class="syntax-keyword">const</span> response = <span class="syntax-keyword">await</span> <span class="syntax-function">fetch</span>(url, {
                ...options,
                signal: controller.signal
            });
            <span class="syntax-function">clearTimeout</span>(timeoutId);
            <span class="syntax-keyword">return</span> response;
        } <span class="syntax-keyword">catch</span> (error) {
            <span class="syntax-function">clearTimeout</span>(timeoutId);
            <span class="syntax-keyword">if</span> (error.name === <span class="syntax-string">'AbortError'</span>) {
                <span class="syntax-keyword">throw</span> <span class="syntax-keyword">new</span> <span class="syntax-function">Error</span>(<span class="syntax-string">`Timeout: A requisição demorou mais que ${timeout/1000}s`</span>);
            }
            <span class="syntax-keyword">throw</span> error;
        }
    },
    
    <span class="syntax-function">extractResults</span>(data) {
        <span class="syntax-keyword">return</span> data.results || 
               data.licitacoes || 
               data.data || 
               data.items ||
               (<span class="syntax-function">Array</span>.<span class="syntax-function">isArray</span>(data) ? data : []);
    },
    
    <span class="syntax-comment">// =====================================
    // 📄 PAGINAÇÃO E OUTRAS FUNÇÕES
    // =====================================</span>
    <span class="syntax-function">renderPagination</span>() {
        <span class="syntax-keyword">const</span> totalPages = <span class="syntax-function">Math</span>.<span class="syntax-function">ceil</span>(<span class="syntax-function">AppState</span>.totalItems / <span class="syntax-function">AppState</span>.pageSize);
        
        <span class="syntax-function">Debug</span>.<span class="syntax-function">log</span>(<span class="syntax-string">`🔄 Renderizando paginação: ${totalPages} páginas`</span>, <span class="syntax-string">'info'</span>);
        
        <span class="syntax-function">UI</span>.elements.paginationSection.<span class="syntax-function">classList</span>.<span class="syntax-function">add</span>(<span class="syntax-string">'hidden'</span>);
        
        <span class="syntax-keyword">if</span> (<span class="syntax-function">AppState</span>.totalItems &lt;= <span class="syntax-function">AppState</span>.pageSize) {
            <span class="syntax-keyword">return</span>;
        }
        
        <span class="syntax-function">UI</span>.elements.paginationSection.<span class="syntax-function">classList</span>.<span class="syntax-function">remove</span>(<span class="syntax-string">'hidden'</span>);
        
        <span class="syntax-comment">// Atualizar informações de paginação</span>
        <span class="syntax-keyword">const</span> startItem = (<span class="syntax-function">AppState</span>.currentPage - <span class="syntax-number">1</span>) * <span class="syntax-function">AppState</span>.pageSize + <span class="syntax-number">1</span>;
        <span class="syntax-keyword">const</span> endItem = <span class="syntax-function">Math</span>.<span class="syntax-function">min</span>(<span class="syntax-function">AppState</span>.currentPage * <span class="syntax-function">AppState</span>.pageSize, <span class="syntax-function">AppState</span>.totalItems);
        
        <span class="syntax-keyword">const</span> updateElement = (id, value) =&gt; {
            <span class="syntax-keyword">const</span> el = <span class="syntax-function">document</span>.<span class="syntax-function">getElementById</span>(id);
            <span class="syntax-keyword">if</span> (el) el.textContent = value;
        };
        
        <span class="syntax-function">updateElement</span>(<span class="syntax-string">'showingFrom'</span>, startItem);
        <span class="syntax-function">updateElement</span>(<span class="syntax-string">'showingTo'</span>, endItem);
        <span class="syntax-function">updateElement</span>(<span class="syntax-string">'totalResults'</span>, <span class="syntax-function">AppState</span>.totalItems);
        
        <span class="syntax-comment">// Atualizar botões de navegação</span>
        <span class="syntax-keyword">const</span> updateButton = (id, disabled) =&gt; {
            <span class="syntax-keyword">const</span> btn = <span class="syntax-function">document</span>.<span class="syntax-function">getElementById</span>(id);
            <span class="syntax-keyword">if</span> (btn) btn.disabled = disabled;
        };
        
        <span class="syntax-function">updateButton</span>(<span class="syntax-string">'firstPageBtn'</span>, <span class="syntax-function">AppState</span>.currentPage === <span class="syntax-number">1</span>);
        <span class="syntax-function">updateButton</span>(<span class="syntax-string">'prevPageBtn'</span>, <span class="syntax-function">AppState</span>.currentPage === <span class="syntax-number">1</span>);
        <span class="syntax-function">updateButton</span>(<span class="syntax-string">'nextPageBtn'</span>, <span class="syntax-function">AppState</span>.currentPage &gt;= totalPages);
        <span class="syntax-function">updateButton</span>(<span class="syntax-string">'lastPageBtn'</span>, <span class="syntax-function">AppState</span>.currentPage &gt;= totalPages);
        
        <span class="syntax-keyword">this</span>.<span class="syntax-function">renderPageNumbers</span>(totalPages);
    },
    
    <span class="syntax-function">renderPageNumbers</span>(totalPages) {
        <span class="syntax-keyword">const</span> pageNumbers = <span class="syntax-function">document</span>.<span class="syntax-function">getElementById</span>(<span class="syntax-string">'pageNumbers'</span>);
        <span class="syntax-keyword">if</span> (!pageNumbers) <span class="syntax-keyword">return</span>;
        
        pageNumbers.innerHTML = <span class="syntax-string">''</span>;
        
        <span class="syntax-keyword">const</span> maxVisible = <span class="syntax-number">5</span>;
        <span class="syntax-keyword">let</span> startPage = <span class="syntax-function">Math</span>.<span class="syntax-function">max</span>(<span class="syntax-number">1</span>, <span class="syntax-function">AppState</span>.currentPage - <span class="syntax-function">Math</span>.<span class="syntax-function">floor</span>(maxVisible / <span class="syntax-number">2</span>));
        <span class="syntax-keyword">let</span> endPage = <span class="syntax-function">Math</span>.<span class="syntax-function">min</span>(totalPages, startPage + maxVisible - <span class="syntax-number">1</span>);
        
        <span class="syntax-keyword">if</span> (endPage - startPage + <span class="syntax-number">1</span> &lt; maxVisible) {
            startPage = <span class="syntax-function">Math</span>.<span class="syntax-function">max</span>(<span class="syntax-number">1</span>, endPage - maxVisible + <span class="syntax-number">1</span>);
        }
        
        <span class="syntax-keyword">for</span> (<span class="syntax-keyword">let</span> i = startPage; i &lt;= endPage; i++) {
            <span class="syntax-keyword">const</span> pageBtn = <span class="syntax-function">document</span>.<span class="syntax-function">createElement</span>(<span class="syntax-string">'button'</span>);
            pageBtn.className = <span class="syntax-string">`px-3 py-1 rounded-md border ${i === AppState.currentPage 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`</span>;
            pageBtn.textContent = i;
            pageBtn.onclick = () =&gt; <span class="syntax-keyword">this</span>.<span class="syntax-function">execute</span>(i);
            pageNumbers.<span class="syntax-function">appendChild</span>(pageBtn);
        }
    }
};

<span class="syntax-comment">// =====================================
// 🔍 FUNÇÕES GLOBAIS DE BUSCA
// =====================================</span>

<span class="syntax-comment">// Função principal de pesquisa</span>
<span class="syntax-keyword">async</span> <span class="syntax-keyword">function</span> <span class="syntax-function">pesquisarLicitacoes</span>(page = <span class="syntax-number">1</span>) {
    <span class="syntax-keyword">await</span> <span class="syntax-function">Search</span>.<span class="syntax-function">execute</span>(page);
}

<span class="syntax-comment">// Busca rápida na tabela</span>
<span class="syntax-keyword">function</span> <span class="syntax-function">quickTableSearch</span>(query) {
    <span class="syntax-keyword">if</span> (!query) {
        <span class="syntax-function">Search</span>.<span class="syntax-function">renderExpandedResults</span>(<span class="syntax-function">AppState</span>.allResults);
        <span class="syntax-keyword">return</span>;
    }
    
    <span class="syntax-keyword">const</span> filtered = <span class="syntax-function">AppState</span>.allResults.<span class="syntax-function">filter</span>(item =&gt; {
        <span class="syntax-keyword">const</span> searchText = <span class="syntax-string">`${item.modalidade || ''} ${item.comprador || ''} ${item.objeto || ''} ${item.tipologia_oficial || ''} ${item.municipio || ''}`</span>.<span class="syntax-function">toLowerCase</span>();
        <span class="syntax-keyword">return</span> searchText.<span class="syntax-function">includes</span>(query.<span class="syntax-function">toLowerCase</span>());
    });
    
    <span class="syntax-function">Search</span>.<span class="syntax-function">renderExpandedResults</span>(filtered);
    <span class="syntax-function">Debug</span>.<span class="syntax-function">log</span>(<span class="syntax-string">`Busca rápida: ${filtered.length} resultados para "${query}"`</span>, <span class="syntax-string">'info'</span>);
}

<span class="syntax-comment">// Funções de paginação</span>
<span class="syntax-keyword">function</span> <span class="syntax-function">firstPage</span>() {
    <span class="syntax-keyword">if</span> (<span class="syntax-function">AppState</span>.currentPage &gt; <span class="syntax-number">1</span>) {
        <span class="syntax-function">pesquisarLicitacoes</span>(<span class="syntax-number">1</span>);
    }
}

<span class="syntax-keyword">function</span> <span class="syntax-function">previousPage</span>() {
    <span class="syntax-keyword">if</span> (<span class="syntax-function">AppState</span>.currentPage &gt; <span class="syntax-number">1</span>) {
        <span class="syntax-function">pesquisarLicitacoes</span>(<span class="syntax-function">AppState</span>.currentPage - <span class="syntax-number">1</span>);
    }
}

<span class="syntax-keyword">function</span> <span class="syntax-function">nextPage</span>() {
    <span class="syntax-keyword">const</span> totalPages = <span class="syntax-function">Math</span>.<span class="syntax-function">ceil</span>(<span class="syntax-function">AppState</span>.totalItems / <span class="syntax-function">AppState</span>.pageSize);
    <span class="syntax-keyword">if</span> (<span class="syntax-function">AppState</span>.currentPage &lt; totalPages) {
        <span class="syntax-function">pesquisarLicitacoes</span>(<span class="syntax-function">AppState</span>.currentPage + <span class="syntax-number">1</span>);
    }
}

<span class="syntax-keyword">function</span> <span class="syntax-function">lastPage</span>() {
    <span class="syntax-keyword">const</span> totalPages = <span class="syntax-function">Math</span>.<span class="syntax-function">ceil</span>(<span class="syntax-function">AppState</span>.totalItems / <span class="syntax-function">AppState</span>.pageSize);
    <span class="syntax-keyword">if</span> (<span class="syntax-function">AppState</span>.currentPage &lt; totalPages) {
        <span class="syntax-function">pesquisarLicitacoes</span>(totalPages);
    }
}

<span class="syntax-comment">// Atualizar resultados</span>
<span class="syntax-keyword">function</span> <span class="syntax-function">refreshResults</span>() {
    <span class="syntax-function">pesquisarLicitacoes</span>(<span class="syntax-function">AppState</span>.currentPage);
}

<span class="syntax-comment">// Exportação</span>
<span class="syntax-keyword">async</span> <span class="syntax-keyword">function</span> <span class="syntax-function">exportResults</span>(format = <span class="syntax-string">'csv'</span>) {
    <span class="syntax-function">Debug</span>.<span class="syntax-function">log</span>(<span class="syntax-string">`Iniciando exportação em formato ${format}`</span>, <span class="syntax-string">'info'</span>);
    
    <span class="syntax-keyword">try</span> {
        <span class="syntax-keyword">const</span> filters = <span class="syntax-function">Search</span>.<span class="syntax-function">getFilters</span>();
        <span class="syntax-keyword">const</span> exportUrl = <span class="syntax-string">`${CONFIG.ENDPOINTS.EXPORT}?format=${format}&sortBy=${AppState.currentSort.column}&sortOrder=${AppState.currentSort.order}&filters=${encodeURIComponent(JSON.stringify(filters))}`</span>;
        
        <span class="syntax-function">window</span>.<span class="syntax-function">open</span>(exportUrl, <span class="syntax-string">'_blank'</span>);
        <span class="syntax-function">Debug</span>.<span class="syntax-function">log</span>(<span class="syntax-string">`Exportação iniciada: ${format}`</span>, <span class="syntax-string">'success'</span>);
    } <span class="syntax-keyword">catch</span> (error) {
        <span class="syntax-function">Debug</span>.<span class="syntax-function">log</span>(<span class="syntax-string">`Erro na exportação: ${error.message}`</span>, <span class="syntax-string">'error'</span>);
    }
}

<span class="syntax-comment">// Ordenação</span>
<span class="syntax-keyword">function</span> <span class="syntax-function">sortTable</span>(column) {
    <span class="syntax-keyword">const</span> newOrder = (<span class="syntax-function">AppState</span>.currentSort.column === column && <span class="syntax-function">AppState</span>.currentSort.order === <span class="syntax-string">'asc'</span>) ? <span class="syntax-string">'desc'</span> : <span class="syntax-string">'asc'</span>;
    <span class="syntax-function">AppState</span>.currentSort = { column, order: newOrder };
    
    <span class="syntax-comment">// Atualizar ícones de ordenação</span>
    <span class="syntax-function">document</span>.<span class="syntax-function">querySelectorAll</span>(<span class="syntax-string">'.sort-header i'</span>).<span class="syntax-function">forEach</span>(icon =&gt; {
        icon.<span class="syntax-function">setAttribute</span>(<span class="syntax-string">'data-feather'</span>, <span class="syntax-string">'chevron-down'</span>);
    });
    
    <span class="syntax-keyword">const</span> currentHeaderIcon = <span class="syntax-function">document</span>.<span class="syntax-function">querySelector</span>(<span class="syntax-string">`.sort-header[onclick="sortTable('${column}')"] i`</span>);
    <span class="syntax-keyword">if</span> (currentHeaderIcon) {
        currentHeaderIcon.<span class="syntax-function">setAttribute</span>(<span class="syntax-string">'data-feather'</span>, newOrder === <span class="syntax-string">'asc'</span> ? <span class="syntax-string">'chevron-up'</span> : <span class="syntax-string">'chevron-down'</span>);
    }
    
    <span class="syntax-function">pesquisarLicitacoes</span>(<span class="syntax-number">1</span>);
}</pre>
            </div>

            <div class="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                <h3 class="text-lg font-semibold text-blue-800 mb-4">
                    <i class="fas fa-lightbulb mr-2"></i>
                    Principais Funcionalidades
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <div class="flex items-center">
                            <i class="fas fa-check-circle text-green-600 mr-2"></i>
                            <span class="text-sm">Suporte aos novos filtros expandidos</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check-circle text-green-600 mr-2"></i>
                            <span class="text-sm">Renderização otimizada para nova estrutura</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check-circle text-green-600 mr-2"></i>
                            <span class="text-sm">Estatísticas expandidas (municípios, anos)</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check-circle text-green-600 mr-2"></i>
                            <span class="text-sm">Sistema de timeout inteligente</span>
                        </div>
                    </div>
                    <div class="space-y-2">
                        <div class="flex items-center">
                            <i class="fas fa-check-circle text-green-600 mr-2"></i>
                            <span class="text-sm">Paginação avançada com navegação</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check-circle text-green-600 mr-2"></i>
                            <span class="text-sm">Busca rápida na tabela expandida</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check-circle text-green-600 mr-2"></i>
                            <span class="text-sm">Exportação com filtros aplicados</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check-circle text-green-600 mr-2"></i>
                            <span class="text-sm">Integração com sistema de debug</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <p class="text-sm text-gray-600">
                    <i class="fas fa-info-circle mr-2"></i>
                    <strong>Próximo arquivo:</strong> 08-charts.js - Sistema de gráficos Chart.js otimizado
                </p>
            </div>
        </div>
    </div>
</body>
</html>

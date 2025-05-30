<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>10-main.js - Inicialização e Eventos Globais</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
    <style>
        body { font-family: 'Inter', sans-serif; }
        .code-block {
            background: #1e293b;
            color: #e2e8f0;
            padding: 1.5rem;
            border-radius: 0.75rem;
            overflow-x: auto;
            font-family: 'Fira Code', monospace;
            font-size: 0.875rem;
            line-height: 1.5;
        }
        .comment { color: #94a3b8; }
        .keyword { color: #38bdf8; }
        .string { color: #84cc16; }
        .function { color: #f59e0b; }
        .variable { color: #ec4899; }
        .section-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    </style>
</head>
<body class="bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 py-8">
        <!-- Header -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div class="flex items-center space-x-3 mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <i data-feather="play-circle" class="text-white w-6 h-6"></i>
                </div>
                <div>
                    <h1 class="text-2xl font-bold section-header">10-main.js</h1>
                    <p class="text-gray-600">Inicialização e Coordenação de Todos os Módulos</p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-blue-50 rounded-lg p-4">
                    <div class="flex items-center space-x-2">
                        <i data-feather="settings" class="text-blue-600 w-5 h-5"></i>
                        <span class="font-medium text-blue-800">Inicialização</span>
                    </div>
                    <p class="text-sm text-blue-600 mt-1">Coordena todos os módulos</p>
                </div>
                <div class="bg-green-50 rounded-lg p-4">
                    <div class="flex items-center space-x-2">
                        <i data-feather="zap" class="text-green-600 w-5 h-5"></i>
                        <span class="font-medium text-green-800">Event Listeners</span>
                    </div>
                    <p class="text-sm text-green-600 mt-1">Eventos globais do sistema</p>
                </div>
                <div class="bg-purple-50 rounded-lg p-4">
                    <div class="flex items-center space-x-2">
                        <i data-feather="globe" class="text-purple-600 w-5 h-5"></i>
                        <span class="font-medium text-purple-800">Funções Globais</span>
                    </div>
                    <p class="text-sm text-purple-600 mt-1">API pública do sistema</p>
                </div>
            </div>
        </div>

        <!-- Main Code Structure -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 class="text-xl font-semibold mb-4 flex items-center">
                <i data-feather="code" class="mr-2 text-blue-600"></i>
                Estrutura Principal do main.js
            </h2>
            
            <div class="code-block">
<span class="comment">// =====================================</span>
<span class="comment">// 🚀 MAIN.JS - COORDENADOR PRINCIPAL</span>
<span class="comment">// =====================================</span>

<span class="comment">/**</span>
<span class="comment"> * Arquivo principal que inicializa e coordena todos os módulos</span>
<span class="comment"> * do sistema de licitações MC Consultoria</span>
<span class="comment"> */</span>

<span class="comment">// =====================================</span>
<span class="comment">// 📦 ESTADO GLOBAL DA APLICAÇÃO</span>
<span class="comment">// =====================================</span>
<span class="keyword">const</span> <span class="variable">AppState</span> = {
    <span class="comment">// Estado atual da aplicação</span>
    <span class="string">isInitialized</span>: <span class="keyword">false</span>,
    <span class="string">currentUser</span>: <span class="keyword">null</span>,
    <span class="string">isLoggedIn</span>: <span class="keyword">false</span>,
    
    <span class="comment">// Estado da busca</span>
    <span class="string">currentPage</span>: <span class="keyword">1</span>,
    <span class="string">totalItems</span>: <span class="keyword">0</span>,
    <span class="string">pageSize</span>: CONFIG.PAGINATION.ITEMS_PER_PAGE,
    <span class="string">currentSort</span>: { <span class="string">column</span>: <span class="string">'abertura'</span>, <span class="string">order</span>: <span class="string">'desc'</span> },
    <span class="string">searchInProgress</span>: <span class="keyword">false</span>,
    <span class="string">lastSearchTime</span>: <span class="keyword">0</span>,
    
    <span class="comment">// Resultados</span>
    <span class="string">allResults</span>: [],
    <span class="string">filteredResults</span>: [],
    
    <span class="comment">// Filtros ativos (expandidos para MC Consultoria)</span>
    <span class="string">activeFilters</span>: {
        <span class="string">modalidades</span>: [],
        <span class="string">tipologias</span>: [],
        <span class="string">municipio</span>: <span class="string">''</span>,
        <span class="string">modo_disputa</span>: <span class="string">''</span>,
        <span class="string">ano_compra</span>: <span class="string">''</span>,
        <span class="string">controle_pncp</span>: <span class="string">''</span>,
        <span class="string">numero_compra_orgao</span>: <span class="string">''</span>
    },
    
    <span class="comment">// Charts</span>
    <span class="string">charts</span>: {
        <span class="string">modalidade</span>: <span class="keyword">null</span>,
        <span class="string">tipologia</span>: <span class="keyword">null</span>
    }
};

<span class="comment">// =====================================</span>
<span class="comment">// 🚀 INICIALIZAÇÃO PRINCIPAL</span>
<span class="comment">// =====================================</span>
<span class="keyword">class</span> <span class="function">App</span> {
    <span class="keyword">constructor</span>() {
        <span class="keyword">this</span>.<span class="string">modules</span> = {};
        <span class="keyword">this</span>.<span class="string">initialized</span> = <span class="keyword">false</span>;
    }

    <span class="comment">/**</span>
    <span class="comment">     * Inicializa toda a aplicação</span>
    <span class="comment">     */</span>
    <span class="keyword">async</span> <span class="function">init</span>() {
        <span class="keyword">try</span> {
            Debug.<span class="function">log</span>(<span class="string">'🚀 Iniciando aplicação MC Consultoria...'</span>, <span class="string">'info'</span>);
            Performance.<span class="function">start</span>(<span class="string">'App Initialization'</span>);

            <span class="comment">// 1. Inicializar módulos na ordem correta</span>
            <span class="keyword">await</span> <span class="keyword">this</span>.<span class="function">initializeModules</span>();

            <span class="comment">// 2. Configurar interface</span>
            <span class="keyword">this</span>.<span class="function">setupUI</span>();

            <span class="comment">// 3. Configurar event listeners</span>
            <span class="keyword">this</span>.<span class="function">setupEventListeners</span>();

            <span class="comment">// 4. Testar conexão</span>
            <span class="keyword">await</span> Connection.<span class="function">test</span>();

            <span class="comment">// 5. Finalizar inicialização</span>
            <span class="keyword">this</span>.<span class="function">finializeInitialization</span>();

            <span class="keyword">const</span> <span class="variable">duration</span> = Performance.<span class="function">end</span>(<span class="string">'App Initialization'</span>);
            Debug.<span class="function">log</span>(<span class="string">`✅ Aplicação inicializada em ${duration}ms`</span>, <span class="string">'success'</span>);

        } <span class="keyword">catch</span> (<span class="variable">error</span>) {
            Debug.<span class="function">log</span>(<span class="string">`❌ Erro na inicialização: ${error.message}`</span>, <span class="string">'error'</span>);
            <span class="keyword">this</span>.<span class="function">handleInitializationError</span>(<span class="variable">error</span>);
        }
    }

    <span class="comment">/**</span>
    <span class="comment">     * Inicializa módulos na ordem de dependência</span>
    <span class="comment">     */</span>
    <span class="keyword">async</span> <span class="function">initializeModules</span>() {
        Debug.<span class="function">log</span>(<span class="string">'📦 Inicializando módulos...'</span>, <span class="string">'info'</span>);

        <span class="comment">// Ordem de inicialização importa!</span>
        <span class="keyword">const</span> <span class="variable">initOrder</span> = [
            { <span class="string">name</span>: <span class="string">'UI'</span>, <span class="string">module</span>: UI },
            { <span class="string">name</span>: <span class="string">'FilterManager'</span>, <span class="string">module</span>: FilterManager },
            { <span class="string">name</span>: <span class="string">'Charts'</span>, <span class="string">module</span>: Charts },
            { <span class="string">name</span>: <span class="string">'Pagination'</span>, <span class="string">module</span>: Pagination },
            { <span class="string">name</span>: <span class="string">'Search'</span>, <span class="string">module</span>: Search }
        ];

        <span class="keyword">for</span> (<span class="keyword">const</span> { <span class="variable">name</span>, <span class="variable">module</span> } <span class="keyword">of</span> <span class="variable">initOrder</span>) {
            <span class="keyword">try</span> {
                <span class="keyword">if</span> (<span class="variable">module</span>.<span class="string">init</span>) {
                    <span class="keyword">await</span> <span class="variable">module</span>.<span class="function">init</span>();
                    Debug.<span class="function">log</span>(<span class="string">`✓ ${name} inicializado`</span>, <span class="string">'success'</span>);
                }
                <span class="keyword">this</span>.<span class="string">modules</span>[<span class="variable">name</span>] = <span class="variable">module</span>;
            } <span class="keyword">catch</span> (<span class="variable">error</span>) {
                Debug.<span class="function">log</span>(<span class="string">`❌ Erro ao inicializar ${name}: ${error.message}`</span>, <span class="string">'error'</span>);
                <span class="keyword">throw</span> <span class="variable">error</span>;
            }
        }
    }

    <span class="comment">/**</span>
    <span class="comment">     * Configura a interface inicial</span>
    <span class="comment">     */</span>
    <span class="function">setupUI</span>() {
        Debug.<span class="function">log</span>(<span class="string">'🎨 Configurando interface...'</span>, <span class="string">'info'</span>);

        <span class="comment">// Substituir ícones do Feather</span>
        <span class="keyword">if</span> (<span class="keyword">typeof</span> <span class="variable">feather</span> !== <span class="string">'undefined'</span>) {
            <span class="variable">feather</span>.<span class="function">replace</span>();
        }

        <span class="comment">// Mostrar tela de login por padrão</span>
        <span class="keyword">this</span>.<span class="function">showLoginScreen</span>();

        <span class="comment">// Configurar formatação de moeda</span>
        <span class="keyword">this</span>.<span class="function">setupCurrencyFormatting</span>();
    }

    <span class="comment">/**</span>
    <span class="comment">     * Configura todos os event listeners globais</span>
    <span class="comment">     */</span>
    <span class="function">setupEventListeners</span>() {
        Debug.<span class="function">log</span>(<span class="string">'🎯 Configurando event listeners...'</span>, <span class="string">'info'</span>);

        <span class="comment">// Login form</span>
        <span class="keyword">const</span> <span class="variable">loginForm</span> = <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'loginForm'</span>);
        <span class="keyword">if</span> (<span class="variable">loginForm</span>) {
            <span class="variable">loginForm</span>.<span class="function">addEventListener</span>(<span class="string">'submit'</span>, <span class="keyword">this</span>.<span class="function">handleLogin</span>.<span class="function">bind</span>(<span class="keyword">this</span>));
        }

        <span class="comment">// Filtros múltiplos</span>
        FilterManager.<span class="function">setupEventListeners</span>();

        <span class="comment">// Atalhos de teclado</span>
        <span class="keyword">this</span>.<span class="function">setupKeyboardShortcuts</span>();

        <span class="comment">// Controle de visibilidade da página</span>
        <span class="keyword">document</span>.<span class="function">addEventListener</span>(<span class="string">'visibilitychange'</span>, <span class="keyword">this</span>.<span class="function">handleVisibilityChange</span>.<span class="function">bind</span>(<span class="keyword">this</span>));
    }

    <span class="comment">/**</span>
    <span class="comment">     * Finaliza a inicialização</span>
    <span class="comment">     */</span>
    <span class="function">finializeInitialization</span>() {
        AppState.<span class="string">isInitialized</span> = <span class="keyword">true</span>;
        <span class="keyword">this</span>.<span class="string">initialized</span> = <span class="keyword">true</span>;

        <span class="comment">// Emit evento de inicialização completa</span>
        <span class="keyword">document</span>.<span class="function">dispatchEvent</span>(<span class="keyword">new</span> <span class="function">CustomEvent</span>(<span class="string">'appInitialized'</span>, {
            <span class="string">detail</span>: { <span class="string">timestamp</span>: <span class="keyword">Date</span>.<span class="function">now</span>() }
        }));

        Debug.<span class="function">log</span>(<span class="string">'🎉 Sistema MC Consultoria pronto para uso!'</span>, <span class="string">'success'</span>);
    }
}
            </div>
        </div>

        <!-- Event Listeners Section -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 class="text-xl font-semibold mb-4 flex items-center">
                <i data-feather="zap" class="mr-2 text-green-600"></i>
                Event Listeners Globais
            </h2>
            
            <div class="code-block">
<span class="comment">// =====================================</span>
<span class="comment">// ⚡ EVENT LISTENERS GLOBAIS</span>
<span class="comment">// =====================================</span>

<span class="comment">/**</span>
<span class="comment"> * Configurar atalhos de teclado</span>
<span class="comment"> */</span>
<span class="function">setupKeyboardShortcuts</span>() {
    <span class="variable">document</span>.<span class="function">addEventListener</span>(<span class="string">'keydown'</span>, (<span class="variable">e</span>) => {
        <span class="comment">// Ctrl + D = Toggle Debug</span>
        <span class="keyword">if</span> (<span class="variable">e</span>.<span class="string">ctrlKey</span> && <span class="variable">e</span>.<span class="string">key</span> === <span class="string">'d'</span>) {
            <span class="variable">e</span>.<span class="function">preventDefault</span>();
            <span class="function">toggleDebug</span>();
        }

        <span class="comment">// Ctrl + Enter = Pesquisar</span>
        <span class="keyword">if</span> (<span class="variable">e</span>.<span class="string">ctrlKey</span> && <span class="variable">e</span>.<span class="string">key</span> === <span class="string">'Enter'</span>) {
            <span class="variable">e</span>.<span class="function">preventDefault</span>();
            <span class="keyword">if</span> (AppState.<span class="string">isLoggedIn</span>) {
                <span class="function">pesquisarLicitacoes</span>();
            }
        }

        <span class="comment">// Escape = Limpar filtros</span>
        <span class="keyword">if</span> (<span class="variable">e</span>.<span class="string">key</span> === <span class="string">'Escape'</span> && AppState.<span class="string">isLoggedIn</span>) {
            <span class="function">clearFilters</span>();
        }
    });
}

<span class="comment">/**</span>
<span class="comment"> * Lidar com mudanças de visibilidade da aba</span>
<span class="comment"> */</span>
<span class="function">handleVisibilityChange</span>() {
    <span class="keyword">if</span> (<span class="variable">document</span>.<span class="string">hidden</span>) {
        Debug.<span class="function">log</span>(<span class="string">'📱 Aplicação em background'</span>, <span class="string">'info'</span>);
    } <span class="keyword">else</span> {
        Debug.<span class="function">log</span>(<span class="string">'👁️ Aplicação em foco'</span>, <span class="string">'info'</span>);
        <span class="comment">// Atualizar timestamp se logado</span>
        <span class="keyword">if</span> (AppState.<span class="string">isLoggedIn</span>) {
            UI.<span class="function">updateLastUpdate</span>();
        }
    }
}

<span class="comment">/**</span>
<span class="comment"> * Configurar formatação de moeda</span>
<span class="comment"> */</span>
<span class="function">setupCurrencyFormatting</span>() {
    <span class="keyword">const</span> <span class="variable">currencyFields</span> = [<span class="string">'valorMinimo'</span>, <span class="string">'valorMaximo'</span>];
    
    <span class="variable">currencyFields</span>.<span class="function">forEach</span>(<span class="variable">fieldId</span> => {
        <span class="keyword">const</span> <span class="variable">field</span> = <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="variable">fieldId</span>);
        <span class="keyword">if</span> (<span class="variable">field</span>) {
            <span class="variable">field</span>.<span class="function">addEventListener</span>(<span class="string">'input'</span>, (<span class="variable">e</span>) => {
                UI.<span class="function">formatarMoedaBR</span>(<span class="variable">e</span>.<span class="string">target</span>);
            });
        }
    });
}
            </div>
        </div>

        <!-- Global Functions Section -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 class="text-xl font-semibold mb-4 flex items-center">
                <i data-feather="globe" class="mr-2 text-purple-600"></i>
                Funções Globais (API Pública)
            </h2>
            
            <div class="code-block">
<span class="comment">// =====================================</span>
<span class="comment">// 🌐 FUNÇÕES GLOBAIS (API PÚBLICA)</span>
<span class="comment">// =====================================</span>

<span class="comment">/**</span>
<span class="comment"> * Login do usuário</span>
<span class="comment"> */</span>
<span class="keyword">async</span> <span class="keyword">function</span> <span class="function">handleLogin</span>(<span class="variable">e</span>) {
    <span class="variable">e</span>.<span class="function">preventDefault</span>();
    <span class="keyword">const</span> <span class="variable">username</span> = <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'username'</span>).<span class="string">value</span>;
    <span class="keyword">const</span> <span class="variable">password</span> = <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'password'</span>).<span class="string">value</span>;
    <span class="keyword">await</span> Auth.<span class="function">login</span>(<span class="variable">username</span>, <span class="variable">password</span>);
}

<span class="comment">/**</span>
<span class="comment"> * Logout do usuário</span>
<span class="comment"> */</span>
<span class="keyword">function</span> <span class="function">logout</span>() {
    Auth.<span class="function">logout</span>();
}

<span class="comment">/**</span>
<span class="comment"> * Pesquisar licitações - FUNÇÃO PRINCIPAL</span>
<span class="comment"> */</span>
<span class="keyword">async</span> <span class="keyword">function</span> <span class="function">pesquisarLicitacoes</span>(<span class="variable">page</span> = <span class="keyword">1</span>) {
    <span class="keyword">await</span> Search.<span class="function">execute</span>(<span class="variable">page</span>);
}

<span class="comment">/**</span>
<span class="comment"> * Limpar todos os filtros</span>
<span class="comment"> */</span>
<span class="keyword">function</span> <span class="function">clearFilters</span>() {
    FilterManager.<span class="function">clearAll</span>();
    Debug.<span class="function">log</span>(<span class="string">'🧹 Filtros limpos via função global'</span>, <span class="string">'info'</span>);
}

<span class="comment">/**</span>
<span class="comment"> * Carregar preset de filtros</span>
<span class="comment"> */</span>
<span class="keyword">function</span> <span class="function">loadPreset</span>(<span class="variable">preset</span>) {
    FilterManager.<span class="function">loadPreset</span>(<span class="variable">preset</span>);
    Debug.<span class="function">log</span>(<span class="string">`🎯 Preset carregado: ${preset}`</span>, <span class="string">'info'</span>);
}

<span class="comment">/**</span>
<span class="comment"> * Exportar resultados</span>
<span class="comment"> */</span>
<span class="keyword">async</span> <span class="keyword">function</span> <span class="function">exportResults</span>(<span class="variable">format</span> = <span class="string">'csv'</span>) {
    <span class="keyword">await</span> Search.<span class="function">exportData</span>(<span class="variable">format</span>);
}

<span class="comment">/**</span>
<span class="comment"> * Toggle do painel de debug</span>
<span class="comment"> */</span>
<span class="keyword">function</span> <span class="function">toggleDebug</span>() {
    Debug.<span class="function">togglePanel</span>();
}

<span class="comment">/**</span>
<span class="comment"> * Limpar log de debug</span>
<span class="comment"> */</span>
<span class="keyword">function</span> <span class="function">clearDebugLog</span>() {
    Debug.<span class="function">clearLogs</span>();
}

<span class="comment">/**</span>
<span class="comment"> * Teste completo de filtros múltiplos</span>
<span class="comment"> */</span>
<span class="keyword">function</span> <span class="function">testarFiltrosCompleto</span>() {
    <span class="keyword">return</span> FilterManager.<span class="function">runCompleteTest</span>();
}

<span class="comment">// =====================================</span>
<span class="comment">// 📄 FUNÇÕES DE PAGINAÇÃO</span>
<span class="comment">// =====================================</span>
<span class="keyword">function</span> <span class="function">firstPage</span>() { <span class="function">pesquisarLicitacoes</span>(<span class="keyword">1</span>); }
<span class="keyword">function</span> <span class="function">previousPage</span>() { Pagination.<span class="function">previous</span>(); }
<span class="keyword">function</span> <span class="function">nextPage</span>() { Pagination.<span class="function">next</span>(); }
<span class="keyword">function</span> <span class="function">lastPage</span>() { Pagination.<span class="function">last</span>(); }

<span class="comment">/**</span>
<span class="comment"> * Ordenação da tabela</span>
<span class="comment"> */</span>
<span class="keyword">function</span> <span class="function">sortTable</span>(<span class="variable">column</span>) {
    Search.<span class="function">sortBy</span>(<span class="variable">column</span>);
}

<span class="comment">/**</span>
<span class="comment"> * Busca rápida na tabela</span>
<span class="comment"> */</span>
<span class="keyword">function</span> <span class="function">quickTableSearch</span>(<span class="variable">query</span>) {
    Search.<span class="function">quickFilter</span>(<span class="variable">query</span>);
}

<span class="comment">/**</span>
<span class="comment"> * Atualizar resultados</span>
<span class="comment"> */</span>
<span class="keyword">function</span> <span class="function">refreshResults</span>() {
    <span class="function">pesquisarLicitacoes</span>(AppState.<span class="string">currentPage</span>);
}
            </div>
        </div>

        <!-- Initialization Section -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 class="text-xl font-semibold mb-4 flex items-center">
                <i data-feather="power" class="mr-2 text-red-600"></i>
                Inicialização Automática
            </h2>
            
            <div class="code-block">
<span class="comment">// =====================================</span>
<span class="comment">// 🚀 INICIALIZAÇÃO AUTOMÁTICA</span>
<span class="comment">// =====================================</span>

<span class="comment">/**</span>
<span class="comment"> * Inicialização quando DOM estiver pronto</span>
<span class="comment"> */</span>
<span class="variable">document</span>.<span class="function">addEventListener</span>(<span class="string">'DOMContentLoaded'</span>, <span class="keyword">async</span> () => {
    Debug.<span class="function">log</span>(<span class="string">'📄 DOM carregado, iniciando aplicação...'</span>, <span class="string">'info'</span>);
    
    <span class="comment">// Criar instância da aplicação</span>
    <span class="keyword">const</span> <span class="variable">app</span> = <span class="keyword">new</span> <span class="function">App</span>();
    
    <span class="comment">// Inicializar</span>
    <span class="keyword">await</span> <span class="variable">app</span>.<span class="function">init</span>();
    
    <span class="comment">// Tornar disponível globalmente para debug</span>
    <span class="variable">window</span>.<span class="string">MCApp</span> = <span class="variable">app</span>;
    <span class="variable">window</span>.<span class="string">AppState</span> = AppState;
    
    Debug.<span class="function">log</span>(<span class="string">'🌟 MC Consultoria carregada e pronta!'</span>, <span class="string">'success'</span>);
});

<span class="comment">/**</span>
<span class="comment"> * Handler para erros não capturados</span>
<span class="comment"> */</span>
<span class="variable">window</span>.<span class="function">addEventListener</span>(<span class="string">'error'</span>, (<span class="variable">e</span>) => {
    Debug.<span class="function">log</span>(<span class="string">`💥 Erro global: ${e.message}`</span>, <span class="string">'error'</span>, <span class="variable">e</span>);
});

<span class="comment">/**</span>
<span class="comment"> * Handler para promises rejeitadas</span>
<span class="comment"> */</span>
<span class="variable">window</span>.<span class="function">addEventListener</span>(<span class="string">'unhandledrejection'</span>, (<span class="variable">e</span>) => {
    Debug.<span class="function">log</span>(<span class="string">`⚠️ Promise rejeitada: ${e.reason}`</span>, <span class="string">'error'</span>, <span class="variable">e</span>);
});

<span class="comment">/**</span>
<span class="comment"> * Informações para debug no console</span>
<span class="comment"> */</span>
<span class="variable">console</span>.<span class="function">log</span>(<span class="string">`
🏢 MC CONSULTORIA - Sistema de Licitações
📦 Versão: 2.0.0
🌐 Endpoint: ${CONFIG.ENDPOINTS.CONSULTA}
🔧 Debug: ${CONFIG.DEBUG ? 'ATIVADO' : 'DESATIVADO'}
⚡ Performance: ${CONFIG.PERFORMANCE_TRACKING ? 'ATIVADO' : 'DESATIVADO'}

💡 Comandos úteis:
- window.MCApp: Instância principal da aplicação
- window.AppState: Estado global
- testarFiltrosCompleto(): Teste completo dos filtros
- toggleDebug(): Ativar/desativar debug visual
`</span>);
            </div>
        </div>
    </div>

    <script>
        feather.replace();
    </script>
</body>
</html>

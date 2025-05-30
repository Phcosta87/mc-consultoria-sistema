<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>09-pagination.js - Sistema de Paginação Avançado</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { font-family: 'Inter', sans-serif; }
        .code-block {
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 20px;
            border-radius: 8px;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 14px;
            line-height: 1.5;
            overflow-x: auto;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        .comment { color: #6a9955; }
        .keyword { color: #569cd6; }
        .string { color: #ce9178; }
        .function { color: #dcdcaa; }
        .number { color: #b5cea8; }
        .property { color: #9cdcfe; }
        .pagination-demo {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 200px;
        }
        .demo-pagination {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 12px;
            padding: 20px;
        }
    </style>
</head>
<body class="bg-gray-50">
    <div class="max-w-6xl mx-auto p-6">
        <!-- Header -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold text-gray-800">09-pagination.js</h1>
                    <p class="text-gray-600 mt-2">Sistema de Paginação Avançado</p>
                </div>
                <div class="bg-blue-100 px-4 py-2 rounded-lg">
                    <span class="text-blue-800 font-medium">📄 Módulo JavaScript</span>
                </div>
            </div>
        </div>

        <!-- Demo Interativo -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 class="text-xl font-semibold mb-4">🎯 Demo Interativo</h2>
            <div class="pagination-demo rounded-lg p-6">
                <div class="demo-pagination">
                    <div class="flex items-center justify-between mb-4">
                        <div class="text-sm text-gray-600">
                            Mostrando <span id="demoFrom">1</span> a <span id="demoTo">25</span> de <span id="demoTotal">1250</span> resultados
                        </div>
                        <div class="text-sm text-gray-500">
                            Página <span id="demoCurrent">1</span> de <span id="demoTotalPages">50</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-center space-x-2" id="demoPagination">
                        <!-- Paginação será gerada aqui -->
                    </div>
                </div>
            </div>
        </div>

        <!-- Código Principal -->
        <div class="bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-xl font-semibold mb-4">📋 Código do Sistema de Paginação</h2>
            <div class="code-block">
<span class="comment">// =====================================
// 📄 SISTEMA DE PAGINAÇÃO AVANÇADO - MC CONSULTORIA
// =====================================</span>

<span class="keyword">const</span> <span class="property">PaginationManager</span> = {
    <span class="comment">// Estado da paginação</span>
    <span class="property">currentPage</span>: <span class="number">1</span>,
    <span class="property">totalItems</span>: <span class="number">0</span>,
    <span class="property">itemsPerPage</span>: <span class="number">25</span>,
    <span class="property">maxVisiblePages</span>: <span class="number">5</span>,
    
    <span class="comment">// Elementos DOM</span>
    <span class="property">elements</span>: {},
    
    <span class="comment">// Callback para mudança de página</span>
    <span class="property">onPageChange</span>: <span class="keyword">null</span>,
    
    <span class="comment">/**
     * 🔧 Inicializar sistema de paginação
     */</span>
    <span class="function">init</span>(<span class="property">config</span> = {}) {
        <span class="keyword">this</span>.<span class="property">itemsPerPage</span> = <span class="property">config</span>.<span class="property">itemsPerPage</span> || <span class="number">25</span>;
        <span class="keyword">this</span>.<span class="property">maxVisiblePages</span> = <span class="property">config</span>.<span class="property">maxVisiblePages</span> || <span class="number">5</span>;
        <span class="keyword">this</span>.<span class="property">onPageChange</span> = <span class="property">config</span>.<span class="property">onPageChange</span> || <span class="keyword">null</span>;
        
        <span class="keyword">this</span>.<span class="function">cacheElements</span>();
        <span class="keyword">this</span>.<span class="function">setupEventListeners</span>();
        
        <span class="property">Debug</span>.<span class="function">log</span>(<span class="string">'📄 Sistema de paginação inicializado'</span>, <span class="string">'success'</span>, {
            <span class="property">itemsPerPage</span>: <span class="keyword">this</span>.<span class="property">itemsPerPage</span>,
            <span class="property">maxVisiblePages</span>: <span class="keyword">this</span>.<span class="property">maxVisiblePages</span>
        });
    },
    
    <span class="comment">/**
     * 🎯 Cache de elementos DOM
     */</span>
    <span class="function">cacheElements</span>() {
        <span class="keyword">this</span>.<span class="property">elements</span> = {
            <span class="property">paginationSection</span>: <span class="property">document</span>.<span class="function">getElementById</span>(<span class="string">'paginationSection'</span>),
            <span class="property">showingFrom</span>: <span class="property">document</span>.<span class="function">getElementById</span>(<span class="string">'showingFrom'</span>),
            <span class="property">showingTo</span>: <span class="property">document</span>.<span class="function">getElementById</span>(<span class="string">'showingTo'</span>),
            <span class="property">totalResults</span>: <span class="property">document</span>.<span class="function">getElementById</span>(<span class="string">'totalResults'</span>),
            <span class="property">pageNumbers</span>: <span class="property">document</span>.<span class="function">getElementById</span>(<span class="string">'pageNumbers'</span>),
            <span class="property">firstPageBtn</span>: <span class="property">document</span>.<span class="function">getElementById</span>(<span class="string">'firstPageBtn'</span>),
            <span class="property">prevPageBtn</span>: <span class="property">document</span>.<span class="function">getElementById</span>(<span class="string">'prevPageBtn'</span>),
            <span class="property">nextPageBtn</span>: <span class="property">document</span>.<span class="function">getElementById</span>(<span class="string">'nextPageBtn'</span>),
            <span class="property">lastPageBtn</span>: <span class="property">document</span>.<span class="function">getElementById</span>(<span class="string">'lastPageBtn'</span>)
        };
    },
    
    <span class="comment">/**
     * 🎮 Configurar event listeners
     */</span>
    <span class="function">setupEventListeners</span>() {
        <span class="keyword">if</span> (<span class="keyword">this</span>.<span class="property">elements</span>.<span class="property">firstPageBtn</span>) {
            <span class="keyword">this</span>.<span class="property">elements</span>.<span class="property">firstPageBtn</span>.<span class="property">onclick</span> = () => <span class="keyword">this</span>.<span class="function">goToFirstPage</span>();
        }
        
        <span class="keyword">if</span> (<span class="keyword">this</span>.<span class="property">elements</span>.<span class="property">prevPageBtn</span>) {
            <span class="keyword">this</span>.<span class="property">elements</span>.<span class="property">prevPageBtn</span>.<span class="property">onclick</span> = () => <span class="keyword">this</span>.<span class="function">goToPreviousPage</span>();
        }
        
        <span class="keyword">if</span> (<span class="keyword">this</span>.<span class="property">elements</span>.<span class="property">nextPageBtn</span>) {
            <span class="keyword">this</span>.<span class="property">elements</span>.<span class="property">nextPageBtn</span>.<span class="property">onclick</span> = () => <span class="keyword">this</span>.<span class="function">goToNextPage</span>();
        }
        
        <span class="keyword">if</span> (<span class="keyword">this</span>.<span class="property">elements</span>.<span class="property">lastPageBtn</span>) {
            <span class="keyword">this</span>.<span class="property">elements</span>.<span class="property">lastPageBtn</span>.<span class="property">onclick</span> = () => <span class="keyword">this</span>.<span class="function">goToLastPage</span>();
        }
    },
    
    <span class="comment">/**
     * 📊 Atualizar dados da paginação
     */</span>
    <span class="function">update</span>(<span class="property">totalItems</span>, <span class="property">currentPage</span> = <span class="number">1</span>) {
        <span class="keyword">this</span>.<span class="property">totalItems</span> = <span class="property">totalItems</span>;
        <span class="keyword">this</span>.<span class="property">currentPage</span> = <span class="property">currentPage</span>;
        
        <span class="keyword">const</span> <span class="property">totalPages</span> = <span class="keyword">this</span>.<span class="function">getTotalPages</span>();
        
        <span class="property">Debug</span>.<span class="function">log</span>(<span class="string">'📄 Atualizando paginação'</span>, <span class="string">'info'</span>, {
            <span class="property">totalItems</span>: <span class="keyword">this</span>.<span class="property">totalItems</span>,
            <span class="property">currentPage</span>: <span class="keyword">this</span>.<span class="property">currentPage</span>,
            <span class="property">totalPages</span>: <span class="property">totalPages</span>
        });
        
        <span class="comment">// Mostrar/ocultar seção de paginação</span>
        <span class="keyword">if</span> (<span class="keyword">this</span>.<span class="property">elements</span>.<span class="property">paginationSection</span>) {
            <span class="keyword">if</span> (<span class="property">totalPages</span> <= <span class="number">1</span>) {
                <span class="keyword">this</span>.<span class="property">elements</span>.<span class="property">paginationSection</span>.<span class="property">classList</span>.<span class="function">add</span>(<span class="string">'hidden'</span>);
                <span class="keyword">return</span>;
            } <span class="keyword">else</span> {
                <span class="keyword">this</span>.<span class="property">elements</span>.<span class="property">paginationSection</span>.<span class="property">classList</span>.<span class="function">remove</span>(<span class="string">'hidden'</span>);
            }
        }
        
        <span class="keyword">this</span>.<span class="function">updateInfo</span>();
        <span class="keyword">this</span>.<span class="function">updateControls</span>();
        <span class="keyword">this</span>.<span class="function">renderPageNumbers</span>();
    },
    
    <span class="comment">/**
     * 📝 Atualizar informações de exibição
     */</span>
    <span class="function">updateInfo</span>() {
        <span class="keyword">const</span> <span class="property">startItem</span> = (<span class="keyword">this</span>.<span class="property">currentPage</span> - <span class="number">1</span>) * <span class="keyword">this</span>.<span class="property">itemsPerPage</span> + <span class="number">1</span>;
        <span class="keyword">const</span> <span class="property">endItem</span> = <span class="property">Math</span>.<span class="function">min</span>(<span class="keyword">this</span>.<span class="property">currentPage</span> * <span class="keyword">this</span>.<span class="property">itemsPerPage</span>, <span class="keyword">this</span>.<span class="property">totalItems</span>);
        
        <span class="keyword">if</span> (<span class="keyword">this</span>.<span class="property">elements</span>.<span class="property">showingFrom</span>) {
            <span class="keyword">this</span>.<span class="property">elements</span>.<span class="property">showingFrom</span>.<span class="property">textContent</span> = <span class="property">startItem</span>.<span class="function">toLocaleString</span>(<span class="string">'pt-BR'</span>);
        }
        
        <span class="keyword">if</span> (<span class="keyword">this</span>.<span class="property">elements</span>.<span class="property">showingTo</span>) {
            <span class="keyword">this</span>.<span class="property">elements</span>.<span class="property">showingTo</span>.<span class="property">textContent</span> = <span class="property">endItem</span>.<span class="function">toLocaleString</span>(<span class="string">'pt-BR'</span>);
        }
        
        <span class="keyword">if</span> (<span class="keyword">this</span>.<span class="property">elements</span>.<span class="property">totalResults</span>) {
            <span class="keyword">this</span>.<span class="property">elements</span>.<span class="property">totalResults</span>.<span class="property">textContent</span> = <span class="keyword">this</span>.<span class="property">totalItems</span>.<span class="function">toLocaleString</span>(<span class="string">'pt-BR'</span>);
        }
    },
    
    <span class="comment">/**
     * 🎮 Atualizar controles de navegação
     */</span>
    <span class="function">updateControls</span>() {
        <span class="keyword">const</span> <span class="property">totalPages</span> = <span class="keyword">this</span>.<span class="function">getTotalPages</span>();
        <span class="keyword">const</span> <span class="property">isFirstPage</span> = <span class="keyword">this</span>.<span class="property">currentPage</span> === <span class="number">1</span>;
        <span class="keyword">const</span> <span class="property">isLastPage</span> = <span class="keyword">this</span>.<span class="property">currentPage</span> >= <span class="property">totalPages</span>;
        
        <span class="comment">// Primeira página e anterior</span>
        [<span class="keyword">this</span>.<span class="property">elements</span>.<span class="property">firstPageBtn</span>, <span class="keyword">this</span>.<span class="property">elements</span>.<span class="property">prevPageBtn</span>].<span class="function">forEach</span>(<span class="property">btn</span> => {
            <span class="keyword">if</span> (<span class="property">btn</span>) {
                <span class="property">btn</span>.<span class="property">disabled</span> = <span class="property">isFirstPage</span>;
                <span class="property">btn</span>.<span class="property">classList</span>.<span class="function">toggle</span>(<span class="string">'opacity-50'</span>, <span class="property">isFirstPage</span>);
                <span class="property">btn</span>.<span class="property">classList</span>.<span class="function">toggle</span>(<span class="string">'cursor-not-allowed'</span>, <span class="property">isFirstPage</span>);
            }
        });
        
        <span class="comment">// Próxima página e última</span>
        [<span class="keyword">this</span>.<span class="property">elements</span>.<span class="property">nextPageBtn</span>, <span class="keyword">this</span>.<span class="property">elements</span>.<span class="property">lastPageBtn</span>].<span class="function">forEach</span>(<span class="property">btn</span> => {
            <span class="keyword">if</span> (<span class="property">btn</span>) {
                <span class="property">btn</span>.<span class="property">disabled</span> = <span class="property">isLastPage</span>;
                <span class="property">btn</span>.<span class="property">classList</span>.<span class="function">toggle</span>(<span class="string">'opacity-50'</span>, <span class="property">isLastPage</span>);
                <span class="property">btn</span>.<span class="property">classList</span>.<span class="function">toggle</span>(<span class="string">'cursor-not-allowed'</span>, <span class="property">isLastPage</span>);
            }
        });
    },
    
    <span class="comment">/**
     * 🔢 Renderizar números das páginas
     */</span>
    <span class="function">renderPageNumbers</span>() {
        <span class="keyword">if</span> (!<span class="keyword">this</span>.<span class="property">elements</span>.<span class="property">pageNumbers</span>) <span class="keyword">return</span>;
        
        <span class="keyword">const</span> <span class="property">totalPages</span> = <span class="keyword">this</span>.<span class="function">getTotalPages</span>();
        <span class="keyword">const</span> <span class="property">pages</span> = <span class="keyword">this</span>.<span class="function">calculateVisiblePages</span>(<span class="property">totalPages</span>);
        
        <span class="keyword">this</span>.<span class="property">elements</span>.<span class="property">pageNumbers</span>.<span class="property">innerHTML</span> = <span class="string">''</span>;
        
        <span class="property">pages</span>.<span class="function">forEach</span>(<span class="property">page</span> => {
            <span class="keyword">const</span> <span class="property">button</span> = <span class="property">document</span>.<span class="function">createElement</span>(<span class="string">'button'</span>);
            <span class="property">button</span>.<span class="property">textContent</span> = <span class="property">page</span>;
            <span class="property">button</span>.<span class="property">className</span> = `px-3 py-1 rounded-md border transition-all duration-200 ${
                <span class="property">page</span> === <span class="keyword">this</span>.<span class="property">currentPage</span> 
                    ? <span class="string">'bg-blue-500 text-white border-blue-500 shadow-md'</span>
                    : <span class="string">'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'</span>
            }`;
            
            <span class="property">button</span>.<span class="property">onclick</span> = () => <span class="keyword">this</span>.<span class="function">goToPage</span>(<span class="property">page</span>);
            <span class="keyword">this</span>.<span class="property">elements</span>.<span class="property">pageNumbers</span>.<span class="function">appendChild</span>(<span class="property">button</span>);
        });
    },
    
    <span class="comment">/**
     * 🧮 Calcular páginas visíveis
     */</span>
    <span class="function">calculateVisiblePages</span>(<span class="property">totalPages</span>) {
        <span class="keyword">const</span> <span class="property">maxVisible</span> = <span class="keyword">this</span>.<span class="property">maxVisiblePages</span>;
        <span class="keyword">let</span> <span class="property">startPage</span> = <span class="property">Math</span>.<span class="function">max</span>(<span class="number">1</span>, <span class="keyword">this</span>.<span class="property">currentPage</span> - <span class="property">Math</span>.<span class="function">floor</span>(<span class="property">maxVisible</span> / <span class="number">2</span>));
        <span class="keyword">let</span> <span class="property">endPage</span> = <span class="property">Math</span>.<span class="function">min</span>(<span class="property">totalPages</span>, <span class="property">startPage</span> + <span class="property">maxVisible</span> - <span class="number">1</span>);
        
        <span class="comment">// Ajustar se não temos páginas suficientes no final</span>
        <span class="keyword">if</span> (<span class="property">endPage</span> - <span class="property">startPage</span> + <span class="number">1</span> < <span class="property">maxVisible</span>) {
            <span class="property">startPage</span> = <span class="property">Math</span>.<span class="function">max</span>(<span class="number">1</span>, <span class="property">endPage</span> - <span class="property">maxVisible</span> + <span class="number">1</span>);
        }
        
        <span class="keyword">const</span> <span class="property">pages</span> = [];
        <span class="keyword">for</span> (<span class="keyword">let</span> <span class="property">i</span> = <span class="property">startPage</span>; <span class="property">i</span> <= <span class="property">endPage</span>; <span class="property">i</span>++) {
            <span class="property">pages</span>.<span class="function">push</span>(<span class="property">i</span>);
        }
        
        <span class="keyword">return</span> <span class="property">pages</span>;
    },
    
    <span class="comment">/**
     * 📊 Obter total de páginas
     */</span>
    <span class="function">getTotalPages</span>() {
        <span class="keyword">return</span> <span class="property">Math</span>.<span class="function">ceil</span>(<span class="keyword">this</span>.<span class="property">totalItems</span> / <span class="keyword">this</span>.<span class="property">itemsPerPage</span>);
    },
    
    <span class="comment">/**
     * 🎯 Navegação para páginas específicas
     */</span>
    <span class="function">goToPage</span>(<span class="property">page</span>) {
        <span class="keyword">const</span> <span class="property">totalPages</span> = <span class="keyword">this</span>.<span class="function">getTotalPages</span>();
        
        <span class="keyword">if</span> (<span class="property">page</span> < <span class="number">1</span> || <span class="property">page</span> > <span class="property">totalPages</span> || <span class="property">page</span> === <span class="keyword">this</span>.<span class="property">currentPage</span>) {
            <span class="keyword">return</span>;
        }
        
        <span class="property">Debug</span>.<span class="function">log</span>(<span class="string">`📄 Navegando para página ${page}`</span>, <span class="string">'info'</span>);
        
        <span class="keyword">this</span>.<span class="property">currentPage</span> = <span class="property">page</span>;
        <span class="keyword">this</span>.<span class="function">update</span>(<span class="keyword">this</span>.<span class="property">totalItems</span>, <span class="property">page</span>);
        
        <span class="keyword">if</span> (<span class="keyword">this</span>.<span class="property">onPageChange</span>) {
            <span class="keyword">this</span>.<span class="property">onPageChange</span>(<span class="property">page</span>);
        }
    },
    
    <span class="function">goToFirstPage</span>() {
        <span class="keyword">this</span>.<span class="function">goToPage</span>(<span class="number">1</span>);
    },
    
    <span class="function">goToPreviousPage</span>() {
        <span class="keyword">this</span>.<span class="function">goToPage</span>(<span class="keyword">this</span>.<span class="property">currentPage</span> - <span class="number">1</span>);
    },
    
    <span class="function">goToNextPage</span>() {
        <span class="keyword">this</span>.<span class="function">goToPage</span>(<span class="keyword">this</span>.<span class="property">currentPage</span> + <span class="number">1</span>);
    },
    
    <span class="function">goToLastPage</span>() {
        <span class="keyword">const</span> <span class="property">totalPages</span> = <span class="keyword">this</span>.<span class="function">getTotalPages</span>();
        <span class="keyword">this</span>.<span class="function">goToPage</span>(<span class="property">totalPages</span>);
    },
    
    <span class="comment">/**
     * 🎨 Métodos de utilidade
     */</span>
    <span class="function">getPageInfo</span>() {
        <span class="keyword">return</span> {
            <span class="property">currentPage</span>: <span class="keyword">this</span>.<span class="property">currentPage</span>,
            <span class="property">totalPages</span>: <span class="keyword">this</span>.<span class="function">getTotalPages</span>(),
            <span class="property">totalItems</span>: <span class="keyword">this</span>.<span class="property">totalItems</span>,
            <span class="property">itemsPerPage</span>: <span class="keyword">this</span>.<span class="property">itemsPerPage</span>,
            <span class="property">startItem</span>: (<span class="keyword">this</span>.<span class="property">currentPage</span> - <span class="number">1</span>) * <span class="keyword">this</span>.<span class="property">itemsPerPage</span> + <span class="number">1</span>,
            <span class="property">endItem</span>: <span class="property">Math</span>.<span class="function">min</span>(<span class="keyword">this</span>.<span class="property">currentPage</span> * <span class="keyword">this</span>.<span class="property">itemsPerPage</span>, <span class="keyword">this</span>.<span class="property">totalItems</span>)
        };
    },
    
    <span class="comment">/**
     * 🔄 Reset da paginação
     */</span>
    <span class="function">reset</span>() {
        <span class="keyword">this</span>.<span class="property">currentPage</span> = <span class="number">1</span>;
        <span class="keyword">this</span>.<span class="property">totalItems</span> = <span class="number">0</span>;
        
        <span class="keyword">if</span> (<span class="keyword">this</span>.<span class="property">elements</span>.<span class="property">paginationSection</span>) {
            <span class="keyword">this</span>.<span class="property">elements</span>.<span class="property">paginationSection</span>.<span class="property">classList</span>.<span class="function">add</span>(<span class="string">'hidden'</span>);
        }
        
        <span class="property">Debug</span>.<span class="function">log</span>(<span class="string">'📄 Paginação resetada'</span>, <span class="string">'info'</span>);
    }
};

<span class="comment">// =====================================
// 🌐 FUNÇÕES GLOBAIS PARA COMPATIBILIDADE
// =====================================</span>

<span class="keyword">function</span> <span class="function">firstPage</span>() {
    <span class="property">PaginationManager</span>.<span class="function">goToFirstPage</span>();
}

<span class="keyword">function</span> <span class="function">previousPage</span>() {
    <span class="property">PaginationManager</span>.<span class="function">goToPreviousPage</span>();
}

<span class="keyword">function</span> <span class="function">nextPage</span>() {
    <span class="property">PaginationManager</span>.<span class="function">goToNextPage</span>();
}

<span class="keyword">function</span> <span class="function">lastPage</span>() {
    <span class="property">PaginationManager</span>.<span class="function">goToLastPage</span>();
}

<span class="comment">// =====================================
// 🚀 INICIALIZAÇÃO AUTOMÁTICA
// =====================================</span>

<span class="property">document</span>.<span class="function">addEventListener</span>(<span class="string">'DOMContentLoaded'</span>, () => {
    <span class="comment">// Configuração padrão</span>
    <span class="property">PaginationManager</span>.<span class="function">init</span>({
        <span class="property">itemsPerPage</span>: <span class="property">CONFIG</span>.<span class="property">PAGINATION</span>.<span class="property">ITEMS_PER_PAGE</span> || <span class="number">25</span>,
        <span class="property">maxVisiblePages</span>: <span class="number">5</span>,
        <span class="property">onPageChange</span>: (<span class="property">page</span>) => {
            <span class="comment">// Callback será definido pelo Search Engine</span>
            <span class="keyword">if</span> (<span class="keyword">typeof</span> <span class="property">Search</span> !== <span class="string">'undefined'</span> && <span class="property">Search</span>.<span class="property">execute</span>) {
                <span class="property">Search</span>.<span class="function">execute</span>(<span class="property">page</span>);
            }
        }
    });
});

<span class="comment">// Exportar para uso global</span>
<span class="keyword">window</span>.<span class="property">PaginationManager</span> = <span class="property">PaginationManager</span>;
            </div>
            
            <!-- Características -->
            <div class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="bg-blue-50 p-4 rounded-lg">
                    <h3 class="font-semibold text-blue-800 mb-2">🎯 Navegação Inteligente</h3>
                    <p class="text-sm text-blue-600">Controles de primeira/última página com números dinâmicos</p>
                </div>
                
                <div class="bg-green-50 p-4 rounded-lg">
                    <h3 class="font-semibold text-green-800 mb-2">⚡ Performance</h3>
                    <p class="text-sm text-green-600">Renderização otimizada com cache de elementos DOM</p>
                </div>
                
                <div class="bg-purple-50 p-4 rounded-lg">
                    <h3 class="font-semibold text-purple-800 mb-2">🔧 Configurável</h3>
                    <p class="text-sm text-purple-600">Máximo de páginas visíveis e callbacks customizáveis</p>
                </div>
                
                <div class="bg-orange-50 p-4 rounded-lg">
                    <h3 class="font-semibold text-orange-800 mb-2">📱 Responsivo</h3>
                    <p class="text-sm text-orange-600">Interface adaptável com controles touch-friendly</p>
                </div>
                
                <div class="bg-red-50 p-4 rounded-lg">
                    <h3 class="font-semibold text-red-800 mb-2">🐛 Debug Ready</h3>
                    <p class="text-sm text-red-600">Logs detalhados para monitoramento de navegação</p>
                </div>
                
                <div class="bg-indigo-50 p-4 rounded-lg">
                    <h3 class="font-semibold text-indigo-800 mb-2">🌐 Global</h3>
                    <p class="text-sm text-indigo-600">Funções globais para compatibilidade com código existente</p>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Demo funcional
        let demoCurrentPage = 1;
        const demoTotalItems = 1250;
        const demoItemsPerPage = 25;
        const demoTotalPages = Math.ceil(demoTotalItems / demoItemsPerPage);

        function updateDemo() {
            const startItem = (demoCurrentPage - 1) * demoItemsPerPage + 1;
            const endItem = Math.min(demoCurrentPage * demoItemsPerPage, demoTotalItems);

            document.getElementById('demoFrom').textContent = startItem;
            document.getElementById('demoTo').textContent = endItem;
            document.getElementById('demoTotal').textContent = demoTotalItems;
            document.getElementById('demoCurrent').textContent = demoCurrentPage;
            document.getElementById('demoTotalPages').textContent = demoTotalPages;

            renderDemoPagination();
        }

        function renderDemoPagination() {
            const container = document.getElementById('demoPagination');
            container.innerHTML = '';

            // Botão primeira
            const firstBtn = createDemoButton('⏮️ Primeira', () => {
                demoCurrentPage = 1;
                updateDemo();
            }, demoCurrentPage === 1);
            container.appendChild(firstBtn);

            // Botão anterior
            const prevBtn = createDemoButton('⬅️ Anterior', () => {
                if (demoCurrentPage > 1) {
                    demoCurrentPage--;
                    updateDemo();
                }
            }, demoCurrentPage === 1);
            container.appendChild(prevBtn);

            // Números das páginas
            const maxVisible = 5;
            let startPage = Math.max(1, demoCurrentPage - Math.floor(maxVisible / 2));
            let endPage = Math.min(demoTotalPages, startPage + maxVisible - 1);

            if (endPage - startPage + 1 < maxVisible) {
                startPage = Math.max(1, endPage - maxVisible + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
                const pageBtn = createDemoButton(i.toString(), () => {
                    demoCurrentPage = i;
                    updateDemo();
                }, false, i === demoCurrentPage);
                container.appendChild(pageBtn);
            }

            // Botão próxima
            const nextBtn = createDemoButton('Próxima ➡️', () => {
                if (demoCurrentPage < demoTotalPages) {
                    demoCurrentPage++;
                    updateDemo();
                }
            }, demoCurrentPage >= demoTotalPages);
            container.appendChild(nextBtn);

            // Botão última
            const lastBtn = createDemoButton('Última ⏭️', () => {
                demoCurrentPage = demoTotalPages;
                updateDemo();
            }, demoCurrentPage >= demoTotalPages);
            container.appendChild(lastBtn);
        }

        function createDemoButton(text, onClick, disabled = false, active = false) {
            const button = document.createElement('button');
            button.textContent = text;
            button.onclick = onClick;
            button.disabled = disabled;
            
            let classes = 'px-3 py-1 rounded-md border transition-all duration-200 text-sm ';
            
            if (disabled) {
                classes += 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed';
            } else if (active) {
                classes += 'bg-blue-500 text-white border-blue-500 shadow-md';
            } else {
                classes += 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 cursor-pointer';
            }
            
            button.className = classes;
            return button;
        }

        // Inicializar demo
        updateDemo();
    </script>
</body>
</html>
